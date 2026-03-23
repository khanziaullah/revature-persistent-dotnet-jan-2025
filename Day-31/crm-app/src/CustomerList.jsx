import CustomerCard from './CustomerCard'

const CustomerList = ({ customers }) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          name={customer.name}
          email={customer.email}
          company={customer.company}
          isActive={customer.isActive}
        />
      ))}
    </div>
  )
}

export default CustomerList
