import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children
}) => {
  return (
    <div className="glass-card rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-2xl hover:border-purple-500/30 group">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-purple-900/30 hover:to-pink-900/30 transition-all duration-300 group-hover:backdrop-blur-xl"
      >
        <div className="flex items-center space-x-4">
          <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        <div className="text-gray-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 py-6 border-t border-gray-700/30 bg-gray-800/20">
          {children}
        </div>
      )}
    </div>
  );
};