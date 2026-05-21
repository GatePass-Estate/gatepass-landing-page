'use client';

import { createContext, ReactNode, useContext, useState, useCallback } from 'react';

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
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
					onClick={close}
				>
					<div
						className="bg-[#0F1D32] rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10"
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className="text-xl font-inter-semibold text-white mb-4">Get the App</h3>
						<p className="text-white/70 font-ubuntu-light">QR code placeholder</p>
						<div className="mt-6 flex justify-end">
							<button
								onClick={close}
								className="rounded-xl px-4 py-2 bg-accent text-primary font-inter-medium"
							>
								Close
							</button>
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
