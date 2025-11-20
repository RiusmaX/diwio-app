import { useCart } from '../../contexts/CartContext'
import Button from '../Button'

function DishesListItem ({ dish }) {
  const { addToCart } = useCart()
  return (
    <div className='flex flex-col py-8 px-4 shadow-lg max-w-96'>
      <div
        className='flex flex-1 w-full h-full flex-col bg-cover bg-center bg-no-repeat rounded-2xl min-h-60'
        style={{
          backgroundImage: `url('http://localhost:1337${dish?.image?.url}')`
        }}
      />
      <h3 className='text-xl font-semibold my-4'>{dish.name}</h3>
      <p className='my-2'>{dish.description}</p>
      <Button onClick={() => addToCart(dish)}>
        <span>{dish.price.toFixed(2)}€ - </span>
        Ajouter au panier
      </Button>
    </div>
  )
}

export default DishesListItem
