<template>
    <div class="container px-4 py-8 mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Headers List</h1>
        <NuxtLink to="/headers/create" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Create New Header</NuxtLink>
      </div>
      <ul class="space-y-4">
        <li v-for="header in headers" :key="header.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p class="font-medium">{{ header.title }}</p>
          </div>
          <div class="space-x-2">
            <NuxtLink :to="`/headers/${header.id}`" class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</NuxtLink>
            <button @click="deleteHeader(header.id)" class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const headers = ref([]);
  const token = useCookie('token').value;
  
  async function fetchHeaders() {
    const { data, error } = await useFetch(`${config.public.apiBase}/headers`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      headers.value = data.value;
    }
  }
  
  async function deleteHeader(id) {
    if (confirm("Are you sure you want to delete this header?")) {
      const { error } = await useFetch(`${config.public.apiBase}/headers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Header deleted");
        fetchHeaders();
      } else {
        alert("Error deleting header");
      }
    }
  }
  
  onMounted(fetchHeaders);
  </script>
  