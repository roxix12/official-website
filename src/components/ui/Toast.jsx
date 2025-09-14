import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback((options) => {
    setToast({ id: Date.now(), duration: 3000, ...options });
    setTimeout(() => setToast(null), options?.duration || 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast ? (
        <div className="fixed top-16 right-4 z-[100] animate-in fade-in-0 slide-in-from-top-2">
          <div className={`min-w-[260px] max-w-sm rounded-xl border p-4 shadow-xl backdrop-blur bg-black/80 ${toast.type === 'success' ? 'border-green-500/40' : toast.type === 'error' ? 'border-red-500/40' : 'border-white/20'}`}>
            <div className="font-semibold mb-1">{toast.title || (toast.type === 'success' ? 'Success' : 'Notice')}</div>
            {toast.message ? <div className="text-sm text-gray-300">{toast.message}</div> : null}
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}


