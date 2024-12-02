import logo from './logo.svg'
import './App.css';
import CreateAccount from './Components/CreateAccount/CreateAccount.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout/temp.jsx';
import Home from './pages/home.jsx';
import Detail from './pages/detail.jsx';
import LoginForm from './Components/LoginForm/LoginForm';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:slug" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
