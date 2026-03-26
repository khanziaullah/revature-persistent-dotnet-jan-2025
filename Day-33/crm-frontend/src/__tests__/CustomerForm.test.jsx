import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerForm from '../components/forms/CustomerForm'

const renderForm = (props = {}) =>
  render(<CustomerForm onSubmit={vi.fn()} onCancel={vi.fn()} {...props} />)

// ─── Add Mode ─────────────────────────────────────────────

test('renders Add Customer title when no initialData', () => {
  renderForm()
  expect(screen.getByText('Add Customer')).toBeInTheDocument()
})

test('shows validation errors when submitted empty', async () => {
  renderForm()
  await userEvent.click(screen.getByRole('button', { name: /add customer/i }))

  expect(screen.getByText('Name is required')).toBeInTheDocument()
  expect(screen.getByText('Email is required')).toBeInTheDocument()
  expect(screen.getByText('Company is required')).toBeInTheDocument()
})

test('shows email format error for invalid email', async () => {
  renderForm()
  await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe')
  await userEvent.type(screen.getByLabelText(/email address/i), 'not-an-email')
  await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
  await userEvent.click(screen.getByRole('button', { name: /add customer/i }))

  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
})

test('calls onSubmit with correct data when form is valid', async () => {
  const onSubmit = vi.fn()
  renderForm({ onSubmit })

  await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe')
  await userEvent.type(screen.getByLabelText(/email address/i), 'jane@acme.com')
  await userEvent.type(screen.getByLabelText(/company/i), 'Acme Corp')
  await userEvent.click(screen.getByRole('button', { name: /add customer/i }))

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Jane Doe',
    email: 'jane@acme.com',
    company: 'Acme Corp',
    phone: '',
  })
})

test('does not call onSubmit when validation fails', async () => {
  const onSubmit = vi.fn()
  renderForm({ onSubmit })

  await userEvent.click(screen.getByRole('button', { name: /add customer/i }))
  expect(onSubmit).not.toHaveBeenCalled()
})

// ─── Edit Mode ────────────────────────────────────────────

test('renders Edit Customer title when initialData is provided', () => {
  renderForm({
    initialData: { name: 'Jane Doe', email: 'jane@acme.com', company: 'Acme', phone: '' },
  })
  expect(screen.getByText('Edit Customer')).toBeInTheDocument()
})

test('pre-fills fields with initialData values', () => {
  renderForm({
    initialData: { name: 'Jane Doe', email: 'jane@acme.com', company: 'Acme Corp', phone: '415-555-0101' },
  })
  expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument()
  expect(screen.getByDisplayValue('jane@acme.com')).toBeInTheDocument()
})

test('calls onCancel when Cancel button is clicked', async () => {
  const onCancel = vi.fn()
  renderForm({ onCancel })

  await userEvent.click(screen.getByRole('button', { name: /cancel/i }))
  expect(onCancel).toHaveBeenCalledTimes(1)
})
