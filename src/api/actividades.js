import axios from 'axios';
import authHeader from "./authHeader"

const API_URL = `${process.env.REACT_APP_API_URL}/actividades`;

const actividadService = {

  getActivities: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getActivitiesByDocente: async (docenteId) => {
    const response = await axios.get(`${API_URL}/docentes/${docenteId}`,
      {
        headers: authHeader()
      }
    )
    return response.data
  },
  getActivity: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },
  createActivity: (activityData) => {
    return axios.post(API_URL, activityData);
  },
  updateActivity: (id, activityData) => {
    return axios.put(`${API_URL}/${id}`, activityData);
  },
  deleteActivity: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  }
  // ... other methods
};

export default actividadService;




