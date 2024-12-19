import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import './App.css';
import { useEffect, useState } from 'react';
import { BiCheck, BiEditAlt } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';

function App() {
  const [statusFilter, setStatusFilter] = useState('OPEN');
  const [tasks, setTasks] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Function to add a new task
  const handleAddTask = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newTask = {
        id: tasks.length + 1, // Simple unique ID generation
        title: newTitle,
        description: newDescription,
        status: 'OPEN',
        openAt: new Date().toLocaleString(), // Set Open At date
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTitle('');
      setNewDescription('');
      localStorage.setItem('todolist', JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todolist'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Function to change task status
  const changeTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (newStatus === 'WIP') {
          return { ...task, status: newStatus, workInProgressAt: new Date().toLocaleString() };
        }
        if (newStatus === 'COMPLETED') {
          return { ...task, status: newStatus, completedAt: new Date().toLocaleString() };
        }
      }
      return task; 
    });
    setTasks(updatedTasks);
    localStorage.setItem('todolist', JSON.stringify(updatedTasks));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('todolist', JSON.stringify(updatedTasks));
  };

  // Function to initiate editing a task
  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
  };

  // Function to handle input changes for the editing task
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Function to save the edited task
  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? currentTask : task
    );
    setTasks(updatedTasks);
    setIsEditing(false);
    setCurrentTask(null);
    localStorage.setItem('todolist', JSON.stringify(updatedTasks));
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
              {isEditing && currentTask.id === task.id ? (
                <div className='editing'>
                  <input
                    type="text"
                    name="title"
                    value={currentTask.title}
                    onChange={handleEditInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    value={currentTask.description}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={saveEditedTask}>Save</button>
                </div>
              ) : (
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="task-dates">
                    {task.openAt && (
                      <div className="date-item">
                        <strong>Open At:</strong> <span>{task.openAt}</span>
                      </div>
                    )}
                    {/* {task.workInProgressAt && (
                      <div className="date-item">
                        <strong>Work In Progress At:</strong> <span>{task.workInProgressAt}</span>
                      </div>
                    )} */}
                    {task.completedAt && (
                      <div className="date-item">
                        <strong>Completed At:</strong> <span>{task.completedAt}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="task-icons">
                {task.status === 'OPEN' && (
                  <MdWork
                    className="icon work-icon"
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

                <AiFillEdit
                    className="icon edit-icon"
                    title="Edit Task"
                    onClick={() => editTask(task)}
                  />

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
