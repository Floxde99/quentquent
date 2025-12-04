const MetaGrid = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <div className="meta-grid">
      <div className="meta-grid__container">
        {items.map((item, idx) => (
          <div key={idx} className="meta-grid__item">
            <span className="meta-grid__label">{item.label}</span>
            <span className="meta-grid__value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetaGrid;
