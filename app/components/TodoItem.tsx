"use client";
import  { useState } from "react";
import Link from "next/link";
import { useUpdateTodo, useDeleteTodo } from "../hooks/useTodos";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Todo, TodoFormValues } from "../lib/types";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleUpdate = (values: TodoFormValues) => {
    updateTodo({
      ...todo,
      title: values.title,
      completed: values.completed ?? false,
    });
    setIsEditing(false);
  };

  const handleToggle = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(todo.id, {
      onSuccess: () => {
        onDelete(todo.id); // ✅ now onDelete is actually used
      },
    });
  };

  return (
    <li className="todo-item" role="listitem">
      {isEditing ? (
        <TodoForm
          initialValues={todo}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Link href={`/todos/${todo.id}`} className="todo-item__title">
            {todo.title}
          </Link>

          <span
            className={`todo-item__status ${todo.completed ? "completed" : ""}`}
            onClick={handleToggle}
            role="button"
            aria-label={`Mark ${todo.title} as ${
              todo.completed ? "pending" : "completed"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>

          <div className="todo-item__actions">
            <button
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${todo.title}`}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
