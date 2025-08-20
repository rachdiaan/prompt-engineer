import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-8 border-t border-white/10">
      <div className="container-responsive">
        <div className="text-center">
          <p className="text-responsive-sm text-gray-400 flex items-center justify-center gap-2">
            © {currentYear}. Created with{' '}
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />{' '}
            by{' '}
            <span className="text-gradient font-semibold">Rachdian</span>
          </p>
        </div>
      </div>
    </footer>
  );
};