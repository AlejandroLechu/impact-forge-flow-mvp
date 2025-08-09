export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
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

export async function aiOnboardingChat(input: { session_id: string; user_id?: number | null; messages: Array<{ role: string; content: string }> }) {
  return request<{ reply: string; profile_delta: any }>("/onboarding/ai-chat", {
    method: "POST",
    body: JSON.stringify(input),
  });
}


