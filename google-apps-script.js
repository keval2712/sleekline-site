/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SLEEKLINE — Google Apps Script Contact Form Handler
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  SETUP INSTRUCTIONS:
 *  1. Open your Google Sheet
 *  2. Click Extensions → Apps Script
 *  3. Delete all existing code in the editor
 *  4. Paste THIS entire file
 *  5. Click Save (Ctrl+S)  →  name the project "Sleekline Contact Form"
 *  6. Click Deploy → New Deployment
 *       Type        : Web App
 *       Description : Sleekline Contact Form v1
 *       Execute as  : Me
 *       Who has access: Anyone
 *  7. Click Deploy → Authorize → Allow
 *  8. Copy the "Web App URL" shown
 *  9. Paste it into contact.html as the SHEETS_WEBHOOK_URL value
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ── Sheet config ─────────────────────────────────────────────────────────
const SHEET_NAME   = 'Inquiries';   // Change if your sheet tab has a different name
const HEADER_ROW   = ['Date', 'Time (IST)', 'Name', 'Phone', 'Email', 'City', 'Message'];

// ── GET handler (health check) ────────────────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', app: 'Sleekline Contact API' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST handler (form submission) ────────────────────────────────────────
function doPost(e) {
  try {
    // ── Parse incoming data ──────────────────────────────────────────────
    let name = '', phone = '', email = '', city = '', message = '';

    if (e.postData && e.postData.type === 'application/json') {
      // JSON body
      const payload = JSON.parse(e.postData.contents);
      name    = payload.name    || '';
      phone   = payload.phone   || '';
      email   = payload.email   || '';
      city    = payload.city    || '';
      message = payload.message || '';

    } else if (e.parameter) {
      // URL-encoded form body (fallback)
      name    = e.parameter.name    || '';
      phone   = e.parameter.phone   || '';
      email   = e.parameter.email   || '';
      city    = e.parameter.city    || '';
      message = e.parameter.message || '';
    }

    // ── Basic server-side validation ─────────────────────────────────────
    const errors = [];
    if (!name || name.trim().length < 2)   errors.push('Name is required.');
    if (!email || !isValidEmail(email))    errors.push('Valid email is required.');
    if (!phone || !isValidPhone(phone))    errors.push('Valid phone number is required.');
    if (!message || message.trim().length < 5) errors.push('Message is required.');

    if (errors.length > 0) {
      return jsonResponse({ success: false, errors: errors }, 400);
    }

    // ── Get / create sheet ───────────────────────────────────────────────
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADER_ROW);
      sheet.getRange(1, 1, 1, HEADER_ROW.length)
        .setFontWeight('bold')
        .setBackground('#1a1a2e')
        .setFontColor('#c8a96e');
      sheet.setFrozenRows(1);
    }

    // ── IST timestamp ────────────────────────────────────────────────────
    const now  = new Date();
    const opts = { timeZone: 'Asia/Kolkata', hour12: false };
    const date = now.toLocaleDateString('en-IN', { ...opts, year: 'numeric', month: '2-digit', day: '2-digit' });
    const time = now.toLocaleTimeString('en-IN', { ...opts, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // ── Append row ───────────────────────────────────────────────────────
    sheet.appendRow([
      date,
      time,
      name.trim(),
      phone.trim(),
      email.trim().toLowerCase(),
      city.trim(),
      message.trim(),
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADER_ROW.length);

    return jsonResponse({ success: true, message: 'Inquiry saved successfully.' });

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return jsonResponse({ success: false, errors: ['Server error: ' + err.message] }, 500);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  return /^[\+]?[\d\s\-]{7,15}$/.test(phone.trim());
}

function jsonResponse(data, statusCode) {
  // Note: Apps Script ContentService doesn't support HTTP status codes,
  // but we embed success/failure in the response body.
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
