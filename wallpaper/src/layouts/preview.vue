<template>
  <div class="flex flex-col min-h-screen">
    <div class="sticky top-0 left-0 right-0 z-10 w-full">
      <nav-bar />
    </div>
    <div class="flex-1 bg-page flex flex-col">
      <div v-if="error" class="flex-1 flex-center">
        <reload />
      </div>
      <div v-else class="flex-1 flex flex-col"><slot /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import Reload from '@/components/reload/index.vue'

import { useConfigStore } from '@/store'
import { storeToRefs } from 'pinia'

const globalConfig = useConfigStore()
const { error } = storeToRefs(globalConfig)
</script>
