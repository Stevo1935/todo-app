<script setup lang="ts">
import { ref } from "vue";
import type { Todo, TodoFormValues } from "../types";

interface Props {
  initialValues?: Partial<Todo>;
  onSubmit: (values: TodoFormValues) => void;
  onCancel: () => void;
}
const props = defineProps<Props>();

// Form state
const title = ref(props.initialValues?.title ?? "");
const completed = ref(props.initialValues?.completed ?? false);
const isSubmitting = ref(false);
const errors = ref<{ title?: string }>({});

// Form submit handler
const handleSubmit = async () => {
  errors.value = {};

  if (!title.value.trim()) {
    errors.value.title = "Title is required";
    return;
  }

  isSubmitting.value = true;
  try {
    props.onSubmit({
      title: title.value,
      completed: completed.value,
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form
    class="todo-form"
    @submit.prevent="handleSubmit"
    role="form"
    aria-label="Todo Form"
  >
    <button
      type="button"
      class="close-btn"
      @click="props.onCancel"
      aria-label="Cancel"
    >
      ✕
    </button>

    <div class="form-group">
      <label for="title">Title</label>
      <input
        class="formgroup-modal"
        id="title"
        v-model="title"
        placeholder="Enter todo title"
        aria-describedby="title-error"
      />
      <span v-if="errors.title" role="alert" id="title-error">
        {{ errors.title }}
      </span>
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" v-model="completed" />
        Completed
      </label>
    </div>

    <div class="todo-form__actions">
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Saving..." : "Save" }}
      </button>
      <button type="button" @click="props.onCancel">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
.todo-form {
  position: relative;
  background: hsl(250, 64%, 8%);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.todo-form__group {
  margin-bottom: 1rem;
  max-width: 700px;
}

.todo-form__group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
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

.todo-form__actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.todo-form__actions button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: red;
}

.todo-form__actions button:first-child {
  background: hsl(250, 40%, 30%);
  color: white;
}

.todo-form-actions button:last-child {
  background: #e74c3c;
  color: white;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}
</style>
