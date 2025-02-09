<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="px-6 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Edit Brand</h1>
        <form @submit.prevent="updateBrand" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div class="flex items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-lg transition-all duration-300 ease-in-out hover:border-blue-500">
              <div class="space-y-1 text-center">
                <div v-if="form.logo" class="mb-4">
                  <img :src="form.logo" alt="Brand Logo" class="mx-auto h-32 w-auto rounded-lg shadow-md" />
                </div>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange" accept="image/*" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label for="copyright" class="block text-sm font-medium text-gray-700 mb-2">Copyright</label>
            <input v-model="form.copyright" id="copyright" type="text" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div class="flex items-center justify-between space-x-4">
            <button type="submit" class="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out">
              Update Brand
            </button>
            <button @click.prevent="deleteBrand" class="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out">
              Delete Brand
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
    alert("Brand updated successfully");
    router.push('/brands');
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
      alert("Brand deleted successfully");
      router.push('/brands');
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
      form.value.logo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

onMounted(fetchBrand);
</script>