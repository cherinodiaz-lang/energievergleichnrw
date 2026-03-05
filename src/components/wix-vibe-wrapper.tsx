import React from 'react';

/**
 * Wix Vibe Wrapper Component
 *
 * Provides a compatibility layer for Wix Vibe Editor integration.
 * Wraps React components to ensure proper editor recognition and AI prompt processing.
 *
 * @component
 * @example
 * ```tsx
 * <WixVibeWrapper>
 *   <YourComponent />
 * </WixVibeWrapper>
 * ```
 */

export interface WixVibeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const WixVibeWrapper: React.FC<WixVibeWrapperProps> = ({ children, className = '' }) => {
  // Provider config for Wix Vibe
  const config = {
    enableAI: true,
    enablePrompts: true,
    enableCodeGeneration: true,
    preserveState: true,
  };

  // Add Wix Vibe data attributes for editor recognition
  return (
    <div
      className={className}
      data-wix-vibe="enabled"
      data-wix-vibe-config={JSON.stringify(config)}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};

export default WixVibeWrapper;
