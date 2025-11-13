import RestaurantsListItem from './RestaurantsListItem'

function RestaurantsList ({ restaurants }) {
  const list = restaurants.map((restaurant) => (
    <RestaurantsListItem key={restaurant.id} restaurant={restaurant} />
  ))
  return (
    <div className='flex flex-row items-center justify-center gap-6'>
      {list}
    </div>
  )
}

export default RestaurantsList
