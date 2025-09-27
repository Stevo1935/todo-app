<template>
  <div>
    <!-- Header -->
    <header class="header">
      <RouterLink to="/" class="header__link" aria-label="Todo App Home">
      <v-icon name="fa-tasks" />   Todo App
      </RouterLink>
    </header>

    
    <main class="main">
      
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
      <ChatBox />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
 import ChatBox from "./components/ChatBox.vue";

</script>

<style scoped>

</style>
