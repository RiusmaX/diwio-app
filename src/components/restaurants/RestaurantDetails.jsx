import RestaurantInfos from './RestaurantInfos'
import RestaurantMap from './RestaurantMap'

function RestaurantDetails ({ restaurant }) {
  return (
    <div className='flex mx-32 h-full max-h-1/2 flex-row items-start justify-center gap-8'>
      <div
        className='flex flex-1 w-full h-full flex-col bg-cover bg-center bg-no-repeat rounded-2xl '
        style={{
          backgroundImage: `url('http://localhost:1337${restaurant?.logo?.url}')`
        }}
      />
      <div className='flex flex-1 h-full flex-col gap-4'>
        <RestaurantInfos restaurant={restaurant} />
        <RestaurantMap
          lat={restaurant.address.lat}
          long={restaurant.address.long}
        />
      </div>
    </div>
  )
}

export default RestaurantDetails
