import { useForm } from "@tanstack/react-form";
import "../styles/Form.css";
import { FaTimes } from "react-icons/fa";

function TodoForm({ initialValues = {}, onSubmit, onCancel }) {
  const form = useForm({
    defaultValues: {
      title: initialValues.title || "",
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      className="todo-form"
      onSubmit={form.handleSubmit}
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
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => (!value ? "Title is required" : undefined),
        }}
      >
        {(field) => (
          <div className="form-group">
            <label htmlFor={field.name}>Title</label>
            <input
              className="formgroup-modal"
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter todo title"
              aria-describedby="title-error"
            />
            {field.state.meta.errors ? (
              <span role="alert" id="title-error">
                {field.state.meta.errors[0]}
              </span>
            ) : null}
          </div>
        )}
      </form.Field>
      <div className="todo-form__actions">
        <button type="submit" disabled={form.state.isSubmitting}>
          {form.state.isSubmitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
