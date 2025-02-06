import { useForm } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import { ref } from 'vue'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const loading = ref<boolean>(false) ;

export function useUserForm() {
  const schema = yup.object({
    email: yup.string().required().email().max(255),
    name: yup.string().required().max(150),
    password: yup.string().required().min(8).max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
    role: yup.string().required().oneOf(['Admin', 'Editor']),
  })

  const { values, errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
  })

  const [email] = defineField('email')
  const [name] = defineField('name')
  const [password] = defineField('password')
  const [confirmPassword] = defineField('confirmPassword')
  const [role] = defineField('role')


  const onSubmit = handleSubmit( async (values)  => {
    loading.value = true;
    try {
      const response = await axios({
        method: 'post',
        url: `${apiBaseUrl}/api/users`,
        data: values,
      });
    } catch (error) {
      if()
    } finally {
      loading.value = false;
    }
  })

  return { errors, email, name, password, confirmPassword, role, onSubmit, loading }
}
