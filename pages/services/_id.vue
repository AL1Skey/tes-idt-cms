<template>
    <div class="container px-4 py-8 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Edit Service</h1>
      <form @submit.prevent="updateService" class="max-w-md p-6 bg-white rounded shadow">
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
        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
      <div class="mt-4">
        <button @click="deleteService" class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
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
  const form = ref({ id: null, title: '', description: '', service_list: [] });
  const serviceListText = ref('');
  const serviceId = route.params.id;
  
  async function fetchService() {
    const { data, error } = await useFetch(`${config.public.apiBase}/services/${serviceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      form.value = data.value;
      serviceListText.value = form.value.service_list ? form.value.service_list.join(', ') : '';
    }
  }
  
  async function updateService() {
    form.value.service_list = serviceListText.value.split(',').map(item => item.trim());
    const { error } = await useFetch(`${config.public.apiBase}/services/${serviceId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form.value
    });
    if (!error.value) {
      alert("Service updated");
      navigateTo('/services');
    } else {
      alert("Error updating service");
    }
  }
  
  async function deleteService() {
    if (confirm("Are you sure you want to delete this service?")) {
      const { error } = await useFetch(`${config.public.apiBase}/services/${serviceId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Service deleted");
        navigateTo('/services');
      } else {
        alert("Error deleting service");
      }
    }
  }
  
  onMounted(fetchService);
  </script>
  