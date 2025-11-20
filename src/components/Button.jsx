function Button ({ children, onClick, className, disabled }) {
  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <button
      className={`${disabled ? 'opacity-50 cursor-not-allowed bg-amber-500' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer active:scale-95'}  text-white font-semibold py-2 px-4 rounded transition duration-300 ${className || ''} `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
