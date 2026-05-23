'use client';

import { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import Image from 'next/image';

interface ModalContextType {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return (
		<ModalContext.Provider value={{ isOpen, open, close }}>
			{children}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={close}>
					<div className="bg-white rounded-4xl p-8 max-w-lg w-full mx-4 border border-white/10 flex flex-col items-center text-center" onClick={(e) => e.stopPropagation()}>
						<h3 className="text-xl font-inter-semibold text-black mb-4">Get GatePass App</h3>
						<p className="text-black font-inter-medium mb-6">Download the app on your preferred platform.</p>
						<div className="flex gap-10 mb-6">
							<a href={process.env.NEXT_PUBLIC_APP_STORE_URL} target="_blank" rel="noopener noreferrer">
								<Image src="/icons/appstore.png" alt="Download on the App Store" width={235} height={140} className="h-14 w-auto" />
							</a>
							<a href={process.env.NEXT_PUBLIC_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
								<Image src="/icons/playstore.png" alt="Get it on Google Play" width={235} height={140} className="h-14 w-auto" />
							</a>
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	);
}

export function useModal(): ModalContextType {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
}
