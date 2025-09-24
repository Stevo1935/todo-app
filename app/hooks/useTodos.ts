import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  cacheTodos,
  getCachedTodos,
  updateCachedTodo,
  deleteCachedTodo,
} from "../lib/db";
import { Todo } from "../lib/types";

interface TodosResult {
  todos: Todo[];
  total: number;
}
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const useTodos = (
  page: number = 1,
  search: string = "",
  status: "all" | "complete" | "incomplete" = "all"
): ReturnType<typeof useQuery<TodosResult, Error>> => {
  return useQuery<TodosResult, Error>({
    queryKey: ["todos", search, status, page],
    queryFn: async (): Promise<TodosResult> => {
      try {
        const cached: Todo[] = await getCachedTodos();
        let allTodos: Todo[];

        if (cached.length && !navigator.onLine) {
          allTodos = cached;
        } else {
          const { data } = await axios.get<Todo[]>(API_URL, {
            params: { q: search },
          });
          await cacheTodos(data);
          allTodos = data;
        }

        let filtered: Todo[] = allTodos;
        if (search) {
          filtered = filtered.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (status !== "all") {
          filtered = filtered.filter((todo) =>
            status === "complete" ? todo.completed : !todo.completed
          );
        }

        const start = (page - 1) * 10;
        const end = start + 10;
        const paginatedTodos = filtered.slice(start, end);
        return {
          todos: paginatedTodos,
          total: filtered.length,
        };
      } catch (error) {
        const cached: Todo[] = await getCachedTodos();
        let filtered: Todo[] = cached || [];
        if (search) {
          filtered = filtered.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          );
        }
        if (status !== "all") {
          filtered = filtered.filter((todo) =>
            status === "complete" ? todo.completed : !todo.completed
          );
        }
        const start = (page - 1) * 10;
        const end = start + 10;
        return {
          todos: filtered.slice(start, end),
          total: filtered.length,
        };
      }
    },

    placeholderData: (previousData) => previousData,
  });
};

export const useTodo = (
  id: string
): ReturnType<typeof useQuery<Todo, Error>> => {
  return useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const { data } = await axios.get<Todo>(`${API_URL}/${id}`);
      return data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Omit<Todo, "id">>({
    mutationFn: async (todo: Omit<Todo, "id">) => {
      const { data } = await axios.post<Todo>(API_URL, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo>({
    mutationFn: async (todo: Todo) => {
      const { data } = await axios.put<Todo>(`${API_URL}/${todo.id}`, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
      await deleteCachedTodo(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
