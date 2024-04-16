import { useEffect, useState } from 'react';
// import axios from 'axios';
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

  // const getTodos = async (): Promise<void> => {
  //   const url = "http://127.0.0.1:5000/todos";
  //   axios.get(url)
  //     .then(response => {
  //       const data: ITodo[] = response.data.todos;
  //       setTodos(data);
  //     })
  //     .catch(error => {
  //       throw new Error(error);
  //     });
  // }

  // const createTodo = async (dto: ITodoDto): Promise<void> => {
  //   const url = "http://127.0.0.1:5000/create";
  //   axios.post(url, dto)
  //     .then(response => {
  //       getTodos();
  //     })
  //     .catch(error => {
  //       throw new Error(error);
  //     });
  // }

  // const updateTodo = async (id: number, dto: ITodoDto): Promise<void> => {
  //   const url = `http://127.0.0.1:5000/update/${id}`;
  //   axios.patch(url, dto)
  //     .then(response => {
  //       getTodos();
  //     })
  //     .catch(error => {
  //       throw new Error(error);
  //     })
  // }

  // const completeTodo = async (id: number): Promise<void> => {
  //   const url = `http://127.0.0.1:5000/complete/${id}`;
  //   axios.patch(url)
  //     .then(response => {
  //       getTodos();
  //     })
  //     .catch(error => {
  //       throw new Error(error);
  //     })
  // }

  // const deleteTodo = async (id: number): Promise<void> => {
  //   const url = `http://127.0.0.1:5000/delete/${id}`;
  //   axios.delete(url)
  //     .then(response => {
  //       getTodos();
  //     })
  //     .catch(error => {
  //       throw new Error(error);
  //     })
  // }

  const getTodos = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:5000/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ITodo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (dto: ITodoDto): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:5000/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (id: number, dto: ITodoDto): Promise<void> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const completeTodo = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/complete/${id}`, {
        method: 'PATCH'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

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
