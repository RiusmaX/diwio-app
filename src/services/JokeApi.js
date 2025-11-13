async function getJoke () {
  try {
    const response = await window.fetch(
      `${import.meta.env.VITE_JOKE_API_URL}/random`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_JOKE_API_TOKEN}`
        }
      }
    )
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague : ', error)
  }
}

export {
  getJoke
}
