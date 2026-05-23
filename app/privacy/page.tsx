'use client';

import { useEffect } from 'react';
import LandingLayout, { LP } from '@/components/LandingLayout';

/* ------------------------------------------------------------------ */
/*  Content sections                                                      */
/* ------------------------------------------------------------------ */
const sections = [
	{
		title: '1. Purpose of This Policy',
		content:
			'This Data Protection Policy establishes the framework through which GATEPASS NG collects, processes, stores, shares, and protects personal data in compliance with the Nigeria Data Protection Act (NDPA) 2023 and all directives issued by the Nigeria Data Protection Commission (NDPC).\n\nThe policy ensures that all personal data handled by the company is managed responsibly, securely, and transparently.',
	},
	{
		title: '2. Scope',
		content: 'This policy applies to:',
		bullets: [
			'All employees, contractors, consultants, and temporary staff of GATEPASS NG',
			'All software applications, platforms, websites, and digital services operated by the company',
			'All personal data processed in electronic or manual form',
			'All third-party processors acting on behalf of the company',
		],
	},
	{
		content: 'This policy covers personal data belonging to customers, users, employees, partners, vendors, and any other identifiable individuals.',
	},
	{
		title: '3. Definitions',
		content: '',
		bullets: [
			'Personal Data: Any information relating to an identified or identifiable natural person (data subject).',
			'Sensitive Personal Data: Includes health data, biometric data, financial information, sexual orientation, religious beliefs, etc.',
			'Processing: Any operation performed on personal data, including collection, storage, retrieval, transmission, or deletion.',
			'Data Controller: GATEPASS NG, which determines the purpose and means of processing personal data.',
			'Data Processor: Any third party that processes personal data on behalf of the company.',
			'Data Subject: Any individual whose personal data is processed by the company.',
			'DPO: Data Protection Officer appointed to oversee compliance.',
		],
	},
	{
		title: '4. Data Protection Principles',
		content: 'GATEPASS NG adheres to the following principles as required by the NDPA:',
	},
	{
		title: '4.1 Lawfulness, Fairness, and Transparency',
		content: 'Personal data is processed lawfully, fairly, and in a transparent manner.',
	},
	{
		title: '4.2 Purpose Limitation',
		content: 'Data is collected for specific, explicit, and legitimate purposes and not processed beyond those purposes.',
	},
	{
		title: '4.3 Data Minimisation',
		content: 'Only data that is adequate, relevant, and necessary is collected.',
	},
	{
		title: '4.4 Accuracy',
		content: 'Personal data must be accurate and kept up to date.',
	},
	{
		title: '4.5 Storage Limitation',
		content: 'Data is retained only for as long as necessary for the purposes for which it was collected.',
	},
	{
		title: '4.6 Integrity and Confidentiality',
		content: 'Data is processed securely to prevent unauthorised access, loss, or damage.',
	},
	{
		title: '4.7 Accountability',
		content: 'The company is responsible for demonstrating compliance with all data protection obligations.',
	},
	{
		title: '5. Legal Basis for Processing Personal Data',
		content: 'The company processes personal data only when one or more of the following legal bases apply:',
		bullets: ['Consent from the data subject', 'Performance of a contract with the data subject', 'Compliance with legal obligations', 'Protection of vital interests of Data Subject', 'Legitimate interests pursued by the company', 'Public interest (where applicable)'],
	},
	{
		title: '6. Categories of Personal Data Collected',
		content: 'Depending on the nature of the software application, the company may collect:',
		bullets: [
			'Identity data (name, username, date of birth)',
			'Contact data (email, phone number, address)',
			'Device and technical data (IP address, device ID, OS version)',
			'Usage data (app interactions, preferences, logs)',
			'Financial or payment data (where applicable)',
			'Location data (with consent)',
			'Sensitive personal data (only when strictly necessary and with explicit consent)',
		],
	},
	{
		title: '7. Data Collection Methods',
		content: 'Data may be collected through:',
		bullets: ['User registration forms', 'App usage and analytics tools', 'Customer support interactions', 'Cookies and tracking technologies', 'Third-party integrations (with user consent)'],
	},
	{
		title: '8. Data Subject Rights',
		content: 'In accordance with the NDPA, data subjects have the right to:',
		bullets: ['Access their personal data', 'Request rectification of inaccurate data', 'Request deletion of their data', 'Withdraw consent at any time', 'Object to processing', 'Request data portability', 'Restrict processing', 'Lodge complaints with the NDPC'],
	},
	{
		content: 'The company provides clear channels for exercising these rights.',
	},
	{
		title: '9. Data Security Measures',
		content: 'The company implements robust technical and organisational measures, including:',
	},
	{
		title: 'Technical Measures',
		bullets: ['Encryption of data in transit and at rest', 'Secure coding practices', 'Multi-factor authentication', 'Firewalls and intrusion detection systems', 'Regular vulnerability assessments and penetration testing'],
	},
	{
		title: 'Organisational Measures',
		bullets: ['Staff training on data protection', 'Access control policies', 'Confidentiality agreements', 'Incident response and breach reporting procedures', 'Regular compliance audits'],
	},
	{
		title: '10. Data Breach Management',
		content: 'In the event of a data breach:',
		bullets: ['The DPO will activate the incident response plan.', 'The NDPC will be notified within the legally required timeframe.', 'Affected individuals will be informed where the breach poses a risk to their rights.', 'Remedial actions will be taken to prevent recurrence.'],
	},
	{
		title: '11. Data Sharing and Third-Party Processing',
		content: 'Personal data may be shared only when:',
		bullets: ['Required by law', 'Necessary for service delivery', 'The data subject has provided consent'],
	},
	{
		title: 'All third-party processors must:',
		bullets: ['Sign a Data Processing Agreement (DPA)', 'Implement adequate security measures', 'Comply with NDPA requirements'],
	},
	{
		title: '12. Cross-Border Data Transfers',
		content: 'Where data must be transferred outside Nigeria, the company ensures:',
		bullets: ['The receiving country has adequate data protection safeguards, or', 'Standard contractual clauses and protective measures are in place'],
	},
	{
		content: 'Transfers are conducted strictly in line with NDPC guidelines.',
	},
	{
		title: '13. Data Retention and Disposal',
		content: 'Data is retained after the point of account deletion for five (5) years to fulfil its purpose or meet legal obligations except explicitly requested by the data subject.\n\nUpon expiration of the retention period, data is:',
		bullets: ['Securely deleted', 'Anonymised', 'Archived (where legally required)'],
	},
	{
		title: '14. Roles and Responsibilities',
		content: '',
	},
	{
		title: '14.1 Management',
		content: 'Responsible for ensuring adequate resources and oversight.',
	},
	{
		title: '14.2 Data Protection Officer (DPO)',
		content: 'The DPO oversees:',
		bullets: ['Compliance monitoring', 'Staff training', 'Data protection impact assessments', 'Breach management', 'Communication with the NDPC'],
	},
	{
		title: '14.3 Employees',
		content: 'All staff must:',
		bullets: ['Follow this policy', 'Report suspected breaches', 'Maintain confidentiality'],
	},
	{
		title: '15. Data Protection Impact Assessments (DPIA)',
		content: 'DPIAs are conducted for:',
		bullets: ['New products or features involving personal data', 'High-risk processing activities', 'Use of sensitive personal data', 'Automated decision-making or profiling'],
	},
	{
		title: '16. Use of Cookies and Tracking Technologies',
		content: 'The company uses cookies and similar technologies to:',
		bullets: ['Improve user experience', 'Analyse usage patterns', 'Personalise content'],
	},
	{
		content: 'Users are informed and may manage cookie preferences.',
	},
	{
		title: '17. Policy Review',
		content: 'This policy is reviewed annually or whenever:',
		bullets: ['Laws or regulations change', 'New processing activities are introduced', 'Significant organisational changes occur'],
	},
	{
		title: '18. Contact Information',
		content: 'For inquiries or to exercise data rights, contact:',
		bullets: ['Data Protection Officer (DPO)', 'info@gatepassng.com'],
	},
];

/* ------------------------------------------------------------------ */
/*  Main page                                                             */
/* ------------------------------------------------------------------ */
export default function PrivacyPage() {
	useEffect(() => {
		document.title = 'Privacy Policy — GatePass';
	}, []);

	return (
		<LandingLayout>
			<div className="max-w-3xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
				<h1 className="text-4xl md:text-8xl font-inter-regular text-white mb-3">Privacy Policy</h1>
				<p className="text-white text-base font-ubuntu-semibold mb-12">Last Updated: 16th December 2023.</p>

				<div className="space-y-2">
					{sections.map((section, i) => (
						<div key={i}>
							<h2 className="text-xl font-ubuntu-semibold text-white mb-3">{section.title}</h2>
							{section.content &&
								section.content.split('\n\n').map((paragraph, pIdx) => (
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
