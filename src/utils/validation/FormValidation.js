import { object, string } from 'yup'

const contactFormSchema = object({
  firstName: string().required('Le prénom est requis'),
  lastName: string().required('Le nom est requis'),
  email: string().email().required('L\'email est obligatoire'),
  phone: string().required().min(10, 'Le numéro de téléphone ne comporte pas 10 caractères'),
  message: string().required()
})

const registerFormSchema = object({
  username: string().required('Le nom d\'utilisateur est requis'),
  email: string().email('Le format de l\'email est incorrect').required(),
  password: string().min(6).required()
})

export {
  contactFormSchema,
  registerFormSchema
}
