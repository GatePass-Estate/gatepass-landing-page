'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LandingLayout, { LP as C } from '@/components/LandingLayout';
import { BodyText, PillButton, RoundedButton, Section, SectionHeading, WhyCard } from '@/components/HomeComponents';
import images from '@/lib/images';
import icons from '@/lib/icons';
import { useModal } from '@/components/ModalContext';

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
	const { open } = useModal();
	const [heroHeight, setHeroHeight] = useState('86vh');

	useEffect(() => {
		document.title = 'GatePass — Smarter Access. Safer Spaces.';
		setHeroHeight(`${window.innerHeight * 0.86}px`);
	}, []);

	return (
		<LandingLayout>
			{/* ========================================================= */}
			{/*  HERO                                                     */}
			{/* ========================================================= */}
			<div className="hero-section-image relative w-full" style={{ height: heroHeight }}>
				<img src={images.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
				<Section className="py-16 md:py-24 h-full">
					<div className="h-full">
						{/* Text */}
						<div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start justify-center gap-2 md:gap-8 h-full relative z-10">
							<h1 className="hero-txt">
								Smarter Access.
								<br />
								Safer Spaces.
								<br />
								Powered by <output className="text-accent hero-text">AI.</output>
							</h1>
							<BodyText light className="mb-8 max-w-xl mx-auto md:mx-0">
								GatePass is an AI-driven access automation and management platform designed to secure estates, buildings, and facilities while intelligently detecting anomalies, preventing incidents, and simplifying operations.
							</BodyText>
							<div className="hidden md:flex justify-center md:justify-start">
								<RoundedButton onPress={open} icon={icons.rightLink}>
									Get Started
								</RoundedButton>
							</div>
						</div>
					</div>
				</Section>
			</div>

			{/* ========================================================= */}
			{/*  ABOUT GATEPASS                                           */}
			{/* ========================================================= */}
			<Section className="py-20 md:py-28" style={{ background: C.white }}>
				<div className="flex flex-col md:flex-row gap-8 md:gap-16">
					<div className="md:w-1/2">
						<SectionHeading className="!font-inter-regular text-primary text-center md:text-left">
							About <output className="font-inter-semibold">GatePass</output>
						</SectionHeading>
					</div>
					<div className="md:w-2/3 flex flex-col items-center md:items-start">
						<BodyText className="mb-6 text-center md:text-left">Gatepass transforms how access works bringing intelligence, speed, and real-time awareness into a single seamless system. No bottlenecks. No guesswork. Just total control.</BodyText>
						<Link href="/" className="inline-flex items-center gap-2 text-primary font-inter-medium hover:gap-3 transition-all">
							Explore More <img src={icons.rightLink} alt="" style={{ width: 25, height: 25, objectFit: 'contain' }} />
						</Link>
					</div>
				</div>
			</Section>

			{/* ========================================================= */}
			{/*  WHO WE ARE                                               */}
			{/* ========================================================= */}
			<div className="relative overflow-hidden" style={{ backgroundColor: C.dark }}>
				<img
					src={images.gatePassMobile}
					alt=""
					className="absolute object-cover"
					style={{ top: 120, left: 220 }}
				/>
				<Section className="py-20 md:py-28 relative z-10">
					<div className="max-w-3xl mx-auto text-center">
						<div className="p-7 bg-slate-100/10 rounded-2xl mb-5">
							<SectionHeading light className="mb-6">
								Who We Are
							</SectionHeading>
							<BodyText light className="mb-10">
								At GatePass, we are committed to redefining access management through cutting-edge AI technology. Our team of innovators, security experts, and developers work tirelessly to create solutions that prioritize safety, efficiency, and user experience. We believe that
								managing access should be seamless, intelligent, and empowering for all stakeholders.
							</BodyText>
						</div>
						<div className="flex flex-wrap justify-center gap-4 mb-12">
							<PillButton variant="outline">Our Mission</PillButton>
							<PillButton variant="outline">Our Vision</PillButton>
							<PillButton variant="outline">Our Approach</PillButton>
						</div>
					</div>
				</Section>
			</div>

			{/* ========================================================= */}
			{/*  EXPLORE SMART MANAGEMENT ACCESS                          */}
			{/* ========================================================= */}
			<Section className="py-20 md:py-28" style={{ background: C.body }}>
				<div className="text-center mb-20">
					<SectionHeading className="font-inter-regular text-3xl md:text-5xl text-primary">Explore Smart Management Access</SectionHeading>
				</div>

				{/* Feature 1 — AI-Powered Security Intelligence */}
				<div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-20">
					<div className="flex-1 order-2 md:order-1">
						<div className="flex items-center gap-2">
							<div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-teal">
								<span className="font-inter-semibold text-white">1</span>
							</div>
							<h3 className="text-2xl font-inter-semibold text-primary mb-4">AI-Powered Security Intelligence</h3>
						</div>
						<BodyText className="mb-6">
							GatePass leverages advanced AI to elevate access control beyond basic monitoring. By continuously analyzing entry patterns and behaviors, the system detects anomalies, flags suspicious activity, and adapts over time to improve accuracy. This intelligent layer ensures
							faster response, reduced human error, and a more proactive approach to security management.
						</BodyText>
						<RoundedButton onPress={open} icon={icons.rightLink} fill={true}>
							Stay Secured
						</RoundedButton>
					</div>
					<div className="flex flex-1 order-1 md:order-2 justify-end">
						<img src={images.screenshotOne} alt="AI-Powered Security" />
					</div>
				</div>

				{/* Feature 2 — Instant Broadcast Communication */}
				<div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-20">
					<div className="flex-1 flex justify-center">
						<img src={images.screenshotTwo} alt="Broadcast Communication" />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-teal">
								<span className="font-inter-semibold text-white">2</span>
							</div>
							<h3 className="text-2xl font-inter-semibold text-primary mb-4">Instant Broadcast Communication</h3>
						</div>
						<BodyText className="mb-6">
							Communicate with every resident or user in seconds. GatePass enables administrators to send real-time, one-click broadcast messages for announcements, emergencies, or important updates. It eliminates communication gaps, ensuring that everyone stays informed, aligned, and
							responsive when it matters most.
						</BodyText>
						<RoundedButton onPress={open} icon={icons.rightLink} fill={true}>
							Send instant Memo
						</RoundedButton>
					</div>
				</div>

				{/* Feature 3 — Smart Digital Logbook */}
				<div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
					<div className="flex-1 order-2 md:order-1">
						<div className="flex items-center gap-2">
							<div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-teal">
								<span className="font-inter-semibold text-white">3</span>
							</div>
							<h3 className="text-2xl font-inter-semibold text-primary mb-4">Smart Digital Logbook</h3>
						</div>
						<BodyText className="mb-6">
							Say goodbye to paper logbooks. GatePass keeps a clean, real-time record of all entries and exits in one place. Whether it&rsquo;s for an estate or a corporate space, you get clear visibility, easy tracking, and access to past records whenever you need them.
						</BodyText>
						<RoundedButton onPress={open} icon={icons.rightLink} fill={true}>
							Go Digital
						</RoundedButton>
					</div>
					<div className="flex flex-1 order-1 md:order-2 flex justify-end">
						<img src={images.screenshotThree} alt="Smart Digital Logbook" />
					</div>
				</div>
			</Section>

			{/* ========================================================= */}
			{/*  WHY CHOOSE US                                            */}
			{/* ========================================================= */}
			<Section className="py-20 md:py-36" style={{ background: C.dark }}>
				<div className="text-center mb-16">
					<SectionHeading light className="max-w-2xl mx-auto md:text-5xl font-inter-semibold">
						Why Choose Us For <output className="font-inter-light">Your Smart Access Management</output>
					</SectionHeading>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
					<WhyCard icon={1} title="AI-Native, Not Just Digital" desc="Most systems digitize logs. GatePass understands them detecting anomalies and risks automatically." className="md:col-span-7" />

					<WhyCard icon={2} title="Proactive Security" desc="We don't just record incidents we help prevent them." className="md:col-span-5" />

					<WhyCard icon={3} title="Intelligent Incident Summaries" desc="Instant, AI-generated summaries save hours of manual reporting." className="md:col-span-5" />

					<WhyCard icon={4} title="Seamless Integration" desc="From single estates to multi-location enterprises, GatePass scales effortlessly.Designed to fit into modern infrastructure and workflows without friction." className="md:col-span-7" />
				</div>
			</Section>

			{/* ========================================================= */}
			{/*  CTA RING                                                 */}
			{/* ========================================================= */}
			<Section className="py-24 md:py-60 overflow-hidden" style={{ background: C.dark }}>
				<div className="flex flex-col items-center justify-center text-center overflow-hidden relative">
					<h3 className="text-xl md:text-4xl font-inter-medium text-white z-[2] max-w-4xl leading-8">
						With GatePass, you don&apos;t just manage access you take control, stay secure,
						<output className="text-[#153866]">and move smarter in a system that evolves with you.</output>
					</h3>
					<img src={images.circleImage} alt="" className="mix-blend-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-0" />
				</div>
			</Section>
		</LandingLayout>
	);
}
