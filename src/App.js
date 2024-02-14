import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Ventas from './components/Ventas/Ventas';
import CRUD from './components/CRUD/CRUD';
import { UserProvider } from './UserContext/UserProvider';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/ventas' element={<Ventas/>}/>
          <Route path='/crud' element={<CRUD/>}/>
        </Routes>
        <Footer/>
      </UserProvider>
    </BrowserRouter>
    );
}

export default App;
