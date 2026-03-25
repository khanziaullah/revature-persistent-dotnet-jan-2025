// LoadingSpinner.jsx
// Shown while any API request is in flight.
// Pure presentational — no props needed.

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default LoadingSpinner
