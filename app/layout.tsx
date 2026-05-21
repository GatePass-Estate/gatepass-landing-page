import type { Metadata } from 'next';
import { Inter, Ubuntu_Sans } from 'next/font/google';
import { ModalProvider } from '@/components/ModalContext';
import './globals.css';

const inter = Inter({
	variable: '--font-inter',
	weight: ['100', '300', '400', '500', '600', '700'],
	subsets: ['latin'],
});

const ubuntuSans = Ubuntu_Sans({
	variable: '--font-ubuntu-sans',
	weight: ['100', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'GatePass — Smarter Access. Safer Spaces.',
	description: 'AI-driven access automation and management platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${ubuntuSans.variable} antialiased`} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<ModalProvider>{children}</ModalProvider>
			</body>
		</html>
	);
}
