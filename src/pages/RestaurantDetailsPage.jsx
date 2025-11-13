import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getRestaurantById } from '../services/Strapi'
import RestaurantDetails from '../components/restaurants/RestaurantDetails'

function RestaurantDetailsPage () {
  const [restaurant, setRestaurant] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurantById(id)
      setRestaurant(data)
    }
    getData()
  }, [])
  // TODO : implement loading
  return restaurant && (
    <div className='flex flex-col w-full h-full'>
      <RestaurantDetails restaurant={restaurant} />
    </div>
  )
}

export default RestaurantDetailsPage
