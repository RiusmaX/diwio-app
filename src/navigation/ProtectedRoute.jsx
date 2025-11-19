import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute ({ children }) {
  const { state: { user, jwt } } = useAuth()

  if (!user || !jwt) {
    return <Navigate to='/auth' />
  }

  return children
}

export default ProtectedRoute
