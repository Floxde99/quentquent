const CardsFeedback = ({ status, message, hasToken }) => {
  if (status === "loading") return <div className="cards-feedback">Chargement des films…</div>;
  if (status === "error") return (
    <div className="cards-feedback cards-feedback--error">
      <p>{message}</p>
      {!hasToken && <p>Ajoute VITE_TMDB_BEARER_TOKEN dans ton fichier .env.</p>}
    </div>
  );
  return <div className="cards-feedback">Pas de recommandations pour le moment.</div>;
};

export default CardsFeedback;
