// UserList.js
import React, { useState, useEffect } from "react";

const User = () => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState("")
    const [newUserMail, setNewUserMail] = useState("")
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
    console.log(loading);
    const handleCreateUser = () => {
        // Realizar solicitud POST para agregar un nuevo usuario
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName , mail:newUserMail}),
        })
            .then((response) => response.json())
            .then(() => {
                // Realizar cualquier acción adicional si es necesario
                setNewUserName('');
                setNewUserMail('');
            })
            .then(() => {
                // Realizar solicitud GET después de crear un usuario para obtener datos actualizados
                return fetch(apiUrl);
            })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error(error.message));
    };
    return (
        <div>
            {/* <h2>Lista de Usuarios</h2>
            {loading ?
                (<h1>Cargando...</h1>) :
                (<ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.mail}
                        </li>
                    ))}
                </ul>)}*/}
                
            <div>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Nombre del Usuario" />
                <input
                    type="text"
                    value={newUserMail}
                    onChange={(e) => setNewUserMail(e.target.value)}
                    placeholder="Email" />
                    <button onClick={handleCreateUser}>Crear Usuario</button>
            </div>
            
        </div>
    );
};

export default User;
