import React, { useState, useEffect } from 'react';
import resourceService from '../../services/resourceService';
import authService from '../../services/authService';
import '../../components/styles.css';

const VehiclePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');
    const [quilometragem, setQuilometragem] = useState('');
    const [status, setStatus] = useState('disponivel');
    const [responsavelId, setResponsavelId] = useState('');

    useEffect(() => {
        fetchVehicles();
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            if (user.user && user.user.id) {
                setResponsavelId(user.user.id);
            }
        }
    }, []);

    const fetchVehicles = () => {
        resourceService.getAllVehicles()
            .then(response => {
                setVehicles(response.data);
            })
            .catch(error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.detail) ||
                    error.message ||
                    error.toString();
                setMessage("Erro ao carregar veículos: " + resMessage);
            });
    };

    const canManage = () => {
        return currentUser && currentUser.user && (
            currentUser.user.is_staff ||
            (currentUser.user.groups && currentUser.user.groups.some(group => group.name === 'Gerente' || group.name === 'Administrador de Segurança'))
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const data = {
            modelo,
            placa,
            ano: parseInt(ano),
            quilometragem: parseInt(quilometragem),
            status,
            responsavel: responsavelId
        };

        const action = currentVehicle
            ? resourceService.updateVehicle(currentVehicle.id, data)
            : resourceService.createVehicle(data);

        action.then(response => {
            setMessage(currentVehicle ? "Veículo atualizado!" : "Veículo adicionado!");
            setShowForm(false);
            setCurrentVehicle(null);
            resetForm();
            fetchVehicles();
        })
        .catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.detail) ||
                (error.response && error.response.data && (error.response.data.placa || error.response.data.non_field_errors)) ||
                error.message ||
                error.toString();
            setMessage("Erro: " + resMessage);
        });
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setModelo(vehicle.modelo);
        setPlaca(vehicle.placa);
        setAno(vehicle.ano);
        setQuilometragem(vehicle.quilometragem);
        setStatus(vehicle.status);
        setResponsavelId(vehicle.responsavel);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
            resourceService.deleteVehicle(id)
                .then(response => {
                    setMessage("Veículo excluído!");
                    fetchVehicles();
                })
                .catch(error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.detail) ||
                        error.message ||
                        error.toString();
                    setMessage("Erro ao excluir: " + resMessage);
                });
        }
    };

    const resetForm = () => {
        setModelo('');
        setPlaca('');
        setAno('');
        setQuilometragem('');
        setStatus('disponivel');
        setResponsavelId(currentUser && currentUser.user ? currentUser.user.id : '');
        setCurrentVehicle(null);
    };

    return (
        <div>
            <h2 className="page-title">Gestão de Veículos</h2>
            {message && <div className="message-error">{message}</div>}

            {canManage() && (
                <button onClick={() => { setShowForm(!showForm); resetForm(); }} className="form-button">
                    {showForm ? 'Esconder Formulário' : 'Adicionar Novo Veículo'}
                </button>
            )}

            {showForm && (
                <div className="form-container">
                    <h3>{currentVehicle ? 'Editar Veículo' : 'Novo Veículo'}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="modelo">Modelo:</label>
                            <input type="text" id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="placa">Placa:</label>
                            <input type="text" id="placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ano">Ano:</label>
                            <input type="number" id="ano" value={ano} onChange={(e) => setAno(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quilometragem">Quilometragem:</label>
                            <input type="number" id="quilometragem" value={quilometragem} onChange={(e) => setQuilometragem(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="disponivel">Disponível</option>
                                <option value="em_uso">Em Uso</option>
                                <option value="manutencao">Em Manutenção</option>
                            </select>
                        </div>
                        {canManage() && (
                            <div className="form-group">
                                <label htmlFor="responsavelId">Responsável (ID do Usuário):</label>
                                <input type="number" id="responsavelId" value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)} />
                            </div>
                        )}
                        <button type="submit" className="form-button">{currentVehicle ? 'Atualizar' : 'Adicionar'}</button>
                        <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="form-button">Cancelar</button>
                    </form>
                </div>
            )}

            <h3 style={{ marginTop: '20px', color: '#f0f0f0' }}>Lista de Veículos</h3>
            {vehicles.length === 0 && <p className="no-data-message">Nenhum veículo cadastrado ainda.</p>}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Ano</th>
                        <th>Quilometragem</th>
                        <th>Status</th>
                        <th>Responsável</th>
                        {canManage() && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vh => (
                        <tr key={vh.id}>
                            <td>{vh.modelo}</td>
                            <td>{vh.placa}</td>
                            <td>{vh.ano}</td>
                            <td>{vh.quilometragem}</td>
                            <td>{vh.status}</td>
                            <td>{vh.responsavel_username || 'N/A'}</td>
                            {canManage() && (
                                <td>
                                    <button onClick={() => handleEdit(vh)} className="action-button">Editar</button>
                                    <button onClick={() => handleDelete(vh.id)} className="action-button delete">Excluir</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehiclePage;