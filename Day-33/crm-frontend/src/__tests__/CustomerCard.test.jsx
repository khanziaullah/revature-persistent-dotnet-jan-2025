import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CustomerCard from '../components/CustomerCard'

const renderCard = (props = {}) => {
  const defaults = {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe@acme.com',
    company: 'Acme Corp',
    isActive: true,
    onToggleActive: vi.fn(),
  }
  return render(
    <MemoryRouter>
      <CustomerCard {...defaults} {...props} />
    </MemoryRouter>
  )
}

// ─── Rendering ────────────────────────────────────────────

test('renders customer name', () => {
  renderCard()
  expect(screen.getByText('Jane Doe')).toBeInTheDocument()
})

test('renders customer email', () => {
  renderCard()
  expect(screen.getByText('jane.doe@acme.com')).toBeInTheDocument()
})

test('renders customer company', () => {
  renderCard()
  expect(screen.getByText('Acme Corp')).toBeInTheDocument()
})

test('renders initials in avatar', () => {
  renderCard({ name: 'Ziaullah Khan' })
  expect(screen.getByText('ZK')).toBeInTheDocument()
})

// ─── Badge Display ────────────────────────────────────────

test('shows Active badge when isActive is true', () => {
  renderCard({ isActive: true })
  expect(screen.getByText('Active')).toBeInTheDocument()
})

test('shows Inactive badge when isActive is false', () => {
  renderCard({ isActive: false })
  expect(screen.getByText('Inactive')).toBeInTheDocument()
})

// ─── Interactions ─────────────────────────────────────────

test('calls onToggleActive when badge is clicked', async () => {
  const onToggleActive = vi.fn()
  renderCard({ onToggleActive })

  await userEvent.click(screen.getByText('Active'))
  expect(onToggleActive).toHaveBeenCalledTimes(1)
})

test('does not call onToggleActive when card body is clicked', async () => {
  const onToggleActive = vi.fn()
  renderCard({ onToggleActive })

  await userEvent.click(screen.getByText('Jane Doe'))
  expect(onToggleActive).not.toHaveBeenCalled()
})
