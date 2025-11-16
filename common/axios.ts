import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function createBaseClient(): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    // withCredentials: true, // allow cookie-based auth if BE supports it
  });
}

// Public client - no auth interceptors. Use for unauthenticated endpoints (login, oauth callback...)
export function getPublicApi(): AxiosInstance {
  return createBaseClient();
}

// ADMIN (CSR) — Pure JWT via localStorage
export function getAdminApi(): AxiosInstance {
  const client = createBaseClient();

  client.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        window.location.href = "/admin/auth/sign-in";
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return client;
}

// CLIENT STORE FRONT — JWT from localStorage
export function getClientApi(): AxiosInstance {
  const client = createBaseClient();

  client.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        // Clear tokens on unauthorized
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}

// STORE FRONT — NextAuth
// SSR: forward cookies to BE; CSR: attach session access token if present
export async function getStoreApi(options?: { ssr?: boolean; headers?: Record<string, string> }): Promise<AxiosInstance> {
  const client = createBaseClient();

  const isServer = typeof window === "undefined";
  const useSSR = options?.ssr ?? isServer;

  if (useSSR) {
    // Server-side: forward incoming request cookies to backend
    try {
      // Lazy import to avoid client bundle bloat
      const { cookies } = await import("next/headers");
      const cookieHeader = cookies().toString();

      client.interceptors.request.use((config) => {
        config.headers = config.headers ?? {};
        if (cookieHeader) (config.headers as Record<string, string>).Cookie = cookieHeader;
        if (options?.headers) {
          Object.assign(config.headers as Record<string, string>, options.headers);
        }
        return config;
      });
    } catch {
      // next/headers not available; continue without cookie forwarding
    }
  } else {
    // Client-side: read NextAuth session and add Authorization if available
    client.interceptors.request.use(async (config) => {
      try {
        // Avoid static resolution to keep this file usable without next-auth installed
        const dynamicImport: (m: string) => Promise<{ getSession: () => Promise<unknown> }> =
          new Function("m", "return import(m)") as (m: string) => Promise<{ getSession: () => Promise<unknown> }>;
        const mod = await dynamicImport("next-auth/react");
        type SessionLike = { accessToken?: string; user?: { accessToken?: string } } | null;
        const session = (await mod.getSession()) as SessionLike;
        const accessToken = session?.accessToken ?? session?.user?.accessToken;
        if (accessToken) {
          config.headers = config.headers ?? {};
          (config.headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        // next-auth not initialized on this page; skip token
      }
      return config;
    });
  }

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Storefront-specific handling can go here
      return Promise.reject(error);
    }
  );

  return client;
}

// Legacy default export kept for backward compatibility (admin behavior)
const legacy = getAdminApi();
export default legacy;
