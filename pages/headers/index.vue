<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Headers List</h1>
          <button @click="goBack" class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 ease-in-out">
            <ArrowLeftIcon class="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
        <NuxtLink to="/headers/create" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ease-in-out">
          <PlusIcon class="h-5 w-5 mr-2" />
          Create New Header
        </NuxtLink>
      </div>
      <ul v-if="headers.length > 0" class="space-y-4">
        <li v-for="header in headers" :key="header.id" class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
          <div class="p-6 flex items-center justify-between">
            <div>
              <p class="text-lg font-semibold text-gray-900">{{ header.title }}</p>
            </div>
            <div class="flex space-x-2">
              <NuxtLink :to="`/headers/${header.id}`" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out">
                <PencilIcon class="h-4 w-4 mr-1" />
                Edit
              </NuxtLink>
              <button @click="deleteHeader(header.id)" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out">
                <TrashIcon class="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="text-center py-12 bg-white rounded-lg shadow-md">
        <InboxIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No headers</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new header.</p>
        <div class="mt-6">
          <NuxtLink to="/headers/create" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <PlusIcon class="h-5 w-5 mr-2" />
            Create New Header
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { PlusIcon, PencilIcon, TrashIcon, ArrowLeftIcon, InboxIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();
const headers = ref([]);
const token = useCookie('token', { default: () => '' }).value;
const router = useRouter();

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
      alert("Header deleted successfully");
      fetchHeaders();
    } else {
      alert("Error deleting header");
    }
  }
}

function goBack() {
  router.push('/');
}

onMounted(fetchHeaders);
</script>