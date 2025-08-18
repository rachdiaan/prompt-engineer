import React from 'react';

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
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 bg-gray-800/50 focus:bg-gray-700/50 text-gray-100 backdrop-blur-sm hover:border-gray-500/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};