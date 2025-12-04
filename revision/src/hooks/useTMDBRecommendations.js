import { useEffect, useMemo, useState } from "react";
import { decodeAccountId, buildHttpError } from "../utils/tmdbUtils";

const TMDB_BASE_URL = "https://api.themoviedb.org/4";

export const useTMDBRecommendations = (token, forcedAccountId, language) => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(token ? "idle" : "error");
  const [message, setMessage] = useState(token ? "" : "Configure VITE_TMDB_BEARER_TOKEN pour utiliser TMDB.");
  const [resolvedAccountId, setResolvedAccountId] = useState(forcedAccountId || null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const decodedAccountId = useMemo(() => decodeAccountId(token), [token]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const controller = new AbortController();

    const fetchMovies = async () => {
      setStatus("loading");
      try {
        const headers = { accept: "application/json", Authorization: `Bearer ${token}` };
        let accountId = forcedAccountId || decodedAccountId;

        if (!accountId) {
          const res = await fetch(`${TMDB_BASE_URL}/account`, { headers, signal: controller.signal });
          if (!res.ok) throw await buildHttpError(res);
          accountId = (await res.json())?.id;
        }
        if (!accountId) throw new Error("Impossible de déterminer ton account_id TMDB.");
        if (cancelled) return;
        setResolvedAccountId(accountId);

        const url = `${TMDB_BASE_URL}/account/${accountId}/movie/recommendations?page=${page}&language=${encodeURIComponent(language)}`;
        const res = await fetch(url, { headers, signal: controller.signal });
        if (!res.ok) throw await buildHttpError(res);
        const data = await res.json();

        if (cancelled) return;
        setMovies(Array.isArray(data?.results) ? data.results : []);
        setTotalPages(data?.total_pages || 1);
        setStatus("success");
      } catch (error) {
        if (cancelled) return;
        console.error("TMDB error", error);
        setStatus("error");
        setMessage(error.message || "Erreur inconnue");
      }
    };

    fetchMovies();
    return () => { cancelled = true; controller.abort(); };
  }, [token, forcedAccountId, decodedAccountId, page, language]);

  return { movies, status, message, resolvedAccountId, page, totalPages, setPage };
};
