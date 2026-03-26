import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from '../components/forms/CustomerForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useCustomerContext } from '../context/CustomerContext'
import { useNotification } from '../context/NotificationContext'

const EditCustomerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState(null)
  const { customers, loading, error, editCustomer, refetch } = useCustomerContext()
  const { notify } = useNotification()

  const customer = customers.find((c) => c.id === Number(id))

  if (loading) return <LoadingSpinner />
  if (error)   return <ErrorMessage message={error} onRetry={refetch} />
  if (!customer) return (
    <div className="page-container">
      <p className="empty-state">Customer not found.</p>
    </div>
  )

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null)
      await editCustomer(Number(id), formData)
      notify('Customer updated successfully.')
      navigate(`/customers/${id}`)
    } catch {
      setSubmitError('Failed to update customer. Please try again.')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Edit Customer</h1>
      </div>
      {submitError && <p className="submit-error">{submitError}</p>}
      <CustomerForm
        initialData={customer}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}

export default EditCustomerPage
