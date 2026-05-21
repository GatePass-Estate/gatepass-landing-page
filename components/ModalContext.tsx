'use client';

import { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';

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
						<p className="text-black font-inter-medium mb-6">Scan the QR cod to download App on your device.</p>
						<div className="p-4 bg-white rounded-xl mb-6">
							<QRCodeSVG value="https://app.gatepassng.com" size={200} bgColor="#ffffff" fgColor="#051821" level="M" includeMargin={false} />
						</div>
						<p className="text-sm text-black font-inter-medium mb-6">Also available for download at Appstore and Playstore</p>
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
