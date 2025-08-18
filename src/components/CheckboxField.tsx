import React from 'react';
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
  return (
    <div className="flex items-start space-x-3 group">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
          checked
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg neon-glow'
            : 'border-gray-600 hover:border-purple-400 bg-gray-800/50 hover:bg-gray-700/50'
        }`}
      >
        {checked && <Check className="w-3 h-3" />}
      </button>
      <div className="space-y-1">
        <label 
          className="text-sm font-medium text-gray-200 cursor-pointer group-hover:text-white transition-colors duration-300" 
          onClick={() => onChange(!checked)}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};