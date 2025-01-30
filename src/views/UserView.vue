<script setup lang="ts">
import { ref } from 'vue'

const createPopUp = ref(false);
const updatePopUp = ref(false);
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
            <v-row dense>
              <v-col cols="12" md="12" sm="6">
                <v-text-field label="Nome*" required></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="6">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field label="Senha*" type="password" required></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field label="Confirmar Senha*" type="password" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-select :items="['Admin', 'Editor']" label="Cargo*" required></v-select>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis">*indicates required field</small>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Close" variant="plain" @click="createPopUp = false"></v-btn>

            <v-btn color="primary" text="Save" variant="tonal" @click="createPopUp = false"></v-btn>
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
            <v-chip variant="outlined"> Chip </v-chip>
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
                      <v-text-field label="Nome*" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="12" sm="6">
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-text-field label="Senha*" type="password" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                        label="Confirmar Senha*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-select :items="['Admin', 'Editor']" label="Cargo*" required></v-select>
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
