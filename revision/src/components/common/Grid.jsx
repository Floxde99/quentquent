const Grid = ({ children, columns = "auto-fill", minWidth = "220px", gap = "1.5rem", className = "", style: customStyle = {} }) => {
  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
    gap,
    ...customStyle,
  };
  return <div className={className} style={style}>{children}</div>;
};

export default Grid;
