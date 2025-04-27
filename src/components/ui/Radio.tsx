import { InputHTMLAttributes, forwardRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="radio"
          ref={ref}
          className={`
            h-4 w-4 border-gray-300
            ${
              error
                ? "text-red-500 focus:ring-red-500"
                : "text-blue-500 focus:ring-blue-500"
            }
            focus:ring-2
            transition-colors
            ${className}
          `}
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm text-gray-700">{label}</label>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
