import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export default async function useSubmit(setErrors, loading, resetForm, values) {
  loading.value = true
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.post(`${apiBaseUrl}/api/users`, values)
    $toast.success('Usuário criado com sucesso', { position: 'top-right' })
    resetForm()
  } catch (error) {
    $toast.error('Erro ao criar usuário',{ position: 'top-right' })
  } finally {
    loading.value = false;
  }
  return response;
}
