import React, { useContext, useState, useEffect } from 'react'; // useState y useEffect para manejar el estado y los efectos secundarios
import { useParams, useNavigate } from 'react-router-dom'; // useParams para obtener el parámetro 'id' de la URL
import Userlist from '../Userlist/Userlist';
const EditarTarea = () => {
    // Usamos 'useParams' para obtener el 'id' de la tarea desde la URL
    const { id } = useParams();
    //y el navigate para rediriguit una vez hecha la actualizacion
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState("")
    const [newUserMail, setNewUserMail] = useState("");
    const apiUrl = "https://67102e26a85f4164ef2d496e.mockapi.io/user";
    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, [apiUrl]);
    const userselected = users.find((user) => user.id == id);
    console.log(userselected);
    console.log(userselected)

    const handleUpdateUser = () => {
        // Realizar solicitud PUT para actualizar un usuario existente
        if (newUserName.trim() === '' || newUserMail.trim() === '') {
            alert('Por favor, completa todos los campos.'); // Mostramos una alerta si los campos están vacíos
            return; // Si falta algún campo, no guardamos los cambios
        }
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newUserName, mail: newUserMail }),
        })
            .then((response) => {
                response.json()
                navigate('/ver-todos')
            })
            .catch((error) => console.error('Error al actualizar usuario:', error));
    }
    return (
        <div>
            {//NoTa para mi :) =>>> Antes no andaba porque el fetch y toda la info es asincronica. Cuando cargaba el render primero carga y dsp recibe los datos, como nunca recibi nunca cargaba por la falta de uso de un ternario que no me detenda el renderizado si esa info es undefined
            userselected ? (
                <>
                    <p>El nombre del usuario a editar es: {userselected.name}</p>
                    <p>El mail del usuario a editar es: {userselected.mail}</p>
                </>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder={userselected?.name || "Nombre"}
            />
            <input
                type="text"
                value={newUserMail}
                onChange={(e) => setNewUserMail(e.target.value)}
                placeholder={userselected?.mail || "Correo"}
            />
            <button onClick={handleUpdateUser}>Actualizar Usuario</button>
        </div>

    );
}
export default EditarTarea