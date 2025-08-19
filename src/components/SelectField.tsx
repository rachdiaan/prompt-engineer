import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  required = false
}) => {
  const id = useId();

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block text-responsive-sm font-medium text-gray-200">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 sm:px-5 sm:py-4 glass-input rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 text-gray-100 hover:border-gray-500/50 appearance-none cursor-pointer focus-ring"
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};