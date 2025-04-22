import Home from "./pages/Home";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Contacts from './pages/Contacts.jsx'
import Contact from './pages/Contact.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
