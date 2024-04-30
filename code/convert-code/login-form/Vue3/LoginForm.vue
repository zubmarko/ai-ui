<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Email:</label>
      <input type="email" v-model="email" />
      <div v-if="errors.email" style="color: red">{{ errors.email }}</div>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" v-model="password" />
      <div v-if="errors.password" style="color: red">{{ errors.password }}</div>
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errors = ref({});

    const validateForm = () => {
      let isValid = true;
      const currentErrors = {};

      if (!email.value) {
        isValid = false;
        currentErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        isValid = false;
        currentErrors.email = "Email is invalid";
      }

      if (!password.value) {
        isValid = false;
        currentErrors.password = "Password is required";
      }

      errors.value = currentErrors;
      return isValid;
    };

    const handleSubmit = () => {
      if (validateForm()) {
        console.log('Submitting', { email: email.value, password: password.value });
        // Add here your submission logic, e.g., calling an API
      }
    };

    return { email, password, errors, handleSubmit };
  }
};
</script>
