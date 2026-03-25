import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import { CustomerProvider } from './context/CustomerContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <CustomerProvider>
          <App />
        </CustomerProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>,
)
