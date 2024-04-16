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
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>
          {isUpdating ? (
            <input 
              type="text" 
              value={todoTitle} 
              className="todo-item-input" 
              onChange={handleTitleChange}
            />
          ) : (
            <span className="todo-text">{todoTitle}</span>
          )}
        </td>
        <td>{todo.completed.toString()}</td>
        <td>
          {isUpdating ? (
            <>
              <button className="btn-save" onClick={handleSaveUpdate}>Save</button>
              <button className="btn-cancel" onClick={handleCancelUpdate}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn-complete" onClick={() => completeTodo(todo.id)}>Complete</button>
              <button className="btn-update" onClick={() => setIsUpdating(true)}>Update</button>
              <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    );
  }
  
  export default TodoItem;