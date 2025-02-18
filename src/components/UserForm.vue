<script setup lang="ts">
import { useFormCreate } from '@/validation/useFormCreate.ts'
import { ref } from 'vue'
import { defineEmits, watch } from 'vue'

const emit = defineEmits(['userUpdated'])

const props = defineProps({
  action: String,
})

const { errors, email, name, password, confirmPassword, role, onSubmit, loading, feedBack, feedbackMessage } =
  useFormCreate()

const formName = ref<string>('')
const btnSize = ref<string>('')
const btnColor = ref<string>('')
const createPopUp = ref<boolean>(false)
const show1 = ref<boolean>(false);

watch(() => feedBack, (newFeedBack) => {
  console.log('a')
  if (newFeedBack === 'success') {
    emit('userUpdated')
    createPopUp.value = false
  }
})

if (props.action === 'create') {
  formName.value = 'CRIAR'
  btnSize.value = 'default'
  btnColor.value = 'default'
} else {
  formName.value = 'EDITAR'
  btnSize.value = 'small'
  btnColor.value = 'green-darken-4'
}
</script>

<template>
  <v-dialog v-model="createPopUp" max-width="600">
    <v-alert
      v-if="feedBack"
      class="mb-2"
      :text="feedbackMessage"
      :type="feedBack"
      closable
    ></v-alert>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        :color="btnColor"
        :size="btnSize"
        :text="formName"
        variant="outlined"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card prepend-icon="mdi-account" :title="formName">
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
                :items="['Admin', 'Editor']"
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
        <v-btn text="Fechar" variant="plain" @click="createPopUp = false"></v-btn>
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
