import axios from 'axios'


export default async function useSubmit(
  setErrors,
  feedback,
  loading,
  resetForm,
  values,
  feedbackMessage,
) {
  loading.value = true
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.post(`${apiBaseUrl}/api/users`, values)
  } catch (error) {
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors)
    }
  } finally {
    loading.value = false
    if (response?.status) {
      if (response.status === 201) {
        feedback.value = 'success'
        feedbackMessage.value = 'Usuário criado com sucesso'
        resetForm()

      }else{
        feedback.value = 'error'
        feedbackMessage.value = response.data.message
      }
    } else {
      feedback.value = 'error'
      feedbackMessage.value = 'Erro ao criar usuário'
    }
  }
}
