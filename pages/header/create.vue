<template>
    <div class="container px-4 py-8 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Create New Header</h1>
      <form @submit.prevent="createHeader" class="max-w-md p-6 bg-white rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
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
  const form = ref({ title: '', description: '' });
  const token = useCookie('token').value;
  
  async function createHeader() {
    const { error } = await useFetch(`${config.public.apiBase}/headers`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form.value
    });
    if (!error.value) {
      alert("Header created");
      navigateTo('/headers');
    } else {
      alert("Error creating header");
    }
  }
  </script>
  