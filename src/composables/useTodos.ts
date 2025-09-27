// src/composables/useTodos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import {
  cacheTodos,
  getCachedTodos,
  updateCachedTodo,
  deleteCachedTodo,
} from "../db";
import type { Todo } from "../types";
import { Ref } from "vue";

interface TodosResult {
  todos: Todo[];
  total: number;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// ✅ Fetch all todos with search, filter, pagination
export function useTodos(
  page: number | Ref<number> = 1,
  search: string | Ref<string> = "",
  status:
    | "all"
    | "complete"
    | "incomplete"
    | Ref<"all" | "complete" | "incomplete"> = "all"
) {
  return useQuery<TodosResult, Error>({
    queryKey: ["todos", page, search, status],
    queryFn: async (): Promise<TodosResult> => {
      try {
        const cached: Todo[] = await getCachedTodos();
        let allTodos: Todo[];

        if (cached.length && !navigator.onLine) {
          allTodos = cached;
        } else {
          const { data } = await axios.get<Todo[]>(API_URL, {
            params: { q: typeof search === "string" ? search : search.value },
          });
          await cacheTodos(data);
          allTodos = data;
        }

        // filter
        let filtered: Todo[] = allTodos;
        const searchValue = typeof search === "string" ? search : search.value;
        const statusValue = typeof status === "string" ? status : status.value;

        if (searchValue) {
          filtered = filtered.filter((todo) =>
            todo.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        if (statusValue !== "all") {
          filtered = filtered.filter((todo) =>
            statusValue === "complete" ? todo.completed : !todo.completed
          );
        }

        // pagination
        const pageValue = typeof page === "number" ? page : page.value;
        const start = (pageValue - 1) * 10;
        const end = start + 10;

        return {
          todos: filtered.slice(start, end),
          total: filtered.length,
        };
      } catch (error) {
        const cached: Todo[] = await getCachedTodos();
        let filtered: Todo[] = cached || [];

        const searchValue = typeof search === "string" ? search : search.value;
        const statusValue = typeof status === "string" ? status : status.value;

        if (searchValue) {
          filtered = filtered.filter((todo) =>
            todo.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        if (statusValue !== "all") {
          filtered = filtered.filter((todo) =>
            statusValue === "complete" ? todo.completed : !todo.completed
          );
        }

        const pageValue = typeof page === "number" ? page : page.value;
        const start = (pageValue - 1) * 10;
        const end = start + 10;

        return {
          todos: filtered.slice(start, end),
          total: filtered.length,
        };
      }
    },
    placeholderData: (prev) => prev,
  });
}

// ✅ Fetch a single todo
export function useTodo(id: string | Ref<string>) {
  return useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const todoId = typeof id === "string" ? id : id.value;
      const { data } = await axios.get<Todo>(`${API_URL}/${todoId}`);
      return data;
    },
  });
}

// ✅ Create todo
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Omit<Todo, "id">>({
    mutationFn: async (todo) => {
      const { data } = await axios.post<Todo>(API_URL, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

// ✅ Update todo
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo>({
    mutationFn: async (todo) => {
      const { data } = await axios.put<Todo>(`${API_URL}/${todo.id}`, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

// ✅ Delete todo
export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
      await deleteCachedTodo(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
