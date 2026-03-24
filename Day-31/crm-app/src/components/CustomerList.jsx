// CustomerList.jsx — passes full customer object to onEditCustomer
// CustomerCard only needs to call onEditCustomer() — the object is already bound here

import CustomerCard from './CustomerCard'

const CustomerList = ({ customers, selectedId, onSelectCustomer, onToggleActive, onEditCustomer }) => {
  if (customers.length === 0) {
    return <p className="empty-state">No customers match your search.</p>
  }

  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          id={customer.id}
          name={customer.name}
          email={customer.email}
          company={customer.company}
          isActive={customer.isActive}
          isSelected={customer.id === selectedId}
          onClick={() => onSelectCustomer(customer.id)}
          onToggleActive={onToggleActive}
          onEditCustomer={() => onEditCustomer(customer)}
        />
      ))}
    </div>
  )
}

export default CustomerList
