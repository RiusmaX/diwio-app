import { useEffect, useState } from 'react'

function Clock ({ interval }) {
  // Etat local permettant de gérer le rafraichissement de l'affichage
  const [date, setDate] = useState(new Date())

  // Fonction appelée automatiquement au montage du composant
  useEffect(() => {
    // On affecte l'interval à une variable
    const intervalRef = setInterval(() => {
      setDate(new Date())
    }, interval)

    // On retourne une fonction qui sera
    // automatiquement appelée au démontage du composant
    return () => {
      clearInterval(intervalRef)
    }
  }, [])

  return (
    <h2 className='text-4xl font-bold'>
      {date.toLocaleTimeString()}
    </h2>
  )
}

export default Clock
