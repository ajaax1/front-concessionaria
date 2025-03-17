import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export default async function userDelete(loading, parameter) {
  loading.value = true;
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.delete(`${apiBaseUrl}/api/users/${parameter}`)
    $toast.success(response.data.message, { position: 'top-right' })
  } catch (error) {
    $toast.error('Erro ao deletar usuário', { position: 'top-right' })
  } finally {
    loading.value = false;
  }
  return response;
}
