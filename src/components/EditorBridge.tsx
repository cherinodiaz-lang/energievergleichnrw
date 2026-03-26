import { useEffect } from 'react';

declare global {
  interface Window {
    __EDITOR_BRIDGE__?: {
      init?: () => void;
      ready?: () => void;
      notifyReady?: () => void;
    };
    __WIX_VIBE_EDITOR__?: {
      init?: () => void;
      ready?: () => void;
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
    if (typeof window === 'undefined') return;

    // Initialize the editor bridge if available
    const initializeBridge = () => {
      const bridge = window.__EDITOR_BRIDGE__;
      const vibeBridge = window.__WIX_VIBE_EDITOR__;

      if (bridge) {
        try {
          bridge.init?.();
          bridge.ready?.();
          bridge.notifyReady?.();
        } catch (error) {
          console.debug('Editor bridge initialization:', error);
        }
      }

      if (vibeBridge) {
        try {
          vibeBridge.init?.();
          vibeBridge.ready?.();
        } catch (error) {
          console.debug('Vibe editor initialization:', error);
        }
      }

      // Signal to parent that we're ready
      if (window.parent && window.parent !== window) {
        try {
          window.parent.postMessage({ type: 'EDITOR_READY' }, '*');
        } catch (error) {
          console.debug('Failed to post ready message:', error);
        }
      }
    };

    // Try immediate initialization
    initializeBridge();

    // Also try after a short delay in case the bridge is injected asynchronously
    const timeoutId = setTimeout(initializeBridge, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
