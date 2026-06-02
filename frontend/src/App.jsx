import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import DangNhap from './pages/DangNhap';
import DangKy from './pages/DangKy';
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const loginTime = localStorage.getItem('loginTime');
  const SESSION_TIMEOUT = 14400000; 
  const isExpired = loginTime && (Date.now() - parseInt(loginTime) > SESSION_TIMEOUT);

  if (!token || !isAuthenticated || isExpired) {
    if (isExpired) {
      console.warn("Phiên làm việc đã hết hạn sau 4 tiếng.");
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('loginTime');
    }
    return <Navigate to="/dang-nhap" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/dang-nhap" element={<DangNhap />} />
          <Route path="/dang-ky" element={<DangKy />} />
          
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
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
