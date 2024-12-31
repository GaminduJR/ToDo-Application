import './App.css';
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import Todo from './components/Todo/Todo';

function App() {
  return (
    <div className="App">
      <h1>ToDo List</h1>
      {/* <Todo /> */}
      <LoginSignup/>
    </div>
  );
}

export default App;
