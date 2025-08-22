import React from 'react';
import { 
  BookOpen, 
  Zap, 
  Settings, 
  Code, 
  Play, 
  Download,
  Key,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-subtle-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-subtle-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative container-responsive py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 glass-card rounded-2xl">
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h1 className="text-responsive-2xl font-bold text-gradient mb-4">
            Dokumentasi Lengkap
          </h1>
          <p className="text-responsive-base text-gray-400 max-w-2xl mx-auto">
            Panduan lengkap untuk menggunakan Prompt Engineer Generator dan memaksimalkan hasil AI Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="glass-ultra rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Daftar Isi
              </h3>
              <nav className="space-y-2">
                {[
                  { id: 'intro', title: 'Pengenalan' },
                  { id: 'setup', title: 'Setup & Konfigurasi' },
                  { id: 'usage', title: 'Cara Penggunaan' },
                  { id: 'features', title: 'Fitur Utama' },
                  { id: 'api', title: 'Integrasi API' },
                  { id: 'tips', title: 'Tips & Trik' },
                  { id: 'troubleshooting', title: 'Troubleshooting' }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200 py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <section id="intro" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Pengenalan
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Prompt Engineer Generator (PEG) adalah tool canggih untuk membuat prompt AI yang efektif dan terstruktur. 
                  Aplikasi ini membantu Anda menghasilkan prompt berkualitas tinggi untuk ChatGPT dan Gemini AI.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-purple-400 mb-2">✨ Fitur Utama</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Form builder interaktif</li>
                      <li>• Preview real-time</li>
                      <li>• Test langsung dengan AI</li>
                      <li>• Export multiple format</li>
                    </ul>
                  </div>
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-pink-400 mb-2">🎯 Keunggulan</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Struktur prompt yang konsisten</li>
                      <li>• Hasil AI yang lebih akurat</li>
                      <li>• Workflow yang efisien</li>
                      <li>• Interface yang intuitif</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Setup */}
            <section id="setup" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Key className="w-6 h-6 text-green-400" />
                Setup & Konfigurasi
              </h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-3">1. API Keys Setup</h3>
                  <div className="glass-card p-4 rounded-xl">
                    <p className="mb-3">Untuk menggunakan fitur test AI, Anda perlu API keys:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <strong>OpenAI API Key:</strong> Dapatkan di <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.openai.com</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <strong>Gemini API Key:</strong> Dapatkan di <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">2. Environment Variables</h3>
                  <div className="glass-input p-4 rounded-xl">
                    <pre className="text-sm text-green-400">
{`# .env file
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Usage */}
            <section id="usage" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Play className="w-6 h-6 text-blue-400" />
                Cara Penggunaan
              </h2>
              <div className="space-y-6 text-gray-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Isi Form",
                      desc: "Lengkapi semua field yang diperlukan: Role, Context, Objective, Instructions, dll.",
                      color: "purple"
                    },
                    {
                      step: "2", 
                      title: "Preview Prompt",
                      desc: "Lihat hasil prompt yang dihasilkan secara real-time di panel preview.",
                      color: "pink"
                    },
                    {
                      step: "3",
                      title: "Test dengan AI",
                      desc: "Gunakan panel test untuk mencoba prompt langsung dengan ChatGPT atau Gemini.",
                      color: "blue"
                    },
                    {
                      step: "4",
                      title: "Export & Gunakan",
                      desc: "Copy, download, atau buka langsung di platform AI pilihan Anda.",
                      color: "green"
                    }
                  ].map((item) => (
                    <div key={item.step} className="glass-card p-4 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 font-bold text-sm`}>
                          {item.step}
                        </div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features */}
            <section id="features" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Fitur Utama
              </h2>
              <div className="space-y-4 text-gray-300">
                {[
                  {
                    icon: <Code className="w-5 h-5 text-purple-400" />,
                    title: "Form Builder Interaktif",
                    desc: "Interface yang mudah digunakan dengan validasi real-time dan auto-save."
                  },
                  {
                    icon: <Play className="w-5 h-5 text-green-400" />,
                    title: "AI Testing Panel",
                    desc: "Test prompt langsung dengan ChatGPT atau Gemini tanpa meninggalkan aplikasi."
                  },
                  {
                    icon: <Download className="w-5 h-5 text-blue-400" />,
                    title: "Multiple Export Options",
                    desc: "Copy, download, atau buka langsung di platform AI dengan satu klik."
                  },
                  {
                    icon: <Settings className="w-5 h-5 text-pink-400" />,
                    title: "Advanced Configuration",
                    desc: "Kontrol penuh atas reasoning depth, constraints, dan meta settings."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 glass-card p-4 rounded-xl">
                    <div className="p-2 glass-input rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* API Integration */}
            <section id="api" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="w-6 h-6 text-cyan-400" />
                Integrasi API
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>Aplikasi ini mendukung integrasi dengan berbagai AI provider:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-green-400 mb-2">OpenAI ChatGPT</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Model: GPT-4, GPT-3.5-turbo</li>
                      <li>• Custom token limits</li>
                      <li>• Temperature control</li>
                      <li>• System message support</li>
                    </ul>
                  </div>
                  <div className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-400 mb-2">Google Gemini</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Model: Gemini-1.5-pro</li>
                      <li>• System instructions</li>
                      <li>• Generation config</li>
                      <li>• Safety settings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section id="tips" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Tips & Trik
              </h2>
              <div className="space-y-4 text-gray-300">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
                    title: "Prompt yang Efektif",
                    tips: [
                      "Gunakan role yang spesifik dan jelas",
                      "Berikan context yang lengkap dan relevan",
                      "Buat instruksi yang step-by-step",
                      "Tentukan format output yang diinginkan"
                    ]
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-purple-400" />,
                    title: "Optimasi Performa",
                    tips: [
                      "Gunakan reasoning depth yang sesuai kebutuhan",
                      "Aktifkan 'show work' untuk debugging",
                      "Set constraints untuk hasil yang konsisten",
                      "Test dengan berbagai input untuk validasi"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      {section.icon}
                      <h4 className="font-semibold text-white">{section.title}</h4>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="glass-ultra rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Troubleshooting
              </h2>
              <div className="space-y-4 text-gray-300">
                {[
                  {
                    problem: "API Key tidak terdeteksi",
                    solution: "Pastikan file .env sudah dibuat dan API key sudah diset dengan benar. Restart development server setelah menambah API key."
                  },
                  {
                    problem: "Error saat test AI",
                    solution: "Periksa koneksi internet, validitas API key, dan pastikan tidak melebihi rate limit dari provider AI."
                  },
                  {
                    problem: "Prompt tidak ter-generate",
                    solution: "Pastikan semua field required sudah diisi. Periksa validasi form dan lengkapi data yang masih kosong."
                  },
                  {
                    problem: "Aplikasi lambat di mobile",
                    solution: "Aplikasi sudah dioptimasi untuk mobile. Pastikan menggunakan browser terbaru dan koneksi internet yang stabil."
                  }
                ].map((item, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl">
                    <h4 className="font-semibold text-red-400 mb-2">❌ {item.problem}</h4>
                    <p className="text-sm text-gray-400">✅ {item.solution}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};