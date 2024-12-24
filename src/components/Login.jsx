// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB6ZEYewhdhDi85Q6SUGyv6qlgr1oByWk",
  authDomain: "app-qr-9620d.firebaseapp.com",
  projectId: "app-qr-9620d",
  storageBucket: "app-qr-9620d.firebasestorage.app",
  messagingSenderId: "654702828779",
  appId: "1:654702828779:web:46d56279379888ea9a72ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Autenticación con Firebase usando el correo y contraseña
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Si la autenticación es exitosa, llama a la función onLogin()
        onLogin(userCredential.user);
      })
      .catch((error) => {
        // Muestra el mensaje de error si la autenticación falla
        setError("Credenciales inválidas");
      });
  };

  return (
    <div className="bg-info d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
        <h2 className="text-center fs-1 fw-bold">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <InputGroup className="mt-4">
            <InputGroup.Text>
              <i className="fas fa-envelope"></i> {/* Ícono de correo electrónico */}
            </InputGroup.Text>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </InputGroup>
          <InputGroup className="mt-1">
            <InputGroup.Text>
              <i className="fas fa-lock"></i> {/* Ícono de contraseña */}
            </InputGroup.Text>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </InputGroup>
          <Button type="submit" className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
//celeste