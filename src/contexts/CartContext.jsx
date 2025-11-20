import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  RESET_CART: 'RESET_CART'
}

const initialState = {
  cart: [],
  total: 0
}

function calculateTotal (cart) {
  return cart.reduce((acc, cartItem) => acc + (cartItem.item.price * cartItem.qty), 0).toFixed(2)
}

const cartReducer = (previousState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        cart: previousState.cart.concat([{
          item: action.data.item,
          qty: 1
        }]),
        total: calculateTotal(previousState.cart.concat([{
          item: action.data.item,
          qty: 1
        }]))
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        cart: previousState.cart.filter(cartItem => cartItem.item.documentId !== action.data.item.documentId),
        total: calculateTotal(previousState.cart.filter(cartItem => cartItem.item.documentId !== action.data.item.documentId))
      }
    case actionTypes.UPDATE_QUANTITY:
      return {
        cart: previousState.cart.map(cartItem => {
          if (cartItem.item.documentId === action.data.item.documentId) {
            return {
              ...cartItem,
              qty: action.data.qty
            }
          }
          return cartItem
        }),
        total: calculateTotal(previousState.cart.map(cartItem => {
          if (cartItem.item.documentId === action.data.item.documentId) {
            return {
              ...cartItem,
              qty: action.data.qty
            }
          }
          return cartItem
        }))
      }
    case actionTypes.RESET_CART:
      return initialState
    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

const cartFactory = (state, dispatch) => ({
  addToCart: (item) => {
    const itemInCart = state.cart.find(cartItem => cartItem.item.documentId === item.documentId)
    if (itemInCart) {
      dispatch({
        type: actionTypes.UPDATE_QUANTITY,
        data: { item, qty: itemInCart.qty + 1 }
      })
    } else {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        data: { item }
      })
      toast.success(`${item.name} ajouté au panier`)
    }
  },
  removeFromCart: (item) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { item }
    })
    toast.info(`${item.name} supprimé du panier`)
  },
  updateQuantity: (item, qty) => {
    console.log(item, qty)
    const itemInCart = state.cart.find(cartItem => cartItem.item.documentId === item.documentId)
    if (!itemInCart) return
    const newQty = itemInCart.qty + qty
    if (newQty < 1) {
      dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        data: { item }
      })
      toast.info(`${item.name} supprimé du panier`)
    } else {
      dispatch({
        type: actionTypes.UPDATE_QUANTITY,
        data: { item, qty: newQty }
      })
    }
  }

})

const CartProvider = ({ children }) => {
  const _initialState = window.localStorage.getItem('#CART')
    ? JSON.parse(window.localStorage.getItem('#CART'))
    : initialState
  const [state, dispatch] = useReducer(cartReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('#CART', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, ...cartFactory(state, dispatch) }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart() muse be used in a CartProvider')
  return context
}

export {
  CartProvider,
  useCart
}
