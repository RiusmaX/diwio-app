function Button ({ children, onClick }) {
  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <button
      className='bg-cyan-200 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xs hover:bg-cyan-300 cursor-pointer transition-all duration-200 active:scale-90'
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button
