import logo from './logo.svg'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import LoginForm from './Components/LoginForm/LoginForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<CreateAccount />} />
      </Routes>
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
