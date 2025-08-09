export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit & { timeoutMs?: number }): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 10_000);
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const message = text || `Request failed: ${res.status}`;
      throw new ApiError(message, res.status);
    }
    return res.json();
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    if (err instanceof ApiError) throw err;
    throw new ApiError((err as Error)?.message || 'Network error');
  } finally {
    clearTimeout(timeout);
  }
}

export interface Tribe {
  id: number;
  name: string;
  description: string;
  location?: string | null;
}

export interface Cause {
  id: number;
  name: string;
  mission: string;
  funding_goal: number;
  funds_raised: number;
  supporters_count: number;
  category?: string | null;
  urgency?: string | null;
  location?: string | null;
}

export async function fetchPublicConfig(): Promise<{ stripe_enabled: boolean }> {
  return request<{ stripe_enabled: boolean }>("/public/config");
}

export async function fetchTribes(): Promise<Tribe[]> {
  return request<Tribe[]>("/public/tribes");
}

export async function fetchCauses(): Promise<Cause[]> {
  return request<Cause[]>("/public/causes");
}

export async function createDonationCheckoutSession(causeId: number, amount: number): Promise<{ id: string; url: string }>{
  return request("/donations/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ cause_id: causeId, amount }),
  });
}

export async function suggestTribes(payload: { interests: string[]; skills: string[]; location: string[] }) {
  return request("/onboarding/suggest-tribes", {
    method: "POST",
    body: JSON.stringify(payload),
  }) as Promise<Array<{ id: number; name: string; description: string; location?: string | null; score: number }>>;
}

export async function createProBonoOffer(input: { cause_id: number; name: string; email: string; skills: string; hours: number }) {
  return request("/probono/offers", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function fetchCause(causeId: number): Promise<Cause> {
  return request<Cause>(`/public/causes/${causeId}`);
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string }
type ProfileDelta = { interests?: string[]; skills?: string[]; location_city?: string; location_country?: string }

export async function aiOnboardingChat(input: { session_id: string; user_id?: number | null; messages: Array<ChatMessage> }) {
  return request<{ reply: string; profile_delta: ProfileDelta }>("/onboarding/ai-chat", {
    method: "POST",
    body: JSON.stringify(input),
  });
}


