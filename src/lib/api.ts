import {
  RegistrationRecord,
  NewsletterSubscriber,
  NewsletterBroadcast,
  TournamentTelemetryStats,
  RegistrationFormData,
} from '../types';

const API_BASE = '/api';

export interface RegistrationQueryParams {
  search?: string;
  sport?: string;
  division?: string;
  region?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_dir?: 'ASC' | 'DESC';
}

export interface PaginatedResult<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function fetchTournamentStats(): Promise<TournamentTelemetryStats> {
  const res = await fetch(`${API_BASE}/stats/overview`);
  if (!res.ok) throw new Error('Failed to load tournament telemetry statistics');
  const json = await res.json();
  return json.data;
}

export async function fetchRegistrations(
  params: RegistrationQueryParams = {}
): Promise<PaginatedResult<RegistrationRecord>> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.sport && params.sport !== 'all') query.set('sport', params.sport);
  if (params.division && params.division !== 'all') query.set('division', params.division);
  if (params.region && params.region !== 'all') query.set('region', params.region);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.sort_by) query.set('sort_by', params.sort_by);
  if (params.sort_dir) query.set('sort_dir', params.sort_dir);

  const res = await fetch(`${API_BASE}/registrations?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch tournament registrations');
  return res.json();
}

export async function fetchRegistrationById(idOrCode: string | number): Promise<RegistrationRecord> {
  const res = await fetch(`${API_BASE}/registrations/${idOrCode}`);
  if (!res.ok) throw new Error('Registration record not found');
  const json = await res.json();
  return json.data;
}

export async function submitRegistration(formData: RegistrationFormData): Promise<{
  success: boolean;
  message: string;
  data: RegistrationRecord;
}> {
  const res = await fetch(`${API_BASE}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to submit registration');
  }
  return json;
}

export async function updateRegistrationStatus(
  id: number,
  status: RegistrationRecord['status'],
  scrutineeringNotes?: string,
  inspectorName?: string
): Promise<{ success: boolean; data: RegistrationRecord; message: string }> {
  const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, scrutineeringNotes, inspectorName }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to update registration status');
  }
  return json;
}

export async function deleteRegistration(id: number): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/registrations/${id}`, {
    method: 'DELETE',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to delete registration');
  }
  return json;
}

export async function subscribeNewsletter(
  email: string,
  source = 'footer_bulletin'
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to subscribe to newsletter');
  }
  return json;
}

export async function fetchSubscribers(
  params: { search?: string; status?: string; page?: number; limit?: number } = {}
): Promise<PaginatedResult<NewsletterSubscriber>> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));

  const res = await fetch(`${API_BASE}/newsletter/subscribers?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch subscribers');
  return res.json();
}

export async function deleteSubscriber(id: number): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/newsletter/subscribers/${id}`, {
    method: 'DELETE',
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to remove subscriber');
  }
  return json;
}

export async function fetchBroadcasts(): Promise<NewsletterBroadcast[]> {
  const res = await fetch(`${API_BASE}/broadcasts`);
  if (!res.ok) throw new Error('Failed to fetch broadcasts');
  const json = await res.json();
  return json.data;
}

export async function sendBroadcastBulletin(payload: {
  title: string;
  subject: string;
  category: string;
  content: string;
  targetAudience: string;
}): Promise<{ success: boolean; message: string; data: NewsletterBroadcast }> {
  const res = await fetch(`${API_BASE}/broadcasts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Failed to dispatch broadcast');
  }
  return json;
}

export function getRegistrationCsvUrl(): string {
  return `${API_BASE}/registrations/export/csv`;
}

export function getNewsletterCsvUrl(): string {
  return `${API_BASE}/newsletter/export/csv`;
}
