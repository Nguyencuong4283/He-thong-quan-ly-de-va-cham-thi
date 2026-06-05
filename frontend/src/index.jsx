import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App';

// Interceptor to automatically add Bearer token to all fetch requests going to /api
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config] = args;
  const url = typeof resource === 'string' ? resource : (resource ? resource.url : '');
  
  const isApiRequest = url && (url.startsWith('/api') || url.startsWith('http://localhost:3000/api') || url.startsWith('http://localhost:8080/api'));
  const isLoginRequest = url && url.includes('/api/v1/auth/login');
  
  if (isApiRequest && !isLoginRequest) {
    let token = localStorage.getItem('token');
    if (!token) {
      // Auto-login in background to get a token
      try {
        const authRes = await originalFetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherId: 'GV001', password: '123456' })
        });
        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData.success && authData.data?.token) {
            token = authData.data.token;
            localStorage.setItem('token', token);
          }
        }
      } catch (err) {
        console.error('Background auto-login failed:', err);
      }
    }
    
    if (token) {
      config = config || {};
      if (!config.headers) {
        config.headers = {};
      }
      if (config.headers instanceof Headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else if (Array.isArray(config.headers)) {
        config.headers.push(['Authorization', `Bearer ${token}`]);
      } else {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        };
      }
    }
  }
  
  let response = await originalFetch(resource, config);
  
  // If response is unauthorized/forbidden and it's not a login request, try auto-login and retry once
  if (isApiRequest && !isLoginRequest && (response.status === 401 || response.status === 403)) {
    console.warn('Token expired or invalid, performing background auto-login and retry...');
    try {
      const authRes = await originalFetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId: 'GV001', password: '123456' })
      });
      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData.success && authData.data?.token) {
          const newToken = authData.data.token;
          localStorage.setItem('token', newToken);
          
          config = config || {};
          if (config.headers instanceof Headers) {
            config.headers.set('Authorization', `Bearer ${newToken}`);
          } else if (Array.isArray(config.headers)) {
            const authIdx = config.headers.findIndex(h => h[0] === 'Authorization');
            if (authIdx > -1) config.headers[authIdx][1] = `Bearer ${newToken}`;
            else config.headers.push(['Authorization', `Bearer ${newToken}`]);
          } else {
            config.headers = {
              ...config.headers,
              'Authorization': `Bearer ${newToken}`
            };
          }
          response = await originalFetch(resource, config);
        }
      }
    } catch (retryErr) {
      console.error('Retry after auto-login failed:', retryErr);
    }
  }
  
  return response;
};

// Thiết lập người dùng mặc định để bỏ qua đăng nhập
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('userEmail', 'admin@uit.edu.vn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
