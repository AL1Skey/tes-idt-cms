<template>
    <div class="container px-4 py-8 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Create New Service</h1>
      <form @submit.prevent="createService" class="max-w-md p-6 bg-white rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Service List (comma separated)</label>
          <textarea v-model="serviceListText" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
          Create
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const config = useRuntimeConfig();
  const form = ref({ title: '', description: '', service_list: [] });
  const token = useCookie('token', { default: () => '' }).value;
  const serviceListText = ref('');
  
  async function createService() {
    form.value.service_list = serviceListText.value.split(',').map(item => item.trim());
    const { error } = await useFetch(`${config.public.apiBase}/services`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form.value
    });
    if (!error.value) {
      alert("Service created");
      navigateTo('/services');
    } else {
      alert("Error creating service");
    }
  }
  </script>
  