import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerList from '../components/CustomerList'
import SearchBar from '../components/SearchBar'

const CustomersPage = ({ customers, onToggleActive }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      <CustomerList customers={filteredCustomers} onToggleActive={onToggleActive} />
    </div>
  )
}

export default CustomersPage
