import { useParams, useNavigate, Link } from 'react-router-dom'

const CustomerDetailPage = ({ customers, onToggleActive, onDeleteCustomer }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  // useParams always returns strings — convert to number to match customer.id
  const customer = customers.find((c) => c.id === Number(id))

  if (!customer) {
    return (
      <div className="page-container">
        <p className="empty-state">Customer not found.</p>
        <Link to="/customers" className="back-link">← Back to customers</Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${customer.name}? This cannot be undone.`)) {
      onDeleteCustomer(customer.id)
      navigate('/customers')
    }
  }

  const initials = customer.name.split(' ').map((p) => p[0]).join('').toUpperCase()

  return (
    <div className="page-container">
      <div className="detail-header">
        <Link to="/customers" className="back-link">← Back</Link>
        <div className="detail-actions">
          <Link to={`/customers/${id}/edit`} className="btn-primary">Edit</Link>
          <button className="btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-avatar">{initials}</div>
        <h2 className="detail-name">{customer.name}</h2>
        <span
          className={`badge ${customer.isActive ? 'badge-active' : 'badge-inactive'}`}
          onClick={() => onToggleActive(customer.id)}
          title="Click to toggle status"
        >
          {customer.isActive ? 'Active' : 'Inactive'}
        </span>
        <div className="detail-fields">
          <div className="detail-field">
            <span className="detail-label">Email</span>
            <span className="detail-value">{customer.email}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Company</span>
            <span className="detail-value">{customer.company}</span>
          </div>
          <div className="detail-field">
            <span className="detail-label">Phone</span>
            <span className="detail-value">{customer.phone || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailPage
