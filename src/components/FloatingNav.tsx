import React from 'react';
import { Home, BookOpen, Sparkles } from 'lucide-react';

interface FloatingNavProps {
  currentPage: 'home' | 'docs';
  onNavigate: (page: 'home' | 'docs') => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <>
      {/* Desktop Floating Nav */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="glass-ultra rounded-2xl p-2 shadow-2xl border border-white/10">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`group relative p-3 rounded-xl transition-all duration-300 focus-ring ${
                currentPage === 'home'
                  ? 'glass-button text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:glass-card'
              }`}
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Beranda
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('docs')}
              className={`group relative p-3 rounded-xl transition-all duration-300 focus-ring ${
                currentPage === 'docs'
                  ? 'glass-button text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:glass-card'
              }`}
              aria-label="Documentation"
            >
              <BookOpen className="w-5 h-5" />
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Dokumentasi
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="glass-ultra rounded-2xl p-2 shadow-2xl border border-white/10">
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 focus-ring ${
                currentPage === 'home'
                  ? 'glass-button text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:glass-card'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Beranda</span>
            </button>
            
            <button
              onClick={() => onNavigate('docs')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 focus-ring ${
                currentPage === 'docs'
                  ? 'glass-button text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:glass-card'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Docs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Indicator */}
      <div className="fixed top-4 right-4 z-40 hidden lg:block">
        <div className="glass-card rounded-full p-2 border border-purple-500/20">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        </div>
      </div>
    </>
  );
};