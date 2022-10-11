import { Routes, Route } from 'react-router-dom';
import Shorts from './pages/Shorts';
import Home from './pages/Home';
import Short from './pages/Short';
import Edit from './pages/Edit';
import 'antd/dist/antd.css';
import './App.css';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/shorts" element={<Shorts />} />
      <Route path="/:URL" element={<Short />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path='/delete/:id' element={<h1>delete</h1>} />
    </Routes>
  );
}

export default App;
