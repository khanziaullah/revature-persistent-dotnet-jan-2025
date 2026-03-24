import { useParams, useNavigate } from 'react-router-dom'
import CustomerForm from '../components/forms/CustomerForm'

const EditCustomerPage = ({ customers, onUpdateCustomer }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const customer = customers.find((c) => c.id === Number(id))

  if (!customer) {
    return (
      <div className="page-container">
        <p className="empty-state">Customer not found.</p>
      </div>
    )
  }

  const handleSubmit = (formData) => {
    onUpdateCustomer(customer.id, formData)
    navigate(`/customers/${id}`)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Edit Customer</h1>
      </div>
      <CustomerForm initialData={customer} onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

export default EditCustomerPage
