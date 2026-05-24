import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const userEmail = localStorage.getItem('userEmail') || 'admin@uit.edu.vn';
  const userName = 'TS. Nguyễn Văn X';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/dang-nhap');
  };

  const navItems = [
    { to: '/', label: 'Tổng quan', icon: 'bi-grid-1x2-fill' },
    { to: '/de-thi', label: 'Quản lý đề thi', icon: 'bi-file-earmark-text-fill' },
    { to: '/ngan-hang-cau-hoi', label: 'Ngân hàng câu hỏi', icon: 'bi-database-fill' },
    { to: '/quan-ly-lop', label: 'Lớp học & Chấm thi', icon: 'bi-person-badge-fill' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* SIDEBAR */}
      <div 
        className="text-white shadow-lg d-flex flex-column" 
        style={{ 
          width: '280px', 
          minWidth: '280px', 
          zIndex: 1000, 
          transition: 'all 0.4s ease',
          backgroundColor: theme === 'dark' ? '#0b0f1a' : '#1e293b'
        }}
      >
        <div className="p-4 mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary rounded-4 p-2 shadow-lg" style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="bi bi-mortarboard-fill fs-4 text-white"></i>
            </div>
            <div>
              <h5 className="mb-0 fw-bold tracking-tight text-white">EduManage</h5>
              <span className="text-white text-opacity-40 small fw-bold" style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Hệ thống quản lý</span>
            </div>
          </div>
        </div>

        <div className="px-3">
          <Nav className="flex-column gap-2">
            {navItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={Link}
                to={item.to}
                className={`d-flex align-items-center gap-3 px-3 py-3 rounded-4 transition-all sidebar-link ${
                  isActive(item.to) ? 'active-nav-item shadow-lg' : 'text-white text-opacity-60'
                }`}
              >
                <i className={`${item.icon} fs-5`}></i>
                <span className="small fw-bold">{item.label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </div>

        <div className="mt-auto p-4">
          <div 
            className="rounded-4 p-3 d-flex align-items-center gap-3 border shadow-sm"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="avatar-circle shadow-md" style={{ width: '36px', height: '36px', borderRadius: '10px' }}>{userName.charAt(0)}</div>
            <div className="overflow-hidden text-white">
              <p className="mb-0 fw-bold small text-truncate">{userName}</p>
              <p className="mb-0 text-white text-opacity-40 x-small text-truncate" style={{ fontSize: '10px' }}>{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ overflow: 'hidden', backgroundColor: 'var(--bs-body-bg)' }}>
        {/* TOPBAR TINH GỌN */}
        <Navbar bg="transparent" className="px-4 border-bottom border-opacity-10" style={{ height: '80px' }}>
          <Container fluid className="justify-content-between align-items-center px-0">
            <h4 className="mb-0 fw-bold d-none d-md-block" style={{ color: 'var(--bs-body-color)', letterSpacing: '-0.5px' }}>
              {navItems.find(i => isActive(i.to))?.label || 'Chi tiết'}
            </h4>
            
            <div className="d-flex align-items-center gap-4">
              {/* Nút Theme Toggle */}
              <div 
                className="theme-toggle-btn border shadow-sm" 
                onClick={toggleTheme}
                title="Đổi giao diện"
                style={{ 
                  cursor: 'pointer', width: '42px', height: '42px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  borderRadius: '12px', backgroundColor: 'var(--surface-color)',
                  color: 'var(--bs-secondary-color)', transition: 'all 0.3s'
                }}
              >
                <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'} fs-5`}></i>
              </div>

              {/* Tên tài khoản */}
              <div className="d-flex align-items-center gap-2 px-3 py-2 bg-body-secondary rounded-4 border shadow-xs">
                <div className="avatar-square shadow-sm" style={{ width: '28px', height: '28px', borderRadius: '8px' }}>{userName.charAt(0)}</div>
                <span className="fw-bold small" style={{ color: 'var(--bs-body-color)' }}>{userName}</span>
              </div>
              
              {/* Nút Đăng xuất */}
              <Button 
                variant="link" 
                onClick={handleLogout} 
                className="text-danger text-decoration-none fw-bold small p-0 hover-opacity-75 d-flex align-items-center gap-2"
              >
                <i className="bi bi-box-arrow-right fs-5"></i>
                <span className="d-none d-md-inline">Đăng xuất</span>
              </Button>
            </div>
          </Container>
        </Navbar>

        <main className="p-4 pt-2 overflow-auto flex-grow-1 page-fade-in">
          {children}
        </main>
      </div>

      <style>{`
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: white !important;
          opacity: 1 !important;
        }
        .active-nav-item {
          background: var(--primary-gradient) !important;
          color: white !important;
          transform: scale(1.02) translateX(4px);
        }
        .theme-toggle-btn:hover {
          border-color: #3b82f6 !important;
          color: #3b82f6 !important;
          transform: translateY(-2px);
        }
        .avatar-square {
          background: var(--primary-gradient);
          color: white;
          display: flex; align-items: center; justifyContent: center;
          font-weight: 800; font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default Layout;
