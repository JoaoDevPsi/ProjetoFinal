import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../components/styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = import.meta.env.VITE_APP_API_URL;

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user) {
            setMessage("Você precisa estar logado para ver o Dashboard.");
            return;
        }
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = () => {
        axios.get(API_URL + 'resources/dashboard-stats/', { headers: authHeader() })
            .then(response => {
                setStats(response.data);
            })
            .catch(error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.detail) ||
                    error.message ||
                    error.toString();
                setMessage("Erro ao carregar dados do dashboard: " + resMessage);
            });
    };

    if (message) {
        return <div className="message-error" style={{padding: '20px'}}>{message}</div>;
    }

    if (!stats) {
        return <div style={{ padding: '20px', color: '#e0e0e0' }}>Carregando dados do dashboard...</div>;
    }

    const equipamentosStatusData = {
        labels: Object.keys(stats.equipamentos_por_status),
        datasets: [
            {
                label: 'Número de Equipamentos',
                data: Object.values(stats.equipamentos_por_status),
                backgroundColor: ['rgba(76, 175, 80, 0.7)', 'rgba(255, 165, 0, 0.7)', 'rgba(220, 20, 60, 0.7)'],
                borderColor: ['rgba(76, 175, 80, 1)', 'rgba(255, 165, 0, 1)', 'rgba(220, 20, 60, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const equipamentosStatusOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0'
                }
            },
            title: {
                display: true,
                text: 'Equipamentos por Status',
                color: '#f0f0f0'
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff'
            }
        },
        scales: {
            x: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            },
            y: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            }
        }
    };

    const veiculosStatusData = {
        labels: Object.keys(stats.veiculos_por_status),
        datasets: [
            {
                label: 'Número de Veículos',
                data: Object.values(stats.veiculos_por_status),
                backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)', 'rgba(153, 102, 255, 0.7)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const veiculosStatusOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0'
                }
            },
            title: {
                display: true,
                text: 'Veículos por Status',
                color: '#f0f0f0'
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff'
            }
        },
        scales: {
            x: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            },
            y: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            }
        }
    };

    const dispositivosStatusData = {
        labels: Object.keys(stats.dispositivos_por_status),
        datasets: [
            {
                label: 'Número de Dispositivos',
                data: Object.values(stats.dispositivos_por_status),
                backgroundColor: ['rgba(76, 175, 80, 0.7)', 'rgba(255, 165, 0, 0.7)', 'rgba(220, 20, 60, 0.7)'],
                borderColor: ['rgba(76, 175, 80, 1)', 'rgba(255, 165, 0, 1)', 'rgba(220, 20, 60, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const dispositivosStatusOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#e0e0e0'
                }
            },
            title: {
                display: true,
                text: 'Dispositivos de Segurança por Status',
                color: '#f0f0f0'
            },
            tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff'
            }
        },
        scales: {
            x: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            },
            y: {
                ticks: { color: '#bbb' },
                grid: { color: '#333' }
            }
        }
    };

    return (
        <div>
            <h2 className="page-title">Dashboard de Visualização</h2>
            {message && <div className="message-error" style={{marginBottom: '10px'}}>{message}</div>}

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total de Equipamentos</h3>
                    <p>{stats.total_equipamentos}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Total de Veículos</h3>
                    <p>{stats.total_veiculos}</p>
                </div>
                <div className="dashboard-card">
                    <h3>Total de Dispositivos</h3>
                    <p>{stats.total_dispositivos}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <div className="chart-container">
                    <Bar data={equipamentosStatusData} options={equipamentosStatusOptions} />
                </div>
                <div className="chart-container">
                    <Bar data={veiculosStatusData} options={veiculosStatusOptions} />
                </div>
                <div className="chart-container">
                    <Bar data={dispositivosStatusData} options={dispositivosStatusOptions} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;