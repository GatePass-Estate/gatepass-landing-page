import { createTransport } from 'nodemailer';
import type { Transporter, SentMessageInfo } from 'nodemailer';

/**
 * Expected shape of the contact form JSON payload.
 */
interface ContactBody {
	name: string;
	email: string;
	reason: string;
	message: string;
}

/**
 * Standard API response shape.
 */
interface ContactResponse {
	success: true;
}

interface ContactErrorResponse {
	success: false;
	error: string;
}

/**
 * Simple RFC 5322-ish email regex for basic validation.
 * Does not cover every edge case, but sufficient for form validation.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Build a branded HTML email template for contact form submissions.
 */
function buildEmailTemplate(name: string, email: string, reason: string, message: string): string {
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeReason = escapeHtml(reason);
	const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="100%" max-width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#0F1F33;border-radius:16px;overflow:hidden;border:1px solid rgba(206,229,237,0.12);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#113E55 0%,#0A1628 100%);padding:40px 32px 32px;text-align:center;border-bottom:1px solid rgba(206,229,237,0.12);">
              <div style="font-size:24px;font-weight:700;color:#CEE5ED;letter-spacing:0.5px;margin-bottom:8px;">GatePass</div>
              <div style="font-size:13px;color:#9FB8C6;letter-spacing:1.5px;text-transform:uppercase;">New Contact Submission</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="font-size:12px;color:#9FB8C6;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Name</div>
                    <div style="font-size:16px;color:#FFFFFF;font-weight:500;">${safeName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="font-size:12px;color:#9FB8C6;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Email</div>
                    <div style="font-size:16px;color:#FFFFFF;font-weight:500;">${safeEmail}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="font-size:12px;color:#9FB8C6;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Reason</div>
                    <span style="display:inline-block;background-color:rgba(206,229,237,0.10);color:#CEE5ED;font-size:13px;font-weight:600;padding:6px 14px;border-radius:9999px;border:1px solid rgba(206,229,237,0.20);">${safeReason}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style="font-size:12px;color:#9FB8C6;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Message</div>
                    <div style="background-color:rgba(206,229,237,0.05);border:1px solid rgba(206,229,237,0.10);border-radius:12px;padding:20px;font-size:15px;color:#E2EAF0;line-height:1.6;">${safeMessage}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center;border-top:1px solid rgba(206,229,237,0.08);">
              <div style="font-size:12px;color:#6B8A9A;">This message was sent via the GatePass contact form.</div>
            </td>
          </tr>
        </table>
        <table width="100%" max-width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding-top:16px;text-align:center;">
              <div style="font-size:11px;color:#4A6270;">GatePass &copy; ${new Date().getFullYear()}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * POST /api/contact
 *
 * Accepts a JSON body with name, email, reason, and message,
 * validates the fields, then sends an email via SMTP using nodemailer.
 */
export async function POST(request: Request): Promise<Response> {
	try {
		// 1. Parse and narrow the JSON body
		const rawBody = await request.json();

		const { name, email, reason, message } = rawBody as Partial<ContactBody>;

		// 2. Validate presence
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return Response.json({ success: false, error: 'Name is required.' } satisfies ContactErrorResponse, { status: 400 });
		}

		if (!email || typeof email !== 'string' || email.trim().length === 0) {
			return Response.json({ success: false, error: 'Email is required.' } satisfies ContactErrorResponse, { status: 400 });
		}

		if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
			return Response.json({ success: false, error: 'Reason is required.' } satisfies ContactErrorResponse, { status: 400 });
		}

		if (!message || typeof message !== 'string' || message.trim().length === 0) {
			return Response.json({ success: false, error: 'Message is required.' } satisfies ContactErrorResponse, { status: 400 });
		}

		// 3. Validate email format
		const trimmedEmail = email.trim();
		if (!EMAIL_REGEX.test(trimmedEmail)) {
			return Response.json({ success: false, error: 'Please provide a valid email address.' } satisfies ContactErrorResponse, { status: 400 });
		}

		// 4. Read SMTP configuration from environment variables
		const smtpHost = process.env.MAIL_SERVER;
		const smtpPort = process.env.MAIL_PORT;
		const smtpUser = process.env.MAIL_USERNAME;
		const smtpPass = process.env.MAIL_PASSWORD;
		const from = process.env.MAIL_FROM;
		const fromName = process.env.MAIL_FROM_NAME;
		const contactRecipient = process.env.CONTACT_RECIPIENT;
		const mailSslTls = process.env.MAIL_SSL_TLS;
		const mailStartTls = process.env.MAIL_STARTTLS;

		// Ensure all required env vars are present
		if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactRecipient) {
			console.error('Missing one or more required SMTP environment variables.');
			return Response.json({ success: false, error: 'Server configuration error. Please try again later.' } satisfies ContactErrorResponse, { status: 500 });
		}

		const portNum = parseInt(smtpPort, 10);
		if (Number.isNaN(portNum)) {
			console.error(`Invalid MAIL_PORT value: ${smtpPort}`);
			return Response.json({ success: false, error: 'Server configuration error. Please try again later.' } satisfies ContactErrorResponse, { status: 500 });
		}

		// 5. Create nodemailer transporter
		const secure = mailSslTls ? mailSslTls === 'true' : portNum === 465;
		const requireTLS = mailStartTls ? mailStartTls === 'true' : portNum === 587;
		const transporter: Transporter = createTransport({
			host: smtpHost,
			port: portNum,
			secure,
			requireTLS,
			auth: {
				user: smtpUser,
				pass: smtpPass,
			},
			// 30-second connection timeout to fail fast on misconfigured SMTP
			connectionTimeout: 30_000,
		});

		// 6. Send the email
		const info: SentMessageInfo = await transporter.sendMail({
			from: `"${fromName}" <${from}>`,
			to: contactRecipient,
			subject: `[${reason.trim()}] New contact form submission from ${name.trim()}`,
			text: `Name: ${name.trim()}\nEmail: ${trimmedEmail}\nReason: ${reason.trim()}\n\nMessage:\n${message.trim()}`,
			html: buildEmailTemplate(name.trim(), trimmedEmail, reason.trim(), message.trim()),
		});

		console.log(`Contact email sent: ${info.messageId}`);

		// 7. Return success
		return Response.json({ success: true } satisfies ContactResponse, { status: 200 });
	} catch (err) {
		// Catch-all for unexpected errors (JSON parse failures, SMTP errors, etc.)
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		console.error('Contact form error:', errorMessage);

		return Response.json({ success: false, error: 'Failed to send message. Please try again later.' } satisfies ContactErrorResponse, { status: 500 });
	}
}

/**
 * Minimal HTML entity escape helper to prevent basic XSS in the HTML email body.
 */
function escapeHtml(unsafe: string): string {
	return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
