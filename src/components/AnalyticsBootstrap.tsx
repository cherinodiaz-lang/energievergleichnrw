import { useEffect } from 'react';
import ConsentBanner from '@/components/ConsentBanner';
import { initializeGA4 } from '@/services/ga4-tracking';

interface AnalyticsBootstrapProps {
  measurementId?: string;
}

export default function AnalyticsBootstrap({ measurementId }: AnalyticsBootstrapProps) {
  useEffect(() => {
    if (!measurementId) {
      return;
    }

    initializeGA4(measurementId);
  }, [measurementId]);

  return <ConsentBanner />;
}
