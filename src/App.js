import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path="/my-mocks" element={<Mocks />} /> */}
        {/* <Route path="/mock/:id" element={<EditMock />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path='/mock/new' element={<NewMock />} /> */}
        {/* <Route path='/mock/delete/:id' element={<DeleteMock />} /> */}
      </Routes>
    </>

  );
}

export default App;
