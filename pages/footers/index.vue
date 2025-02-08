<template>
  <div class="container px-4 py-8 mx-auto">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Footers List</h1>
      <NuxtLink to="/footers/create" class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Create New Footer</NuxtLink>
    </div>
    <ul class="space-y-4">
      <li v-for="footer in footers" :key="footer.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
        <div>
          <p class="font-medium">{{ footer.title }}</p>
        </div>
        <div class="space-x-2">
          <NuxtLink :to="`/footers/${footer.id}`" class="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</NuxtLink>
          <button @click="deleteFooter(footer.id)" class="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
const footers = ref([]);
const token = useCookie('token').value;

async function fetchFooters() {
  const { data, error } = await useFetch(`${config.public.apiBase}/footers`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!error.value && data.value) {
    footers.value = data.value;
  }
}

async function deleteFooter(id) {
  if (confirm("Are you sure you want to delete this footer?")) {
    const { error } = await useFetch(`${config.public.apiBase}/footers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value) {
      alert("Footer deleted");
      fetchFooters();
    } else {
      alert("Error deleting footer");
    }
  }
}

onMounted(fetchFooters);
</script>
