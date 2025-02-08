<template>
  <div>
    <NuxtLayout>
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ClientOnly } from '#components';

// App-wide logic can go here
</script>