// src/utils/filterCustomers.js
// Pure function — no side effects, no dependencies, trivially testable.
export const filterCustomers = (customers, searchTerm) =>
  customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase())
  )
