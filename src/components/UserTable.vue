<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import userAll from '@/api/userAll'
import { ref, onMounted } from 'vue'

const response = ref([])
const page = ref<number>(0)
const limit = ref<number>(0)
const loading = ref<booalean>(false)
const feedBack = ref<string>('')
onMounted(async () => {
  response.value = await userAll(loading, page, limit, feedBack)
})
</script>

<template>
  <v-alert
    v-if="feedBack"
    class="mb-2"
    text="Erro ao buscar úsuarios"
    :type="feedBack"
    closable
  ></v-alert>
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
      <tr>
        <td>Ruan</td>
        <td>ruanhigor123@gmail.com</td>
        <td class="text-center">
          <v-chip variant="outlined"> Admin </v-chip>
        </td>
        <td class="text-center">
          <UserForm action="update" />
          <v-btn class="ml-2" variant="outlined" size="small" color="red-accent-4"> DELETAR </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="!loading" class="text-center mt-5">
    <v-pagination v-model="page" :length="limit" :total-visible="5"></v-pagination>
  </div>
</template>
