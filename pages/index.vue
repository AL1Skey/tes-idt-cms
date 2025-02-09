<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
    <!-- Top Navigation Bar -->
    <nav class="bg-white/90 backdrop-blur-sm border-b border-gray-300">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <button 
          @click="handleLogout" 
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
        >
          <LogOutIcon class="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-12">
      <!-- Welcome Message -->
      <div class="text-center mb-12 space-y-2">
        <h2 class="text-4xl font-bold text-gray-800">Welcome Back, Admin</h2>
        <p class="text-gray-600">Manage your website content from one place</p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Brands Card -->
        <NuxtLink 
          to="/projects"
          class="group relative overflow-hidden rounded-2xl bg-gray-100 p-6 hover:bg-gray-200 transition-all duration-300"
        >
          <div class="relative z-10">
            <LayersIcon class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Manage Project</h3>
            <p class="text-gray-600">Update and organize your past big things</p>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NuxtLink>

        <!-- Headers Card -->
        <NuxtLink 
          to="/headers"
          class="group relative overflow-hidden rounded-2xl bg-gray-100 p-6 hover:bg-gray-200 transition-all duration-300"
        >
          <div class="relative z-10">
            <LayoutTemplateIcon class="w-8 h-8 text-blue-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Manage Headers</h3>
            <p class="text-gray-600">Customize your website headers and navigation</p>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NuxtLink>

        <!-- Services Card -->
        <NuxtLink 
          to="/services"
          class="group relative overflow-hidden rounded-2xl bg-gray-100 p-6 hover:bg-gray-200 transition-all duration-300"
        >
          <div class="relative z-10">
            <SettingsIcon class="w-8 h-8 text-green-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Manage Services</h3>
            <p class="text-gray-600">Update your service offerings and details</p>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NuxtLink>

        <!-- Footers Card -->
        <NuxtLink 
          to="/footers"
          class="group relative overflow-hidden rounded-2xl bg-gray-100 p-6 hover:bg-gray-200 transition-all duration-300"
        >
          <div class="relative z-10">
            <FootprintsIcon class="w-8 h-8 text-orange-600 mb-4" />
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Manage Footers</h3>
            <p class="text-gray-600">Edit footer content and social links</p>
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-orange-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LogOutIcon, LayersIcon, LayoutTemplateIcon, SettingsIcon, FootprintsIcon } from 'lucide-vue-next'

const config = useRuntimeConfig();

const handleLogout = () => {
  // Add your logout logic here
  // For example:
  // 1. Clear authentication tokens
  // 2. Clear user session
  // 3. Redirect to login page
  const { error } = useFetch(`${config.public.apiBase}/logout`, { method: 'POST' })
  navigateTo('/login')
}
</script>

<style scoped>
/* Add smooth page transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Add hover lift effect */
.group:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);
}
</style>