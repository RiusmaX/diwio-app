import RestaurantsListItem from './RestaurantsListItem'

function RestaurantsList ({ restaurants }) {
  const list = restaurants.map((restaurant) => (
    <RestaurantsListItem key={restaurant.id} restaurant={restaurant} />
  ))
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {list}
    </div>
  )
}

export default RestaurantsList
