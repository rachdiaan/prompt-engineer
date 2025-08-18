import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false
}) => {
  const inputClasses = "w-full px-4 py-3 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 bg-gray-800/50 focus:bg-gray-700/50 text-gray-100 placeholder-gray-400 backdrop-blur-sm hover:border-gray-500/50";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={inputClasses}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
};