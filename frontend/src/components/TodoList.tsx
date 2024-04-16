import { ITodo, ITodoDto } from "./App";
import TodoItem from "./TodoItem";
import './style/TodoList.scss'

interface TodoListProps {
    todos: ITodo[];
    updateTodo: (id: number, dto: ITodoDto) => void;
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
  }
  
  function TodoList({todos, updateTodo, completeTodo, deleteTodo}: TodoListProps): JSX.Element {
    return (
      <table className="todo-table" data-testid="todo-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </tbody>
        </table>
    );
  }
  
  export default TodoList;