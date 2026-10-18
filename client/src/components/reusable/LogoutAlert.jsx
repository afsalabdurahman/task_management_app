import React, { useEffect, useRef } from 'react';

export const LogoutModal = ({
    isOpen,
    onCancel,      // No button
    onConfirm,     // Yes button
    isLoading = false,
}) => {
    const noBtnRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        // Focus the safer option (No)
        noBtnRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && !isLoading) {
                onCancel();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, isLoading, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
            onClick={(e) => {
                if (e.target === e.currentTarget && !isLoading) onCancel();
            }}
        >
            {/* Popup Card */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden"
            >
                {/* Content */}
                <div className="px-6 pt-6 pb-2 text-center">
                    <h2
                        id="logout-title"
                        className="text-lg font-semibold text-slate-800"
                    >
                        Sign Out?
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Are you sure you want to sign out?
                    </p>
                </div>

                {/* Yes / No Buttons */}
                <div className="flex border-t border-slate-200 mt-4">
                    {/* No Button */}
                    <button
                        ref={noBtnRef}
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 py-3.5 text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none focus:bg-slate-50 disabled:opacity-50 transition-colors"
                    >
                        No
                    </button>

                    {/* Divider */}
                    <div className="w-px bg-slate-200" />

                    {/* Yes Button */}
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 disabled:opacity-50 transition-colors"
                    >
                        {isLoading ? 'Signing out...' : 'Yes'}
                    </button>
                </div>
            </div>
        </div>
    );
}