import { useEffect, useState } from 'react'
import RestaurantsList from '../components/restaurants/RestaurantsList'
import { getRestaurants } from '../services/Strapi'

function RestaurantsPage () {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurants()
      setRestaurants(data)
    }

    getData()
  }, [])

  return (
    <div>
      <h2 className='text-4xl font-semibold text-center'>Nos restaurants</h2>
      <RestaurantsList restaurants={restaurants} />
    </div>
  )
}

export default RestaurantsPage
