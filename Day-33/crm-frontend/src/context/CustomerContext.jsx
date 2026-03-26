import { createContext, useContext, useState, useEffect } from 'react'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customersApi'

const CustomerContext = createContext(null)

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCustomers()
      setCustomers(response.data)
    } catch (err) {
      setError('Failed to load customers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCustomers() }, [])

  const addCustomer = async (data) => {
    await createCustomer(data)
    await fetchCustomers()
  }

  const editCustomer = async (id, data) => {
    await updateCustomer(id, data)
    await fetchCustomers()
  }

  const removeCustomer = async (id) => {
    await deleteCustomer(id)
    await fetchCustomers()
  }

  const toggleActive = async (id, currentStatus) => {
    await updateCustomer(id, { isActive: !currentStatus })
    await fetchCustomers()
  }

  return (
    <CustomerContext.Provider value={{
      customers, loading, error,
      addCustomer, editCustomer, removeCustomer, toggleActive,
      refetch: fetchCustomers,
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerContext = () => {
  const context = useContext(CustomerContext)
  if (!context) throw new Error('useCustomerContext must be used inside CustomerProvider')
  return context
}
