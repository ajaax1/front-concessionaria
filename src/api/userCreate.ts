import axios from 'axios'

export default async function useSubmit(setErrors, feedBack, loading, resetForm, values) {
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
    if (response?.status === 201) {
      feedBack.value = 'success'
      resetForm()
    } else {
      feedBack.value = 'error'
    }
  }
}
