import { useEffect, useState } from 'react'
import { getJoke } from '../services/JokeApi'
import Button from './Button'

function Joke () {
  const [joke, setJoke] = useState('Ici la blague')
  const [showAnswer, setShowAnswer] = useState(false)

  const getData = async () => {
    setShowAnswer(false)
    const data = await getJoke()
    setJoke(data)
  }

  useEffect(() => {
    getData()
  }, [])

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

  return (
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
      <Button onClick={getData}>
        Nouvelle blague
      </Button>
    </>
  )
}

export default Joke
