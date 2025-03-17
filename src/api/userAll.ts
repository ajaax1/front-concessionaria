import axios from 'axios'

export default async function userAll(loading, page, limit) {
  loading.value = true
  let response
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  try {
    response = await axios.get(`${apiBaseUrl}/api/users/?page=${page.value}`)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    if (response?.status) {
      if (response?.status === 200) {
        page.value = response.data.current_page
        limit.value = response.data.last_page
        return response.data
      }
    }
  }
}
