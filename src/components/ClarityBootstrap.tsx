import { useEffect } from 'react';
import { initializeClarity } from '@/services/clarity-tracking';

interface ClarityBootstrapProps {
  projectId?: string;
}

export default function ClarityBootstrap({ projectId }: ClarityBootstrapProps) {
  useEffect(() => {
    if (!projectId) {
      return;
    }

    initializeClarity(projectId);
  }, [projectId]);

  return null;
}
