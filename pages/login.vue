<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100" style="background: url('https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') center / cover no-repeat;">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div v-if="error" class="text-sm text-red-500 text-center">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const form = ref({ username: '', password: '' });
  const error = ref('');
  const config = useRuntimeConfig();
  const token = useCookie('token', { default: () => '' });
  async function handleLogin() {
    try {
      const { data, error: fetchError } = await useFetch(`${config.public.apiBase}/login`, {
        method: 'POST',
        body: form.value
      });
      if (fetchError.value) {
        error.value = 'Login failed. Please check your credentials.';
        return;
      }
      token.value = data.value.token;
      navigateTo('/dashboard');
    } catch (err) {
      error.value = 'An error occurred during login.';
    }
  }
  </script>
  