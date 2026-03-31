import { useState, useEffect } from 'react';

export interface FeatureFlags {
  heroVariant: 'A' | 'B';
  showSocialProofBar: boolean;
  showStickyCTA: boolean;
  showTrustBadgesEnhanced: boolean;
  showExitIntentPopup: boolean;
  showCountdown: boolean;
  showUserCounter: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  heroVariant: 'A',
  showSocialProofBar: true,
  showStickyCTA: true,
  showTrustBadgesEnhanced: true,
  showExitIntentPopup: true,
  showCountdown: true,
  showUserCounter: true,
};

let cachedFlags: FeatureFlags | null = null;

export async function loadFeatureFlags(): Promise<FeatureFlags> {
  if (cachedFlags) return cachedFlags;
  try {
    const res = await fetch('/feature-flags.json');
    if (!res.ok) throw new Error('Failed to load feature flags');
    const data = (await res.json()) as Partial<FeatureFlags>;
    cachedFlags = { ...DEFAULT_FLAGS, ...data };
    return cachedFlags;
  } catch {
    return DEFAULT_FLAGS;
  }
}

export function useFeatureFlags(): FeatureFlags {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);

  useEffect(() => {
    loadFeatureFlags().then(setFlags);
  }, []);

  return flags;
}

export function useFeatureFlag<K extends keyof FeatureFlags>(key: K): FeatureFlags[K] {
  const flags = useFeatureFlags();
  return flags[key];
}
