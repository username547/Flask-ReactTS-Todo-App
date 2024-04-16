import { Form as FinalForm, Field as FinalFormField } from "react-final-form";
import { ITodoDto } from "./App";
import './style/TodoForm.scss'

interface TodoFormProps {
  createTodo: (dto: ITodoDto) => void;
}

function TodoForm({ createTodo }: TodoFormProps): JSX.Element {
  const onSubmit = async (values: ITodoDto, form: any) => {
    createTodo(values);
    form.reset();
  };

  const validate = (values: ITodoDto) => {
    const errors: Partial<ITodoDto> = {};
    if (!values.title) errors.title = "Required";
    else if (values.title.length < 3) errors.title = "Title must be at least 3 characters long";
    else if (!/^[a-zA-Z\s]+$/i.test(values.title)) errors.title = "Title must contain only Latin letters";
    return errors;
  };

  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <TodoFormContent handleSubmit={handleSubmit} />
      )}
    />
  );
}

interface TodoFormContentProps {
  handleSubmit: any;
}

function TodoFormContent({ handleSubmit }: TodoFormContentProps): JSX.Element {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="todo-form" data-testid="todo-form">
      <FinalFormField
        name="title"
        render={({ input, meta }) => (
          <div className="input-wrapper">
            <input
              {...input}
              type="text"
              className={`todo-input ${meta.error && meta.touched ? 'error' : ''}`}
              placeholder="Enter todo title"
              data-testid="todo-input"
            />
            {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
          </div>
        )}
      />
      <button type="submit" className="btn-create" data-testid="todo-button">Create</button>
    </form>
  );
}

export default TodoForm;