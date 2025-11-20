import DishesListItem from './DishesListItem'

function DishesList ({ dishes }) {
  if (!dishes || dishes.length === 0) {
    return <h2>No data</h2>
  }

  const dishesList = dishes.map(dish => (
    <DishesListItem key={dish.documentId} dish={dish} />
  ))

  return (
    <div className='flex mx-4 lg:mx-32 h-full max-h-1/2 flex-col items-center  justify-start gap-8'>
      <h2 className='text-2xl font-semibold'>Notre carte</h2>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {dishesList}
      </div>
    </div>
  )
}

export default DishesList
