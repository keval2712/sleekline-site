/**
 * Sleekline Contact Form Backend
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles POST /api/contact → validates fields → appends to data/inquiries.csv
 * Also serves the static Sleekline website files.
 *
 * Run:  node server.js
 * URL:  http://localhost:3000
 */

const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const cors     = require('cors');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Paths ──────────────────────────────────────────────────────────────────
const DATA_DIR  = path.join(__dirname, 'data');
const CSV_FILE  = path.join(DATA_DIR, 'inquiries.csv');
const CSV_HEADER = 'Date,Time,Name,Phone,Email,City,Message\n';

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static site files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// ── Helpers ────────────────────────────────────────────────────────────────

/** Ensure /data directory and inquiries.csv exist with correct headers */
function ensureCSV() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CSV_FILE)) {
    fs.writeFileSync(CSV_FILE, CSV_HEADER, 'utf8');
  }
}

/** Escape a field value for CSV (wrap in quotes, escape inner quotes) */
function csvEscape(value) {
  const str = String(value ?? '').replace(/"/g, '""');
  return `"${str}"`;
}

/** Return IST datetime string: YYYY-MM-DD and HH:MM:SS */
function getISTDateTime() {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const date = ist.toISOString().slice(0, 10);
  const time = ist.toISOString().slice(11, 19);
  return { date, time };
}

/** Validate email format */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Validate phone: 7–15 digits, optional leading +/spaces */
function isValidPhone(phone) {
  return /^[\+]?[\d\s\-]{7,15}$/.test(phone.trim());
}

const PENDING_FILE = path.join(DATA_DIR, 'pending.csv');

/**
 * Write a row to the CSV.
 * Strategy: try the main inquiries.csv first.
 * If it is locked by Excel / VS Code, save to pending.csv as a fallback.
 * A background job merges pending rows every 30 seconds.
 */
async function writeRow(row) {
  try {
    ensureCSV();
    fs.appendFileSync(CSV_FILE, row, { encoding: 'utf8', flag: 'a' });
    return 'main';
  } catch (primaryErr) {
    const isLocked = ['EBUSY', 'EPERM', 'EACCES'].includes(primaryErr.code);
    if (!isLocked) throw primaryErr;

    // Main file is locked — save to pending.csv as fallback
    console.warn(`[CSV] inquiries.csv locked (${primaryErr.code}) — saving to pending.csv`);
    try {
      if (!fs.existsSync(PENDING_FILE)) {
        fs.writeFileSync(PENDING_FILE, '', 'utf8');   // no header — raw rows only
      }
      fs.appendFileSync(PENDING_FILE, row, 'utf8');
      return 'pending';
    } catch (fallbackErr) {
      console.error('[CSV] Both main and pending write failed:', fallbackErr.message);
      throw fallbackErr;
    }
  }
}

/**
 * Merge any rows in pending.csv into inquiries.csv.
 * Called by the background scheduler and the /api/merge endpoint.
 */
function mergePending() {
  try {
    if (!fs.existsSync(PENDING_FILE)) return 0;
    const pending = fs.readFileSync(PENDING_FILE, 'utf8').trim();
    if (!pending) return 0;

    ensureCSV();
    fs.appendFileSync(CSV_FILE, pending + '\n', 'utf8');
    fs.writeFileSync(PENDING_FILE, '', 'utf8');   // clear pending

    const count = pending.split('\n').filter(Boolean).length;
    console.log(`[CSV] ✅ Merged ${count} pending row(s) into inquiries.csv`);
    return count;
  } catch (err) {
    // inquiries.csv still locked — will retry next cycle
    if (!['EBUSY', 'EPERM', 'EACCES'].includes(err.code)) {
      console.error('[CSV] Merge error:', err.message);
    }
    return 0;
  }
}

// Run merge every 30 seconds automatically
setInterval(mergePending, 30_000);

// ── API Endpoint ───────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, city = '', message } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Full name is required (minimum 2 characters).');
  }
  if (!email || !isValidEmail(email.trim())) {
    errors.push('A valid email address is required.');
  }
  if (!phone || !isValidPhone(phone)) {
    errors.push('A valid phone number (7–15 digits) is required.');
  }
  if (!message || message.trim().length < 5) {
    errors.push('Message is required (minimum 5 characters).');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // ── Build CSV row ────────────────────────────────────────────────────────
  const { date, time } = getISTDateTime();

  const row = [
    csvEscape(date),
    csvEscape(time),
    csvEscape(name.trim()),
    csvEscape(phone.trim()),
    csvEscape(email.trim().toLowerCase()),
    csvEscape(city.trim()),
    csvEscape(message.trim()),
  ].join(',') + '\n';

  // ── Write to CSV (with pending.csv fallback if main file is locked) ──────
  try {
    const dest = await writeRow(row);
    const label = dest === 'pending' ? '(→ pending.csv, will merge)' : '';

    console.log(`[${date} ${time}] ✅ Inquiry saved ${label} — ${name.trim()} <${email.trim()}>`);

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. We will contact you within 24 hours.',
    });
  } catch (err) {
    console.error('[CSV] Fatal write error:', err.message);
    return res.status(500).json({
      success: false,
      errors: ['Server error saving your inquiry — please try again or call us at +91 92652 46156.'],
    });
  }
});

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  const hasPending = fs.existsSync(PENDING_FILE) &&
                     fs.readFileSync(PENDING_FILE, 'utf8').trim().length > 0;
  res.json({ status: 'ok', server: 'Sleekline Contact API', port: PORT, pendingRows: hasPending });
});

// ── Manual merge trigger ──────────────────────────────────────────────────
app.get('/api/merge', (_req, res) => {
  const merged = mergePending();
  res.json({ merged, message: merged > 0 ? `Merged ${merged} row(s) into inquiries.csv.` : 'Nothing to merge.' });
});

// ── Fallback: serve index.html for any unknown routes ────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  ensureCSV();
  mergePending();   // merge any rows saved while server was off
  console.log('');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log(`  │  🏗️  Sleekline Server running             │`);
  console.log(`  │  🌐  http://localhost:${PORT}               │`);
  console.log(`  │  📊  CSV → data/inquiries.csv            │`);
  console.log(`  │  📂  Merge → http://localhost:${PORT}/api/merge │`);
  console.log('  └─────────────────────────────────────────┘');
  console.log('');
});
