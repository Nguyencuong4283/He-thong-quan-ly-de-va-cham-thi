import axiosClient from "./axiosClient";

const classApi = {
  getClasses: async () => {
    try {
      const response = await axiosClient.get("/classes");
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      const data = api.data || [];
      const meta = api.meta || { totalClass: 0, totalStudent: 0 };

      return { success, message, data, meta };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },
  getStudentsByClassId: async (classId) => {
    try {
      const response = await axiosClient.get(`/classes/${classId}/students`);
      const api = response.data || {};
      const success = api.success ?? true;
      const message = api.message ?? "";
      const data = api.data || {};

      return { success, message, data };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },
  createClass: async (payload) => {
    try {
      const response = await axiosClient.post('/classes', payload);
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
  createStudent: async (classId, payload) => {
    try {
      const response = await axiosClient.post(`/classes/${classId}/students`, payload);
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
    assignExam: async (classId, examId) => {
        try {
            const response = await axiosClient.put(`/classes/${classId}/assign-exam/${examId}`);
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
export default classApi;