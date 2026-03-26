import { useEffect } from 'react';
import { initializeGA4 } from '@/services/ga4-tracking';
import { initializeClarity } from '@/services/clarity-tracking';

interface AnalyticsBootstrapProps {
  measurementId?: string;
  clarityProjectId?: string;
}

export default function AnalyticsBootstrap({ measurementId, clarityProjectId }: AnalyticsBootstrapProps) {
  useEffect(() => {
    if (!measurementId) {
      return;
    }

    initializeGA4(measurementId);
  }, [measurementId]);

  useEffect(() => {
    if (!clarityProjectId) {
      return;
    }

    initializeClarity(clarityProjectId);
  }, [clarityProjectId]);

  return null;
}
