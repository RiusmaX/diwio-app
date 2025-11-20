import { useCart } from '../../contexts/CartContext'
import Button from '../Button'

const CartItem = ({ cartItem, onUpdate, onDelete }) => (
  <li className='flex items-center justify-between gap-2 my-2'>
    <span className='flex flex-5'>{cartItem.item.name}</span>
    <span className='flex flex-1 items-center justify-between border-2 border-gray-300 rounded-lg'>
      <button
        className='px-2 border-r-2 border-gray-300 hover:bg-gray-200 rounded-l-lg'
        onClick={() => onUpdate(cartItem.item, -1)}
      >
        -
      </button>
      <span className='px-2'>{cartItem.qty}</span>
      <button
        className='px-2 border-l-2 border-gray-300 hover:bg-gray-200 rounded-r-lg'
        onClick={() => onUpdate(cartItem.item, 1)}
      >
        +
      </button>
    </span>
    <span className='flex flex-1 text-right justify-end items-center font-semibold'>{(cartItem.item.price * cartItem.qty).toFixed(2)}€</span>
    <button className='px-2 border-l-2 border-gray-300 hover:bg-gray-200 rounded-r-lg' onClick={() => onUpdate(cartItem.item, -cartItem.qty)}>
      X
    </button>
  </li>
)

function CartModal ({ onClose }) {
  const { state: { cart, total }, updateQuantity, removeFromCart } = useCart()
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none '>
        <div className='bg-white shadow-lg rounded-lg p-4 w-96 pointer-events-auto'>
          <h2 className='text-xl font-semibold text-center'>Mon Panier</h2>
          {
            cart.length === 0
              ? (
                <p className='text-center my-4'>Votre panier est vide.</p>
                )
              : null
          }
          <ul>
            {cart.map(cartItem => (
              <CartItem key={cartItem.item.documentId} cartItem={cartItem} onUpdate={updateQuantity} onDelete={removeFromCart} />
            ))}
          </ul>
          <h3 className='text-lg font-semibold text-right'>Total: {total}€</h3>
          <Button className='mt-4 w-full' disabled={cart.length === 0}>
            Passer commande
          </Button>
        </div>
      </div>
      <div
        className='fixed inset-0 bg-black/50 z-40'
        onClick={onClose}
      />
    </>
  )
}

export default CartModal
