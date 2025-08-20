import React, { useId } from 'react';
import { Check } from 'lucide-react';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  description
}) => {
  const id = useId();

  return (
    <div className="flex items-start space-x-3 group">
      <button
        type="button"
        id={id}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 focus-ring ${
          checked
            ? 'glass-button text-white'
            : 'glass-input hover:border-purple-400/50'
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <Check className="w-3 h-3" />}
      </button>
      <div className="space-y-1 flex-1">
        <label 
          htmlFor={id}
          className="text-responsive-sm font-medium text-gray-200 cursor-pointer group-hover:text-white transition-colors duration-200" 
          onClick={() => onChange(!checked)}
        >
          {label}
        </label>
        {description && (
          <p className="text-responsive-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};