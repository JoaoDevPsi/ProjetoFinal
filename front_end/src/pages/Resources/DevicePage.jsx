import React, { useState, useEffect } from 'react';
import resourceService from '../../services/resourceService';
import authService from '../../services/authService';
import '../../components/styles.css';

const DevicePage = () => {
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [tipo, setTipo] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [status, setStatus] = useState('operacional');
    const [ultimaManutencao, setUltimaManutencao] = useState('');
    const [instaladoPorId, setInstaladoPorId] = useState('');

    useEffect(() => {
        fetchDevices();
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            if (user.user && user.user.id) {
                setInstaladoPorId(user.user.id);
            }
        }
    }, []);

    const fetchDevices = () => {
        resourceService.getAllDevices()
            .then(response => {
                setDevices(response.data);
            })
            .catch(error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.detail) ||
                    error.message ||
                    error.toString();
                setMessage("Erro ao carregar dispositivos: " + resMessage);
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
            tipo,
            identificador,
            localizacao,
            status,
            ultima_manutencao: ultimaManutencao || null,
            instalado_por: instaladoPorId
        };

        const action = currentDevice
            ? resourceService.updateDevice(currentDevice.id, data)
            : resourceService.createDevice(data);

        action.then(response => {
            setMessage(currentDevice ? "Dispositivo atualizado!" : "Dispositivo adicionado!");
            setShowForm(false);
            setCurrentDevice(null);
            resetForm();
            fetchDevices();
        })
        .catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.detail) ||
                (error.response && error.response.data && (error.response.data.identificador || error.response.data.non_field_errors)) ||
                error.message ||
                error.toString();
            setMessage("Erro: " + resMessage);
        });
    };

    const handleEdit = (device) => {
        setCurrentDevice(device);
        setTipo(device.tipo);
        setIdentificador(device.identificador);
        setLocalizacao(device.localizacao);
        setStatus(device.status);
        setUltimaManutencao(device.ultima_manutencao || '');
        setInstaladoPorId(device.instalado_por);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este dispositivo?")) {
            resourceService.deleteDevice(id)
                .then(response => {
                    setMessage("Dispositivo excluído!");
                    fetchDevices();
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
        setTipo('');
        setIdentificador('');
        setLocalizacao('');
        setStatus('operacional');
        setUltimaManutencao('');
        setInstaladoPorId(currentUser && currentUser.user ? currentUser.user.id : '');
        setCurrentDevice(null);
    };

    return (
        <div>
            <h2 className="page-title">Gestão de Dispositivos de Segurança</h2>
            {message && <div className="message-error">{message}</div>}

            {canManage() && (
                <button onClick={() => { setShowForm(!showForm); resetForm(); }} className="form-button">
                    {showForm ? 'Esconder Formulário' : 'Adicionar Novo Dispositivo'}
                </button>
            )}

            {showForm && (
                <div className="form-container">
                    <h3>{currentDevice ? 'Editar Dispositivo' : 'Novo Dispositivo'}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo:</label>
                            <input type="text" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="identificador">Identificador:</label>
                            <input type="text" id="identificador" value={identificador} onChange={(e) => setIdentificador(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="localizacao">Localização:</label>
                            <input type="text" id="localizacao" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="operacional">Operacional</option>
                                <option value="com_defeito">Com Defeito</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ultimaManutencao">Última Manutenção (YYYY-MM-DD):</label>
                            <input type="date" id="ultimaManutencao" value={ultimaManutencao} onChange={(e) => setUltimaManutencao(e.target.value)} />
                        </div>
                        {canManage() && (
                            <div className="form-group">
                                <label htmlFor="instaladoPorId">Instalado Por (ID do Usuário):</label>
                                <input type="number" id="instaladoPorId" value={instaladoPorId} onChange={(e) => setInstaladoPorId(e.target.value)} />
                            </div>
                        )}
                        <button type="submit" className="form-button">{currentDevice ? 'Atualizar' : 'Adicionar'}</button>
                        <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="form-button">Cancelar</button>
                    </form>
                </div>
            )}

            <h3 style={{ marginTop: '20px', color: '#f0f0f0' }}>Lista de Dispositivos de Segurança</h3>
            {devices.length === 0 && <p className="no-data-message">Nenhum dispositivo cadastrado ainda.</p>}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Identificador</th>
                        <th>Localização</th>
                        <th>Status</th>
                        <th>Última Manutenção</th>
                        <th>Instalado Por</th>
                        {canManage() && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {devices.map(dev => (
                        <tr key={dev.id}>
                            <td>{dev.tipo}</td>
                            <td>{dev.identificador}</td>
                            <td>{dev.localizacao}</td>
                            <td>{dev.status}</td>
                            <td>{dev.ultima_manutencao || 'N/A'}</td>
                            <td>{dev.instalado_por_username || 'N/A'}</td>
                            {canManage() && (
                                <td>
                                    <button onClick={() => handleEdit(dev)} className="action-button">Editar</button>
                                    <button onClick={() => handleDelete(dev.id)} className="action-button delete">Excluir</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DevicePage;