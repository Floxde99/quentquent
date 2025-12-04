import './Modal.css';

const Modal = ({ open, title, message, onClose, children, className = "", hideFooter = false }) => {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={`modal-card ${className}`} role="document">
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        </header>
        <div className="modal-body">
          {message && <p className="modal-message">{message}</p>}
          {children}
        </div>
        {!hideFooter && (
          <footer className="modal-footer">
            <button className="modal-ok" onClick={onClose}>OK</button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
