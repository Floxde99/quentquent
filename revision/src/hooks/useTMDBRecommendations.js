import { useEffect, useMemo, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { decodeAccountId, buildAxiosError } from "../utils/tmdbUtils";

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
        const configBase = { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } };
        let accountId = forcedAccountId || decodedAccountId;

        if (!accountId) {
          const res = await axiosClient.get("/account", configBase);
          accountId = res?.data?.id;
        }
        if (!accountId) throw new Error("Impossible de déterminer ton account_id TMDB.");
        if (cancelled) return;
        setResolvedAccountId(accountId);
        
        const res = await axiosClient.get(`/account/${accountId}/movie/recommendations`, { 
          ...configBase, 
          params: { page, language } 
        });
        const data = res?.data;

        if (cancelled) return;
        setMovies(Array.isArray(data?.results) ? data.results : []);
        setTotalPages(data?.total_pages || 1);
        setStatus("success");
      } catch (error) {
        if (cancelled) return;
        const enrichedError = buildAxiosError(error);
        console.error("TMDB error", enrichedError);
        setStatus("error");
        setMessage(enrichedError.message);
      }
    };

    fetchMovies();
    return () => { cancelled = true; controller.abort(); };
  }, [token, forcedAccountId, decodedAccountId, page, language]);

  return { movies, status, message, resolvedAccountId, page, totalPages, setPage };
};
