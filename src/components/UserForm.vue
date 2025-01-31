<script setup lang="ts">
import { useUserForm } from '@/validation/useUserForm.ts';
import { ref } from 'vue';

const props = defineProps({
  action: String,
})

const { createPopUp, errors, email, name, password, confirmPassword, role, onSubmit } = useUserForm();
const formName = ref<string>('');
const btnSize = ref<string>('');
const btnColor = ref<string>('');
if(props.action === 'create'){
  formName.value = 'CRIAR';
  btnSize.value = 'default';
  btnColor.value = 'black';
} else {
  formName.value = 'EDITAR';
  btnSize.value = 'small';
  btnColor.value = 'green-darken-4';
}

</script>

<template>
  <v-dialog v-model="createPopUp" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="text-none font-weight-regular" :color="btnColor" :size="btnSize" :text="formName" variant="outlined" v-bind="activatorProps"></v-btn>
    </template>

    <v-card prepend-icon="mdi-account" :title="formName">
      <v-card-text>
        <form novalidate @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="Nome*" :error-messages="errors.name" v-model="name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" :error-messages="errors.email" v-model="email" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Senha*" :error-messages="errors.password" v-model="password" type="password" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Confirmar Senha*" :error-messages="errors.confirmPassword" v-model="confirmPassword" type="password" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select :items="['Admin', 'Editor']" v-model="role" :error-messages="errors.role" label="Cargo*" required></v-select>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">* Campos obrigatórios</small>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Fechar" variant="plain" @click="createPopUp = false"></v-btn>
        <v-btn color="primary" text="Salvar" variant="tonal" @click="onSubmit"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
