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

export const buildAxiosError = (error) => {
  if (!error) return new Error("Erreur inconnue");
  
  const status = error?.response?.status;
  const statusText = error?.response?.statusText || "";
  const data = error?.response?.data;
  const url = error?.config?.url || error?.request?.responseURL;
  
  const message = typeof data === "string"
    ? data || error.message || `${status} ${statusText}`
    : data?.status_message || error.message || `${status} ${statusText}`;
  
  const enrichedError = new Error(message);
  enrichedError.status = status;
  enrichedError.body = data;
  enrichedError.url = url;
  enrichedError.originalError = error;
  
  return enrichedError;
};
