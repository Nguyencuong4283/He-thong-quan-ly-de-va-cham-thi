import axiosClient from './axiosClient';

const adminApi = {
  // Teachers Management
  getTeachers: async () => {
    try {
      const response = await axiosClient.get('/admin/teachers');
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || [],
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  createTeacher: async (payload) => {
    try {
      const response = await axiosClient.post('/admin/teachers', payload);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  updateTeacher: async (id, payload) => {
    try {
      const response = await axiosClient.put(`/admin/teachers/${id}`, payload);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  deleteTeacher: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/teachers/${id}`);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  // Subjects Management
  getSubjects: async () => {
    try {
      const response = await axiosClient.get('/admin/subjects');
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || [],
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  createSubject: async (payload) => {
    try {
      const response = await axiosClient.post('/admin/subjects', payload);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  updateSubject: async (id, payload) => {
    try {
      const response = await axiosClient.put(`/admin/subjects/${id}`, payload);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  deleteSubject: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/subjects/${id}`);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        data: api.data || null,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  // Teacher-Subject link
  assignSubject: async (teacherId, subjectId) => {
    try {
      const response = await axiosClient.post('/admin/teacher-subjects', { teacherId, subjectId });
      const api = response.data || {};
      return {
        success: api.success ?? true,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  },

  unassignSubject: async (teacherId, subjectId) => {
    try {
      const response = await axiosClient.delete(`/admin/teacher-subjects/${teacherId}/${subjectId}`);
      const api = response.data || {};
      return {
        success: api.success ?? true,
        message: api.message ?? ''
      };
    } catch (error) {
      if (error.response) return error.response.data || { success: false, message: error.response.statusText };
      return { success: false, message: error.message || 'Network error' };
    }
  }
};

export default adminApi;
