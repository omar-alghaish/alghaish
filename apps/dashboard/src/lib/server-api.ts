/**
 * Helper to build URLs pointing to the internal Express backend service.
 * In Vercel Services, process.env.SERVER_URL is injected by the service binding.
 * Falls back to NEXT_PUBLIC_API_URL or http://localhost:4000 for local development.
 */
export function getServerUrl(path: string = ""): URL {
  const base =
    process.env.SERVER_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return new URL(cleanPath, normalizedBase);
}
