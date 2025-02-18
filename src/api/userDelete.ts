import axios from 'axios'

export default async function userDelete(loading, feedBack, feedbackMessage, parameter) {
  loading.value = true;
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.delete(`${apiBaseUrl}/api/users/${parameter}`)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
    if (response?.status) {
      feedBack.value = 'success';
      feedbackMessage.value = response.data.message
    } else {
      feedBack.value = 'error';
      feedbackMessage.value = 'Erro ao deletar usuário'
    }
  }
}
