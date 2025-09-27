<template>
  <div class="loading-spinner" role="status">
    <div class="loading-spinner__spinner" aria-label="Loading..."></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.loading-spinner__spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid hsl(250, 70%, 10%);
  border-radius: 50%;
  animation: loading-spinner__spin 1s linear infinite;
}

@keyframes loading-spinner__spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
