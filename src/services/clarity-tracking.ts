/**
 * Microsoft Clarity Tracking Service
 * Loads Clarity only after analytics consent is granted.
 */

type ClarityFn = ((action: string, ...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

let consentGranted = false;
let debugMode = false;
let projectIdGlobal = '';
let initializedProjectId = '';
let scriptInjected = false;

function ensureClarityQueueFunction() {
  if (window.clarity) {
    return;
  }

  const clarityFn = ((...args: unknown[]) => {
    clarityFn.q = clarityFn.q ?? [];
    clarityFn.q.push(args);
  }) as ClarityFn;

  window.clarity = clarityFn;
}

function loadClarityScript(projectId: string) {
  if (scriptInjected) {
    return;
  }

  const existingScript = document.querySelector(
    `script[data-clarity-project-id="${projectId}"]`,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    scriptInjected = true;
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  script.dataset.clarityProjectId = projectId;

  script.onload = () => {
    if (debugMode) {
      console.log('[CLARITY DEBUG] Script loaded successfully for ID:', projectId);
    }
  };

  script.onerror = () => {
    console.error('[CLARITY ERROR] Failed to load Clarity script');
  };

  scriptInjected = true;
  document.head.appendChild(script);
}

export function initializeClarity(projectId: string) {
  if (typeof window === 'undefined' || !projectId) {
    return;
  }

  if (initializedProjectId === projectId) {
    return;
  }

  projectIdGlobal = projectId;
  initializedProjectId = projectId;
  debugMode = new URLSearchParams(window.location.search).get('debug') === '1';

  ensureClarityQueueFunction();

  if (debugMode) {
    console.log('[CLARITY DEBUG] Initialization started with Project ID:', projectId);
  }

  if (consentGranted) {
    loadClarityScript(projectIdGlobal);
  }
}

export function updateClarityConsent(analyticsConsent: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  consentGranted = analyticsConsent;

  if (!analyticsConsent) {
    if (debugMode) {
      console.log('[CLARITY DEBUG] Consent updated: analytics denied');
    }
    return;
  }

  ensureClarityQueueFunction();

  if (!projectIdGlobal) {
    if (debugMode) {
      console.log('[CLARITY DEBUG] Consent granted before initialization, waiting for project ID');
    }
    return;
  }

  loadClarityScript(projectIdGlobal);

  if (debugMode) {
    console.log('[CLARITY DEBUG] Consent updated: analytics granted');
  }
}

export function isClarityConsented(): boolean {
  return consentGranted;
}
