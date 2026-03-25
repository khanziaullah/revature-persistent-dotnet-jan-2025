import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerList from '../components/CustomerList'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useCustomerContext } from '../context/CustomerContext'
import { useNotification } from '../context/NotificationContext'

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { customers, loading, error, toggleActive, removeCustomer, refetch } = useCustomerContext()
  const { notify } = useNotification()

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await toggleActive(id, currentStatus)
      notify('Customer status updated.')
    } catch {
      notify('Failed to update status.', 'error')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return
    try {
      await removeCustomer(id)
      notify('Customer deleted.')
    } catch {
      notify('Failed to delete customer.', 'error')
    }
  }

  if (loading) return <LoadingSpinner />
  if (error)   return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">
            {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
        <Link to="/customers/new" className="btn-primary">+ Add Customer</Link>
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CustomerList
        customers={filteredCustomers}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default CustomersPage
