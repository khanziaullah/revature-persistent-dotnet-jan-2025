import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NotificationProvider } from '../context/NotificationContext'
import { CustomerProvider } from '../context/CustomerContext'
import CustomersPage from '../pages/CustomersPage'
import * as api from '../api/customersApi'

vi.mock('../api/customersApi')

const renderPage = () =>
  render(
    <MemoryRouter>
      <NotificationProvider>
        <CustomerProvider>
          <CustomersPage />
        </CustomerProvider>
      </NotificationProvider>
    </MemoryRouter>
  )

const mockCustomers = [
  { id: 1, name: 'Jane Doe',   email: 'jane@acme.com',  company: 'Acme Corp',  isActive: true  },
  { id: 2, name: 'Bob Wilson', email: 'bob@globex.com', company: 'Globex Inc', isActive: false },
]

// ─── Loading State ────────────────────────────────────────

test('shows loading spinner on initial render', () => {
  vi.mocked(api.getCustomers).mockReturnValue(new Promise(() => {})) // never resolves
  renderPage()
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

// ─── Success State ────────────────────────────────────────

test('renders customer names after successful fetch', async () => {
  vi.mocked(api.getCustomers).mockResolvedValue({ data: mockCustomers })
  renderPage()

  await waitFor(() => {
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument()
  })
})

test('renders customer count in subtitle', async () => {
  vi.mocked(api.getCustomers).mockResolvedValue({ data: mockCustomers })
  renderPage()

  await waitFor(() => {
    expect(screen.getByText('2 of 2 customers')).toBeInTheDocument()
  })
})

// ─── Error State ──────────────────────────────────────────

test('shows error message when API fails', async () => {
  vi.mocked(api.getCustomers).mockRejectedValue(new Error('Network error'))
  renderPage()

  await waitFor(() => {
    expect(screen.getByText(/failed to load customers/i)).toBeInTheDocument()
  })
})
