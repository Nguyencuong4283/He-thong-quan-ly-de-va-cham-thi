import axiosClient from "./axiosClient";
import { mapSubmissionListItem, mapSubmissionDetailItem } from "../models/submission";

export const submissionApi = {
    getSubmissions: async (classId) => {
        try {
            const response = await axiosClient.get(`/classes/${classId}/submission`);
            const api = response.data || {};
            const success = api.success ?? true;
            const message = api.message ?? '';
            const rawData = Array.isArray(api.data) ? api.data : api.data ? [api.data] : [];
            const mappedData = rawData.map(mapSubmissionListItem);
            return { success, message, data: mappedData };
        } catch (error) {
            if (error.response) return error.response.data || { success: false, message: error.response.statusText };
            return { success: false, message: error.message || 'Network error' };
        }
    },

    getSubmissionById: async (submissionId) => {
        try {
            const response = await axiosClient.get(`/submission/${submissionId}`);
            const api = response.data || {};
            const success = api.success ?? true;
            const message = api.message ?? '';
            const rawData = api.data ?? null;
            const mappedData = rawData ? mapSubmissionDetailItem(rawData) : null;
            return { success, message, data: mappedData };
        } catch (error) {
            if (error.response) return error.response.data || { success: false, message: error.response.statusText };
            return { success: false, message: error.message || 'Network error' };
        }
    },
    createSubmission: async (classId,studentId,payload) => {
        try {
            const response = await axiosClient.post(`/classes/${classId}/student/${studentId}/submission`, payload);
            const api = response.data || {};
            const success = api.success ?? true;
            const message = api.message ?? '';
            const data = api.data ?? null;
            return { success, message, data };
        } catch (error) {
            if (error.response) return error.response.data || { success: false, message: error.response.statusText };
            return { success: false, message: error.message || 'Network error' };
        }
    },
    updateSubmission: async (submissionId, payload) => {
        try {
            const response = await axiosClient.put(`/submission/${submissionId}`, payload);
            const api = response.data || {};
            const success = api.success ?? true;
            const message = api.message ?? '';
            const data = api.data ?? null;
            return { success, message, data };
        } catch (error) {
            if (error.response) return error.response.data || { success: false, message: error.response.statusText };
            return { success: false, message: error.message || 'Network error' };
        }
    },
};