import { useState } from 'react'
import Button from './Button'
import { useFetch } from '../hooks/useFetch'

function Joke () {
  const [showAnswer, setShowAnswer] = useState(false)

  const { loading, data, error, getData } = useFetch({
    url: `${import.meta.env.VITE_JOKE_API_URL}/random`,
    bearerToken: import.meta.env.VITE_JOKE_API_TOKEN
  })

  if (loading) {
    return <h2 className='text-center'>Chargement...</h2>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  const joke = data

  const getColor = (type) => {
    switch (type) {
      case 'global':
        return 'bg-cyan-200 text-black'
      case 'dev':
        return 'bg-green-200 text-black'
      case 'limit':
      case 'dark':
        return 'bg-slate-800 text-white'
      case 'blondes':
        return 'bg-amber-300 text-black'
      default:
        return 'bg-teal-200'
    }
  }

  const handleRefresh = () => {
    setShowAnswer(false)
    getData()
  }

  return joke && (
    <>
      <span className={`${getColor(joke.type)} py-2 px-4 rounded-3xl`}>
        {joke.type}
      </span>
      <p className='text-2xl font-semibold text-center'>
        {joke.joke}
      </p>
      {
        showAnswer
          ? (
            <p className='text-xl text-center'>
              {joke.answer}
            </p>
            )
          : (
            <Button onClick={() => setShowAnswer(!showAnswer)}>
              Montrer la réponse
            </Button>
            )
      }
      <Button onClick={handleRefresh}>
        Nouvelle blague
      </Button>
    </>
  )
}

export default Joke
