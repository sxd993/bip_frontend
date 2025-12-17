import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ 
    isOpen, 
    onClose, 
    children, 
    title, 
    size = "md", 
    showCloseButton = true,
    // Закрытие только по крестику: отключаем кликом по оверлею и ESC
    closeOnOverlayClick = false,
    closeOnEscape = false,
    className = ""
}) => {
    // Размеры модального окна
    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-xl", 
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-7xl"
    };

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        if (!closeOnEscape) {
            return () => {
                document.body.style.overflow = 'unset';
            };
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closeOnEscape, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
            onMouseDown={(e) => {
                if (!closeOnOverlayClick) return;
                if (e.target === e.currentTarget) {
                    onClose?.();
                }
            }}
        >
            <div className={`relative w-full ${sizeClasses[size]} mx-4 md:mx-0 bg-white rounded-3xl max-h-[95vh] overflow-y-auto animate-fadeIn shadow-2xl ${className}`}>
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b-2 border-red-100">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
                        {showCloseButton && (
                            <button
                                className="text-red-400 hover:text-red-600 text-2xl font-bold transition-colors duration-200 focus:outline-none rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-50"
                                onClick={onClose}
                                aria-label="Закрыть модальное окно"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}
                <div className="text-gray-700">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
