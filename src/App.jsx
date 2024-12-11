import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import Detail from './pages/detail';
import Checkout from './pages/Checkout'; // Import Checkout page
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:slug" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
