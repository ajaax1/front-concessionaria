<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const instance = $toast.success('You did it!',{ position: 'top-right' });
const theme = useTheme();
const drawer = ref(true);

const toggleDarkMode = () => {
  const isDark = theme.global.current.value.dark;
  theme.global.name.value = isDark ? 'light' : 'dark';
  localStorage.setItem("dark_theme", (!isDark).toString());
};

onMounted(() => {
  const savedTheme = localStorage.getItem("dark_theme");
  if (savedTheme !== null) {
    theme.global.name.value = savedTheme === "true" ? 'dark' : 'light';
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme.global.name.value = 'dark';
    localStorage.setItem("dark_theme", "true");
  }
});

</script>

<template>
  <v-layout>
    <v-app-bar elevation="0" class="position-absolute border-b" title="Concessionaria">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn @click="toggleDarkMode" icon="mdi-theme-light-dark"> </v-btn>
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
