import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FormSection } from './components/FormSection';
import { InputField } from './components/InputField';
import { SelectField } from './components/SelectField';
import { CheckboxField } from './components/CheckboxField';
import { ArrayField } from './components/ArrayField';
import { PromptPreview } from './components/PromptPreview';
import { AITestPanel } from './components/AITestPanel';
import { FloatingNav } from './components/FloatingNav';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { usePromptForm } from './hooks/usePromptForm';
import {
  User,
  Target,
  List,
  FileText,
  Palette,
  Settings,
  Brain,
  RefreshCw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

function App() {
  const {
    schema,
    expandedSections,
    generatedPrompt,
    isValid,
    toggleSection,
    updateSchema,
    updateNestedSchema,
    resetForm
  } = usePromptForm();

  const [aiType, setAiType] = useState<'chatgpt' | 'gemini'>('chatgpt');
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home');

  const selectOptions = useMemo(() => ({
    tone: [
      { value: '', label: 'Pilih Tone...' },
      { value: 'formal', label: 'Formal' },
      { value: 'informal', label: 'Informal' },
      { value: 'professional', label: 'Professional' },
      { value: 'friendly', label: 'Friendly' },
      { value: 'authoritative', label: 'Authoritative' },
      { value: 'conversational', label: 'Conversational' }
    ],
    voice: [
      { value: '', label: 'Pilih Voice...' },
      { value: 'expert', label: 'Expert' },
      { value: 'teacher', label: 'Teacher' },
      { value: 'consultant', label: 'Consultant' },
      { value: 'assistant', label: 'Assistant' },
      { value: 'mentor', label: 'Mentor' },
      { value: 'analyst', label: 'Analyst' }
    ],
    outputType: [
      { value: '', label: 'Pilih Format...' },
      { value: 'paragraph', label: 'Paragraph' },
      { value: 'list', label: 'List' },
      { value: 'table', label: 'Table' },
      { value: 'json', label: 'JSON' },
      { value: 'markdown', label: 'Markdown' },
      { value: 'code', label: 'Code' }
    ],
    length: [
      { value: '', label: 'Pilih Panjang...' },
      { value: 'brief', label: 'Brief (1-2 paragraf)' },
      { value: 'medium', label: 'Medium (3-5 paragraf)' },
      { value: 'detailed', label: 'Detailed (6+ paragraf)' },
      { value: 'comprehensive', label: 'Comprehensive' }
    ],
    reasoningDepth: [
      { value: 'brief', label: 'Brief' },
      { value: 'standard', label: 'Standard' },
      { value: 'deep', label: 'Deep' }
    ],
    citationStyle: [
      { value: '', label: 'Tidak ada' },
      { value: 'apa', label: 'APA' },
      { value: 'mla', label: 'MLA' },
      { value: 'chicago', label: 'Chicago' },
      { value: 'ieee', label: 'IEEE' }
    ]
  }), []);

  if (currentPage === 'docs') {
    return (
      <>
        <Documentation />
        <FloatingNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-subtle-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-subtle-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <Header />
      
      <div className="relative container-responsive py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 glass-card rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gradient">
                  Buat Prompt
                </h2>
              </div>
              <button
                onClick={resetForm}
                className="flex items-center space-x-2 px-4 py-3 text-gray-400 hover:text-gray-200 glass-card hover:glass-button rounded-xl transition-all duration-200 interactive focus-ring"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Reset</span>
              </button>
            </div>

            {/* Role Section */}
            <FormSection
              title="Role & Identitas"
              icon={<User className="w-5 h-5" />}
              isExpanded={expandedSections.role}
              onToggle={() => toggleSection('role')}
            >
              <InputField
                label="Role/Peran AI"
                value={schema.role}
                onChange={(value) => updateSchema('role', value)}
                placeholder="Contoh: Expert Content Writer, Data Analyst, Marketing Strategist"
                required
              />
            </FormSection>

            {/* Context Section */}
            <FormSection
              title="Konteks"
              icon={<Target className="w-5 h-5" />}
              isExpanded={expandedSections.context}
              onToggle={() => toggleSection('context')}
            >
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="User/Pengguna"
                  value={schema.context.user}
                  onChange={(value) => updateNestedSchema('context', 'user', value)}
                  placeholder="Siapa yang meminta bantuan?"
                  required
                />
                <InputField
                  label="Audiens Target"
                  value={schema.context.audience}
                  onChange={(value) => updateNestedSchema('context', 'audience', value)}
                  placeholder="Untuk siapa output ini dibuat?"
                  required
                />
                <InputField
                  label="Situasi/Kondisi"
                  value={schema.context.situation}
                  onChange={(value) => updateNestedSchema('context', 'situation', value)}
                  placeholder="Dalam situasi apa ini digunakan?"
                  type="textarea"
                  required
                />
              </div>
            </FormSection>

            {/* Objective Section */}
            <FormSection
              title="Tujuan"
              icon={<Target className="w-5 h-5" />}
              isExpanded={expandedSections.objective}
              onToggle={() => toggleSection('objective')}
            >
              <InputField
                label="Tujuan Utama"
                value={schema.objective}
                onChange={(value) => updateSchema('objective', value)}
                placeholder="Apa yang ingin dicapai dengan prompt ini?"
                type="textarea"
                required
              />
            </FormSection>

            {/* Instructions Section */}
            <FormSection
              title="Instruksi"
              icon={<List className="w-5 h-5" />}
              isExpanded={expandedSections.instructions}
              onToggle={() => toggleSection('instructions')}
            >
              <ArrayField
                label="Langkah-langkah Instruksi"
                values={schema.instructions}
                onChange={(values) => updateSchema('instructions', values)}
                placeholder="Masukkan instruksi spesifik..."
                required
              />
            </FormSection>

            {/* Output Section */}
            <FormSection
              title="Format Output"
              icon={<FileText className="w-5 h-5" />}
              isExpanded={expandedSections.output}
              onToggle={() => toggleSection('output')}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <SelectField
                  label="Tipe Output"
                  value={schema.output.type}
                  onChange={(value) => updateNestedSchema('output', 'type', value)}
                  options={selectOptions.outputType}
                  required
                />
                <SelectField
                  label="Panjang Output"
                  value={schema.output.length}
                  onChange={(value) => updateNestedSchema('output', 'length', value)}
                  options={selectOptions.length}
                  required
                />
              </div>
              <ArrayField
                label="Elemen Tambahan"
                values={schema.output.extras}
                onChange={(values) => updateNestedSchema('output', 'extras', values)}
                placeholder="Contoh: include examples, add references, etc."
              />
            </FormSection>

            {/* Style Section */}
            <FormSection
              title="Gaya & Nada"
              icon={<Palette className="w-5 h-5" />}
              isExpanded={expandedSections.style}
              onToggle={() => toggleSection('style')}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SelectField
                  label="Tone/Nada"
                  value={schema.style.tone}
                  onChange={(value) => updateNestedSchema('style', 'tone', value)}
                  options={selectOptions.tone}
                  required
                />
                <SelectField
                  label="Voice/Suara"
                  value={schema.style.voice}
                  onChange={(value) => updateNestedSchema('style', 'voice', value)}
                  options={selectOptions.voice}
                  required
                />
              </div>
            </FormSection>

            {/* Constraints Section */}
            <FormSection
              title="Batasan & Kendala"
              icon={<Settings className="w-5 h-5" />}
              isExpanded={expandedSections.constraints}
              onToggle={() => toggleSection('constraints')}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CheckboxField
                    label="Hindari Pengulangan"
                    checked={schema.constraints.no_repetition}
                    onChange={(value) => updateNestedSchema('constraints', 'no_repetition', value)}
                    description="Hindari mengulang informasi yang sama"
                  />
                  <CheckboxField
                    label="Sumber Terbaru Saja"
                    checked={schema.constraints.latest_sources_only}
                    onChange={(value) => updateNestedSchema('constraints', 'latest_sources_only', value)}
                    description="Gunakan hanya informasi terkini"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <SelectField
                    label="Gaya Sitasi"
                    value={schema.constraints.citation_style || ''}
                    onChange={(value) => updateNestedSchema('constraints', 'citation_style', value || null)}
                    options={selectOptions.citationStyle}
                  />
                  <InputField
                    label="Timeframe"
                    value={schema.constraints.timeframe || ''}
                    onChange={(value) => updateNestedSchema('constraints', 'timeframe', value || null)}
                    placeholder="Contoh: 2020-2024, last 5 years"
                  />
                </div>
              </div>
            </FormSection>

            {/* Meta Section */}
            <FormSection
              title="Meta Settings"
              icon={<Brain className="w-5 h-5" />}
              isExpanded={expandedSections.meta}
              onToggle={() => toggleSection('meta')}
            >
              <div className="space-y-6">
                <SelectField
                  label="Kedalaman Reasoning"
                  value={schema.meta.reasoning_depth}
                  onChange={(value) => updateNestedSchema('meta', 'reasoning_depth', value as any)}
                  options={selectOptions.reasoningDepth}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CheckboxField
                    label="Tampilkan Proses Kerja"
                    checked={schema.meta.show_work}
                    onChange={(value) => updateNestedSchema('meta', 'show_work', value)}
                    description="Jelaskan langkah-langkah berpikir"
                  />
                  <CheckboxField
                    label="Verifikasi Kalkulasi"
                    checked={schema.meta.verify_calculations}
                    onChange={(value) => updateNestedSchema('meta', 'verify_calculations', value)}
                    description="Periksa ulang perhitungan"
                  />
                </div>
                <CheckboxField
                  label="Tanya Sebelum Asumsi"
                  checked={schema.meta.ask_before_assuming}
                  onChange={(value) => updateNestedSchema('meta', 'ask_before_assuming', value)}
                  description="Minta klarifikasi jika ada yang tidak jelas"
                />
              </div>
            </FormSection>
          </div>

          {/* Preview Section */}
          <div className="xl:sticky xl:top-8 xl:self-start space-y-6">
            <PromptPreview
              prompt={generatedPrompt}
              aiType={aiType}
              onAiTypeChange={setAiType}
            />
            
            <AITestPanel
              prompt={generatedPrompt}
              aiType={aiType}
            />
            
            {!isValid && (
              <div className="p-4 glass-card border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-200 text-responsive-sm flex items-center space-x-3 leading-relaxed">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>⚠️ Lengkapi form untuk generate prompt yang valid</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <FloatingNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;