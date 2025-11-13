function RestaurantMap ({ lat, long }) {
  return (
    <iframe width='100%' height='100%' src={`https://maps.google.com/maps?q=${lat}, ${long}&output=embed`} />
  )
}

export default RestaurantMap
