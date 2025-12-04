import { useTMDBRecommendations } from "../../hooks/useTMDBRecommendations";
import CardsHeader from "./CardsHeader";
import CardsFeedback from "./CardsFeedback";
import CardsGrid from "./CardsGrid";
import Pagination from "../common/Pagination";
import "./Card.css";

const Cards = () => {
  const token = (import.meta.env.VITE_TMDB_BEARER_TOKEN || "").trim();
  const forcedAccountId = (import.meta.env.VITE_TMDB_ACCOUNT_ID || "").trim();
  const language = (import.meta.env.VITE_TMDB_LANGUAGE || "fr-FR").trim();
  const { movies, status, message, resolvedAccountId, page, totalPages, setPage } = useTMDBRecommendations(token, forcedAccountId, language);

  const showFeedback = status !== "success" || movies.length === 0;

  return (
    <section className="cards-section">
      <CardsHeader resolvedAccountId={resolvedAccountId} status={status} onRefresh={() => setPage(1)} />
      {showFeedback ? <CardsFeedback status={status} message={message} hasToken={!!token} /> : (
        <>
          <CardsGrid movies={movies} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  );
};

export default Cards;
