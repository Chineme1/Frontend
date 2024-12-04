import './App.css';
import Layout from './Components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './Components/UserManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<UserManagement />} />
          <Route index element={<Home />} />
          <Route path="/:slug" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
