// ErrorMessage.jsx
// Shown when an API call fails.
// Optional onRetry prop renders a Retry button.
//
// Props:
//   message  (string)             — error text to display
//   onRetry  (function, optional) — called when user clicks Retry

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <p className="error-icon">⚠</p>
      <p className="error-text">{message}</p>
      {/* TODO: Render a Retry button if onRetry prop is provided */}
    </div>
  )
}

export default ErrorMessage
