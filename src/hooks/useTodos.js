import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  cacheTodos,
  getCachedTodos,
  updateCachedTodo,
  deleteCachedTodo,
} from "../db";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const useTodos = (page = 1, search = "", status = "all") => {
  return useQuery({
    queryKey: ["todos", search, status, page],
    queryFn: async () => {
      try {
        const cached = await getCachedTodos();
        let allTodos;

        if (cached.length && !navigator.onLine) {
          allTodos = cached;
        } else {
          const { data } = await axios.get(API_URL, {
            params: { q: search },
          });
          await cacheTodos(data);
          allTodos = data;
        }

        let filtered = allTodos;
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
        const cached = await getCachedTodos();
        let filtered = cached || [];
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

    keepPreviousData: true,
  });
};

export const useTodo = (id) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo) => {
      const { data } = await axios.post(API_URL, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (todo) => {
      const { data } = await axios.put(`${API_URL}/${todo.id}`, todo);
      await updateCachedTodo(data);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${API_URL}/${id}`);
      await deleteCachedTodo(id);
    },
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
};
