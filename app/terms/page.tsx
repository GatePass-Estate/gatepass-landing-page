'use client';

import { useEffect } from 'react';
import LandingLayout, { LP } from '@/components/LandingLayout';

/* ------------------------------------------------------------------ */
/*  Content sections                                                      */
/* ------------------------------------------------------------------ */
const sections = [
	{
		title: '1. Introduction',
		content:
			'Welcome to GatePassNG, operated by Devault ("we", "our", "us"). These Terms of Service ("Terms") govern your access to and use of our software application, website, products, and related services (collectively, the "Service").\n\nBy accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you must discontinue use immediately.',
	},
	{
		title: '2. Eligibility',
		content: 'To use the Service, you must:',
		bullets: [
			'Be at least 18 years old (or the age of legal majority in your jurisdiction)',
			'Have the legal capacity to enter into a binding agreement',
			'Use the Service in compliance with all applicable laws and regulations',
		],
	},
	{
		content:
			'If you are using the Service on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.',
	},
	{
		title: '3. User Accounts',
		content:
			'To access certain features, you may be required to create an account. You agree to:',
		bullets: [
			'Provide accurate and complete information',
			'Keep your login credentials secure',
			'Notify us immediately of any unauthorised access',
			'Accept responsibility for all activities under your account',
		],
	},
	{
		content:
			'We reserve the right to suspend or terminate accounts that violate these Terms.',
	},
	{
		title: '4. Acceptable Use',
		content: 'You agree not to:',
		bullets: [
			'Use the Service for unlawful, harmful, or fraudulent purposes',
			'Interfere with or disrupt the Service',
			'Attempt to gain unauthorised access to systems or data',
			'Upload malicious code, viruses, or harmful content',
			'Infringe on the rights of others, including intellectual property rights',
			'Use automated tools (bots, scrapers) without permission',
		],
	},
	{
		content:
			'We may investigate and take action, including account suspension, for violations.',
	},
	{
		title: '5. Intellectual Property',
		content:
			'All content, trademarks, logos, software, and materials provided through the Service are the exclusive property of Devault or its licensors.\n\nYou are granted a limited, non-exclusive, non-transferable, revocable license to use the Service for personal or internal business purposes.\n\nYou may not:',
		bullets: [
			'Copy, modify, distribute, or create derivative works',
			'Reverse engineer or decompile the software',
			'Remove copyright or proprietary notices',
		],
	},
	{
		title: '6. User-Generated Content',
		content:
			'If you submit, upload, or share content ("User Content"), you grant us a worldwide, royalty-free, non-exclusive license to use, store, reproduce, and display that content solely for operating and improving the Service.\n\nYou represent that:',
		bullets: [
			'You own or have rights to the User Content',
			'Your content does not violate any laws or third-party rights',
		],
	},
	{
		content:
			'We reserve the right to remove content that violates these Terms.',
	},
	{
		title: '7. Privacy and Data Protection',
		content:
			'Your use of the Service is also governed by our Privacy Policy and Data Protection Policy, which explain how we collect, use, and protect your personal data.\n\nWe comply with the Nigeria Data Protection Act (NDPA) 2023 and other applicable laws.',
	},
	{
		title: '8. Payments and Subscriptions',
		content: 'If the Service includes paid features:',
		bullets: [
			'Prices and billing cycles will be clearly displayed',
			'Payments are processed through authorised third-party providers',
			'Subscription fees are non-refundable unless required by law',
			'You may cancel your subscription at any time, but access continues until the end of the billing period',
		],
	},
	{
		content: 'We may change pricing with prior notice.',
	},
	{
		title: '9. Third-Party Services',
		content:
			'The Service may integrate with third-party tools or platforms. We are not responsible for:',
		bullets: [
			'The content, policies, or practices of third-party services',
			'Any loss or damage arising from their use',
		],
	},
	{
		content:
			'Your use of third-party services is subject to their own terms.',
	},
	{
		title: '10. Service Availability and Modifications',
		content: 'We strive to maintain reliable service but do not guarantee:',
		bullets: [
			'Uninterrupted access',
			'Error-free operation',
			'Complete security',
		],
	},
	{
		content:
			'We may modify, suspend, or discontinue any part of the Service at any time, with or without notice.',
	},
	{
		title: '11. Termination',
		content: 'We may suspend or terminate your access if you:',
		bullets: [
			'Violate these Terms',
			'Engage in harmful or illegal activities',
			'Misuse the Service',
		],
	},
	{
		content:
			'Upon termination:\n\nYour right to use the Service ends immediately.\n\nCertain provisions (e.g., intellectual property, disclaimers) will continue to apply.',
	},
	{
		title: '12. Disclaimers',
		content:
			'The Service is provided "as is" and "as available" without warranties of any kind, including:',
		bullets: [
			'Remotely related features not expressly stated',
			'Fitness for a particular purpose',
			'Non-infringement',
			'Accuracy or reliability',
		],
	},
	{
		content: 'You use the Service at your own risk.',
	},
	{
		title: '13. Limitation of Liability',
		content:
			'To the fullest extent permitted by law, Devault is not liable for:',
		bullets: [
			'Indirect, incidental, or consequential damages',
			'Loss of data, profits, or business',
			'Unauthorised access to your information',
			'Errors or interruptions in the Service',
		],
	},
	{
		content:
			'Our total liability will not exceed the amount you paid for the Service in the last 12 months (if applicable).',
	},
	{
		title: '14. Indemnification',
		content:
			'You agree to indemnify and hold Devault harmless from any claims, damages, or losses arising from:',
		bullets: [
			'Your use of the Service',
			'Your violation of these Terms',
			'Your infringement of third-party rights',
		],
	},
	{
		title: '15. Governing Law and Dispute Resolution',
		content:
			'These Terms are governed by the laws of the Federal Republic of Nigeria.\n\nDisputes will be resolved through:',
		bullets: [
			'Negotiation, then',
			'Mediation, and if unresolved,',
			'Courts of competent jurisdiction in Nigeria',
		],
	},
	{
		title: '16. Changes to These Terms',
		content: 'We may update these Terms periodically. When changes are made:',
		bullets: [
			'We will update the "Last Updated" date',
			'Continued use of the Service constitutes acceptance of the revised Terms',
		],
	},
	{
		title: '17. Contact Information',
		content:
			'For questions or concerns about these Terms, contact us at:\n\ninfo@gatepassng.com',
	},
];

/* ------------------------------------------------------------------ */
/*  Main page                                                             */
/* ------------------------------------------------------------------ */
export default function TermsPage() {
	useEffect(() => {
		document.title = 'Terms of Service — GatePass';
	}, []);

	return (
		<LandingLayout>
			<div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
				<h1 className="text-4xl md:text-8xl font-inter-regular text-white mb-8">Terms of Service</h1>
				<p className="text-white text-base font-ubuntu-semibold mb-12">Last Updated: 20th March 2026.</p>

				<div className="space-y-2">
					{sections.map((section, i) => (
						<div key={i}>
							<h2 className="text-xl font-ubuntu-semibold text-white mb-3">{section.title}</h2>
							{section.content.split('\n\n').map((paragraph, pIdx) => (
								<p key={pIdx} className="text-white text-base leading-relaxed mb-3 font-ubuntu-regular">
									{paragraph}
								</p>
							))}
							{section.bullets && (
								<ul className="mt-3 space-y-2">
									{section.bullets.map((bullet, bIdx) => (
										<li key={bIdx} className="flex items-start gap-3">
											<span className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ background: LP.accent }} />
											<span className="text-white text-base leading-relaxed font-ubuntu-regular">{bullet}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</LandingLayout>
	);
}
