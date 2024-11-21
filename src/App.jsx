
import User from '../components/User/User'
import Userlist from '../components/Userlist/Userlist'
import Navbar from '../components/Navbar/Navbar';
import EditarTarea from '../components/EditarTarea/EditarTarea';
import './App.css'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
    const apiUrl = "https://67102e26a85f4164ef2d496e.mockapi.io/user";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al obtener usuarios:", error))
            .finally(() => {
                setLoading(false);
            });
    }, [apiUrl]);

  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/agregar" element={<User/>} />
          <Route path="/editar/:id" element={<EditarTarea />} />
          <Route path="/ver-todos" element={<Userlist user={users} loading={loading}></Userlist>} />
        </Routes>
    </Router>
  )
}

export default App
