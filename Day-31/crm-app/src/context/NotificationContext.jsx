import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext(null)

const Toast = ({ notification }) => (
  <div className={`toast toast--${notification.type}`}>
    <span className="toast-icon">{notification.type === 'error' ? '⚠' : '✓'}</span>
    <span className="toast-message">{notification.message}</span>
  </div>
)

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
      {notification && <Toast notification={notification} />}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used inside NotificationProvider')
  return context
}
