// Importamos las dependencias necesarias de React y React Router
import React, { useState } from 'react'; // useState para manejar el estado del menú
import { Link } from 'react-router-dom'; // Link para la navegación entre páginas
import './Navbar.css'; // Importamos el archivo de estilo para la barra de navegación

// Definimos el componente Navbar
const Navbar = () => {
    // Estado que controla si el menú está abierto o cerrado
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función para alternar el estado del menú (abierto o cerrado)
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto); // Invertir el valor del estado 'menuAbierto'
    };
    
    return (
        <nav>
            {/* Contenedor del menú que tiene la clase 'abierto' si el menú está abierto */}
            <div className={`menu ${menuAbierto ? 'abierto' : ''}`}>
                
                {/* Icono del menú (hamburguesa) que cambia el estado al hacer clic */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className="bar"></div> 
                    <div className="bar"></div>
                    <div className="bar"></div> 
                </div>
                <ul>
                    <li>
                        <Link to="/agregar" onClick={toggleMenu}>
                            Agregar Tarea
                        </Link>
                    </li>

                    <li>
                        <Link to="/ver-todos" onClick={toggleMenu}> 
                            Ver Todas las Tareas
                        </Link>
                    </li>
                    <li>
                        <Link to="/editar/7" onClick={toggleMenu}> 
                            Editar Tarea
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

// Exportamos el componente Navbar para poder usarlo en otros archivos
export default Navbar;
