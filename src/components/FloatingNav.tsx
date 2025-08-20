import React from 'react';
import { Home, BookOpen, X } from 'lucide-react';

interface FloatingNavProps {
  currentPage: 'home' | 'docs';
  onNavigate: (page: 'home' | 'docs') => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <div className="floating-nav">
      <div className="glass-ultra rounded-full p-2 shadow-lg">
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`p-3 rounded-full transition-all duration-200 focus-ring ${
              currentPage === 'home'
                ? 'glass-button text-white'
                : 'text-gray-400 hover:text-white hover:glass-card'
            }`}
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className={`p-3 rounded-full transition-all duration-200 focus-ring ${
              currentPage === 'docs'
                ? 'glass-button text-white'
                : 'text-gray-400 hover:text-white hover:glass-card'
            }`}
            aria-label="Documentation"
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};