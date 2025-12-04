const CardsHeader = ({ resolvedAccountId, status, onRefresh }) => (
  <header className="cards-header">
    <div>
      <p className="cards-eyebrow">Recommandations TMDB</p>
      <h2>Films suggérés</h2>
    </div>
    <div className="cards-actions">
      {resolvedAccountId && <span className="cards-account">Compte : {resolvedAccountId}</span>}
      <button type="button" onClick={onRefresh} disabled={status === "loading"}>
        {status === "loading" ? "Chargement..." : "Actualiser"}
      </button>
    </div>
  </header>
);

export default CardsHeader;
