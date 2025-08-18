import React, { useState } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle, Settings, Zap } from 'lucide-react';
import { runOpenAI } from '../adapters/openai';
import { runGemini } from '../adapters/gemini';

interface AITestPanelProps {
  prompt: string;
  aiType: 'chatgpt' | 'gemini';
}

export const AITestPanel: React.FC<AITestPanelProps> = ({ prompt, aiType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [testMessage, setTestMessage] = useState('Buatkan artikel tentang AI dan masa depan teknologi');

  const handleTest = async () => {
    if (!prompt.trim()) {
      setError('Prompt tidak boleh kosong');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');

    try {
      let response: string;
      
      if (aiType === 'chatgpt') {
        response = await runOpenAI(testMessage);
      } else {
        response = await runGemini(testMessage);
      }
      
      setResult(response);
    } catch (err: any) {
      console.error('AI Test Error:', err);
      if (err.message?.includes('API key')) {
        setError(`API Key ${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} tidak ditemukan. Silakan set environment variable.`);
      } else {
        setError(`Error: ${err.message || 'Terjadi kesalahan saat menghubungi AI'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasApiKey = () => {
    if (aiType === 'chatgpt') {
      return !!import.meta.env.VITE_OPENAI_API_KEY;
    } else {
      return !!import.meta.env.VITE_GEMINI_API_KEY;
    }
  };

  return (
    <div className="glass-card rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden neon-glow-pink">
      <div className="px-6 py-5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-gray-100">Test AI Response</h3>
          </div>
          <button
            onClick={() => setShowApiSettings(!showApiSettings)}
            className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showApiSettings && (
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-b border-yellow-500/20 backdrop-blur-sm">
          <div className="text-sm text-yellow-200">
            <p className="font-medium mb-3 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Setup API Keys:</span>
            </p>
            <div className="space-y-2 text-xs bg-gray-900/30 p-3 rounded-lg border border-gray-700/30">
              <p>• OpenAI: Set <code className="bg-yellow-900/30 px-2 py-1 rounded text-yellow-300 border border-yellow-600/30">VITE_OPENAI_API_KEY</code> in .env</p>
              <p>• Gemini: Set <code className="bg-yellow-900/30 px-2 py-1 rounded text-yellow-300 border border-yellow-600/30">VITE_GEMINI_API_KEY</code> in .env</p>
            </div>
            <div className="mt-3 flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${hasApiKey() ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'} animate-pulse`}></div>
              <span className="text-xs font-medium">
                {hasApiKey() ? `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API Key: Connected` : `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API Key: Not Found`}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            Test Message
          </label>
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Masukkan pesan untuk test prompt..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400/50 transition-all duration-300 bg-gray-800/50 focus:bg-gray-700/50 text-gray-100 placeholder-gray-400 backdrop-blur-sm hover:border-gray-500/50"
          />
        </div>

        <button
          onClick={handleTest}
          disabled={isLoading || !prompt.trim() || !hasApiKey()}
          className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
            isLoading || !prompt.trim() || !hasApiKey()
              ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
              : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg hover:shadow-xl neon-glow-pink border border-pink-500/30 hover:scale-105'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Testing with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Test with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}</span>
            </>
          )}
        </button>

        {error && (
          <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-300">
              <p className="font-medium text-red-200">Error</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-300">
                Response from {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
              </span>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-5 max-h-96 overflow-y-auto border border-gray-700/30 backdrop-blur-sm">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};