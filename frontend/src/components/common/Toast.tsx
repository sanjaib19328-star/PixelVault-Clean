import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 font-mono text-xs max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles = {
    success: 'border-[#C8FF00]/40 bg-[#0F172A] text-white shadow-[0_0_15px_rgba(200,255,0,0.15)]',
    error: 'border-[#FF5C35]/40 bg-[#0F172A] text-white shadow-[0_0_15px_rgba(255,92,53,0.15)]',
    info: 'border-[#00E5FF]/40 bg-[#0F172A] text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]',
  };

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-[#C8FF00] shrink-0" />,
    error: <AlertTriangle className="h-4 w-4 text-[#FF5C35] shrink-0" />,
    info: <Info className="h-4 w-4 text-[#00E5FF] shrink-0" />,
  };

  return (
    <div className={`flex items-center justify-between rounded-lg border p-3 ${styles[toast.type]}`}>
      <div className="flex items-center gap-2.5">
        {icons[toast.type]}
        <span className="font-semibold">{toast.text}</span>
      </div>
      <button onClick={() => onDismiss(toast.id)} className="text-slate-400 hover:text-white ml-2">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
