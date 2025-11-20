import { useParams } from 'react-router'
import RestaurantDetails from '../components/restaurants/RestaurantDetails'
import { useFetch } from '../hooks/useFetch'
import DishesList from '../components/dishes/DishesList'

function RestaurantDetailsPage () {
  const { id } = useParams()
  // const params = useParams()
  // const id = params.id

  const { loading, data, error } = useFetch({
    url: `${import.meta.env.VITE_STRAPI_API_URL}/restaurants/${id}?populate[dishes][populate]=image&populate[address]=*&populate=logo`
  })

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
    <div className='flex flex-col w-full h-full gap-8'>
      <RestaurantDetails restaurant={data.data} />
      <DishesList dishes={data.data.dishes} />
    </div>
  )
}

export default RestaurantDetailsPage
