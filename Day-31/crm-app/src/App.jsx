import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomersPage from './pages/CustomersPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import AddCustomerPage from './pages/AddCustomerPage'
import EditCustomerPage from './pages/EditCustomerPage'
import './index.css'

function App() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane.doe@acme.com', company: 'Acme Corp', phone: '415-555-0101', isActive: true },
    { id: 2, name: 'Bob Wilson', email: 'bob@globex.com', company: 'Globex Inc', phone: '415-555-0102', isActive: true },
    { id: 3, name: 'Sara Chen', email: 's.chen@initech.com', company: 'Initech', phone: '415-555-0103', isActive: false },
    { id: 4, name: 'Mike Ross', email: 'mike@piedpiper.com', company: 'Pied Piper', phone: '415-555-0104', isActive: true },
    { id: 5, name: 'Anna Bell', email: 'anna@hooli.com', company: 'Hooli', phone: '415-555-0105', isActive: true },
  ])

  const handleToggleActive = (id) => {
    setCustomers(customers.map((c) =>
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  const handleAddCustomer = (formData) => {
    setCustomers([...customers, { ...formData, id: Date.now(), isActive: true }])
  }

  const handleUpdateCustomer = (id, formData) => {
    setCustomers(customers.map((c) => c.id === id ? { ...c, ...formData } : c))
  }

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id))
  }

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={
            <CustomersPage customers={customers} onToggleActive={handleToggleActive} />
          } />
          <Route path="/customers/new" element={
            <AddCustomerPage onAddCustomer={handleAddCustomer} />
          } />
          <Route path="/customers/:id" element={
            <CustomerDetailPage
              customers={customers}
              onToggleActive={handleToggleActive}
              onDeleteCustomer={handleDeleteCustomer}
            />
          } />
          <Route path="/customers/:id/edit" element={
            <EditCustomerPage customers={customers} onUpdateCustomer={handleUpdateCustomer} />
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
