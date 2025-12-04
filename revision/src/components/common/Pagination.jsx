const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav className="pagination">
      <button className="pagination__btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>←</button>
      {getPages().map((p) => (
        <button key={p} className={`pagination__btn ${p === page ? "pagination__btn--active" : ""}`} onClick={() => onPageChange(p)}>{p}</button>
      ))}
      <button className="pagination__btn" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>→</button>
      <span className="pagination__info">{page} / {totalPages}</span>
    </nav>
  );
};

export default Pagination;
