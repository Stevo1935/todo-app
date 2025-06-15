import Dexie from "dexie";
import localforage from "localforage";

const db = new Dexie("TodoApp");
db.version(1).stores({
  todos: "++id,title,completed",
});

export const cacheTodos = async (todos) => {
  await localforage.setItem("todos", todos);
  await db.todos.bulkPut(todos);
};

export const getCachedTodos = async () => {
  const cached = await localforage.getItem("todos");
  if (cached) return cached;
  return await db.todos.toArray();
};

export const updateCachedTodo = async (todo) => {
  await db.todos.put(todo);
  const todos = await localforage.getItem("todos");
  if (todos) {
    const updated = todos.map((t) => (t.id === todo.id ? todo : t));
    await localforage.setItem("todos", updated);
  }
};

export const deleteCachedTodo = async (id) => {
  await db.todos.delete(id);
  const todos = await localforage.getItem("todos");
  if (todos) {
    const updated = todos.filter((t) => t.id !== id);
    await localforage.setItem("todos", updated);
  }
};
