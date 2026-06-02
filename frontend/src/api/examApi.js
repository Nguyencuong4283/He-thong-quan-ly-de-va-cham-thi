import axiosClient from './axiosClient';

const examApi = {
  getExams: async ({ subjectId, semeter, year } = {}) => {
    try {
      const response = await axiosClient.get('/exam', {
        params: {
          subjectId,
          semeter,
          year,
        },
      });

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

  getExamById: async (examId) => {
    try {
      const response = await axiosClient.get(`/exam/${examId}`);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? '';
      const data = api.data || {};
      return { success, message, data };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  createExam: async (payload) => {
    try {
      const response = await axiosClient.post('/exam', payload);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? '';
      const data = api.data || {};
      return { success, message, data };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  updateExam: async (examId, payload) => {
    try {
      const response = await axiosClient.put(`/exam/${examId}`, payload);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? '';
      const data = api.data || {};
      return { success, message, data };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  }
};

export default examApi;
