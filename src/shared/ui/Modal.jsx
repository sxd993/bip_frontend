import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ isOpen, onClose, children, title }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-300" onClick={handleOverlayClick}>
            <div className="relative w-full max-w-lg mx-4 md:mx-0 bg-white border-2 border-gray-100 rounded-3xl animate-fadeIn">
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        className="text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors duration-200 focus:outline-none rounded-full p-1"
                        onClick={onClose}
                        aria-label="Закрыть модальное окно"
                    >
                        ×
                    </button>
                </div>
                <div className="px-6 py-5 text-gray-700">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};