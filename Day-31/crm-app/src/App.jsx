import { useState } from 'react'
import CustomerList from './components/CustomerList'
import SearchBar from './components/SearchBar'
import CustomerForm from './components/forms/CustomerForm'
import './index.css'

function App() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane.doe@acme.com', company: 'Acme Corp', phone: '415-555-0101', isActive: true },
    { id: 2, name: 'Bob Wilson', email: 'bob@globex.com', company: 'Globex Inc', phone: '415-555-0102', isActive: true },
    { id: 3, name: 'Sara Chen', email: 's.chen@initech.com', company: 'Initech', phone: '415-555-0103', isActive: false },
    { id: 4, name: 'Mike Ross', email: 'mike@piedpiper.com', company: 'Pied Piper', phone: '415-555-0104', isActive: true },
    { id: 5, name: 'Anna Bell', email: 'anna@hooli.com', company: 'Hooli', phone: '415-555-0105', isActive: true },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  // null = list view | 'add' = add form | customer object = edit form
  const [formMode, setFormMode] = useState(null)

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleToggleActive = (id) => {
    setCustomers(customers.map((c) =>
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ))
  }

  const handleAddCustomer = (formData) => {
    const newCustomer = {
      ...formData,
      id: Date.now(),
      isActive: true,
    }
    setCustomers([...customers, newCustomer])
    setFormMode(null)
  }

  const handleUpdateCustomer = (formData) => {
    setCustomers(customers.map((c) =>
      c.id === formMode.id ? { ...c, ...formData } : c
    ))
    setFormMode(null)
  }

  const isFormOpen = formMode !== null

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1>Customers</h1>
            <p className="app-subtitle">
              {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>
          {!isFormOpen && (
            <button
              className="btn-primary"
              onClick={() => setFormMode('add')}
            >
              + Add Customer
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {isFormOpen ? (
          <CustomerForm
            initialData={formMode === 'add' ? null : formMode}
            onSubmit={formMode === 'add' ? handleAddCustomer : handleUpdateCustomer}
            onCancel={() => setFormMode(null)}
          />
        ) : (
          <>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <CustomerList
              customers={filteredCustomers}
              selectedId={selectedId}
              onSelectCustomer={setSelectedId}
              onToggleActive={handleToggleActive}
              onEditCustomer={(customer) => setFormMode(customer)}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App
