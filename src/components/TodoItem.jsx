import { Link } from "react-router-dom";
import { useUpdateTodo } from "../hooks/useTodos";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import TodoForm from "./TodoForm";

function TodoItem({ todo, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const updateTodo = useUpdateTodo();

  const handleUpdate = (values) => {
    updateTodo.mutate({ ...todo, ...values });
    setIsEditing(false);
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
          <Link to={`/todos/${todo.id}`} className="todo-item__title">
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
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
