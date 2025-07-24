import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../components/styles.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== password2) {
      setMessage('As senhas não conferem!');
      return;
    }

    authService.register(username, email, password, password2)
      .then(
        (response) => {
          setMessage(response.data.message);
          navigate('/login');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              (error.response.data.username || error.response.data.email || error.response.data.password || error.response.data.non_field_errors)) ||
            error.message ||
            error.toString();
          setMessage(resMessage.toString());
        }
      );
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Registrar</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirmar Senha:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Registrar</button>
        {message && <div className="message-error" style={{marginTop: '10px'}}>{message}</div>}
      </form>
    </div>
  );
};

export default RegisterPage;