import React, { useState } from 'react';
import { Copy, Download, Check, Code, FileText, Sparkles } from 'lucide-react';
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

  const handleCopy = async () => {
    const textToCopy = viewMode === 'natural' ? prompt : PEG_COMPACT_SYSTEM;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
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
  };

  return (
    <div className="glass-card rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden neon-glow">
      <div className="px-6 py-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-100">Preview Prompt</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-600/30">
              <button
                onClick={() => setViewMode('natural')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  viewMode === 'natural'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg neon-glow'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Natural</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  viewMode === 'compact'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg neon-glow'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Compact</span>
              </button>
            </div>
            <div className="flex bg-gray-800/50 rounded-lg p-1 border border-gray-600/30">
              <button
                onClick={() => onAiTypeChange('chatgpt')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  aiType === 'chatgpt'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                ChatGPT
              </button>
              <button
                onClick={() => onAiTypeChange('gemini')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  aiType === 'gemini'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                Gemini
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gray-900/50 rounded-xl p-5 mb-6 max-h-96 overflow-y-auto border border-gray-700/30 backdrop-blur-sm">
          <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
            {viewMode === 'natural' 
              ? (prompt || 'Prompt akan muncul di sini setelah form diisi...') 
              : PEG_COMPACT_SYSTEM
            }
          </pre>
        </div>
        
        {viewMode === 'compact' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-blue-300 text-sm leading-relaxed">
              💡 <strong className="text-blue-200">Compact System Prompt:</strong> Gunakan ini sebagai system prompt untuk membuat AI menjadi Prompt Engineer Generator yang interaktif.
            </p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            onClick={handleCopy}
            disabled={viewMode === 'natural' && !prompt}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              (viewMode === 'natural' && !prompt)
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
                : copied
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg neon-glow border border-green-500/30'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-xl neon-glow border border-purple-500/30'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            disabled={viewMode === 'natural' && !prompt}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              (viewMode === 'natural' && !prompt)
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl border border-indigo-500/30'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};