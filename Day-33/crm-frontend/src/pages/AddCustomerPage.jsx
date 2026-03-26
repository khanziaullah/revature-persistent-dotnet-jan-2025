import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomerForm from '../components/forms/CustomerForm'
import { useCustomerContext } from '../context/CustomerContext'
import { useNotification } from '../context/NotificationContext'

const AddCustomerPage = () => {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState(null)
  const { addCustomer } = useCustomerContext()
  const { notify } = useNotification()

  const handleSubmit = async (formData) => {
    try {
      setSubmitError(null)
      await addCustomer(formData)
      notify('Customer added successfully.')
      navigate('/customers')
    } catch {
      setSubmitError('Failed to create customer. Please try again.')
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add Customer</h1>
      </div>
      {submitError && <p className="submit-error">{submitError}</p>}
      <CustomerForm
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}

export default AddCustomerPage
