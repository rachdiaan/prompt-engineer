import { useState, useCallback, useMemo } from 'react';
import { PegSchema, buildNaturalLanguagePrompt, validatePeg } from '../types/peg';

// Optimized initial schema with better defaults
const initialSchema: PegSchema = {
  role: '',
  context: {
    user: '',
    audience: '',
    situation: ''
  },
  objective: '',
  instructions: [''],
  output: {
    type: '',
    length: '',
    extras: []
  },
  style: {
    tone: '',
    voice: ''
  },
  constraints: {
    no_repetition: false,
    latest_sources_only: false,
    citation_style: null,
    timeframe: null
  },
  meta: {
    reasoning_depth: 'standard',
    show_work: false,
    verify_calculations: false,
    ask_before_assuming: false
  }
};

// Optimized hook with better performance
export const usePromptForm = () => {
  const [schema, setSchema] = useState<PegSchema>(initialSchema);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    role: true,
    context: true,
    objective: true,
    instructions: true,
    output: false,
    style: false,
    constraints: false,
    meta: false
  });

  // Memoized callbacks for better performance
  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // Optimized update functions with proper typing
  const updateSchema = useCallback(<K extends keyof PegSchema>(
    key: K,
    value: PegSchema[K]
  ) => {
    setSchema(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Optimized nested update with better performance
  const updateNestedSchema = useCallback(<
    K extends keyof PegSchema,
    N extends keyof PegSchema[K]
  >(
    key: K,
    nestedKey: N,
    value: PegSchema[K][N]
  ) => {
    setSchema(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [nestedKey]: value
      }
    }));
  }, []);

  // Memoized computed values for better performance
  const generatedPrompt = useMemo(() => {
    const validation = validatePeg(schema);
    if (!validation.ok) return '';
    
    return buildNaturalLanguagePrompt(schema);
  }, [schema]);

  const isValid = useMemo(() => {
    return validatePeg(schema).ok;
  }, [schema]);

  // Optimized reset function
  const resetForm = useCallback(() => {
    setSchema(initialSchema);
    setExpandedSections({
      role: true,
      context: true,
      objective: true,
      instructions: true,
      output: false,
      style: false,
      constraints: false,
      meta: false
    });
  }, []);

  return {
    schema,
    expandedSections,
    generatedPrompt,
    isValid,
    toggleSection,
    updateSchema,
    updateNestedSchema,
    resetForm
  };
};