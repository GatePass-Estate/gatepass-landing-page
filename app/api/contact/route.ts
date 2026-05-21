import { createTransport } from 'nodemailer';
import type { Transporter, SentMessageInfo } from 'nodemailer';

/**
 * Expected shape of the contact form JSON payload.
 */
interface ContactBody {
	name: string;
	email: string;
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
 * POST /api/contact
 *
 * Accepts a JSON body with name, email, and message,
 * validates the fields, then sends an email via SMTP using nodemailer.
 */
export async function POST(request: Request): Promise<Response> {
	try {
		// 1. Parse and narrow the JSON body
		const rawBody = await request.json();

		const { name, email, message } = rawBody as Partial<ContactBody>;

		// 2. Validate presence
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return Response.json({ success: false, error: 'Name is required.' } satisfies ContactErrorResponse, { status: 400 });
		}

		if (!email || typeof email !== 'string' || email.trim().length === 0) {
			return Response.json({ success: false, error: 'Email is required.' } satisfies ContactErrorResponse, { status: 400 });
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
		const smtpHost = process.env.SMTP_HOST;
		const smtpPort = process.env.SMTP_PORT;
		const smtpUser = process.env.SMTP_USER;
		const smtpPass = process.env.SMTP_PASS;
		const contactRecipient = process.env.CONTACT_RECIPIENT;

		// Ensure all required env vars are present
		if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactRecipient) {
			console.error('Missing one or more required SMTP environment variables.');
			return Response.json({ success: false, error: 'Server configuration error. Please try again later.' } satisfies ContactErrorResponse, { status: 500 });
		}

		const portNum = parseInt(smtpPort, 10);
		if (Number.isNaN(portNum)) {
			console.error(`Invalid SMTP_PORT value: ${smtpPort}`);
			return Response.json({ success: false, error: 'Server configuration error. Please try again later.' } satisfies ContactErrorResponse, { status: 500 });
		}

		// 5. Create nodemailer transporter
		const transporter: Transporter = createTransport({
			host: smtpHost,
			port: portNum,
			// Use TLS when port is 465, otherwise use STARTTLS on 587 / 25
			secure: portNum === 465,
			auth: {
				user: smtpUser,
				pass: smtpPass,
			},
			// 30-second connection timeout to fail fast on misconfigured SMTP
			connectionTimeout: 30_000,
		});

		// 6. Send the email
		const info: SentMessageInfo = await transporter.sendMail({
			from: `"${name.trim()}" <${trimmedEmail}>`,
			to: contactRecipient,
			replyTo: trimmedEmail,
			subject: `New contact form submission from ${name.trim()}`,
			text: `Name: ${name.trim()}\nEmail: ${trimmedEmail}\n\nMessage:\n${message.trim()}`,
			html: `
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br/>')}</p>
      `,
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
