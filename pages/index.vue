<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container px-4 py-8 mx-auto">
        <h1 class="mb-8 text-3xl font-bold text-center">Dashboard</h1>
        <nav class="flex flex-col items-center space-y-4">
          <NuxtLink to="/brands" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Manage Brands</NuxtLink>
          <NuxtLink to="/headers" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Manage Headers</NuxtLink>
          <NuxtLink to="/services" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Manage Services</NuxtLink>
          <NuxtLink to="/footers" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Manage Footers</NuxtLink>
        </nav>
      </div>
    </div>
  </template>
  