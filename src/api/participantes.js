import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${process.env.REACT_APP_API_URL}/participantes`;

const participanteService = {
  getActivityParticipants: async (activityId) => {
    try {
      const response = await axios.get(`${API_URL}/activity/${activityId}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateAttendance: async (activityId, userId, attendance) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance`,
        { activityId, userId, attendance },
        { headers: authHeader() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default participanteService;