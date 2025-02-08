<template>
    <div class="container px-4 py-8 mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Brands List</h1>
        <NuxtLink to="/brands/create" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Create New Brand</NuxtLink>
      </div>
      <ul class="space-y-4">
        <li v-for="brand in brands" :key="brand.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
          <div>
            <p class="font-medium">{{ brand.logo }}</p>
            <p class="text-sm text-gray-600">{{ brand.copyright }}</p>
          </div>
          <div class="space-x-2">
            <NuxtLink :to="`/brands/${brand.id}`" class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</NuxtLink>
            <button @click="deleteBrand(brand.id)" class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const brands = ref([]);
  const token = useCookie('token', { default: () => '' }).value;
  
  async function fetchBrands() {
    const { data, error } = await useFetch(`${config.public.apiBase}/brands`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      brands.value = data.value;
    }
  }
  
  async function deleteBrand(id) {
    if (confirm("Are you sure you want to delete this brand?")) {
      const { error } = await useFetch(`${config.public.apiBase}/brands/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Brand deleted");
        fetchBrands();
      } else {
        alert("Error deleting brand");
      }
    }
  }
  
  onMounted(fetchBrands);
  </script>
  