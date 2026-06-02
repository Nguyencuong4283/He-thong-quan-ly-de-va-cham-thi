import axiosClient from './axiosClient';

const teacherApi = {
  getSubjects: async () => {
    try {
      const response = await axiosClient.get('/teacher/subjects');
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? '';
      const data = Array.isArray(api.data) ? api.data : api.data ? [api.data] : [];
      return { success, message, data };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },
};

export default teacherApi;

