import { useState } from "react";
import { useTodos, useCreateTodo, useDeleteTodo } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import TodoForm from "./TodoForm";
import LoadingSpinner from "./LoadingSpinner";
import { FaPlus } from "react-icons/fa";
import "../styles/TodoList.css";

function TodoList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading, error } = useTodos(page, search, status);
  const todos = data?.todos || [];
  const total = data?.total || 0;

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();

  const handleCreate = (values) => {
    createTodo.mutate({ ...values, completedsurface: false, userId: 1 });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div role="alert">Error loading todos</div>;

  return (
    <section className="todo-list" aria-label="Todo List">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <button
        className="todo-list__add-button"
        onClick={() => setShowForm(true)}
        aria-label="Add new todo"
      >
        <FaPlus /> Add Todo
      </button>
      {showForm && (
        <TodoForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
      <ul className="todo-list__items" role="list">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
      <Pagination
        page={page}
        setPage={setPage}
        hasMore={total > page * 10}
        total={total}
      />
    </section>
  );
}

export default TodoList;
