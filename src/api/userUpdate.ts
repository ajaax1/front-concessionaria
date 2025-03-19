import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export default async function userUpdate(setErrors, loading, resetForm, values, id) {
  loading.value = true
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.put(`${apiBaseUrl}/api/users/${id}`, values)
    $toast.success('Usuário atualizado com sucesso', { position: 'top-right' })
    resetForm()
  } catch (error) {
    if(error.response.data.message == "O email informado está em uso"){
      $toast.error(error.response.data.message,{ position: 'top-right' })
    }else{
      $toast.error('Erro ao criar usuário',{ position: 'top-right' })
    }
  } finally {
    loading.value = false;
  }
  return response;
}
