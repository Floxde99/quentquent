export const decodeAccountId = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    if (typeof globalThis === "undefined" || typeof globalThis.atob !== "function") return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = globalThis.atob(normalized);
    const parsed = JSON.parse(decoded);
    return parsed?.sub || null;
  } catch (error) {
    console.warn("Impossible de lire le token TMDB", error);
    return null;
  }
};

export const buildHttpError = async (response) => {
  let payload = null;
  try {
    payload = await response.clone().json();
  } catch {
    try {
      payload = await response.clone().text();
    } catch {
      payload = null;
    }
  }
  const message = typeof payload === "string"
    ? payload || `${response.status} ${response.statusText}`
    : payload?.status_message || `${response.status} ${response.statusText}`;
  const error = new Error(message);
  error.status = response.status;
  error.body = payload;
  error.url = response.url;
  return error;
};
