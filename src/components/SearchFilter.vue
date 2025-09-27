<template>
  <section class="search-filter" aria-label="Search and Filter Todos">
    <!-- Search Input -->
    <div class="form-group">
      <label for="search">Search:</label>
      <input
        id="search"
        type="text"
        v-model="localSearch"
        @input="onSearchInput"
        placeholder="Search todos..."
        aria-label="Search todos by title"
      />
    </div>

    <!-- Status Dropdown -->
    <div class="form-group">
      <label for="status">Status:</label>
      <select
        id="status"
        v-model="internalStatus"
        @change="emitStatus"
        aria-label="Filter by completion status"
      >
        <option value="all">All</option>
        <option value="complete">Completed</option>
        <option value="incomplete">Pending</option>
      </select>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type Status = "all" | "complete" | "incomplete";

interface Props {
  search: string;
  status: Status;
}

// props
const props = defineProps<Props>();

// emits (like setSearch / setStatus in React)
const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:status", value: Status): void;
}>();

// local state (same as React’s localSearch)
const localSearch = ref(props.search);
const internalStatus = ref<Status>(props.status);

// debounce util (like your React version)
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func(...args), delay);
  };
}

// search handler with debounce
const emitSearch = debounce((value: string) => {
  emit("update:search", value);
}, 500);

function onSearchInput() {
  emitSearch(localSearch.value);
}

// watch props → sync local state when parent updates
watch(
  () => props.search,
  (newVal) => {
    localSearch.value = newVal;
  }
);

// emit status immediately on change
function emitStatus() {
  emit("update:status", internalStatus.value);
}
</script>

<style scoped>
.search-filter {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-filter .form-group {
  flex: 1;
  min-width: 200px;
}

[role="alert"] {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
.form-group input,
.form-group select {
  width: 90%;
  padding: 0.75rem;
  border-radius: 15px;
  font-size: 1rem;
  background-color: hsl(250, 70%, 10%);
  color: white;
}
.form-group label {
  color: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  background-color: hsl(250, 40%, 30%);
}
</style>
