/**
 * Triangle Analytics Frontend API Client
 * Connects to live backend: https://triangle-analytics-api-5e8e94f7dd98.herokuapp.com
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://triangle-analytics-api-5e8e94f7dd98.herokuapp.com";

export interface User {
  id: string;
  name: string;
  email: string;
  timezone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Store auth session in localStorage and cookie (for Next.js middleware)
 */
export function setAuthSession(token: string, user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    // Set 30-day cookie for middleware authentication
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

    signOut(): void {
      clearAuthSession();
    },
  },

  dash: {
    async getSites(): Promise<{ sites: Array<{ id: string; siteId: string; name: string; domain: string; status: string; visitors: string; pageViews: string; bounceRate: string }> }> {
      return fetchWithAuth("/api/dash/sites");
    },

    async createSite(name: string, domain: string) {
      return fetchWithAuth("/api/dash/sites", {
        method: "POST",
        body: JSON.stringify({ name, domain }),
      });
    },

    async deleteSite(siteId: string) {
      return fetchWithAuth(`/api/dash/sites/${siteId}`, {
        method: "DELETE",
      });
    },

    async verifySite(siteId: string) {
      return fetchWithAuth(`/api/dash/sites/${siteId}/verify`, {
        method: "POST",
      });
    },
  },
};
