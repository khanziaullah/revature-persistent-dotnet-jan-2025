// Entire card is a Link to /customers/:id
// Edit button is a Link to /customers/:id/edit
// Badge click calls e.preventDefault() to stop the outer Link from navigating

import { Link } from 'react-router-dom'

const CustomerCard = ({ id, name, email, company, isActive, onToggleActive }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const handleBadgeClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleActive(id)
  }

  return (
    <Link to={`/customers/${id}`} className="customer-card-link">
      <div className="customer-card">
        <div className="customer-avatar">{initials}</div>
        <div className="customer-info">
          <h3 className="customer-name">{name}</h3>
          <p className="customer-email">{email}</p>
          <p className="customer-company">{company}</p>
        </div>
        <div className="customer-card-actions">
          <span
            className={`badge ${isActive ? 'badge-active' : 'badge-inactive'}`}
            onClick={handleBadgeClick}
            title="Click to toggle status"
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
          <Link
            to={`/customers/${id}/edit`}
            className="btn-edit-card"
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Link>
        </div>
      </div>
    </Link>
  )
}

export default CustomerCard
