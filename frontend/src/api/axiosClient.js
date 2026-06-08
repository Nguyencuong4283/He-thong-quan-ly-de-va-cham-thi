import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Phiên làm việc hết hạn hoặc không hợp lệ. Đang đăng xuất...");
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      
      // Force page reload/redirect to login page
      window.location.href = '/dang-nhap';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;