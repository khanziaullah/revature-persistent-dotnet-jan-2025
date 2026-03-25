import { useParams, useNavigate, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useCustomerContext } from '../context/CustomerContext'
import { useNotification } from '../context/NotificationContext'

const CustomerDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { customers, loading, error, toggleActive, removeCustomer, refetch } = useCustomerContext()
  const { notify } = useNotification()

  const customer = customers.find((c) => c.id === Number(id))

  if (loading)   return <LoadingSpinner />
  if (error)     return <ErrorMessage message={error} onRetry={refetch} />
  if (!customer) return (
    <div className="page-container">
      <p className="empty-state">Customer not found.</p>
      <Link to="/customers" className="back-link">← Back to customers</Link>
    </div>
  )

  const initials = customer.name.split(' ').map((p) => p[0]).join('').toUpperCase()

  const handleToggleActive = async () => {
    try {
      await toggleActive(customer.id, customer.isActive)
      notify('Customer status updated.')
    } catch {
      notify('Failed to update status.', 'error')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${customer.name}? This cannot be undone.`)) return
    try {
      await removeCustomer(customer.id)
      notify('Customer deleted.')
      navigate('/customers')
    } catch {
      notify('Failed to delete customer.', 'error')
    }
  }

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
          onClick={handleToggleActive}
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
