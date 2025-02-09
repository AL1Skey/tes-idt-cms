<template>
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Projects List</h1>
            <button @click="goBack" class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 ease-in-out">
              <ArrowLeftIcon class="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
          <NuxtLink to="/projects/create" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 ease-in-out">
            <PlusIcon class="h-5 w-5 mr-2" />
            Create New Project
          </NuxtLink>
        </div>
        <ul v-if="projects.length > 0" class="space-y-4">
            <li v-for="project in projects" :key="project.url" class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
                <div class="p-6 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img :src="project.image" alt="Project Logo" class="w-16 h-16 object-cover rounded-full border-2 border-gray-200">
                        <div>
                            <p class="text-lg font-semibold text-gray-900">{{ project.name || 'Unnamed Project' }}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <NuxtLink :to="`/projects/${project.id}`" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out">
                            <PencilIcon class="h-4 w-4 mr-1" />
                            Edit
                        </NuxtLink>
                        <button @click="deleteProject(project.id)" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out">
                            <TrashIcon class="h-4 w-4 mr-1" />
                            Delete
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="text-center py-12 bg-white rounded-lg shadow-md">
          <InboxIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div class="mt-6">
            <NuxtLink to="/projects/create" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <PlusIcon class="h-5 w-5 mr-2" />
              Create New Project
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
  const projects = ref([]);
  const token = useCookie('token', { default: () => '' }).value;
  const router = useRouter();
  
  async function fetchprojects() {
    const { data, error } = await useFetch(`${config.public.apiBase}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value && data.value) {
      projects.value = data.value;
    }
  }
  
  async function deleteProject(id) {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await useFetch(`${config.public.apiBase}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!error.value) {
        alert("Project deleted successfully");
        fetchprojects();
      } else {
        alert("Error deleting project");
      }
    }
  }
  
  function goBack() {
    router.push('/');
  }
  
  onMounted(fetchprojects);
  </script>