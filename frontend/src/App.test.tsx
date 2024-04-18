import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { fireEvent, render } from '@testing-library/react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';

describe('Rendering Components', () => {
  test('renders TodoForm correctly', () => {
    const { getByTestId } = render(<TodoForm createTodo={() => {}} />);
    const todoFormElement = getByTestId('todo-form');
    expect(todoFormElement).toBeInTheDocument();
  });

  test('renders TodoList correctly', () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];
    const { getByTestId, getAllByTestId } = render(
      <TodoList
        todos={mockTodos}
        updateTodo={() => {}}
        completeTodo={() => {}}
        deleteTodo={() => {}}
      />
    );
    const todoListElement = getByTestId('todo-list');
    expect(todoListElement).toBeInTheDocument();
    const todoItems = getAllByTestId('todo-item');
    expect(todoItems.length).toBe(mockTodos.length);
  });

  test('renders TodoItem correctly', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const { getByText } = render(
      <table>
        <tbody>
          <TodoItem
            todo={todo}
            updateTodo={() => {}}
            completeTodo={() => {}}
            deleteTodo={() => {}}
          />
        </tbody>
      </table>
    );
    const todoTitleElement = getByText(todo.title);
    expect(todoTitleElement).toBeInTheDocument();
  });
});


describe('Functional Tests', () => {
  test('adds a new todo', async () => {
    const createTodoMock = jest.fn();
    const { getByTestId } = render(<TodoForm createTodo={createTodoMock} />);

    const input = getByTestId('todo-input');
    const button = getByTestId('todo-button');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.click(button);

    await waitFor(() => expect(createTodoMock).toHaveBeenCalledWith({ title: 'New todo' }));

    expect(input).toHaveValue('');
  });

  test('updates a todo', async () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const updateTodoMock = jest.fn();
    const { getByTestId } = render(
      <table>
        <tbody>
          <TodoItem
            todo={todo}
            updateTodo={updateTodoMock}
            completeTodo={() => {}}
            deleteTodo={() => {}}
          />
        </tbody>
      </table>
    );

    const updateButton = getByTestId('update-button');
    fireEvent.click(updateButton);

    const input = getByTestId('todo-item-input');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    const saveButton = getByTestId('save-button');
    fireEvent.click(saveButton);

    await waitFor(() => expect(updateTodoMock).toHaveBeenCalledWith(todo.id, { title: 'Updated Todo' }));
  });

  test('deletes a todo', async () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const deleteTodoMock = jest.fn();
    const { getByTestId } = render(
      <table>
        <tbody>
          <TodoItem
            todo={todo}
            updateTodo={() => {}}
            completeTodo={() => {}}
            deleteTodo={deleteTodoMock}
          />
        </tbody>
      </table>
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteTodoMock).toHaveBeenCalledWith(todo.id));
  });

  test('completes a todo', async () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const completeTodoMock = jest.fn();
    const { getByTestId } = render(
      <table>
        <tbody>
          <TodoItem
            todo={todo}
            updateTodo={() => {}}
            completeTodo={completeTodoMock}
            deleteTodo={() => {}}
          />
        </tbody>
      </table>
    );

    const completeButton = getByTestId('complete-button');
    fireEvent.click(completeButton);

    await waitFor(() => expect(completeTodoMock).toHaveBeenCalledWith(todo.id));
  });

  test('displays error message when title is not provided', async () => {
    const { getByTestId, getByText } = render(<TodoForm createTodo={() => {}} />);
    
    const button = getByTestId('todo-button');
    fireEvent.click(button);
  
    await waitFor(() => expect(getByText('Required')).toBeInTheDocument());
  });
  
  test('displays error message when title length is less than 3', async () => {
    const { getByTestId, getByText } = render(<TodoForm createTodo={() => {}} />);
    
    const input = getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Te' } });
  
    const button = getByTestId('todo-button');
    fireEvent.click(button);
  
    await waitFor(() => expect(getByText('Title must be at least 3 characters long')).toBeInTheDocument());
  });
  
  test('displays error message when title contains non-Latin letters', async () => {
    const { getByTestId, getByText } = render(<TodoForm createTodo={() => {}} />);
    
    const input = getByTestId('todo-input');
    fireEvent.change(input, { target: { value: 'Новое дело' } });
  
    const button = getByTestId('todo-button');
    fireEvent.click(button);
  
    await waitFor(() => expect(getByText('Title must contain only Latin letters')).toBeInTheDocument());
  });
});