/**
 * Wix Vibe Editor Configuration
 * 
 * Optimizes AI prompt processing and component recognition
 * in the Wix Vibe Editor environment.
 * 
 * @see https://dev.wix.com/docs/vibe-editor
 */

export interface WixVibeConfig {
  ai: {
    model: string;
    temperature: number;
    maxTokens: number;
    enableCodeGeneration: boolean;
  };
  components: {
    autoImport: boolean;
    treeshaking: boolean;
    includePaths: string[];
    excludePaths: string[];
  };
  editor: {
    enablePrompts: boolean;
    enableCodeCompletion: boolean;
    enableInlineEditing: boolean;
    enableComponentPalette: boolean;
  };
  performance: {
    lazyLoad: boolean;
    codesplitting: boolean;
    prefetch: boolean;
  };
}

const config: WixVibeConfig = {
  ai: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    enableCodeGeneration: true
  },
  components: {
    autoImport: true,
    treeshaking: true,
    includePaths: [
      './src/components/**/*.tsx',
      './src/components/**/*.jsx',
      './src/components/**/*.astro'
    ],
    excludePaths: [
      './src/components/**/*.test.tsx',
      './src/components/**/*.stories.tsx'
    ]
  },
  editor: {
    enablePrompts: true,
    enableCodeCompletion: true,
    enableInlineEditing: true,
    enableComponentPalette: true
  },
  performance: {
    lazyLoad: true,
    codeSplitting: true,
    prefetch: true
  }
};

export default config;
