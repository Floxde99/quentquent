const ErrorState = ({ message, action, actionLabel = "Retour" }) => {
  return (
    <div className="state-error">
      <p>{message}</p>
      {action && (
        <button onClick={action} className="state-error__btn">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
