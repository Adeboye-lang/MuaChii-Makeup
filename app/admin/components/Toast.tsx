"use client";

import { ReactNode, useState, createContext, useContext } from "react";
import { AlertCircle, Check, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = "info", duration: number = 3000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-4 rounded-xl backdrop-blur-xl border flex items-start gap-3 animate-slide-in ${
            t.type === "success"
              ? "bg-green-50/80 border-green-200"
              : t.type === "error"
              ? "bg-red-50/80 border-red-200"
              : "bg-blue-50/80 border-blue-200"
          }`}
        >
          {t.type === "success" && <Check size={20} className="text-green-600 shrink-0 mt-0.5" />}
          {t.type === "error" && <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />}
          {t.type === "info" && <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />}
          <p
            className={`text-sm font-medium flex-1 ${
              t.type === "success"
                ? "text-green-700"
                : t.type === "error"
                ? "text-red-700"
                : "text-blue-700"
            }`}
          >
            {t.message}
          </p>
          <button
            onClick={() => onRemove(t.id)}
            className="text-brand-espresso/40 hover:text-brand-espresso transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
