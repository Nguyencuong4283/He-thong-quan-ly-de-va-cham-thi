import axios from 'axios';

const API_URL_EXAMS = 'http://localhost:8080/api/exams';
const API_URL_COMPLETED_EXAMS = 'http://localhost:8080/api/exams?status=published';
const API_URL_DRAFT_EXAMS = 'http://localhost:8080/api/exams?status=draft';

export const getTotalExams = async (token) => {
    return await axios.get(API_URL_EXAMS, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};
export const getCompletedExams = async (token, totalCount) => {
    return await axios.get(`${API_URL_EXAMS}?status=published`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};
export const getDraftExams = async (token) => {
    return await axios.get(`${API_URL_EXAMS}?status=draft`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};
