const Button = ({ children, onClick, disabled = false, className = "", variant = "primary" }) => {
  const baseClass = `btn btn--${variant}${disabled ? " btn--disabled" : ""}`;
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
