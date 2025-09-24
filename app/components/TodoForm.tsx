"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/Form.css";
import { FaTimes } from "react-icons/fa";
import { Todo, TodoFormValues } from "../lib/types";

interface TodoFormProps {
  initialValues?: Partial<Todo>;
  onSubmit: (values: TodoFormValues) => void;
  onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    defaultValues: {
      title: initialValues.title || "",
      completed: initialValues.completed ?? false,
    },
  });

  const onFormSubmit: SubmitHandler<TodoFormValues> = (values) => {
    onSubmit(values);
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit(onFormSubmit)}
      role="form"
      aria-label="Todo Form"
    >
      <button
        type="button"
        className="close-btn"
        onClick={onCancel}
        aria-label="Cancel"
      >
        <FaTimes />
      </button>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          className="formgroup-modal"
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter todo title"
          aria-describedby="title-error"
        />
        {errors.title && (
          <span role="alert" id="title-error">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="form-group">
        <label id="completed">
          <input type="checkbox" {...register("completed")} />
          Completed
        </label>
      </div>
      <div className="todo-form__actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
