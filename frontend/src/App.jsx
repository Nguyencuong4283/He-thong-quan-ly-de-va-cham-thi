import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import DangNhap from './pages/DangNhap';
import DeThi from './pages/DeThi';
import TaoDeThiMoi from './pages/TaoDeThiMoi';
import ChinhSuaDeThi from './pages/ChinhSuaDeThi';
import QuanLyLop from './pages/QuanLyLop';
import ThemLop from './pages/ThemLop';
import ChiTietLop from './pages/ChiTietLop';
import NhapDanhSachHocSinh from './pages/NhapDanhSachHocSinh';
import NganHangCauHoi from './pages/NganHangCauHoi';
import ThemCauHoi from './pages/ThemCauHoi';
import ChinhSuaCauHoi from './pages/ChinhSuaCauHoi';
import DanhSachHocSinhChamThi from './pages/DanhSachHocSinhChamThi';
import ChamDiem from './pages/ChamDiem';
import XemChiTietBaiThi from './pages/XemChiTietBaiThi';
import PrintExam from './pages/PrintExam';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageSubjects from './pages/admin/ManageSubjects';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const userId = localStorage.getItem('userId');
  const SESSION_TIMEOUT = 14400000; 
  const isExpired = loginTime && (Date.now() - parseInt(loginTime) > SESSION_TIMEOUT);

  if (!token || !isAuthenticated || isExpired) {
    if (isExpired) {
      console.warn("Phiên làm việc đã hết hạn sau 4 tiếng.");
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
    return <Navigate to="/dang-nhap" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const userId = localStorage.getItem('userId');
  const SESSION_TIMEOUT = 14400000; 
  const isExpired = loginTime && (Date.now() - parseInt(loginTime) > SESSION_TIMEOUT);

  if (!token || !isAuthenticated || isExpired) {
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
    return <Navigate to="/dang-nhap" replace />;
  }

  if (userId !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const userId = localStorage.getItem('userId');
  const SESSION_TIMEOUT = 14400000; 
  const isExpired = loginTime && (Date.now() - parseInt(loginTime) > SESSION_TIMEOUT);

  if (token && isAuthenticated && !isExpired) {
    if (userId === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/dang-nhap" element={<PublicRoute><DangNhap /></PublicRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><Layout><AdminDashboard /></Layout></AdminProtectedRoute>} />
          <Route path="/admin/giao-vien" element={<AdminProtectedRoute><Layout><ManageTeachers /></Layout></AdminProtectedRoute>} />
          <Route path="/admin/mon-hoc" element={<AdminProtectedRoute><Layout><ManageSubjects /></Layout></AdminProtectedRoute>} />

          <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          
          {/* Quản lý Đề thi */}
          <Route path="/de-thi" element={<ProtectedRoute><Layout><DeThi /></Layout></ProtectedRoute>} />
          <Route path="/de-thi/tao-moi" element={<ProtectedRoute><Layout><TaoDeThiMoi /></Layout></ProtectedRoute>} />
          <Route path="/de-thi/chinh-sua/:id" element={<ProtectedRoute><Layout><ChinhSuaDeThi /></Layout></ProtectedRoute>} />
          
          {/* Quản lý Lớp */}
          <Route path="/quan-ly-lop" element={<ProtectedRoute><Layout><QuanLyLop /></Layout></ProtectedRoute>} />
          <Route path="/quan-ly-lop/them-moi" element={<ProtectedRoute><Layout><ThemLop /></Layout></ProtectedRoute>} />
          <Route path="/quan-ly-lop/chi-tiet/:id" element={<ProtectedRoute><Layout><ChiTietLop /></Layout></ProtectedRoute>} />
          <Route path="/quan-ly-lop/nhap-hoc-sinh/:id" element={<ProtectedRoute><Layout><NhapDanhSachHocSinh /></Layout></ProtectedRoute>} />
          
          {/* Ngân hàng Câu hỏi */}
          <Route path="/ngan-hang-cau-hoi" element={<ProtectedRoute><Layout><NganHangCauHoi /></Layout></ProtectedRoute>} />
          <Route path="/ngan-hang-cau-hoi/them-moi" element={<ProtectedRoute><Layout><ThemCauHoi /></Layout></ProtectedRoute>} />
          <Route path="/ngan-hang-cau-hoi/chinh-sua/:id" element={<ProtectedRoute><Layout><ChinhSuaCauHoi /></Layout></ProtectedRoute>} />
          
          {/* Chấm thi */}
          <Route path="/cham-thi/danh-sach/:id" element={<ProtectedRoute><Layout><DanhSachHocSinhChamThi /></Layout></ProtectedRoute>} />
          <Route path="/cham-thi/cham-diem/:id" element={<ProtectedRoute><Layout><ChamDiem /></Layout></ProtectedRoute>} />
          <Route path="/cham-thi/xem-chi-tiet/:id" element={<ProtectedRoute><Layout><XemChiTietBaiThi /></Layout></ProtectedRoute>} />
          
          <Route path="/print-exam/:id" element={<PrintExam />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
