import { filterCustomers } from '../utils/filterCustomers'

const customers = [
  { id: 1, name: 'Jane Doe',   company: 'Acme Corp'  },
  { id: 2, name: 'Bob Wilson', company: 'Globex Inc' },
  { id: 3, name: 'Sara Chen',  company: 'Initech'    },
]

test('returns all customers when search term is empty', () => {
  expect(filterCustomers(customers, '')).toHaveLength(3)
})

test('filters by customer name (case-insensitive)', () => {
  const result = filterCustomers(customers, 'jane')
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('Jane Doe')
})

test('filters by company name', () => {
  const result = filterCustomers(customers, 'glob')
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('Bob Wilson')
})

test('matches partial search terms', () => {
  const result = filterCustomers(customers, 'ech')
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('Sara Chen')
})

test('returns empty array when no customers match', () => {
  expect(filterCustomers(customers, 'zzz')).toHaveLength(0)
})

test('is case-insensitive for company search', () => {
  const result = filterCustomers(customers, 'ACME')
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('Jane Doe')
})
