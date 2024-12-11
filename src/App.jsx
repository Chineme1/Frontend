import './App.css';
import Layout from './Components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout'; // Import Checkout page
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserManagement from './Components/UserManagement';
import AddBook from './Components/AddBook';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<UserManagement />} />
          <Route index element={<Home />} />
          <Route path="/:slug" element={<Detail />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
