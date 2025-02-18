import axios from 'axios'

export default async function userAll(
  loading,
  page,
  limit,
  feedBack,
  paginationParameter,
  feedbackMessage,
) {
  loading.value = true
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.get(`${apiBaseUrl}/api/users/?page=${paginationParameter.value}`)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    if (response?.status) {
      if (response?.status === 200) {
        page.value = response.data.current_page
        limit.value = response.data.last_page
        if (
          feedbackMessage.value === 'Usuário cadastrado com sucesso' ||
          feedbackMessage.value === 'Usuário deletado com sucesso' ||
          feedbackMessage.value === 'Usuário atualizado com sucesso'
        ) {
        } else {
          feedBack.value = ''
        }
        return response.data
      } else {
        feedBack.value = 'error'
        feedbackMessage.value = response.data.message
      }
    } else {
      feedBack.value = 'error'
      feedbackMessage.value = 'Erro ao buscar usuários'
    }
  }
}
