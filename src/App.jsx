import Clock from './components/Clock'
import Joke from './components/Joke'

function App () {
  return (
    <div className='w-full flex flex-col gap-8 items-center justify-center'>
      <Clock interval={1000} />
      <Joke />
      {/* <Clock interval={3000} />
      <Clock interval={2000} />
      <Clock interval={4000} /> */}
    </div>
  )
}

export default App
