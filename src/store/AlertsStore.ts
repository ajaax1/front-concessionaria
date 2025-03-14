import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", () => {
  const state = ref(false);
  const message = ref("");
  const type = ref("");

  function showAlert(msg, alertType = "success") {
    message.value = msg;
    type.value = alertType;
    state.value = true;

    setTimeout(() => {
      state.value = false;
    }, 3000); 
  }

  return { showAlert, message, type, state };
});
