import { useEffect } from 'react';

declare global {
  interface Window {
    __EDITOR_BRIDGE__?: {
      init?: () => void;
      ready?: () => void;
      notifyReady?: () => void;
    };
  }
}

/**
 * EditorBridge Component
 * Initializes the Wix Vibe editor bridge for visual editing support
 * This component must be rendered at the root level of the application
 */
export default function EditorBridge() {
  useEffect(() => {
    // Initialize the editor bridge if available
    if (typeof window !== 'undefined') {
      const bridge = window.__EDITOR_BRIDGE__;
      if (bridge) {
        try {
          // Try multiple initialization methods
          bridge.init?.();
          bridge.ready?.();
          bridge.notifyReady?.();
        } catch (error) {
          console.debug('Editor bridge initialization:', error);
        }
      }
    }
  }, []);

  return null;
}
