<script setup lang="ts">
import { useFormUpdate } from '@/validation/useFormUpdate.ts'
import { ref, defineEmits } from 'vue'
import userUpdate from '../api/userUpdate.ts'

const emit = defineEmits(['refreshUsers'])
const response = ref<any>(null);
const { errors, email, name, password, confirmPassword, role, handleSubmit, setErrors, loading } = useFormUpdate()

const updatePopUp = ref<boolean>(false)
const show1 = ref<boolean>(false)

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  response.value = await userUpdate(setErrors, loading, resetForm, values)
  if (response.value.status === 201) {
    emit('refreshUsers')
  }
  })

</script>

<template>
  <v-dialog v-model="updatePopUp" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        color="green-darken-4"
        size="small"
        text="EDITAR"
        variant="outlined"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card prepend-icon="mdi-account" title="EDITAR">
      <v-card-text>
        <form novalidate @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Nome*"
                :error-messages="errors.name"
                v-model="name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                :error-messages="errors.email"
                v-model="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Senha*"
                :error-messages="errors.password"
                v-model="password"
                required
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Confirmar Senha*"
                :error-messages="errors.confirmPassword"
                v-model="confirmPassword"
                @click:append-inner="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="['admin', 'editor']"
                v-model="role"
                :error-messages="errors.role"
                label="Cargo*"
                required
              ></v-select>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">* Campos obrigatórios</small>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="updatePopUp = false"></v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          text="Salvar"
          variant="tonal"
          @click="onSubmit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
