/**
 * PWA Install Prompt Component
 * Zeigt einen Button zum Installieren der App
 */

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      console.log('PWA was installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Show again after 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <div className="install-prompt-icon">📱</div>
        <div className="install-prompt-text">
          <h3>App installieren</h3>
          <p>Installieren Sie EnergieVergleich NRW für schnellen Zugriff!</p>
        </div>
        <div className="install-prompt-actions">
          <button onClick={handleInstallClick} className="btn btn-primary btn-sm">
            Installieren
          </button>
          <button onClick={handleDismiss} className="btn btn-text btn-sm">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// iOS-spezifischer Install-Hinweis
export function IOSInstallPrompt() {
  const [showIOS, setShowIOS] = useState(false);

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isInStandaloneMode) {
      setShowIOS(true);
    }
  }, []);

  if (!showIOS) return null;

  return (
    <div className="ios-install-prompt">
      <div className="ios-install-content">
        <p>
          <strong>Tipp:</strong> Installieren Sie diese App auf Ihrem iPhone:
          Tippen Sie auf <span style={{ fontSize: '1.2em' }}>⎙</span> und dann auf
          "Zum Home-Bildschirm"
        </p>
        <button onClick={() => setShowIOS(false)} className="btn btn-text btn-sm">
          ✕
        </button>
      </div>
    </div>
  );
}
