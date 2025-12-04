const Section = ({ title, children, className = "" }) => {
  return (
    <section className={`section ${className}`}>
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__content">{children}</div>
    </section>
  );
};

export default Section;
