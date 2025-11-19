import { useState } from 'react'
import Input from './Input'
import { loginFormSchema } from '../../utils/validation/FormValidation'
import { useAuth } from '../../contexts/AuthContext'

function LoginForm () {
  const [credentials, setCredentials] = useState({
    identifier: 'marius@sergent.dev',
    password: 'SuperPassword'
  })

  const [errors, setErrors] = useState({})

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const parsedCredentials = await loginFormSchema.validateSync(
        credentials,
        { abortEarly: false }
      )
      await login(parsedCredentials)
    } catch (error) {
      // Erreurs de validation
      let _errors = {}
      for (const errorItem of error.inner) {
        _errors = {
          ..._errors,
          [errorItem.path]: errorItem.message
        }
      }
      setErrors(_errors)
    }
  }

  return (
    <>
      <h1 className='text-4xl my-4'>Se connecter</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full justify-center items-center gap-4 max-w-lg self-center'
      >
        <Input
          label='Email'
          onChangeText={(text) => {
            setCredentials({ ...credentials, identifier: text })
            setErrors({ ...errors, identifier: null })
          }}
          value={credentials.identifier}
          error={errors.identifier}
        />
        <Input
          type='password'
          label='Mot de passe'
          onChangeText={(text) => {
            setCredentials({ ...credentials, password: text })
            setErrors({ ...errors, password: null })
          }}
          value={credentials.password}
          error={errors.password}
        />
        <Input
          type='submit'
          label='Envoyer'
        />
      </form>
    </>
  )
}

export default LoginForm
