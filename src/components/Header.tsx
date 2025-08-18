import React from 'react';
import { Bot, Sparkles, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white shadow-2xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative container mx-auto px-6 py-12">
        <div className="flex items-center justify-center space-x-6">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative flex items-center justify-center">
              <Bot className="w-16 h-16 text-purple-400 animate-glow" />
              <Sparkles className="w-8 h-8 text-pink-400 absolute -top-2 -right-2 animate-pulse" />
              <Zap className="w-6 h-6 text-yellow-400 absolute -bottom-1 -left-1 animate-bounce" />
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent text-shadow-glow">
              Prompt Engineer Generator
            </h1>
            <p className="text-gray-300 text-xl font-medium">
              Buat prompt yang <span className="text-purple-400 font-semibold">powerful</span> untuk{' '}
              <span className="text-pink-400 font-semibold">ChatGPT</span> &{' '}
              <span className="text-purple-400 font-semibold">Gemini AI</span>
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Advanced AI Prompt Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};