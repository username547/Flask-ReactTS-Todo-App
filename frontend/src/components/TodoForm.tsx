import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { ITodoDto } from "./App";
import './style/TodoForm.scss'

interface TodoFormProps {
    createTodo: (dto: ITodoDto) => void;
  }
  
function TodoForm({ createTodo }: TodoFormProps): JSX.Element {
  const [title, setTitle] = useState('');
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({
      title: title
    });
    setTitle('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit} data-testid="todo-form">
        <div>
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            className="form-input"
            data-testid="todo-input"
          />
        </div>
        <div>
          <button type="submit" className="btn-create" data-testid="todo-button">Create</button>
        </div>
    </form>
  );
}
  
export default TodoForm;