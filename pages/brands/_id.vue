<template>
    <div class="container px-4 py-8 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Edit Brand</h1>
      <form @submit.prevent="updateBrand" class="max-w-md p-6 bg-white rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-medium">Logo URL</label>
          <input v-model="form.logo" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium">Copyright</label>
          <input v-model="form.copyright" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
      <div class="mt-4">
        <button @click="deleteBrand" class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig();
  const token = useCookie('token').value;
  const route = useRoute();
  const form = ref({ id: null, logo: '', copyright: '' });
  const brandId = route.params.id;
  
  async function fetchBrand() {
    const { data, error } = await useFetch(`${config.public.apiBase}/brands/${brandId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      form.value = data.value;
    }
  }
  
  async function updateBrand() {
    const { error } = await useFetch(`${config.public.apiBase}/brands/${brandId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form.value
    });
    if (!error.value) {
      alert("Brand updated");
      navigateTo('/brands');
    } else {
      alert("Error updating brand");
    }
  }
  
  async function deleteBrand() {
    if (confirm("Are you sure you want to delete this brand?")) {
      const { error } = await useFetch(`${config.public.apiBase}/brands/${brandId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Brand deleted");
        navigateTo('/brands');
      } else {
        alert("Error deleting brand");
      }
    }
  }
  
  onMounted(fetchBrand);
  </script>
  