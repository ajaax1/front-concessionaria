import axios from 'axios'

export default async function userDelete(loading, feedback, feedbackMessage, parameter) {
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
      feedback.value = 'success';
      feedbackMessage.value = response.data.message
    } else {
      feedback.value = 'error';
      feedbackMessage.value = 'Erro ao deletar usuário'
    }
  }
}
