<template>
  <div class="container px-4 py-8 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Edit Footer</h1>
    <form @submit.prevent="updateFooter" class="max-w-md p-6 bg-white rounded shadow">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Title</label>
        <input v-model="form.title" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Description</label>
        <textarea v-model="form.description" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Phone Number</label>
        <input v-model="form.phone_number" type="text" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Email</label>
        <input v-model="form.email" type="email" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium">Address</label>
        <textarea v-model="form.address" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"></textarea>
      </div>
      <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
        Update
      </button>
    </form>
    <div class="mt-4">
      <button @click="deleteFooter" class="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
const token = useCookie('token', { default: () => '' }).value;
const route = useRoute();
const form = ref({ id: null, title: '', description: '', phone_number: '', email: '', address: '' });
const footerId = route.params.id;

async function fetchFooter() {
  const { data, error } = await useFetch(`${config.public.apiBase}/footers/${footerId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!error.value && data.value) {
    form.value = data.value;
  }
}

async function updateFooter() {
  const { error } = await useFetch(`${config.public.apiBase}/footers/${footerId}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form.value
  });
  if (!error.value) {
    alert("Footer updated");
    navigateTo('/footers');
  } else {
    alert("Error updating footer");
  }
}

async function deleteFooter() {
  if (confirm("Are you sure you want to delete this footer?")) {
    const { error } = await useFetch(`${config.public.apiBase}/footers/${footerId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!error.value) {
      alert("Footer deleted");
      navigateTo('/footers');
    } else {
      alert("Error deleting footer");
    }
  }
}

onMounted(fetchFooter);
</script>
