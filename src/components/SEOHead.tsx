import { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://www.mrcghana.com';
const DEFAULT_IMAGE = 'https://www.mrcghana.com/images/logo.png';

/**
 * SEOHead - Dynamic Client-Side Meta & AEO Structured Data Manager
 * Updates document head elements (title, meta description, canonical, OG, Twitter, JSON-LD)
 * for Single Page Application route transitions.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalPath = '/',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  jsonLd,
}) => {
  useEffect(() => {
    // 1. Set document title
    const fullTitle = title.includes('MINOAN') 
      ? title 
      : `${title} | MINOAN RobotSports Ghana 2027`;
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Set Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // Handle robots directives (noindex for admin)
    if (canonicalPath.startsWith('/admin')) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // 3. Set Canonical URL
    const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setLinkTag('canonical', canonicalUrl);

    // 4. Set Open Graph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 5. Set Twitter Card Meta Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. Manage Dynamic JSON-LD Structured Data
    const scriptId = 'dynamic-page-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, jsonLd]);

  return null;
};
