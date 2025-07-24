import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_APP_API_URL;

const getAllEquipments = () => {
    return axios.get(API_URL + 'resources/equipamentos/', { headers: authHeader() });
};

const createEquipment = (data) => {
    return axios.post(API_URL + 'resources/equipamentos/', data, { headers: authHeader() });
};

const updateEquipment = (id, data) => {
    return axios.put(API_URL + 'resources/equipamentos/' + id + '/', data, { headers: authHeader() });
};

const deleteEquipment = (id) => {
    return axios.delete(API_URL + 'resources/equipamentos/' + id + '/', { headers: authHeader() });
};

const getAllVehicles = () => {
    return axios.get(API_URL + 'resources/veiculos/', { headers: authHeader() });
};

const createVehicle = (data) => {
    return axios.post(API_URL + 'resources/veiculos/', data, { headers: authHeader() });
};

const updateVehicle = (id, data) => {
    return axios.put(API_URL + 'resources/veiculos/' + id + '/', data, { headers: authHeader() });
};

const deleteVehicle = (id) => {
    return axios.delete(API_URL + 'resources/veiculos/' + id + '/', { headers: authHeader() });
};

const getAllDevices = () => {
    return axios.get(API_URL + 'resources/dispositivos-seguranca/', { headers: authHeader() });
};

const createDevice = (data) => {
    return axios.post(API_URL + 'resources/dispositivos-seguranca/', data, { headers: authHeader() });
};

const updateDevice = (id, data) => {
    return axios.put(API_URL + 'resources/dispositivos-seguranca/' + id + '/', data, { headers: authHeader() });
};

const deleteDevice = (id) => {
    return axios.delete(API_URL + 'resources/dispositivos-seguranca/' + id + '/', { headers: authHeader() });
};


const resourceService = {
    getAllEquipments,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getAllVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getAllDevices,
    createDevice,
    updateDevice,
    deleteDevice,
};

export default resourceService;