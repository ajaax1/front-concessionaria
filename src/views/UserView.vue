<script setup lang="ts">
import UserCreateForm from '@/components/UserCreateForm.vue'
import UserUpdateForm from '@/components/UserUpdateForm.vue'
import userAll from '@/api/userAll'
import userDelete from '@/api/userDelete'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const response = ref()
const page = ref<number>()
const limit = ref<number>(0)
const loading = ref<booalean>(false)
const users = ref<any>({})
const router = useRouter()

const refreshUsers = async (newPage) => {
  if (newPage) {
    page.value = newPage
  }
  response.value = await userAll(loading, page, limit)
  router.push({ query: { page: page.value } })
  users.value = response.value.data
}

onMounted(async () => {
  if (router.currentRoute.value.query.page) {
    page.value = Number(router.currentRoute.value.query.page)
  } else {
    page.value = 1
  }
  refreshUsers(page.value)
})

const deleteUser = async (id: number) => {
  response.value = await userDelete(loading, id)
  if (response.value.status === 200) {
    if (users.value.length === 1 && page.value > 1) {
      page.value = page.value - 1
    }
    await refreshUsers(page.value)
  }
}
</script>

<template>
  <v-container>
    <div class="w-100 d-flex justify-space-between">
      <UserCreateForm @refreshUsers="refreshUsers" />
      <v-text-field
        density="compact"
        max-width="200"
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      ></v-text-field>
    </div>
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
            <UserUpdateForm :user="{
              id:user.id,
              name:user.name,
              email:user.email,
              role:user.role
            }" @refreshUsers="refreshUsers" />
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
      <v-pagination
        @update:modelValue="(newPage) => refreshUsers(newPage)"
        v-model="page"
        :length="limit"
        :total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>
