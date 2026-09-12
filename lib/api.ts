/**
 * Triangle Analytics Frontend API Client
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface User {
  id: string;
  name: string;
  email: string;
  timezone?: string;
  preferences?: {
    anonymizeIp?: boolean;
    excludeLocalhost?: boolean;
    cookieFree?: boolean;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SiteItem {
  id: string;
  siteId: string;
  name: string;
  domain: string;
  status: "Active" | "Pending" | "Unverified";
  visitors: string;
  pageViews: string;
  bounceRate: string;
  createdAt: string;
}

export interface OverviewStats {
  visitors: string;
  pageViews: string;
  bounceRate: string;
  changes: {
    visitors: string;
    pageViews: string;
    bounceRate: string;
  };
}

export interface TimeseriesPoint {
  date: string;
  visitors: number;
  pageViews?: number;
  pageviews?: number;
  bounceRate?: number;
}

export interface DimensionItem {
  name: string;
  count: number;
  percentage: number;
}

export interface VisitorSession {
  visitorId: string;
  sessionId: string;
  entryPage: string;
  pagesViewed: number;
  country: string;
  device: string;
  deviceModel?: string;
  carrier?: string;
  browser: string;
  os: string;
  durationMs?: number;
  lastSeen: string;
}

export interface CustomEventItem {
  name: string;
  pathname: string;
  props: Record<string, unknown>;
  createdAt: string;
}

/**
 * Store auth session in localStorage and cookie (for Next.js middleware)
 */
export function setAuthSession(token: string, user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    document.cookie = `auth_token=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
  }
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

/**
 * Get stored user profile
 */
export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clear auth session and cookie
 */
export function clearAuthSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
  }
}

/**
 * Authenticated fetch helper
 */
async function fetchWithAuth<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = (data as { error?: string })?.error || `Request failed (${response.status})`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  auth: {
    async signIn(email: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error((data as { error?: string })?.error || "Invalid credentials");
      }

      const authData = data as AuthResponse;
      setAuthSession(authData.token, authData.user);
      return authData;
    },

    async signUp(name: string, email: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error((data as { error?: string })?.error || "Registration failed");
      }

      const authData = data as AuthResponse;
      setAuthSession(authData.token, authData.user);
      return authData;
    },

    async getMe(): Promise<{ user: User }> {
      return fetchWithAuth<{ user: User }>("/api/auth/me");
    },

    async updateProfile(data: {
      name?: string;
      timezone?: string;
      preferences?: {
        anonymizeIp?: boolean;
        excludeLocalhost?: boolean;
        cookieFree?: boolean;
      };
    }): Promise<{ user: User }> {
      const res = await fetchWithAuth<{ user: User }>("/api/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (res?.user && typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      return res;
    },

    signOut(): void {
      clearAuthSession();
    },
  },

  dash: {
    async getSites(): Promise<{ sites: SiteItem[] }> {
      return fetchWithAuth<{ sites: SiteItem[] }>("/api/dash/sites");
    },

    async createSite(name: string, domain: string): Promise<SiteItem> {
      return fetchWithAuth<SiteItem>("/api/dash/sites", {
        method: "POST",
        body: JSON.stringify({ name, domain }),
      });
    },

    async deleteSite(siteId: string): Promise<{ deleted: boolean }> {
      return fetchWithAuth<{ deleted: boolean }>(`/api/dash/sites/${siteId}`, {
        method: "DELETE",
      });
    },

    async verifySite(siteId: string): Promise<{ verified: boolean; message?: string; status?: string }> {
      return fetchWithAuth<{ verified: boolean; message?: string; status?: string }>(`/api/dash/sites/${siteId}/verify`, {
        method: "POST",
      });
    },

    async getOverviewStats(siteId: string, period = "7d"): Promise<OverviewStats> {
      return fetchWithAuth<OverviewStats>(`/api/dash/overview/stats?site_id=${siteId}&period=${period}`);
    },

    async getTimeseries(siteId: string, period = "7d"): Promise<TimeseriesPoint[]> {
      return fetchWithAuth<TimeseriesPoint[]>(`/api/dash/overview/timeseries?site_id=${siteId}&period=${period}`);
    },

    async getTopPages(siteId: string, period = "7d"): Promise<{ Pages: DimensionItem[]; Routes: DimensionItem[]; Hostnames: DimensionItem[] }> {
      return fetchWithAuth<{ Pages: DimensionItem[]; Routes: DimensionItem[]; Hostnames: DimensionItem[] }>(
        `/api/dash/overview/pages?site_id=${siteId}&period=${period}`
      );
    },

    async getTopReferrers(siteId: string, period = "7d"): Promise<{ Referrers: DimensionItem[]; "UTM Parameters": DimensionItem[] }> {
      return fetchWithAuth<{ Referrers: DimensionItem[]; "UTM Parameters": DimensionItem[] }>(
        `/api/dash/overview/referrers?site_id=${siteId}&period=${period}`
      );
    },

    async getTopCountries(siteId: string, period = "7d"): Promise<{ Countries: DimensionItem[]; Carriers?: DimensionItem[]; Networks?: DimensionItem[] }> {
      return fetchWithAuth<{ Countries: DimensionItem[]; Carriers?: DimensionItem[]; Networks?: DimensionItem[] }>(
        `/api/dash/overview/countries?site_id=${siteId}&period=${period}`
      );
    },

    async getTopDevices(siteId: string, period = "7d"): Promise<{ Devices: DimensionItem[]; Models?: DimensionItem[]; Browsers: DimensionItem[] }> {
      return fetchWithAuth<{ Devices: DimensionItem[]; Models?: DimensionItem[]; Browsers: DimensionItem[] }>(
        `/api/dash/overview/devices?site_id=${siteId}&period=${period}`
      );
    },

    async getTopOS(siteId: string, period = "7d"): Promise<{ "Operating Systems": DimensionItem[] }> {
      return fetchWithAuth<{ "Operating Systems": DimensionItem[] }>(
        `/api/dash/overview/os?site_id=${siteId}&period=${period}`
      );
    },

    async getEventsSummary(siteId: string, period = "7d"): Promise<{ Events: DimensionItem[] }> {
      return fetchWithAuth<{ Events: DimensionItem[] }>(
        `/api/dash/overview/events?site_id=${siteId}&period=${period}`
      );
    },

    async getRealtimeActive(siteId: string): Promise<{ activeVisitors: number }> {
      return fetchWithAuth<{ activeVisitors: number }>(`/api/dash/overview/realtime?site_id=${siteId}`);
    },

    async getVisitors(siteId: string, period = "7d", page = 1, perPage = 10): Promise<{ sessions: VisitorSession[]; total: number; page: number; totalPages: number }> {
      return fetchWithAuth<{ sessions: VisitorSession[]; total: number; page: number; totalPages: number }>(
        `/api/dash/visitors?site_id=${siteId}&period=${period}&page=${page}&per_page=${perPage}`
      );
    },

    async getEvents(siteId: string, period = "7d", page = 1, perPage = 10): Promise<{ events: CustomEventItem[]; total: number; page: number; totalPages: number }> {
      return fetchWithAuth<{ events: CustomEventItem[]; total: number; page: number; totalPages: number }>(
        `/api/dash/events?site_id=${siteId}&period=${period}&page=${page}&per_page=${perPage}`
      );
    },
  },
};
