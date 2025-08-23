import React, { useState, useCallback } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle, Settings, Zap, Eye, EyeOff, Key, Lock } from 'lucide-react';
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
  const [model, setModel] = useState<string>('');
  
  // Manual API Keys State
  const [openaiApiKey, setOpenaiApiKey] = useState<string>('');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleTest = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt tidak boleh kosong');
      return;
    }

    // Check for API keys
    const currentApiKey = aiType === 'chatgpt' ? openaiApiKey : geminiApiKey;
    const envApiKey = aiType === 'chatgpt' 
      ? import.meta.env.VITE_OPENAI_API_KEY 
      : import.meta.env.VITE_GEMINI_API_KEY;

    if (!currentApiKey && !envApiKey) {
      setError(`API Key ${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} diperlukan. Masukkan di pengaturan API.`);
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');

    try {
      let response: string;
      
      const selectedModel = model || (aiType === 'chatgpt' ? 'gpt-4' : 'gemini-1.5-pro');
      const apiKey = currentApiKey || envApiKey;
      
      if (aiType === 'chatgpt') {
        response = await runOpenAI(testMessage, selectedModel, maxTokens, temperature, apiKey);
      } else {
        response = await runGemini(testMessage, selectedModel, maxTokens, temperature, apiKey);
      }
      
      setResult(response);
    } catch (err: any) {
      console.error('AI Test Error:', err);
      if (err.message?.includes('API key') || err.message?.includes('401')) {
        setError(`API Key ${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} tidak valid. Periksa kembali API key Anda.`);
      } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
        setError('Quota API habis atau rate limit terlampaui. Coba lagi nanti.');
      } else {
        setError(`Error: ${err.message || 'Terjadi kesalahan saat menghubungi AI'}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, testMessage, aiType, maxTokens, temperature, model, openaiApiKey, geminiApiKey]);

  const hasApiKey = useCallback(() => {
    if (aiType === 'chatgpt') {
      return !!(openaiApiKey || import.meta.env.VITE_OPENAI_API_KEY);
    } else {
      return !!(geminiApiKey || import.meta.env.VITE_GEMINI_API_KEY);
    }
  }, [aiType, openaiApiKey, geminiApiKey]);

  return (
    <div className="glass-ultra rounded-2xl shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-card rounded-lg">
              <Zap className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-100">Test AI Response</h3>
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
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-blue-500/20">
          <div className="space-y-4">
            {/* API Keys Section */}
            <div className="glass-card p-4 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-200">API Keys</span>
                </div>
                <button
                  onClick={() => setShowApiKeys(!showApiKeys)}
                  className="p-1 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKeys ? "text" : "password"}
                      value={openaiApiKey}
                      onChange={(e) => setOpenaiApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-3 py-2 pr-10 glass-input rounded-lg text-sm focus-ring"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Gemini API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKeys ? "text" : "password"}
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                      placeholder="AI..."
                      className="w-full px-3 py-2 pr-10 glass-input rounded-lg text-sm focus-ring"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-400">
                <p>💡 API keys disimpan sementara di browser dan tidak dikirim ke server</p>
              </div>
            </div>

            {/* Model and Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-lg text-sm focus-ring"
                >
                  {aiType === 'chatgpt' ? (
                    <>
                      <option value="">GPT-4 (Default)</option>
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    </>
                  ) : (
                    <>
                      <option value="">Gemini-1.5-pro (Default)</option>
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                    </>
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(Number(e.target.value))}
                  min="100"
                  max="4000"
                  step="100"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  min="0"
                  max="2"
                  step="0.1"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className={`w-3 h-3 rounded-full ${hasApiKey() ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="font-medium text-gray-300">
                {hasApiKey() ? `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API: Ready` : `${aiType === 'chatgpt' ? 'OpenAI' : 'Gemini'} API: Not configured`}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
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
              <span className="text-sm">Testing with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span className="text-sm">Test with {aiType === 'chatgpt' ? 'ChatGPT' : 'Gemini'}</span>
            </>
          )}
        </button>

        {error && (
          <div className="flex items-start space-x-3 p-4 glass-card border border-red-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-300">
              <p className="font-medium text-red-200">Error</p>
              <p className="mt-1 leading-relaxed">{error}</p>
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
            <div className="glass-input rounded-xl p-4 max-h-64 overflow-y-auto border border-white/5">
              <pre className="text-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};