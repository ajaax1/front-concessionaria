<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import userAll from '@/api/userAll'
import userDelete from '@/api/userDelete'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const response = ref([])
const page = ref<number>(0)
const limit = ref<number>(0)
const loading = ref<booalean>(false)
const feedBack = ref<string>('')
const users = ref<any>({})
const route = useRoute()
const router = useRouter()
const paginationParameter = ref(route.query.page)
const feedbackMessage = ref<string>('')

onMounted(async () => {
  if (!paginationParameter.value) {
    paginationParameter.value = 1
    router.push({ query: { page: 1 } })
  }
  page.value = paginationParameter.value
  response.value = await userAll(
    loading,
    page,
    limit,
    feedBack,
    paginationParameter,
    feedbackMessage,
  )
  if (!feedBack.value) {
    users.value = response.value.data
  }
})



const deleteUser = async (id: number) => {
  response.value = await userDelete(loading, feedBack, feedbackMessage, id)
  if (feedBack.value === 'success') {
    response.value = await userAll(
      loading,
      page,
      limit,
      feedBack,
      paginationParameter,
      feedbackMessage,
    )
    if (feedBack.value === 'success') {
      users.value = response.value.data
    }
  }
}

const refreshUsers = async (page) => {
  paginationParameter.value = page
  response.value = await userAll(
    loading,
    page,
    limit,
    feedBack,
    paginationParameter,
    feedbackMessage,
  )
  if (!feedBack.value) {
    users.value = response.value.data
  }
}
</script>

<template>
  <v-alert v-if="feedBack" class="mb-2" :text="feedbackMessage" :type="feedBack" closable></v-alert>
  <v-skeleton-loader
    v-if="loading"
    class="border rounded-0 mb-2"
    type="table-tbody"
  ></v-skeleton-loader>
  <v-table v-if="!loading" class="w-100 border">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th class="text-center">Cargo</th>
        <th class="text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user?.name }}</td>
        <td>{{ user?.email }}</td>
        <td class="text-center">
          <v-chip variant="outlined"> {{ user?.role }} </v-chip>
        </td>
        <td class="text-center">
          <UserForm action="update" @userUpdated="refreshUsers" />
          <v-btn
            @click="deleteUser(user?.id)"
            class="ml-2"
            variant="outlined"
            size="small"
            color="red-accent-4"
          >
            DELETAR
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="!loading" class="text-center mt-5">
    <v-pagination @update:modelValue="refreshUsers(page)" v-model="page" :length="limit" :total-visible="1"></v-pagination>
  </div>
</template>
