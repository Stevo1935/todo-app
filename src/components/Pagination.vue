<template>
  <nav class="pagination" aria-label="Pagination">
    <!-- Previous -->
    <button
      :disabled="page === 1"
      @click="updatePage(page - 1)"
      aria-label="Previous page"
    >
      Previous
    </button>

    <!-- Current page -->
    <span class="page-number" aria-label="Current page">
      {{ page }}
    </span>

    <!-- Next -->
    <button
      :disabled="!hasMore"
      @click="updatePage(page + 1)"
      aria-label="Next page"
    >
      Next
    </button>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  page: number;
  hasMore: boolean;
  total: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();

function updatePage(newPage: number) {
  emit("update:page", newPage);
}
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background: hsl(250, 70%, 10%);
  color: white;
}
.pagination button:hover {
  background: hsl(250, 35%, 20%);
}

.pagination:disabled button:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.page-number {
  font-size: 1rem;
  color: white;
}
</style>
