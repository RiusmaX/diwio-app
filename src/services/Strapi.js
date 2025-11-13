const getRestaurants = async () => {
  try {
    const response = await window.fetch(`${import.meta.env.VITE_STRAPI_API_URL}/restaurants?populate=logo`)
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants : ', error)
  }
}

const getRestaurantById = async (id) => {
  try {
    const response = await window.fetch(`${import.meta.env.VITE_STRAPI_API_URL}/restaurants/${id}?populate=*`)
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants : ', error)
  }
}

export {
  getRestaurants,
  getRestaurantById
}
