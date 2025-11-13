import { useEffect, useState } from 'react'

export function useFetch ({ url, bearerToken = null }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const getData = async () => {
    setLoading(true)
    try {
      const options = { headers: {} }
      if (bearerToken) {
        options.headers.Authorization = `Bearer ${bearerToken}`
      }
      const response = await fetch(url, options)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { loading, data, error, getData }
}
