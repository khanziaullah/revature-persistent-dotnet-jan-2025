import React from 'react'
import CustomerCard from './CustomerCard'

const CustomerList = ({ customers }) => {
  return (
    <>
      <div>Customer Count : {customers.length}</div>
      {
        customers.map((customer) => (
          <CustomerCard {...customer} />
        ))
      }
    </>
  )
}

export default CustomerList