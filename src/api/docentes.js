import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${process.env.REACT_APP_API_URL}/docentes`;


const docenteService = {
  getAllDocentes: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await axios.get(API_URL, {
        params: { page, limit, search },
        headers: authHeader()
      });
        return {
          data: response,
          // pagination: response.data.pagination
      }

    } catch (error) {
      throw handleError(error);
    }
  },

  // Get single docente by ID
  getDocenteById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Create new docente
  createDocente: async (docenteData) => {
    try {
      const response = await axios.post(API_URL, docenteData);
      return response.data;
    } catch (error) {
      console.error('Error creating Docente:', error);
      throw handleError(error);
    }
  },

  // Update docente
  update: async (id, docenteData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, docenteData, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Delete docente
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  search: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { q: query },
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get docente's modules
  getModules: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}/modulos`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get docente's upcoming activities
  getUpcomingActivities: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}/actividades/proximas`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  }
};

// Helper function to handle API errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const message = error.response.data?.message || 'Error en la solicitud';
    const status = error.response.status;

    return {
      message,
      status,
      details: error.response.data?.errors || null
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'No se recibió respuesta del servidor',
      status: 0
    };
  } else {
    // Something happened in setting up the request
    return {
      message: error.message,
      status: -1
    };
  }
};

export default docenteService;