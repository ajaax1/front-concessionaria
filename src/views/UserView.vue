<script setup lang="ts">
import UserTable from '@/components/UserTable.vue'
import UserForm from '@/components/UserForm.vue'
</script>

<template>
  <v-container>
    <div class="w-100 d-flex justify-space-between">
      <UserForm action="create"/>
      <v-text-field
        density="compact"
        max-width="200"
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      ></v-text-field>
    </div>
    <UserTable />
  </v-container>
</template>
