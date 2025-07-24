import React, { useState, useEffect } from 'react';
import resourceService from '../../services/resourceService';
import authService from '../../services/authService';
import '../../components/styles.css';

const EquipmentPage = () => {
    const [equipments, setEquipments] = useState([]);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentEquipment, setCurrentEquipment] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [numeroSerie, setNumeroSerie] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [status, setStatus] = useState('ativo');
    const [responsavelId, setResponsavelId] = useState('');

    useEffect(() => {
        fetchEquipments();
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            if (user.user && user.user.id) {
                setResponsavelId(user.user.id);
            }
        }
    }, []);

    const fetchEquipments = () => {
        resourceService.getAllEquipments()
            .then(response => {
                setEquipments(response.data);
            })
            .catch(error => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.detail) ||
                    error.message ||
                    error.toString();
                setMessage("Erro ao carregar equipamentos: " + resMessage);
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
            nome,
            descricao,
            numero_serie: numeroSerie,
            localizacao,
            status,
            responsavel: responsavelId
        };

        const action = currentEquipment
            ? resourceService.updateEquipment(currentEquipment.id, data)
            : resourceService.createEquipment(data);

        action.then(response => {
            setMessage(currentEquipment ? "Equipamento atualizado!" : "Equipamento adicionado!");
            setShowForm(false);
            setCurrentEquipment(null);
            resetForm();
            fetchEquipments();
        })
        .catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.detail) ||
                (error.response && error.response.data && (error.response.data.numero_serie || error.response.data.non_field_errors)) ||
                error.message ||
                error.toString();
            setMessage("Erro: " + resMessage);
        });
    };

    const handleEdit = (equipment) => {
        setCurrentEquipment(equipment);
        setNome(equipment.nome);
        setDescricao(equipment.descricao);
        setNumeroSerie(equipment.numero_serie);
        setLocalizacao(equipment.localizacao);
        setStatus(equipment.status);
        setResponsavelId(equipment.responsavel);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
            resourceService.deleteEquipment(id)
                .then(response => {
                    setMessage("Equipamento excluído!");
                    fetchEquipments();
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
        setNome('');
        setDescricao('');
        setNumeroSerie('');
        setLocalizacao('');
        setStatus('ativo');
        setResponsavelId(currentUser && currentUser.user ? currentUser.user.id : '');
        setCurrentEquipment(null);
    };

    return (
        <div>
            <h2 className="page-title">Gestão de Equipamentos</h2>
            {message && <div className="message-error">{message}</div>}

            {canManage() && (
                <button onClick={() => { setShowForm(!showForm); resetForm(); }} className="form-button">
                    {showForm ? 'Esconder Formulário' : 'Adicionar Novo Equipamento'}
                </button>
            )}

            {showForm && (
                <div className="form-container">
                    <h3>{currentEquipment ? 'Editar Equipamento' : 'Novo Equipamento'}</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numeroSerie">Número de Série:</label>
                            <input type="text" id="numeroSerie" value={numeroSerie} onChange={(e) => setNumeroSerie(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="localizacao">Localização:</label>
                            <input type="text" id="localizacao" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="ativo">Ativo</option>
                                <option value="manutencao">Em Manutenção</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                        {canManage() && (
                            <div className="form-group">
                                <label htmlFor="responsavelId">Responsável (ID do Usuário):</label>
                                <input type="number" id="responsavelId" value={responsavelId} onChange={(e) => setResponsavelId(e.target.value)} />
                            </div>
                        )}
                        <button type="submit" className="form-button">{currentEquipment ? 'Atualizar' : 'Adicionar'}</button>
                        <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="form-button">Cancelar</button>
                    </form>
                </div>
            )}

            <h3 style={{ marginTop: '20px', color: '#f0f0f0' }}>Lista de Equipamentos</h3>
            {equipments.length === 0 && <p className="no-data-message">Nenhum equipamento cadastrado ainda.</p>}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Número de Série</th>
                        <th>Localização</th>
                        <th>Status</th>
                        <th>Responsável</th>
                        {canManage() && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {equipments.map(eq => (
                        <tr key={eq.id}>
                            <td>{eq.nome}</td>
                            <td>{eq.numero_serie}</td>
                            <td>{eq.localizacao}</td>
                            <td>{eq.status}</td>
                            <td>{eq.responsavel_username || 'N/A'}</td>
                            {canManage() && (
                                <td>
                                    <button onClick={() => handleEdit(eq)} className="action-button">Editar</button>
                                    <button onClick={() => handleDelete(eq.id)} className="action-button delete">Excluir</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentPage;