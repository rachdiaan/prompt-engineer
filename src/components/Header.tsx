import React from 'react';
import { Bot, Sparkles, Zap, Code2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-gray-900/90"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Glass Header Container */}
      <div className="relative glass-ultra border-b border-white/10">
        <div className="container mx-auto px-responsive py-responsive">
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            {/* Logo Section */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-all duration-500 animate-pulse-glow"></div>
              <div className="relative flex items-center justify-center p-4 glass-card rounded-2xl interactive">
                <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-breathe" />
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 absolute -top-2 -right-2 animate-pulse" />
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 absolute -bottom-1 -left-1 animate-bounce" />
                <Code2 className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20" />
              </div>
            </div>
            
            {/* Title Section */}
            <div className="text-center space-y-3 sm:space-y-4 max-w-4xl">
              <h1 className="text-responsive-2xl font-bold text-gradient leading-tight tracking-tight">
                Prompt Engineer Generator
              </h1>
              <p className="text-responsive-base text-gradient-subtle font-medium leading-relaxed">
                Buat prompt yang <span className="text-purple-400 font-semibold">powerful</span> untuk{' '}
                <span className="text-pink-400 font-semibold">ChatGPT</span> &{' '}
                <span className="text-cyan-400 font-semibold">Gemini AI</span>
              </p>
              
              {/* Status Indicator */}
              <div className="flex items-center justify-center space-x-3 text-responsive-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow"></div>
                  <span className="hidden sm:inline">Advanced AI Prompt Engineering</span>
                  <span className="sm:hidden">AI Prompt Engineering</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-glow"></div>
                  <span>Real-time Testing</span>
                </div>
              </div>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-2xl">
              {[
                { icon: Bot, text: 'AI Powered', color: 'purple' },
                { icon: Sparkles, text: 'Smart Templates', color: 'pink' },
                { icon: Code2, text: 'Export Ready', color: 'cyan' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 glass-card rounded-full text-responsive-xs font-medium interactive"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className={`w-3 h-3 sm:w-4 sm:h-4 text-${feature.color}-400`} />
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};