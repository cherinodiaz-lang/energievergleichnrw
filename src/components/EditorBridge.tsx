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
 * Signals to the Wix Vibe editor that the page is ready for editing.
 * Only active when the page is embedded in an editor iframe.
 * Responds to EDITOR_INIT / VIBE_EDITOR_INIT messages from the parent frame
 * and also sends a single proactive EDITOR_READY signal after mount.
 */
export default function EditorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only activate when the page is inside an iframe (Wix editor context)
    if (window.self === window.top) return;

    const signalReady = () => {
      try {
        const bridge = window.__EDITOR_BRIDGE__;
        const vibeBridge = window.__WIX_VIBE_EDITOR__;
        const vibeEditor = window.__VIBE_EDITOR__;

        if (bridge?.notifyReady) bridge.notifyReady();
        if (bridge?.ready) bridge.ready();
        if (vibeBridge?.ready) vibeBridge.ready();
        if (vibeEditor?.ready) vibeEditor.ready();
        if (vibeEditor?.notifyReady) vibeEditor.notifyReady();

        try {
          window.parent.postMessage(
            { type: 'EDITOR_READY', source: 'energievergleich-bridge' },
            '*'
          );
        } catch {
          // Silently ignore cross-origin errors
        }
      } catch {
        // Silently ignore initialization errors
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'EDITOR_INIT' || event.data?.type === 'VIBE_EDITOR_INIT') {
        signalReady();
      }
    };

    window.addEventListener('message', handleMessage);

    // Single proactive signal after a short delay so the editor has time to attach its listener
    const t1 = setTimeout(signalReady, 100);

    return () => {
      clearTimeout(t1);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return null;
}
