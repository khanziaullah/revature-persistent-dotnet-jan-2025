// CustomerCard.jsx — now includes an Edit button
// onEditCustomer receives the full customer object from CustomerList

const CustomerCard = ({ id, name, email, company, isActive, isSelected, onClick, onToggleActive, onEditCustomer }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const handleBadgeClick = (e) => {
    e.stopPropagation()
    onToggleActive(id)
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    onEditCustomer()
  }

  return (
    <div
      className={`customer-card ${isSelected ? 'customer-card--selected' : ''}`}
      onClick={onClick}
    >
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
        <button className="btn-edit-card" onClick={handleEditClick}>
          Edit
        </button>
      </div>
    </div>
  )
}

export default CustomerCard
