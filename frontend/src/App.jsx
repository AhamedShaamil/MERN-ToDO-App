import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import './index.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from backend on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodoHandler = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await createTodo({ title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodoHandler = async (id, completed) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const res = await updateTodo(id, { completed: !todoToUpdate.completed });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodoHandler();
  };

  const clearCompleted = async () => {
    // Delete all completed todos one by one
    const completedTodos = todos.filter(todo => todo.completed);
    try {
      for (const todo of completedTodos) {
        await deleteTodo(todo._id);
      }
      setTodos(todos.filter(todo => !todo.completed));
    } catch (err) {
      console.error('Error clearing completed:', err);
    }
  };

  const incompleteCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app">
      <div className="todo-card">
        <header className="header">
          <h1>📝 My Todo App</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button
              onClick={addTodoHandler}
              className="add-btn"
              disabled={!newTodo.trim()}
            >
              <span className="btn-text">Add Task</span>
              <span className="btn-icon">+</span>
            </button>
          </div>
          <p className="hint">Press Enter or click 'Add Task' to add</p>
        </div>

        {todos.length > 0 && (
          <div className="stats-bar">
            <span className="stats-text">
              {incompleteCount} pending • {todos.length - incompleteCount} completed
            </span>
            {todos.some(todo => todo.completed) && (
              <button onClick={clearCompleted} className="clear-btn">
                Clear Completed
              </button>
            )}
          </div>
        )}

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet</h3>
              <p>Add your first todo item above to get started!</p>
            </div>
          ) : (
            <ul>
              {todos.map(todo => (
                <li
                  key={todo._id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  <div className="todo-content">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodoHandler(todo._id, todo.completed)}
                        className="todo-checkbox"
                        id={`todo-${todo._id}`}
                      />
                      <label htmlFor={`todo-${todo._id}`} className="custom-checkbox"></label>
                    </div>
                    <div className="text-wrapper">
                      <span className="todo-text">{todo.title}</span>
                      <span className="todo-date">
                        {new Date(todo.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodoHandler(todo._id)}
                    className="delete-btn"
                    aria-label="Delete todo"
                  >
                    <svg className="delete-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="footer">
          <p className="footer-text">
            {todos.length === 0 
              ? '✨ Start by adding your first task above!' 
              : incompleteCount === 0 && todos.length > 0 
                ? '🎉 All tasks completed! Great work!' 
                : '💡 Tip: Click on a task to mark it as complete'}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
