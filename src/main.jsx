import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Si tienes estilos globales

import Login from './components/Login'; // Asegúrate de que esta ruta sea correcta
import { DragAndDrop } from './components/dragAndDrop'; // Asegúrate de que esta ruta sea correcta

const App = ({ onLogout }) => {
  return (
    <div>
      <DragAndDrop onLogout={onLogout} /> {/* Pasa onLogout como propiedad */}
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <Login onLogin={onLogin} /> {/* Aquí se muestra el formulario de inicio de sesión */}
    </div>
  );
};

// Monta la aplicación en el elemento con id 'root'
const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.StrictMode>
      {isLoggedIn ? (
        <App onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
