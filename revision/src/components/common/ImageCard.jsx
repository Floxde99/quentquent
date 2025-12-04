const ImageCard = ({ image, alt, title, subtitle, className = "" }) => {
  return (
    <div className={`image-card ${className}`}>
      {image ? (
        <img src={image} alt={alt} className="image-card__image" loading="lazy" />
      ) : (
        <div className="image-card__placeholder" />
      )}
      {(title || subtitle) && (
        <div className="image-card__content">
          {title && <h3 className="image-card__title">{title}</h3>}
          {subtitle && <p className="image-card__subtitle">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
