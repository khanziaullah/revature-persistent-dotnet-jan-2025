import { useNavigate } from 'react-router-dom'
import CustomerForm from '../components/forms/CustomerForm'

const AddCustomerPage = ({ onAddCustomer }) => {
  const navigate = useNavigate()

  const handleSubmit = (formData) => {
    onAddCustomer(formData)
    navigate('/customers')
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add Customer</h1>
      </div>
      <CustomerForm initialData={null} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

export default AddCustomerPage
