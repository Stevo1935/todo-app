"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTodo } from "../hooks/useTodos";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/TodoDetail.css";
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

  const id = params?.id as string;

  const { data: todo, isLoading, error } = useTodo(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div role="alert">Error loading todo</div>;
  if (!todo) return <div role="alert">Todo not found</div>;

  return (
    <section className="todo-detail" aria-label="Todo Details">
      <button
        className="back-btn"
        onClick={() => router.back()}
        aria-label="Back to todo list"
      >
        <FaArrowLeft /> Back
      </button>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      <p>User ID: {todo.userId}</p>
      <p>ID: {todo.id}</p>
    </section>
  );
};

export default TodoDetail;
