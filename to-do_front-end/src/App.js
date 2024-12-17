import { AiOutlineDelete } from 'react-icons/ai';
import './App.css';
import { useState } from 'react';
import { BiCheck, BiEditAlt } from 'react-icons/bi';

function App() {
  const [statusFilter, setStatusFilter] = useState('OPEN');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'This is task 1', status: 'OPEN' },
    { id: 2, title: 'Task 2', description: 'This is task 2', status: 'WIP' },
    { id: 3, title: 'Task 3', description: 'This is task 3', status: 'COMPLETED' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Function to add a new task
  const handleAddTask = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newTask = {
        id: tasks.length + 1, // Simple unique ID generation
        title: newTitle,
        description: newDescription,
        status: 'OPEN',
      };

      setTasks([...tasks, newTask]);
      setNewTitle(''); 
      setNewDescription('');
    }
  };

  // Function to change task status
  const changeTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on the selected status
  const filteredTasks = tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="App">
      <h1>ToDo List</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTask} className="primaryBtn">
              Add Task
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${statusFilter === 'OPEN' && 'active'}`}
            onClick={() => setStatusFilter('OPEN')}
          >
            Open
          </button>
          <button
            className={`secondaryBtn ${statusFilter === 'WIP' && 'active'}`}
            onClick={() => setStatusFilter('WIP')}
          >
            Work In Progress
          </button>
          <button
            className={`secondaryBtn ${statusFilter === 'COMPLETED' && 'active'}`}
            onClick={() => setStatusFilter('COMPLETED')}
          >
            Completed
          </button>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>

              <div className="task-icons">
                {task.status === 'OPEN' && (
                  <BiEditAlt
                    className="icon check-icon"
                    title="Set to Work In Progress"
                    onClick={() => changeTaskStatus(task.id, 'WIP')}
                  />
                )}

                {task.status === 'WIP' && (
                  <BiCheck
                    className="icon check-icon"
                    title="Set to Completed"
                    onClick={() => changeTaskStatus(task.id, 'COMPLETED')}
                  />
                )}

                <AiOutlineDelete
                  className="icon delete-icon"
                  title="Delete Task"
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && <p>No tasks found for this status.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
