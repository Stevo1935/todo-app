<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useUpdateTodo } from "../composables/useTodos";
import TodoForm from "./TodoForm.vue";
import type { Todo, TodoFormValues } from "../types";

const props = defineProps<{
  todo: Todo;
  onDelete: (id: number) => void;
}>();

const isEditing = ref(false);
const { mutate: updateTodo } = useUpdateTodo();

function handleUpdate(values: TodoFormValues) {
  updateTodo({
    ...props.todo,
    title: values.title,
    completed: values.completed ?? false,
  });
  isEditing.value = false;
}

function handleToggle() {
  updateTodo({
    ...props.todo,
    completed: !props.todo.completed,
  });
}

function handleDelete() {
  props.onDelete(props.todo.id);
}
</script>

<template>
  <li class="todo-item" role="listitem">
    <TodoForm
      v-if="isEditing"
      :initialValues="todo"
      @submit="handleUpdate"
      @cancel="() => (isEditing = false)"
    />

    <template v-else>
      <RouterLink :to="`/todos/${todo.id}`" class="todo-item__title">
        {{ todo.title }}
      </RouterLink>

      <span class="todo-item__status" :class="{ completed: todo.completed }">
        {{ todo.completed ? "Completed" : "Pending" }}
      </span>

      <div class="todo-item__actions">
        <button @click="isEditing = true" :aria-label="`Edit ${todo.title}`">
          ✏️
        </button>

        <button @click="handleDelete" :aria-label="`Delete ${todo.title}`">
          🗑️
        </button>
      </div>
    </template>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid black;
  gap: 1rem;
  max-width: 720px;
  margin: 0 auto;
  box-shadow: 1px 10px 10px rgba(0, 0, 0, 0.3);
  background-color: hsl(250, 45%, 18%);
}

.todo-item__title {
  flex: 2;
  text-decoration: none;
  color: white;
  font-weight: bold;
}
.todo-item__title:hover {
  color: lightgray;
}

.todo-item__status.completed {
  color: #27ae60;
}

.todo-item__status {
  flex: 1;
  color: #e74c3c;
}

.todo-item__actions {
  display: flex;
  gap: 0.5rem;
}

.todo-item__actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
}
</style>
