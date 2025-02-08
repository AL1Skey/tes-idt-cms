<template>
    <div class="container px-4 py-8 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Edit Header</h1>
      <form @submit.prevent="updateHeader" class="max-w-md p-6 bg-white rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
      <div class="mt-4">
        <button @click="deleteHeader" class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const token = useCookie('token', { default: () => '' }).value;
  const route = useRoute();
  const form = ref({ id: null, title: '', description: '' });
  const headerId = route.params.id;
  
  async function fetchHeader() {
    const { data, error } = await useFetch(`${config.public.apiBase}/headers/${headerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      form.value = data.value;
    }
  }
  
  async function updateHeader() {
    const { error } = await useFetch(`${config.public.apiBase}/headers/${headerId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form.value
    });
    if (!error.value) {
      alert("Header updated");
      navigateTo('/headers');
    } else {
      alert("Error updating header");
    }
  }
  
  async function deleteHeader() {
    if (confirm("Are you sure you want to delete this header?")) {
      const { error } = await useFetch(`${config.public.apiBase}/headers/${headerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Header deleted");
        navigateTo('/headers');
      } else {
        alert("Error deleting header");
      }
    }
  }
  
  onMounted(fetchHeader);
  </script>
  