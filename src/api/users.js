import axios from 'axios';
import authHeader from './authHeader';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

// Create named object first
const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Then export it
export default userService;