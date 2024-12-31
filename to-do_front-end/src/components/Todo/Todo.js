import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiCheck } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './todo.css';

const BASE_URL = 'http://localhost:8000/api';

function Todo() {
  const [statusFilter, setStatusFilter] = useState('OPEN');
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      const tasksWithId = response.data.map((task) => ({
        ...task,
        id: task._id,
      }));
      setTasks(tasksWithId);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newTask = {
      title: newTitle,
      description: newDescription,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${BASE_URL}/todos`, newTask);
      const taskWithId = { ...response.data, id: response.data._id };
      setTasks([...tasks, taskWithId]);
      setNewTitle('');
      setNewDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const changeTaskStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`${BASE_URL}/todos/${id}`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, ...response.data } : task))
      );
    } catch (error) {
      console.error('Error changing task status:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const saveEditedTask = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/todos/${currentTask.id}`, currentTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === currentTask.id ? { ...task, ...response.data } : task))
      );
      setIsEditing(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => task.status === statusFilter);

  return (
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
        {['OPEN', 'WIP', 'COMPLETED'].map((status) => (
          <button
            key={status}
            className={`secondaryBtn ${statusFilter === status && 'active'}`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              {isEditing && currentTask?.id === task.id ? (
                <div className="editing">
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
                    {task.createdAt && <div><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</div>}
                    {task.updatedAt && <div><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</div>}
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
      )}
    </div>
  );
}

export default Todo;
