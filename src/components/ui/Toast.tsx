import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: ToastType;
  duration?: number;
}

const Toast = ({
  isOpen,
  onClose,
  message,
  type = "info",
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    let timer: number; // تغییر این خطا - استفاده از number به جای NodeJS.Timeout

    if (isOpen && duration) {
      timer = window.setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [isOpen, duration, onClose]);

  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
    error: <XCircleIcon className="w-6 h-6 text-red-500" />,
    info: <InformationCircleIcon className="w-6 h-6 text-blue-500" />,
    warning: <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />,
  };

  const colors: Record<ToastType, string> = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50"
          role="alert"
          aria-live="assertive"
        >
          <div
            className={`flex items-center p-4 rounded-lg border ${colors[type]} shadow-lg max-w-xs sm:max-w-sm`}
          >
            <div className="flex-shrink-0">{icons[type]}</div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={onClose}
                  className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  aria-label="Close"
                >
                  <span className="sr-only">بستن</span>
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
