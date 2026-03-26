import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      alert("Registrazione completata!");
      navigate('/login');
    } catch (err) { alert("Errore durante la registrazione"); }
  };

  return (
    <div className="auth-container">
      <h2>Crea Account</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Register;