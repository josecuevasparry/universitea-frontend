import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${process.env.REACT_APP_API_URL}/modulos`;

const moduloService = {
  getModules: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getModuleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching module ${id}:`, error);
      throw error;
    }
  },
  createModule: async (moduleData) => {
    try {
      const response = await axios.post(API_URL, moduleData);
      return response.data;
    } catch (error) {
      console.error('Error creating module:', error);
      throw error;
    }
  },
  updateModule: async (id, moduleData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, moduleData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(`Error updating module ${id}:`, error);
      throw error;
    }
  },
  deleteModule: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting module ${id}:`, error);
      throw error;
    }
  },
  getModulesByModalidad: async (modalidad) => {
    try {
      const response = await axios.get(`${API_URL}/modalidad/${modalidad}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching modules by modality ${modalidad}:`, error);
      throw error;
    }
  },
  getActiveModules: async () => {
    try {
      const response = await axios.get(`${API_URL}/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active modules:', error);
      throw error;
    }
  }
  // ... other methods
};

export default moduloService;

