<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const drawer = ref(true);
</script>

<template>
  <v-layout>
    <v-app-bar elevation="0" class="position-absolute border-b" title="Concessionaria">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn @click="toggleTheme" icon="mdi-theme-light-dark">
        </v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item to="/usuarios" :permanent="true" title="Usuarios"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
<style scoped></style>
