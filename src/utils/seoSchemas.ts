import { SportChallenge } from '../types';

const BASE_URL = 'https://minoan.makersplacegh.com';

/**
 * Generate Schema.org FAQPage structured data
 */
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate Schema.org BreadcrumbList structured data
 */
export const createBreadcrumbSchema = (crumbs: Array<{ name: string; path: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`}`,
    })),
  };
};

/**
 * Generate Schema.org SportsEvent & Technical Specifications for a specific sport
 */
export const createSportSchema = (sport: SportChallenge) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${sport.name} (${sport.code}) - MINOAN RobotSports Ghana 2027`,
    description: sport.fullDescription,
    url: `${BASE_URL}/sports/${sport.id}`,
    startDate: '2027-01-30T08:00:00+00:00',
    endDate: '2027-01-30T20:00:00+00:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: `Arena Zone - ${sport.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Accra',
        addressRegion: 'Greater Accra',
        addressCountry: 'GH',
      },
    },
    organizer: {
      '@type': 'SportsOrganization',
      name: 'The MakersPlace Ghana',
      url: 'https://makersplacegh.com',
    },
    competitor: sport.divisions.map((div) => ({
      '@type': 'SportsTeam',
      name: `Competitors in ${div}`,
    })),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Discipline Code',
        value: sport.code,
      },
      {
        '@type': 'PropertyValue',
        name: 'Maximum Points',
        value: sport.maxPoints,
      },
      {
        '@type': 'PropertyValue',
        name: 'Arena Dimensions',
        value: sport.arenaSpecs.dimensions,
      },
      {
        '@type': 'PropertyValue',
        name: 'Rule Zero Doctrine',
        value: sport.ruleZeroClause,
      },
    ],
  };
};

/**
 * Generate Schema.org WebPage / AboutPage / ItemList metadata
 */
export const createWebPageSchema = (title: string, description: string, path: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'MINOAN RobotSports Ghana 2027',
      url: BASE_URL,
    },
    inLanguage: 'en-US',
  };
};
