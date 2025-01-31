<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref } from 'vue'
import * as yup from 'yup';

const createPopUp = ref(false);
const updatePopUp = ref(false);
const search = ref('');

const schema = yup.object({
  email: yup.string().required().email().max(255),
  name: yup.string().required().max(150),
  password: yup.string().required().min(6).max(255),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
  role: yup.string().required().oneOf(['Admin', 'Editor']),
});

const { values, errors, defineField } = useForm({
  validationSchema: schema,
});

const [email] = defineField('email');
const [name] = defineField('name');
const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');
const [role] = defineField('role');
const onSubmit = () => {
  createPopUp.value = false;
}

console.log(role)
</script>

<template>
  <v-container>
    <div class="w-100 d-flex justify-space-between">
      <v-dialog v-model="createPopUp" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            class="text-none font-weight-regular"
            text="CRIAR"
            variant="outlined"
            v-bind="activatorProps"
          ></v-btn>
        </template>

        <v-card prepend-icon="mdi-account" title="CRIAR">
          <v-card-text>
            <form novalidate @submit.prevent="onSubmit">
              <v-row dense>
                <v-col cols="12" md="12" sm="6">
                  <v-text-field label="Name*" :error-messages="errors.name" v-model="name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="12" sm="6">
                  <v-text-field label="Email*" :error-messages="errors.email" v-model="email" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-text-field label="Password*" :error-messages="errors.password" v-model="password" type="password" required></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-text-field label="Confirm password*" :error-messages="errors.confirmPassword" v-model="confirmPassword" type="password" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-select :items="['Admin', 'Editor']" v-model="role" :error-messages="errors.role" label="Role*" required></v-select>
                </v-col>
              </v-row>
              <small class="text-caption text-medium-emphasis">* Indicador de campos obrígatorio</small>
            </form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" variant="plain" @click="createPopUp = false"></v-btn>
            <v-btn color="primary" text="Save" variant="tonal" @click="onSubmit"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        density="compact"
        max-width="200"
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
      ></v-text-field>
    </div>

    <v-table class="w-100 border">
      <thead>
        <tr>
          <th>name</th>
          <th>Email</th>
          <th class="text-center">role</th>
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
            <v-dialog v-model="updatePopUp" max-width="600">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  class="mr-2"
                  variant="outlined"
                  size="small"
                  color="#1B5E20"
                  text="EDITAR"
                  v-bind="activatorProps"
                ></v-btn>
              </template>

              <v-card prepend-icon="mdi-account" title="EDITAR">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="12" sm="6">
                      <v-text-field label="name*" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" sm="6">
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-text-field label="password*" type="password" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        label="confirm password*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-select :items="['Admin', 'Editor']" label="role*" required></v-select>
                    </v-col>
                  </v-row>

                  <small class="text-caption text-medium-emphasis">*indicates required field</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="Close" variant="plain" @click="updatePopUp = false"></v-btn>

                  <v-btn
                    color="primary"
                    text="Save"
                    variant="tonal"
                    @click="updatePopUp = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn variant="outlined" size="small" color="red-accent-4" @click=""> DELETAR </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
