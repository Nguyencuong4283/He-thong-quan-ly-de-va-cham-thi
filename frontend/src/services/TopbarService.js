import axios from 'axios';

const API_URL_USER = 'http://localhost:8080/api/users';

export const getUserProfile = async (token) => {
    return await axios.get(API_URL_USER, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}
