<template>
  <div class="container px-4 py-8 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Create New Footer</h1>
    <form @submit.prevent="createFooter" class="max-w-md p-6 bg-white rounded shadow">
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
      <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
        Create
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const config = useRuntimeConfig();
const form = ref({ title: '', description: '', phone_number: '', email: '', address: '' });
const token = useCookie('token', { default: () => '' }).value;

async function createFooter() {
  const { error } = await useFetch(`${config.public.apiBase}/footers`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form.value
  });
  if (!error.value) {
    alert("Footer created");
    navigateTo('/footers');
  } else {
    alert("Error creating footer");
  }
}
</script>
