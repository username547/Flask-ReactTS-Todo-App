import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './style/App.scss';


export interface ITodo {
  id: number;
  title: string;
  completed: Boolean;
}

export interface ITodoDto {
  title: string;
}

function App(): JSX.Element {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async (): Promise<void> => {
    const url = "http://127.0.0.1:5000/todos";
    axios.get(url)
      .then(response => {
        const data: ITodo[] = response.data.todos;
        setTodos(data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  const createTodo = async (dto: ITodoDto): Promise<void> => {
    const url = "http://127.0.0.1:5000/create";
    axios.post(url, dto)
      .then(response => {
        getTodos();
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  const updateTodo = async (id: number, dto: ITodoDto): Promise<void> => {
    const url = `http://127.0.0.1:5000/update/${id}`;
    axios.patch(url, dto)
      .then(response => {
        getTodos();
      })
      .catch(error => {
        throw new Error(error);
      })
  }

  const completeTodo = async (id: number): Promise<void> => {
    const url = `http://127.0.0.1:5000/complete/${id}`;
    axios.patch(url)
      .then(response => {
        getTodos();
      })
      .catch(error => {
        throw new Error(error);
      })
  }

  const deleteTodo = async (id: number): Promise<void> => {
    const url = `http://127.0.0.1:5000/delete/${id}`;
    axios.delete(url)
      .then(response => {
        getTodos();
      })
      .catch(error => {
        throw new Error(error);
      })
  }

  return (
    <div className="App">
      <TodoForm
        createTodo={createTodo}
      />
      <TodoList
        todos={todos}
        updateTodo={updateTodo}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
