"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUpdateTodo } from "../hooks/useTodos";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Todo, TodoFormValues } from "../lib/types";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutate: updateTodo } = useUpdateTodo();

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
  const handleDelete = () => {};

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
              onClick={() => handleDelete}
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
