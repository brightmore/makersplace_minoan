export type SportId = 
  | 'drone' 
  | 'drone-soccer' 
  | 'marathon' 
  | 'football-3x3' 
  | 'wrestling'
  | 'archery' 
  | 'relay'
  | 'exhibition'
  | 'shooting';

export type DivisionId = 'all' | 'junior' | 'senior' | 'open';

export interface ScoreRubricItem {
  criteria: string;
  points: string;
  notes: string;
}

export interface GalleryItem {
  title: string;
  subtitle: string;
  url: string;
  badge: string;
}

export interface SportVideoItem {
  title: string;
  subtitle?: string;
  url: string;
  embedUrl: string;
  badge?: string;
}

export interface TechSpecs {
  microcontrollers: string[];
  maxWeight: string;
  maxDimensions: string;
  voltageLimit: string;
  controlMode: 'Autonomous Only' | 'RC + Autonomous' | 'Manual RC';
  failsafeRequirements: string[];
  safetyRating: string;
}

export interface SportChallenge {
  id: SportId;
  name: string;
  code: string;
  shortTagline: string;
  fullDescription: string;
  maxPoints: string;
  attemptsOrDuration: string;
  teamCapacity: string;
  divisions: ('Junior (10-14)' | 'Senior (15-18)' | 'University / Open')[];
  divisionSlugs: ('junior' | 'senior' | 'open')[];
  primaryColor: 'cyan' | 'amber' | 'emerald' | 'magenta';
  icon: string;
  heroSnippet: string;
  arenaSpecs: {
    dimensions: string;
    surfaceType: string;
    flightCeiling?: string;
    safetyNetting?: boolean;
    lighting: string;
  };
  techSpecs: TechSpecs;
  rubric: ScoreRubricItem[];
  keyRulesSummary: string[];
  pdfRulebook: {
    fileName: string;
    fileSize: string;
    version: string;
    lastUpdated: string;
  };
  gallery: GalleryItem[];
  mrcCategory?: string;
  controlBoxDimensions?: string;
  officialHROStandard?: string;
  ruleZeroClause?: string;
  penaltiesAndFouls?: { violation: string; consequence: string }[];
  matchFormatDetails?: string;
  scrutineeringChecklist?: string[];
  faq?: { q: string; a: string }[];
  videos?: SportVideoItem[];
}

export interface RegistrationFormData {
  teamName: string;
  organizationType: 'school' | 'university' | 'club' | 'independent';
  organizationName: string;
  selectedSports: SportId[];
  division: 'junior' | 'senior' | 'open';
  teamSize: number;
  leadContactName: string;
  leadContactRole: string;
  leadContactEmail: string;
  leadContactPhone: string;
  cityRegion: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  emergencyConsent: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  sportCode?: string;
  category: 'Rulebooks' | 'Score Sheets' | 'Field CAD & Dimensions' | 'Safety Protocols';
  version: string;
  format: 'PDF' | 'CAD/DXF' | 'XLSX';
  fileSize: string;
  description: string;
  publishedDate: string;
  downloadUrl: string;
}

export interface InspectionChecklistItem {
  id: string;
  category: 'Structural & Dimensions' | 'Electrical & Batteries' | 'Software & Failsafes' | 'Safety & Environment';
  title: string;
  specification: string;
  ruleReference: string;
  importance: 'CRITICAL FAIL' | 'MANDATORY' | 'RECOMMENDED';
  details: string;
}
