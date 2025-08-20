import React, { useState, useCallback } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle, Settings, Zap, Eye, EyeOff } from 'lucide-react';
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
  const [maxTokens, setMaxTokens] = useState<number>(1000);
  const [temperature, setTemperature] = useState<number>(0.7);

  const handleTest = useCallback(async () => {
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
        response = await runOpenAI(testMessage, 'gpt-4', maxTokens, temperature);
      } else {
        response = await runGemini(testMessage, 'gemini-1.5-pro', maxTokens, temperature);
      }
      
      setResult(response);
    } catch (err: any) {
      console.error('AI Test Error:', err);
      if (err.message?.includes('API key')) {
        setError(`API Key ${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} tidak ditemukan. Silakan set environment variable.`);
      } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
        setError('Quota API habis atau rate limit terlampaui. Coba lagi nanti.');
      } else {
        setError(`Error: ${err.message || 'Terjadi kesalahan saat menghubungi AI'}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, testMessage, aiType, maxTokens, temperature]);

  const hasApiKey = useCallback(() => {
    if (aiType === 'chatgpt') {
      return !!import.meta.env.VITE_OPENAI_API_KEY;
    } else {
      return !!import.meta.env.VITE_GEMINI_API_KEY;
    }
  }, [aiType]);

  return (
    <div className="glass-ultra rounded-2xl shadow-lg overflow-hidden">
      <div className="px-responsive py-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-card rounded-lg">
              <Zap className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-responsive-lg font-semibold text-gray-100">Test AI Response</h3>
          </div>
          <button
            onClick={() => setShowApiSettings(!showApiSettings)}
            className="p-2 text-gray-400 hover:text-gray-200 glass-card hover:glass-button rounded-lg transition-all duration-200 interactive focus-ring"
            aria-label="Toggle API settings"
          >
            {showApiSettings ? <EyeOff className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {showApiSettings && (
        <div className="px-responsive py-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-b border-yellow-500/20">
          <div className="text-responsive-sm text-yellow-200">
            <p className="font-medium mb-3 flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>API Configuration:</span>
            </p>
            
            {/* Token and Temperature Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium mb-2">Max Tokens</label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                  min="100"
                  max="4000"
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm focus-ring"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2">Temperature</label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  min="0"
                  max="2"
                  step="0.1"
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm focus-ring"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs glass-input p-3 rounded-lg border border-yellow-600/30">
              <p>• OpenAI: Set <code className="bg-yellow-900/30 px-2 py-1 rounded text-yellow-300 border border-yellow-600/30">VITE_OPENAI_API_KEY</code> in .env</p>
              <p>• Gemini: Set <code className="bg-yellow-900/30 px-2 py-1 rounded text-yellow-300 border border-yellow-600/30">VITE_GEMINI_API_KEY</code> in .env</p>
            </div>
            <div className="mt-3 flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${hasApiKey() ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-xs font-medium">
                {hasApiKey() ? `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API Key: Connected` : `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API Key: Not Found`}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="p-responsive space-y-4">
        <div>
          <label className="block text-responsive-sm font-medium text-gray-200 mb-3">
            Test Message
          </label>
          <textarea
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Masukkan pesan untuk test prompt..."
            rows={3}
            className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400/50 transition-all duration-200 text-gray-100 placeholder-gray-400 hover:border-gray-500/50 resize-none focus-ring"
          />
        </div>

        <button
          onClick={handleTest}
          disabled={isLoading || !prompt.trim() || !hasApiKey()}
          className={`w-full flex items-center justify-center space-x-3 px-4 py-4 rounded-xl font-medium transition-all duration-200 focus-ring ${
            isLoading || !prompt.trim() || !hasApiKey()
              ? 'glass-input text-gray-500 cursor-not-allowed'
              : 'glass-button text-white interactive'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-responsive-sm">Testing with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span className="text-responsive-sm">Test with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}</span>
            </>
          )}
        </button>

        {error && (
          <div className="flex items-start space-x-3 p-4 glass-card border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-responsive-sm text-red-300">
              <p className="font-medium text-red-200">Error</p>
              <p className="mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-responsive-sm font-medium text-green-300">
                Response from {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
              </span>
            </div>
            <div className="glass-input rounded-xl p-4 max-h-64 overflow-y-auto border border-white/5">
              <pre className="text-responsive-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};