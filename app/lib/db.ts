import Dexie from "dexie";
import localforage from "localforage";
import { Todo } from "./types";

interface TodoTable {
  todos: Dexie.Table<Todo, number>;
}

const db = new Dexie("TodoApp") as Dexie & TodoTable;
db.version(1).stores({
  todos: "++id,title,completed",
});

export const cacheTodos = async (todos: Todo[]): Promise<void> => {
  await localforage.setItem<Todo[]>("todos", todos);
  await db.todos.bulkPut(todos);
};

export const getCachedTodos = async (): Promise<Todo[]> => {
  const cached = await localforage.getItem<Todo[]>("todos");
  if (cached) return cached;
  return await db.todos.toArray();
};

export const updateCachedTodo = async (todo: Todo): Promise<void> => {
  await db.todos.put(todo);
  const todos = await localforage.getItem<Todo[]>("todos");
  if (todos) {
    const updated = todos.map((t) => (t.id === todo.id ? todo : t));
    await localforage.setItem("todos", updated);
  }
};

export const deleteCachedTodo = async (id: number) => {
  await db.todos.delete(id);
  const todos = await localforage.getItem<Todo[]>("todos");
  if (todos) {
    const updated = todos.filter((t) => t.id !== id);
    await localforage.setItem<Todo[]>("todos", updated);
  }
};
