<script setup lang="ts">
import UserForm from '@/components/UserForm.vue';
</script>

<template>
  <v-table class="w-100 border">
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
</template>
