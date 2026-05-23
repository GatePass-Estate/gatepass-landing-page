'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoundedButton } from './HomeComponents';
import { useModal } from './ModalContext';
import images from '@/lib/images';
import icons from '@/lib/icons';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                       */
/* ------------------------------------------------------------------ */
export const LP = {
	dark: '#04162D',
	darkLighter: '#0F1D32',
	accent: '#CEE5ED',
	accentSoft: 'rgba(0, 180, 216, 0.15)',
	accentBorder: 'rgba(0, 180, 216, 0.30)',
	white: '#FFFFFF',
	muted: '#9CA3AF',
	body: '#F8FAFC',
	cardBg: 'rgba(255, 255, 255, 0.03)',
	cardBorder: 'rgba(255, 255, 255, 0.06)',
} as const;

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */
const Navbar = () => {
	const pathname = usePathname();
	const { open } = useModal();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const links = [
		{ label: 'Home', path: '/' },
		{ label: 'About', path: '/about' },
		{ label: 'Contact', path: '/contact' },
	];
	const allLinks = [...links, { label: 'Terms of Use', path: '/terms' }, { label: 'Privacy Policy', path: '/privacy' }];

	return (
		<nav className="w-full z-50 relative" style={{ background: LP.dark }}>
			<div className="max-w-7xl mx-auto px-6 md:px-12 py-2 md:py-4 flex items-center justify-between">
				<Link href="/">
					<img src={images.gatepassWhiteLogo} alt="GatePass" className="-ml-6 cursor-pointer object-contain" style={{ width: 180, height: 'auto' }} />
				</Link>

				<div className="hidden md:flex items-center gap-8">
					{links.map((link) => {
						const isActive = pathname === link.path;
						return (
							<Link key={link.path} href={link.path} className={`font-inter-medium text-sm transition-colors relative pb-1 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}>
								{link.label}
								{isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: LP.accent }} />}
							</Link>
						);
					})}
				</div>

				<RoundedButton className="hidden md:flex" onPress={open} icon={icons.rightLink}>
					Go to App
				</RoundedButton>

				{/* Mobile hamburger */}
				<button onClick={() => setIsMenuOpen(true)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
					<span className="w-6 h-0.5 bg-white rounded-full" />
					<span className="w-6 h-0.5 bg-white rounded-full" />
					<span className="w-6 h-0.5 bg-white rounded-full" />
				</button>
			</div>

			{/* Mobile menu overlay */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-60 bg-[#04162D] flex flex-col items-center justify-center gap-8">
					<button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-6 text-white text-4xl leading-none" aria-label="Close menu">
						&times;
					</button>
					{links.map((link) => {
						const isActive = pathname === link.path;
						return (
							<Link key={link.path} href={link.path} onClick={() => setIsMenuOpen(false)} className={`text-2xl font-inter-medium transition-colors ${isActive ? 'text-white' : 'text-white/60'}`}>
								{link.label}
							</Link>
						);
					})}
					<RoundedButton
						onPress={() => {
							setIsMenuOpen(false);
							open();
						}}
						icon={icons.rightLink}
					>
						Go to App
					</RoundedButton>
				</div>
			)}
		</nav>
	);
};

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */
const Footer = () => {
	const { open } = useModal();
	return (
		<footer className="w-full py-12" style={{ background: LP.dark }}>
			<div className="max-w-360 mx-auto px-6 md:px-12">
				{/* Top row: Logo + nav */}
				<div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
					<Link href="/">
						<img src={images.gatepassWhiteLogo} alt="GatePass" className="cursor-pointer object-contain" style={{ width: 250, height: 'auto' }} />
					</Link>

					{/* Desktop nav links inline */}
					<div className="hidden md:flex flex-wrap justify-center gap-x-8 gap-y-3">
						{[
							{ label: 'Home', path: '/' },
							{ label: 'About Us', path: '/about' },
							{ label: 'Contact', path: '/contact' },
						].map((l) => (
							<Link key={l.path} href={l.path} className="text-white hover:text-white text-sm font-inter-medium transition-colors">
								{l.label}
							</Link>
						))}
					</div>

					{/* Mobile nav links in 2 columns */}
					<div className="flex md:hidden w-full justify-around gap-8 mb-10">
						<div className="flex flex-col gap-5 text-left">
							<Link href="/" className="text-white text-base font-inter-light transition-colors text-left">
								Home
							</Link>
							<Link href="/about" className="text-white text-base font-inter-light transition-colors text-left">
								About Us
							</Link>
							<Link href="/contact" className="text-white text-base font-inter-light transition-colors text-left">
								Contact
							</Link>
						</div>
						<div className="flex flex-col gap-5 text-left">
							<Link href="/terms" className="text-white text-base font-inter-light transition-colors text-left">
								Terms of Use
							</Link>
							<Link href="/privacy" className="text-white text-base font-inter-light transition-colors text-left">
								Privacy Policy
							</Link>
							<button onClick={open} className="text-white text-base font-inter-light transition-colors text-left bg-transparent border-none cursor-pointer">
								Download APP
							</button>
						</div>
					</div>
				</div>

				{/* Bottom row: copyright + legal + social */}
				<div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6 md:border-t border-white">
					<p className="text-white text-sm font-inter-regular hidden md:block">&copy; 2026 GatePass. All rights reserved.</p>

					<div className="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
						<Link href="/terms" className="text-white hover:text-white text-sm font-inter-medium transition-colors">
							Terms of Use
						</Link>
						<Link href="/privacy" className="text-white hover:text-white text-sm font-inter-medium transition-colors">
							Privacy Policy
						</Link>
						<button onClick={open} className="text-white hover:text-white text-sm font-inter-medium transition-colors bg-transparent border-none cursor-pointer">
							Download APP
						</button>
						<div className="flex items-center gap-3 ml-2">
							{[
								{ icon: icons.linkedIn, label: 'LinkedIn' },
								{ icon: icons.emailIcon, label: 'Email' },
								{ icon: icons.xIcon, label: 'Twitter' },
								{ icon: icons.instagram, label: 'Instagram' },
							].map((s) => (
								<button key={s.label} className="w-9 h-9 rounded-full flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all">
									<img src={s.icon} alt={s.label} className="w-6 h-6 object-contain cursor-pointer" />
								</button>
							))}
						</div>
					</div>

					{/* Mobile: social icons and copyright centered */}
					<div className="flex md:hidden flex-col items-center gap-4 w-full">
						<div className="flex items-center justify-center gap-3 border-b border-white w-full pb-6 mb-2">
							{[
								{ icon: icons.linkedIn, label: 'LinkedIn' },
								{ icon: icons.emailIcon, label: 'Email' },
								{ icon: icons.xIcon, label: 'Twitter' },
								{ icon: icons.instagram, label: 'Instagram' },
							].map((s) => (
								<button key={s.label} className="w-9 h-9 rounded-full flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all">
									<img src={s.icon} alt={s.label} className="w-6 h-6 object-contain cursor-pointer" />
								</button>
							))}
						</div>
						<p className="text-white text-xs font-inter-light">&copy; 2026 GatePass. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

/* ------------------------------------------------------------------ */
/*  Layout wrapper                                                      */
/* ------------------------------------------------------------------ */
export default function LandingLayout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: LP.dark }}>
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
