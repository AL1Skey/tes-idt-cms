<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Header</h1>
        <form @submit.prevent="updateHeader" class="space-y-6">
          <div>
            <label 
              for="title" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input 
              v-model="form.title" 
              id="title"
              type="text" 
              required 
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
          
          <div>
            <label 
              for="description" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea 
              v-model="form.description" 
              id="description"
              required 
              rows="3"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div class="flex items-center justify-between space-x-4">
            <button 
              type="submit" 
              class="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            >
              Update Header
            </button>
            <button 
              type="button"
              @click="deleteHeader" 
              class="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"
            >
              Delete Header
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const config = useRuntimeConfig();
const token = useCookie('token', { default: () => '' }).value;
const route = useRoute();
const router = useRouter();
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
    alert("Header updated successfully");
    router.push('/headers');
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
      alert("Header deleted successfully");
      router.push('/headers');
    } else {
      alert("Error deleting header");
    }
  }
}

onMounted(fetchHeader);
</script>