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

export interface RegistrationRecord {
  id: number;
  registration_code: string;
  team_name: string;
  organization_type: string;
  organization_name: string;
  division: 'junior' | 'senior' | 'open';
  team_size: number;
  lead_contact_name: string;
  lead_contact_role: string;
  lead_contact_email: string;
  lead_contact_phone: string;
  city_region: string;
  experience_level: string;
  emergency_consent: boolean;
  status: 'pending' | 'approved' | 'scrutineering_passed' | 'waitlisted' | 'rejected';
  scrutineering_notes: string;
  technical_notes: string;
  created_at: string;
  updated_at: string;
  sports: string[];
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterBroadcast {
  id: number;
  title: string;
  subject: string;
  category: string;
  content: string;
  target_audience: string;
  sent_count: number;
  status: string;
  created_at: string;
}

export interface TournamentTelemetryStats {
  totalTeams: number;
  totalAthletes: number;
  activeSubscribers: number;
  totalBroadcasts: number;
  statusBreakdown: Record<string, number>;
  divisionBreakdown: Record<string, number>;
  regionBreakdown: { city_region: string; count: number }[];
  sportBreakdown: { sport_id: string; count: number }[];
  recentRegistrations?: RegistrationRecord[];
}

export type AdminRole = 'superadmin' | 'lead_referee' | 'scrutineer' | 'coordinator';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  createdAt?: string;
}


