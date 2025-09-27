<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found" role="alert">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <RouterLink class="notfound-link" to="/"> Return to Home </RouterLink>
  </div>
</template>

<script setup lang="ts">
// No logic needed, this is a static page
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 4rem;
}

.notfound-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #007acc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.notfound-link:hover {
  background: #005fa3;
}
</style>
