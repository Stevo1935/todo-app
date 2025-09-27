
<template>
  <div>
    <h2>Error Test Page</h2>
    <p>If you see this, the error did not trigger.</p>
  </div>
</template>

<script setup lang="ts">
throw new Error("Test error for Vue error handling");
</script>
