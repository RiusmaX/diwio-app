import { createContext, useContext, useReducer } from 'react'
import { register as registerApi } from '../services/Strapi'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOADING: 'LOADING'
}

const initialState = {
  jwt: null,
  user: null,
  error: null,
  loading: false
}

const AuthReducer = (previousState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        error: null,
        loading: false
      }
    case actionTypes.REGISTER_FAILURE:
      return {
        jwt: null,
        user: null,
        error: action.data.error,
        loading: false
      }
    case actionTypes.LOADING:
      return {
        ...previousState,
        loading: true
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const authFactory = (state, dispatch) => ({
  register: async (userInfos) => {
    // On lance un chargement
    dispatch({ type: actionTypes.LOADING })
    try {
      // On appelle l'API
      const result = await registerApi(userInfos)
      if (result.error) {
        // On gère les erreurs
        dispatch({
          type: actionTypes.REGISTER_FAILURE,
          data: { error: result.error }
        })
        toast.error(result.error.message)
      } else {
        // L'inscription est réussie
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          data: {
            user: result.user,
            jwt: result.jwt
          }
        })
      }
    } catch (error) {
      console.error(error)
      dispatch({
        type: actionTypes.REGISTER_FAILURE,
        data: { error }
      })
      toast.error(error.message)
    }
  }
})

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, ...authFactory(state, dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth() must be used in a AuthProvider')
  return context
}

export {
  AuthProvider,
  useAuth
}
