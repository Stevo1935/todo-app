<template>
  <section class="todo-detail" aria-label="Todo Details">
    <!-- Back button -->
    <button
      class="back-btn"
      @click="goBack"
      aria-label="Back to todo list"
    >
       <v-icon name="fa-arrow-left" /> Back
    </button>

    <!-- Loading -->
    <LoadingSpinner v-if="isLoading" />

    <!-- Error -->
    <div v-else-if="error" role="alert">Error loading todo</div>

    <!-- Not Found -->
    <div v-else-if="!todo" role="alert">Todo not found</div>

    <!-- Todo Details -->
    <div v-else>
      <h2>{{ todo.title }}</h2>
      <p>Status: {{ todo.completed ? "Completed" : "Pending" }}</p>
      <p>User ID: {{ todo.userId }}</p>
      <p>ID: {{ todo.id }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useTodo } from "../composables/useTodos"; // Vue composable (instead of React hooks)
import LoadingSpinner from "../components/LoadingSpinner.vue";

// route + navigation
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// query from composable
const { data: todo, isLoading, error } = useTodo(id);

// go back to previous page
function goBack() {
  router.back();
}
</script>

<style scoped>
/* migrate your old TodoDetail.css styles here */.todo-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  background-color: hsl(250, 45%, 18%);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-start;
}

.todo-detail h2 {
  margin: 0;
  color: white;
}

.todo-detail p {
  margin: 0.5rem 0;
  color: white;
}

</style>
