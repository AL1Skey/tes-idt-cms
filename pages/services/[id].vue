<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Service</h1>
        <form @submit.prevent="updateService" class="space-y-6">
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
          
          <div>
            <label 
              for="service-list" 
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Service List
            </label>
            <div class="mt-1">
              <textarea 
                v-model="serviceListText" 
                id="service-list"
                rows="4"
                placeholder="Enter services separated by commas"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
              <p class="mt-1 text-sm text-gray-500">
                Separate services with commas (e.g. Service 1, Service 2, Service 3)
              </p>
            </div>
          </div>
          
          <div class="flex items-center justify-between space-x-4">
            <button 
              type="submit" 
              class="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
            >
              Update Service
            </button>
            <button 
              type="button"
              @click="deleteService" 
              class="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"
            >
              Delete Service
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
const form = ref({ id: null, title: '', description: '', service_list: [] });
const serviceListText = ref('');
const serviceId = route.params.id;

async function fetchService() {
  const { data, error } = await useFetch(`${config.public.apiBase}/services/${serviceId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!error.value && data.value) {
    form.value = data.value;
    serviceListText.value = form.value.service_list ? form.value.service_list : '';
  }
}

async function updateService() {
  form.value.service_list = serviceListText.value//.split(',').map(item => item.trim()).filter(Boolean);
  const { error } = await useFetch(`${config.public.apiBase}/services/${serviceId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form.value
  });
  if (!error.value) {
    alert("Service updated successfully");
    router.push('/services');
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
      alert("Service deleted successfully");
      router.push('/services');
    } else {
      alert("Error deleting service");
    }
  }
}

onMounted(fetchService);
</script>