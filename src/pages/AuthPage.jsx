import { useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForm'

function AuthPage () {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div
      className='flex flex-col h-[calc(100%-120px)] w-full justify-center items-center'
    >
      <div className='flex flex-col w-full max-w-lg shadow-lg rounded-lg py-8 px-16 items-center'>
        {
          isRegister
            ? <RegisterForm />
            : <LoginForm />
        }
      </div>
      <a
        onClick={() => setIsRegister(!isRegister)}
        className='underline my-2 cursor-pointer'
      >
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
    </div>
  )
}

export default AuthPage
