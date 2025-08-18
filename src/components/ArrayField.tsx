import React from 'react';
import { Plus, X } from 'lucide-react';

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  values,
  onChange,
  placeholder,
  required = false
}) => {
  const addItem = () => {
    onChange([...values, '']);
  };

  const updateItem = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-200">
        {label}
        {required && <span className="text-pink-400 ml-1">*</span>}
      </label>
      
      <div className="space-y-3">
        {values.map((value, index) => (
          <div key={index} className="flex items-center space-x-3 group">
            <input
              type="text"
              value={value}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 bg-gray-800/50 focus:bg-gray-700/50 text-gray-100 placeholder-gray-400 backdrop-blur-sm hover:border-gray-500/50"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 rounded-lg transition-all duration-300 group-hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={addItem}
        className="flex items-center space-x-2 px-4 py-3 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 group"
      >
        <Plus className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">Tambah Item</span>
      </button>
    </div>
  );
};