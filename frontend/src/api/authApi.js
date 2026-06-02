import axios from "axios";

export const login = async (identifier, password) => {
  try {
    const payload = identifier && identifier.includes('@')
      ? { email: identifier, password }
      : { teacherId: identifier, password };

    const response = await axios.post("http://localhost:8080/api/v1/auth/login", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data || { success: false, message: error.response.statusText };
    }
    return { success: false, message: error.message || 'Network error' };
  }
};