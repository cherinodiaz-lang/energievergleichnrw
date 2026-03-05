/**
 * Content Type Definitions
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface HeroContent {
  h1: string;
  subline: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface BenefitCard {
  title: string;
  text: string;
  icon?: string;
}

export interface HowItWorksStep {
  title: string;
  text: string;
  icon?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean;
  canonical?: string;
}

export interface PageContent {
  meta: PageMeta;
  hero: HeroContent;
  sections: {
    benefits: {
      title: string;
      cards: BenefitCard[];
    };
    howItWorks: {
      title: string;
      steps: HowItWorksStep[];
    };
    trust: {
      title: string;
      text: string;
    };
    faq: {
      title: string;
      items: FAQItem[];
    };
  };
  closingCta: {
    title: string;
    text: string;
    primaryCta: string;
  };
}

export interface CityData {
  name: string;
  slug: string;
  zipCodes: string[];
  population?: number;
  region?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}
