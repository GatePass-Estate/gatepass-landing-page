'use client';

import { useEffect, useState } from 'react';
import LandingLayout, { LP } from '@/components/LandingLayout';

/* ------------------------------------------------------------------ */
/*  Reusable input                                                       */
/* ------------------------------------------------------------------ */
const Input = ({ placeholder, value, onChange, type = 'text', className = '', disabled = false }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string; className?: string; disabled?: boolean }) => (
	<input
		type={type}
		value={value}
		onChange={(e) => onChange(e.target.value)}
		placeholder={placeholder}
		disabled={disabled}
		className={`w-full bg-transparent text-white placeholder-gray-500 text-sm font-inter-regular outline-none px-5 py-4 rounded-xl transition-all focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
		style={{
			background: LP.cardBg,
			border: `1px solid ${LP.accent}`,
			boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
		}}
		onFocus={(e) => {
			e.currentTarget.style.borderColor = LP.accentBorder;
			e.currentTarget.style.boxShadow = `0 0 0 3px ${LP.accentSoft}`;
		}}
		onBlur={(e) => {
			e.currentTarget.style.borderColor = LP.accent;
			e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)';
		}}
	/>
);

const TextArea = ({ placeholder, value, onChange, className = '', rows = 6, disabled = false }: { placeholder: string; value: string; onChange: (v: string) => void; className?: string; rows?: number; disabled?: boolean }) => (
	<textarea
		value={value}
		onChange={(e) => onChange(e.target.value)}
		placeholder={placeholder}
		rows={rows}
		disabled={disabled}
		className={`w-full bg-transparent text-white placeholder-gray-500 text-sm font-inter-regular outline-none px-5 py-4 rounded-xl transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
		style={{
			background: LP.cardBg,
			border: `1px solid ${LP.accent}`,
			boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
		}}
		onFocus={(e) => {
			e.currentTarget.style.borderColor = LP.accentBorder;
			e.currentTarget.style.boxShadow = `0 0 0 3px ${LP.accentSoft}`;
		}}
		onBlur={(e) => {
			e.currentTarget.style.borderColor = LP.accent;
			e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)';
		}}
	/>
);

/* ------------------------------------------------------------------ */
/*  Main page                                                             */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [reason, setReason] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [statusMsg, setStatusMsg] = useState('');

	useEffect(() => {
		document.title = 'Contact Us — GatePass';
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('loading');
		setStatusMsg('');

		if (!reason) {
			setStatus('error');
			setStatusMsg('Please select a contact reason.');
			return;
		}

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, reason, message }),
			});
			const data = await res.json();
			if (data.success) {
				setStatus('success');
				setStatusMsg('Thank you for reaching out! We will get back to you soon.');
				setName('');
				setEmail('');
				setReason('');
				setMessage('');
			} else {
				setStatus('error');
				setStatusMsg(data.error || 'Something went wrong. Please try again.');
			}
		} catch {
			setStatus('error');
			setStatusMsg('Something went wrong. Please try again.');
		}
	};

	return (
		<LandingLayout>
			<div className="max-w-3xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
				<h1 className="text-4xl md:text-8xl font-inter-regular text-white mb-8">Contact Us</h1>

				<div className="mb-8">
					<p className="text-white font-inter-light text-base">
						Email: info@gatepassng.com
						{/* <br />
						Phone: 212-457-4014 */}
					</p>
				</div>

				<p className="text-white font-inter-light text-base mb-12 max-w-xl mx-auto">Email us first or complete the form below for the fastest response. We&apos;re here to help, no matter how you reach out!</p>

				<form onSubmit={handleSubmit} className="text-left space-y-5">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<Input placeholder="Name" value={name} onChange={setName} disabled={status === 'loading'} />
						<Input placeholder="Email Address" value={email} onChange={setEmail} type="email" disabled={status === 'loading'} />
					</div>
					<div className="relative">
						<select
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							disabled={status === 'loading'}
							className="w-full bg-transparent text-white placeholder-gray-500 text-sm font-inter-regular outline-none px-5 py-4 pr-12 rounded-xl transition-all focus:ring-1 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								background: LP.cardBg,
								border: `1px solid ${LP.accent}`,
								boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
							}}
							onFocus={(e) => {
								e.currentTarget.style.borderColor = LP.accentBorder;
								e.currentTarget.style.boxShadow = `0 0 0 3px ${LP.accentSoft}`;
							}}
							onBlur={(e) => {
								e.currentTarget.style.borderColor = LP.accent;
								e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)';
							}}
						>
							<option value="" disabled className="text-gray-500 bg-white">
								Select a reason
							</option>
							<option value="General Inquiry" className="text-gray-900 bg-white">
								General Inquiry
							</option>
							<option value="Request a Demo" className="text-gray-900 bg-white">
								Request a Demo
							</option>
							<option value="Integration & Onboarding" className="text-gray-900 bg-white">
								Integration & Onboarding
							</option>
							<option value="Bug Report" className="text-gray-900 bg-white">
								Bug Report
							</option>
							<option value="Feature Request / Feedback" className="text-gray-900 bg-white">
								Feature Request / Feedback
							</option>
							<option value="Partnership Opportunity" className="text-gray-900 bg-white">
								Partnership Opportunity
							</option>
							<option value="Career / Hiring" className="text-gray-900 bg-white">
								Career / Hiring
							</option>
							<option value="Other" className="text-gray-900 bg-white">
								Other
							</option>
						</select>
						<svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</div>
					<TextArea placeholder="Your message ..." value={message} onChange={setMessage} rows={8} disabled={status === 'loading'} />

					{status !== 'idle' && statusMsg && <div className={`text-sm font-inter-medium ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-white'}`}>{statusMsg}</div>}

					<div className="flex justify-center md:justify-end">
						<button type="submit" disabled={status === 'loading'} className="rounded-2xl px-10 py-4 font-inter-medium border transition-all flex items-center gap-1 bg-accent hover:bg-white/5 text-primary hover:text-white hover:border-white disabled:opacity-50">
							{status === 'loading' ? 'Sending...' : 'Send Message'}
						</button>
					</div>
				</form>
			</div>
		</LandingLayout>
	);
}
