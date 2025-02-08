<template>
    <div class="container px-4 py-8 mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Services List</h1>
        <NuxtLink to="/services/create" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Create New Service</NuxtLink>
      </div>
      <ul class="space-y-4">
        <li v-for="service in services" :key="service.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p class="font-medium">{{ service.title }}</p>
          </div>
          <div class="space-x-2">
            <NuxtLink :to="`/services/${service.id}`" class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</NuxtLink>
            <button @click="deleteService(service.id)" class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const services = ref([]);
  const token = useCookie('token').value;
  
  async function fetchServices() {
    const { data, error } = await useFetch(`${config.public.apiBase}/services`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      services.value = data.value;
    }
  }
  
  async function deleteService(id) {
    if (confirm("Are you sure you want to delete this service?")) {
      const { error } = await useFetch(`${config.public.apiBase}/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Service deleted");
        fetchServices();
      } else {
        alert("Error deleting service");
      }
    }
  }
  
  onMounted(fetchServices);
  </script>
  