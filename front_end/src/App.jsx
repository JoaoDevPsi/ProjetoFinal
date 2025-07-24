import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EquipmentPage from './pages/Resources/EquipmentPage';
import VehiclePage from './pages/Resources/VehiclePage';
import DevicePage from './pages/Resources/DevicePage';
import authService from './services/authService';
import './components/styles.css';

function App() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        authService.logout();
        setCurrentUser(undefined);
        window.location.reload();
    };

    return (
        <Router>
            <div>
                <nav className="navbar" style={{ zIndex: 10 }}>
                    <Link to="/" className="navbar-brand">Indústrias Wayne</Link>
                    <div className="navbar-links">
                        {currentUser ? (
                            <>
                                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                                <Link to="/equipamentos" className="navbar-link">Equipamentos</Link>
                                <Link to="/veiculos" className="navbar-link">Veículos</Link>
                                <Link to="/dispositivos-seguranca" className="navbar-link">Dispositivos de Segurança</Link>
                                <a href="/login" onClick={logOut} className="navbar-link">Sair ({currentUser.user.username})</a>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link">Login</Link>
                                <Link to="/register" className="navbar-link">Registrar</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/equipamentos" element={<EquipmentPage />} />
                        <Route path="/veiculos" element={<VehiclePage />} />
                        <Route path="/dispositivos-seguranca" element={<DevicePage />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const Home = () => {
    const [showSymbol, setShowSymbol] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSymbol(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '40px', position: 'relative', zIndex: 1 }}>
            <div className="background-animation-container">
                <div className="bats-background"></div>
                <div className={`bat-symbol-background ${showSymbol ? 'bat-symbol-visible' : ''}`}></div>
            </div>
            <h2 style={{ fontSize: '2em', fontWeight: 'bold', color: '#f0f0f0' }}>Bem-vindo ao Sistema de Gestão de Recursos das Indústrias Wayne!</h2>
            <p style={{ fontSize: '1.2em', color: '#bbb', marginTop: '15px' }}>Use a navegação acima para acessar as funcionalidades.</p>
        </div>
    );
};

export default App;