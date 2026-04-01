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
    __VIBE_EDITOR__?: {
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
    if (typeof window === 'undefined') return;

    const initializeBridge = () => {
      try {
        const bridge = window.__EDITOR_BRIDGE__;
        const vibeBridge = window.__WIX_VIBE_EDITOR__;
        const vibeEditor = window.__VIBE_EDITOR__;

        if (bridge?.notifyReady) bridge.notifyReady();
        if (bridge?.ready) bridge.ready();
        if (vibeBridge?.ready) vibeBridge.ready();
        if (vibeEditor?.ready) vibeEditor.ready();
        if (vibeEditor?.notifyReady) vibeEditor.notifyReady();

        if (window.parent && window.parent !== window) {
          try {
            window.parent.postMessage(
              { type: 'EDITOR_READY', source: 'energievergleich-bridge' },
              '*'
            );
          } catch (e) {
            // Silently ignore cross-origin errors
          }
        }
      } catch (error) {
        // Silently ignore initialization errors
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'EDITOR_INIT' || event.data?.type === 'VIBE_EDITOR_INIT') {
        initializeBridge();
      }
    };

    window.addEventListener('message', handleMessage);

    // Multiple initialization attempts at different intervals
    initializeBridge();
    const t1 = setTimeout(initializeBridge, 50);
    const t2 = setTimeout(initializeBridge, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return null;
}
