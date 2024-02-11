import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Ventas from './components/Ventas/Ventas';
import CRUD from './components/CRUD/CRUD';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/ventas' element={<Ventas/>}/>
          <Route path='/crud' element={<CRUD/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
