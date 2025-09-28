"use client";

import { useParams, useRouter } from "next/navigation";
import { useTodo } from "../hooks/useTodos";
import LoadingSpinner from "./LoadingSpinner";
import styles from "../styles/TodoDetail.module.css"; 
import { FaArrowLeft } from "react-icons/fa";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const TodoDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const id = Number(params?.id); // ensure number type

  const { data: todo, isLoading, error } = useTodo(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div role="alert">Error loading todo</div>;
  if (!todo) return <div role="alert">Todo not found</div>;

  return (
    <section className={styles.todoDetail} aria-label="Todo Details">
      <button
        className={styles.backBtn}
        onClick={() => router.back()}
        aria-label="Back to todo list"
      >
        <FaArrowLeft /> Back
      </button>
      <h2 aria-label="Todo title">{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      <p>User ID: {todo.userId}</p>
      <p>ID: {todo.id}</p>
    </section>
  );
};

export default TodoDetail;
