// UserList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Userlist = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = "https://67102e26a85f4164ef2d496e.mockapi.io/user"; // Reemplaza con la URL de tu API de MockAPI.io

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al obtener usuarios:", error))
            .finally(() => {
                setLoading(false);
            });
    }, [apiUrl]);
    const handleDeleteUser = (userId) => {
        console.log(userId);
        
        // Realizar solicitud DELETE para eliminar un usuario
        fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Actualizar el estado excluyendo al usuario eliminado
                setUsers(users.filter((user) => user.id !== userId));
            })
            .catch((error) => console.error('Error al eliminar usuario:', error));
    };
    console.log(users);
    
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {loading ?
                (<h1>Cargando...</h1>) :
                (<ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.mail}
                            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                            <button onClick={() => navigate(`/editar/${user.id}`)}>Editar</button>
                        </li>
                    ))}
                </ul>)}
        </div>
    );
};

export default Userlist;
