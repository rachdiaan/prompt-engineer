import React, { useState, useCallback } from 'react';
import { Copy, Download, Check, Code, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { PEG_COMPACT_SYSTEM } from '../types/peg';

interface PromptPreviewProps {
  prompt: string;
  aiType: 'chatgpt' | 'gemini';
  onAiTypeChange: (type: 'chatgpt' | 'gemini') => void;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  prompt,
  aiType,
  onAiTypeChange
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'natural' | 'compact'>('natural');

  const handleCopy = useCallback(async () => {
    const textToCopy = viewMode === 'natural' ? prompt : PEG_COMPACT_SYSTEM;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [prompt, viewMode]);

  const handleDownload = useCallback(() => {
    const textToDownload = viewMode === 'natural' ? prompt : PEG_COMPACT_SYSTEM;
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${viewMode}-${aiType}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [prompt, viewMode, aiType]);

  const openInAI = useCallback(() => {
    const textToOpen = viewMode === 'natural' ? prompt : PEG_COMPACT_SYSTEM;
    const encodedPrompt = encodeURIComponent(textToOpen);
    
    if (aiType === 'chatgpt') {
      window.open(`https://chat.openai.com/?q=${encodedPrompt}`, '_blank');
    } else {
      window.open(`https://gemini.google.com/app?q=${encodedPrompt}`, '_blank');
    }
  }, [prompt, viewMode, aiType]);

  return (
    <div className="glass-ultra rounded-2xl shadow-depth overflow-hidden shadow-glow animate-shimmer">
      <div className="px-responsive py-4 sm:py-5 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-b border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-card rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-responsive-lg font-semibold text-gray-100">Preview Prompt</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex glass-card rounded-lg p-1 border border-white/5 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('natural')}
                className={`px-3 py-2 rounded-md text-responsive-xs font-medium transition-all duration-300 flex items-center space-x-2 flex-1 sm:flex-none justify-center ${
                  viewMode === 'natural'
                    ? 'glass-button text-white shadow-glow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Natural</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 rounded-md text-responsive-xs font-medium transition-all duration-300 flex items-center space-x-2 flex-1 sm:flex-none justify-center ${
                  viewMode === 'compact'
                    ? 'glass-button text-white shadow-glow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Compact</span>
              </button>
            </div>
            
            {/* AI Type Toggle */}
            <div className="flex glass-card rounded-lg p-1 border border-white/5 w-full sm:w-auto">
              <button
                onClick={() => onAiTypeChange('chatgpt')}
                className={`px-3 py-2 rounded-md text-responsive-xs font-medium transition-all duration-300 flex-1 sm:flex-none ${
                  aiType === 'chatgpt'
                    ? 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white shadow-glow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                ChatGPT
              </button>
              <button
                onClick={() => onAiTypeChange('gemini')}
                className={`px-3 py-2 rounded-md text-responsive-xs font-medium transition-all duration-300 flex-1 sm:flex-none ${
                  aiType === 'gemini'
                    ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-glow'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Gemini
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-responsive">
        <div className="glass-input rounded-xl p-4 sm:p-5 mb-6 max-h-64 sm:max-h-96 overflow-y-auto border border-white/5">
          <pre className="text-responsive-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
            {viewMode === 'natural' 
              ? (prompt || 'Prompt akan muncul di sini setelah form diisi...') 
              : PEG_COMPACT_SYSTEM
            }
          </pre>
        </div>
        
        {viewMode === 'compact' && (
          <div className="mb-6 p-4 glass-card border border-blue-500/20 rounded-xl">
            <p className="text-blue-300 text-responsive-xs leading-relaxed">
              💡 <strong className="text-blue-200">Compact System Prompt:</strong> Gunakan ini sebagai system prompt untuk membuat AI menjadi Prompt Engineer Generator yang interaktif.
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            disabled={viewMode === 'natural' && !prompt}
            className={`flex items-center justify-center space-x-2 px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-medium transition-all duration-300 flex-1 sm:flex-none focus-ring ${
              (viewMode === 'natural' && !prompt)
                ? 'glass-input text-gray-500 cursor-not-allowed'
                : copied
                ? 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white shadow-glow border border-green-500/30'
                : 'glass-button text-white shadow-glow interactive'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-responsive-sm">{copied ? 'Tersalin!' : 'Salin'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            disabled={viewMode === 'natural' && !prompt}
            className={`flex items-center justify-center space-x-2 px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-medium transition-all duration-300 flex-1 sm:flex-none focus-ring ${
              (viewMode === 'natural' && !prompt)
                ? 'glass-input text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white hover:from-indigo-500/80 hover:to-purple-500/80 shadow-glow border border-indigo-500/30 interactive'
            }`}
          >
            <Download className="w-4 h-4" />
            <span className="text-responsive-sm">Download</span>
          </button>
          
          <button
            onClick={openInAI}
            disabled={viewMode === 'natural' && !prompt}
            className={`flex items-center justify-center space-x-2 px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-medium transition-all duration-300 flex-1 sm:flex-none focus-ring ${
              (viewMode === 'natural' && !prompt)
                ? 'glass-input text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600/80 to-purple-600/80 text-white hover:from-pink-500/80 hover:to-purple-500/80 shadow-glow-pink border border-pink-500/30 interactive'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-responsive-sm hidden sm:inline">Buka di {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}</span>
            <span className="text-responsive-sm sm:hidden">Buka</span>
          </button>
        </div>
      </div>
    </div>
  );
};