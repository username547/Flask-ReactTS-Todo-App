import { useState } from "react";
import { ITodo, ITodoDto } from "./App";
import './style/TodoItem.scss'

interface TodoItemProps {
  todo: ITodo;
  updateTodo: (id: number, dto: ITodoDto) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

function TodoItem({ todo, updateTodo, completeTodo, deleteTodo }: TodoItemProps): JSX.Element {
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const handleSaveUpdate = () => {
    updateTodo(todo.id, { title: todoTitle });
    setIsUpdating(false);
  };

  const handleCancelUpdate = () => {
    setTodoTitle(todo.title);
    setIsUpdating(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  return (
    <tr key={todo.id} data-testid="todo-item">
      <td>{todo.id}</td>
      <td>
        <div className="todo-item-content">
          {isUpdating ? (
            <input
              type="text"
              value={todoTitle}
              className="todo-item-input"
              onChange={handleTitleChange}
              data-testid="todo-item-input"
            />
          ) : (
            <span className="todo-text">{todoTitle}</span>
          )}
        </div>

      </td>
      <td>{todo.completed.toString()}</td>
      <td>
        <div className="btn-wrapper">
          {isUpdating ? (
            <>
              <button className="btn-save" onClick={handleSaveUpdate} data-testid="save-button">Save</button>
              <button className="btn-cancel" onClick={handleCancelUpdate} data-testid="cancel-button">Cancel</button>
            </>
          ) : (
            <>
              <button className="btn-complete" onClick={() => completeTodo(todo.id)} data-testid="complete-button">Complete</button>
              <button className="btn-update" onClick={() => setIsUpdating(true)} data-testid="update-button">Update</button>
              <button className="btn-delete" onClick={() => deleteTodo(todo.id)} data-testid="delete-button">Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default TodoItem;