<template>
  <section class="home" aria-label="Home Page">
    <!-- Todo List -->
    <TodoList />
  </section>
</template>

<script setup lang="ts">
import TodoList from "../components/TodoList.vue";
</script>

<style scoped>
.home {
  padding: 1rem;
}
</style>
