<template>
  <section class="todo-list" aria-label="Todo List">
    <!-- Search & Filter -->
    <SearchFilter
      :search="search"
      @update:search="search = $event"
      :status="status"
      @update:status="status = $event"
    />

    <!-- Add Todo Button -->
    <button
      class="todo-list__add-button"
      @click="showForm = true"
      aria-label="Add new todo"
    >
      <v-icon name="fa-plus" /> Add Todo
    </button>

    <!-- Todo Form -->
    <TodoForm
      v-if="showForm"
      @submit="handleCreate"
      @cancel="showForm = false"
    />

    <!-- Todo Items -->
    <ul class="todo-list__items" role="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="handleDelete"
      />
    </ul>

    <!-- Pagination -->
    <Pagination
      v-model:page="page"
      :has-more="total > page * 10"
      :total="total"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  useTodos,
  useCreateTodo,
  useDeleteTodo,
} from "../composables/useTodos";
import TodoItem from "./TodoItem.vue";
import Pagination from "./Pagination.vue";
import SearchFilter from "./SearchFilter.vue";
import TodoForm from "./TodoForm.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

// types
import type { Todo, TodoFormValues } from "../types";

// local state
const page = ref<number>(1);
const search = ref<string>("");
const status = ref<"all" | "complete" | "incomplete">("all");
const showForm = ref<boolean>(false);

// hooks
const { data, isLoading, error } = useTodos(page, search, status);
const createTodo = useCreateTodo();
const deleteTodo = useDeleteTodo();

// derived state
const todos = computed<Todo[]>(() => data.value?.todos || []);
const total = computed<number>(() => data.value?.total || 0);

// methods
function handleCreate(values: TodoFormValues) {
  createTodo.mutate({ ...values, completed: false, userId: 1 });
  showForm.value = false;
}

function handleDelete(id: number) {
  if (window.confirm("Are you sure you want to delete this todo?")) {
    deleteTodo.mutate(id);
  }
}
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 9px 10px rgba(0, 0, 0, 0.1);
  background: hsl(250, 45%, 18%);
  padding: 1rem;
  padding-right: 40px;
}

.todo-list__add-button {
  background-color: hsl(250, 70%, 10%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
}
.todo-list__add-button:hover {
  background-color: hsl(250, 35%, 20%);
}
</style>
