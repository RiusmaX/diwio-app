function Input (props) {
  const handleChange = (e) => {
    console.log(e)
    props.onChange && props.onChange(e)
    props.onChangeText && props.onChangeText(e.target.value)
  }
  return (
    <div className='flex flex-col w-full'>
      <label className='flex flex-col w-full'>
        {props.label} :
        {
          props.textarea
            ? (
              <textarea
                {...props}
                onChange={handleChange}
                className='border-slate-400 border-2 rounded-lg p-2'
              />
              )
            : (
              <input
                {...props}
                onChange={handleChange}
                className='border-slate-400 border-2 rounded-lg p-2'
              />
              )
        }
      </label>
      {props.error && <span className='text-red-500 py-2'>{props.error}</span>}
    </div>
  )
}

export default Input
