import { useState } from 'react'
import Input from './Input'
import { contactFormSchema } from '../../utils/validation/FormValidation'

function ContactForm () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const parsedFormData = await contactFormSchema.validateSync(
        formData,
        { abortEarly: false }
      )
      console.log(parsedFormData)
    } catch (error) {
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
        label='Prénom'
        onChangeText={(text) => {
          setFormData({ ...formData, firstName: text })
          setErrors({ ...errors, firstName: null })
        }}
        value={formData.firstName}
        error={errors.firstName}
      />
      <Input
        label='Nom'
        onChangeText={(text) => {
          setFormData({ ...formData, lastName: text })
          setErrors({ ...errors, lastName: null })
        }}
        value={formData.lastName}
        error={errors.lastName}
      />
      <Input
        label='Adresse Email'
        onChangeText={(text) => {
          setFormData({ ...formData, email: text })
          setErrors({ ...errors, email: null })
        }}
        value={formData.email}
        error={errors.email}
      />
      <Input
        label='Numéro de Téléphone'
        onChangeText={(text) => {
          setFormData({ ...formData, phone: text })
          setErrors({ ...errors, phone: null })
        }}
        value={formData.phone}
        error={errors.phone}
      />
      <Input
        textarea
        label='Message'
        onChangeText={(text) => {
          setFormData({ ...formData, message: text })
          setErrors({ ...errors, message: null })
        }}
        value={formData.message}
        error={errors.message}
      />
      <Input
        type='submit'
        label='Envoyer'
      />
    </form>
  )
}

export default ContactForm
