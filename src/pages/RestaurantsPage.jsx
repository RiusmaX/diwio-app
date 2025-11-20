import RestaurantsList from '../components/restaurants/RestaurantsList'
import { useFetch } from '../hooks/useFetch'

function RestaurantsPage () {
  const { loading, data, error } = useFetch({
    url: `${import.meta.env.VITE_STRAPI_API_URL}/restaurants?populate=logo`
  })

  if (loading) {
    return <h2 className='text-center'>Chargement...</h2>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  return data && (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-4xl font-semibold text-center'>Nos restaurants</h2>
      <RestaurantsList restaurants={data.data} />
    </div>
  )
}

export default RestaurantsPage
