<template>
  <div>

      <ClientOnly>
        <NuxtPage />
      </ClientOnly>

  </div>
</template>

<script setup>
import { ClientOnly } from '#components';

// App-wide logic can go here
</script>