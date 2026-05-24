import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App';

// Thiết lập người dùng mặc định để bỏ qua đăng nhập
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('userEmail', 'admin@uit.edu.vn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
