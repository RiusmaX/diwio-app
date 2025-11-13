import { NavLink } from 'react-router'

function RestaurantsListItem ({ restaurant }) {
  return (
    <NavLink to={`/restaurant/${restaurant.documentId}`}>
      <div className='shadow-lg p-10 max-w-md rounded-lg hover:shadow-xl active:scale-95'>
        <img src={`http://localhost:1337${restaurant?.logo?.formats?.medium?.url}`} />
        <h2 className='text-2xl font-semibold'>{restaurant.name}</h2>
        <p>{restaurant.description}</p>
      </div>
    </NavLink>
  )
}

export default RestaurantsListItem
