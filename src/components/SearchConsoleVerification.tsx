import { useEffect } from 'react';

interface SearchConsoleVerificationProps {
  verificationCode?: string;
}

export default function SearchConsoleVerification({
  verificationCode,
}: SearchConsoleVerificationProps) {
  useEffect(() => {
    if (!verificationCode) {
      return;
    }

    let metaTag = document.querySelector('meta[name="google-site-verification"]');

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'google-site-verification');
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute('content', verificationCode);
  }, [verificationCode]);

  return null;
}
