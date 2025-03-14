import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import userCreate from '../api/userCreate.ts'

const loading = ref<boolean>(false)
const feedbackMessage = ref<string>('')

export function useFormCreate() {
  const schema = yup.object({
    email: yup.string().required().email().max(255),
    name: yup.string().required().max(150),
    password: yup.string().required().min(8).max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
    role: yup.string().required().oneOf(['admin', 'editor']),
  })

  const { errors, defineField, handleSubmit, setErrors } = useForm({
    validationSchema: schema,
  })

  const [email] = defineField('email')
  const [name] = defineField('name')
  const [password] = defineField('password')
  const [confirmPassword] = defineField('confirmPassword')
  const [role] = defineField('role')
  const feedback = ref<string>('')

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    feedback.value = ''
    feedbackMessage.value = ''
    await userCreate(setErrors, feedback, loading, resetForm, values, feedbackMessage)
  })

  return {
    errors,
    email,
    name,
    password,
    confirmPassword,
    role,
    onSubmit,
    loading,
    feedback,
    feedbackMessage,
  }
}
