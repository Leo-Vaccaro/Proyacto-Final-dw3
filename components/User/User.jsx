// UserList.js
import React, { useState, useEffect } from "react";

const User = () => {
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
    console.log(loading);

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {loading ? (
                <h1>Cargando...</h1>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default User;
