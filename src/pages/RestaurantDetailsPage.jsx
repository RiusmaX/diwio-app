import { useParams } from 'react-router'
import RestaurantDetails from '../components/restaurants/RestaurantDetails'
import { useFetch } from '../hooks/useFetch'

function RestaurantDetailsPage () {
  const { id } = useParams()
  // const params = useParams()
  // const id = params.id

  const { loading, data, error } = useFetch({
    url: `${import.meta.env.VITE_STRAPI_API_URL}/restaurants/${id}?populate=*`
  })

  console.log(data)

  if (loading) {
    return <h2 className='text-center'>Chargement...</h2>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  if (!data || !data.data) {
    return <h2 className='text-2xl text-red-500 text-center'>Restaurant non trouvé</h2>
  }
  // TODO : implement loading
  return data && data.data && (
    <div className='flex flex-col w-full h-full'>
      <RestaurantDetails restaurant={data.data} />
    </div>
  )
}

export default RestaurantDetailsPage
