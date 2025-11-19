import { useState } from 'react'
import Input from './Input'
import { registerFormSchema } from '../../utils/validation/FormValidation'
import { useAuth } from '../../contexts/AuthContext'

function RegisterForm () {
  const [userInfos, setUserInfos] = useState({
    username: 'Marius',
    email: 'marius@sergent.dev',
    password: 'SuperPassword'
  })

  const [errors, setErrors] = useState({})

  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const parsedUserInfos = await registerFormSchema.validateSync(
        userInfos,
        { abortEarly: false }
      )
      await register(parsedUserInfos)
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
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-full justify-center items-center gap-4 max-w-lg self-center'
    >
      <Input
        label="Nom d'utilisateur"
        onChangeText={(text) => {
          setUserInfos({ ...userInfos, username: text })
          setErrors({ ...errors, username: null })
        }}
        value={userInfos.username}
        error={errors.username}
      />
      <Input
        label='Email'
        onChangeText={(text) => {
          setUserInfos({ ...userInfos, email: text })
          setErrors({ ...errors, email: null })
        }}
        value={userInfos.email}
        error={errors.email}
      />
      <Input
        type='password'
        label='Mot de passe'
        onChangeText={(text) => {
          setUserInfos({ ...userInfos, password: text })
          setErrors({ ...errors, password: null })
        }}
        value={userInfos.password}
        error={errors.password}
      />
      <Input
        type='submit'
        label='Envoyer'
      />
    </form>
  )
}

export default RegisterForm
