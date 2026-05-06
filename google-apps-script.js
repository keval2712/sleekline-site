/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SLEEKLINE — Google Apps Script Contact Form Handler  (v2 — text/plain fix)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  SETUP INSTRUCTIONS:
 *  1. Open your Google Sheet
 *  2. Click Extensions → Apps Script
 *  3. Delete all existing code  (Ctrl+A → Delete)
 *  4. Paste THIS entire file
 *  5. Click Save (Ctrl+S) → name: "Sleekline Contact Form"
 *  6. Click Deploy → New Deployment
 *       Type        : Web App
 *       Description : Sleekline v2
 *       Execute as  : Me
 *       Who has access: Anyone
 *  7. Click Deploy → Authorize → Allow
 *  8. Copy the Web App URL  (ends with /exec)
 *  9. Paste it in contact.html as the SHEETS_WEBHOOK_URL value
 *
 *  HOW THE FETCH WORKS:
 *  The browser sends: POST, Content-Type: text/plain, body = JSON string
 *  Why text/plain? It's a "simple request" — no CORS preflight needed.
 *  Apps Script reads e.postData.contents and JSON.parses it.
 *  Apps Script returns JSON with { success: true } which the browser reads.
 * ═══════════════════════════════════════════════════════════════════════════
 */

var SHEET_NAME  = 'Inquiries';
var HEADER_ROW  = ['Date', 'Time (IST)', 'Name', 'Phone', 'Email', 'City', 'Message'];

// ── Health check (GET) ────────────────────────────────────────────────────
function doGet(e) {
  return buildResponse({ status: 'ok', app: 'Sleekline Contact API v2' });
}

// ── CORS Preflight (OPTIONS) ──────────────────────────────────────────────
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── Main handler (POST) ───────────────────────────────────────────────────
function doPost(e) {
  try {
    // ── Parse body ────────────────────────────────────────────────────────
    // Frontend sends: Content-Type: text/plain, body = JSON string
    var raw = (e.postData && e.postData.contents) ? e.postData.contents : '';
    var data = {};

    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      // Fallback: try URL-encoded params
      data = {
        name:    e.parameter.name    || '',
        phone:   e.parameter.phone   || '',
        email:   e.parameter.email   || '',
        city:    e.parameter.city    || '',
        message: e.parameter.message || '',
      };
    }

    var name    = (data.name    || '').toString().trim();
    var phone   = (data.phone   || '').toString().trim();
    var email   = (data.email   || '').toString().trim().toLowerCase();
    var city    = (data.city    || '').toString().trim();
    var message = (data.message || '').toString().trim();

    // ── Validate ──────────────────────────────────────────────────────────
    var errors = [];
    if (name.length   < 2)  errors.push('Name is required.');
    if (!isValidEmail(email)) errors.push('Valid email is required.');
    if (!isValidPhone(phone)) errors.push('Valid phone is required.');
    if (message.length < 5)  errors.push('Message is required.');

    if (errors.length > 0) {
      return buildResponse({ success: false, errors: errors });
    }

    // ── Get / create sheet ────────────────────────────────────────────────
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      var headerRange = sheet.getRange(1, 1, 1, HEADER_ROW.length);
      headerRange.setValues([HEADER_ROW]);
      headerRange.setFontWeight('bold')
                 .setBackground('#1a1a2e')
                 .setFontColor('#c8a96e');
      sheet.setFrozenRows(1);
    }

    // ── IST timestamp ─────────────────────────────────────────────────────
    var now  = new Date();
    var ist  = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    var pad  = function(n) { return n < 10 ? '0' + n : '' + n; };

    var date = ist.getUTCFullYear() + '-' +
               pad(ist.getUTCMonth() + 1) + '-' +
               pad(ist.getUTCDate());

    var time = pad(ist.getUTCHours()) + ':' +
               pad(ist.getUTCMinutes()) + ':' +
               pad(ist.getUTCSeconds());

    // ── Append row ────────────────────────────────────────────────────────
    sheet.appendRow([date, time, name, phone, email, city, message]);

    // Auto-size columns (optional — skip if performance matters)
    try { sheet.autoResizeColumns(1, HEADER_ROW.length); } catch(e) {}

    Logger.log('Saved: ' + name + ' <' + email + '>');

    return buildResponse({ success: true, message: 'Inquiry saved.' });

  } catch (err) {
    Logger.log('doPost error: ' + err.toString());
    return buildResponse({ success: false, errors: [err.message] });
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\+]?[\d\s\-]{7,15}$/.test(phone);
}

/**
 * Build a JSON response.
 * We rely on Apps Script's built-in simple CORS, but since the frontend 
 * now uses application/json, doOptions handles the preflight.
 */
function buildResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
