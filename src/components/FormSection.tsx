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
    <div className="glass-ultra rounded-2xl shadow-depth overflow-hidden transition-all duration-500 hover:shadow-glow group animate-shimmer">
      <button
        onClick={onToggle}
        className="w-full px-responsive py-4 sm:py-5 flex items-center justify-between bg-gradient-to-r from-gray-800/30 to-gray-700/30 hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300 group-hover:backdrop-blur-xl focus-ring"
        aria-expanded={isExpanded}
        aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 p-2 glass-card rounded-lg">
            {icon}
          </div>
          <h3 className="text-responsive-lg font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        <div className="text-gray-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 p-2 glass-card rounded-lg">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div 
          id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-responsive py-responsive border-t border-white/5 bg-gray-800/10 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300"
        >
          {children}
        </div>
      )}
    </div>
  );
};