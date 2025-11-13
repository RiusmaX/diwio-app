function RestaurantInfos ({ restaurant }) {
  return (
    <>
      <h1 className='text-4xl font-bold'>{restaurant.name}</h1>
      <p className='text-lg'>{restaurant.description}</p>
      <p>{`${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}`}</p>
    </>
  )
}

export default RestaurantInfos
