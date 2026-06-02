import axiosClient from './axiosClient';

const reportApi = {
  getDashboard: async (year) => {
    try {
      const response = await axiosClient.get('/report/dashboard', {
        params: {
          year: parseInt(year, 10),
        },
      });

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
};

export default reportApi;
