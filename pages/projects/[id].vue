<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Project</h1>
        <form @submit.prevent="updateProject" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div class="flex items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-lg transition-all duration-300 ease-in-out hover:border-green-500">
              <div class="space-y-1 text-center" v-if="!imagePreview">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload" accept="image/*" required />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <div v-else class="w-full">
                <img :src="imagePreview" alt="image Preview" class="mx-auto h-32 w-auto object-contain" />
                <button @click="removeImage" class="mt-2 text-sm text-red-600 hover:text-red-800 focus:outline-none">
                  Remove image
                </button>
              </div>
            </div>
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name of Project</label>
            <input v-model="form.name" id="name" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">Url of Project</label>
            <input v-model="form.url" id="url" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
          </div>
          <div class="flex items-center justify-between space-x-4">
            <button type="submit" class="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out">
              Update Project
            </button>
            <button @click.prevent="deleteProject" class="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out">
              Delete Project
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
const form = ref({ image: null, name: '', url: '' });
const projectId = route.params.id;

async function fetchBrand() {
  const { data, error } = await useFetch(`${config.public.apiBase}/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!error.value && data.value) {
    form.value = data.value;
  }
}

async function updateProject() {
  const { error } = await useFetch(`${config.public.apiBase}/projects/${projectId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form.value
  });
  if (!error.value) {
    alert("Project updated successfully");
    router.push('/projects');
  } else {
    alert("Error updating brand");
  }
}

async function deleteProject() {
  if (confirm("Are you sure you want to delete this brand?")) {
    const { error } = await useFetch(`${config.public.apiBase}/projects/${projectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value) {
      alert("Project deleted successfully");
      router.push('/projects');
    } else {
      alert("Error deleting brand");
    }
  }
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

onMounted(fetchBrand);
</script>