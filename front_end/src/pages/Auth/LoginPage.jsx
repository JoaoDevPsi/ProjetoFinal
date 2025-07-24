import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../components/styles.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');

    authService.login(username, password)
      .then(() => {
        navigate('/dashboard');
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      });
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Login</h2>
      <form onSubmit={handleLogin}>
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Entrar</button>
        {message && <div className="message-error" style={{marginTop: '10px'}}>{message}</div>}
      </form>
    </div>
  );
};

export default LoginPage;