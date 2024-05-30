import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    setError('');
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="filter-container">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </label>
      </div>
      <ul className="todo-list">
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleToggleComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="remove" onClick={() => handleRemoveTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
