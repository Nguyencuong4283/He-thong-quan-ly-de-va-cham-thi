import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { DangNhap } from './pages/DangNhap';
import { DangKy } from './pages/DangKy';
import { DeThi } from './pages/DeThi';
import { TaoDeThiMoi } from './pages/TaoDeThiMoi';
import { ChinhSuaDeThi } from './pages/ChinhSuaDeThi';
import { NganHangCauHoi } from './pages/NganHangCauHoi';
import { ThemCauHoi } from './pages/ThemCauHoi';
import { ChinhSuaCauHoi } from './pages/ChinhSuaCauHoi';
import { ChamDiem } from './pages/ChamDiem';
import { XemChiTietBaiThi } from './pages/XemChiTietBaiThi';
import { DanhSachHocSinhChamThi } from './pages/DanhSachHocSinhChamThi';
import { QuanLyLop } from './pages/QuanLyLop';
import { ThemLop } from './pages/ThemLop';
import { ChiTietLop } from './pages/ChiTietLop';
import { NhapDanhSachHocSinh } from './pages/NhapDanhSachHocSinh';
import { APIDocumentation } from './pages/APIDocumentation';
import { MigrationGuide } from './pages/MigrationGuide';
import { BackendSpecification } from './pages/BackendSpecification';
import { CaiDat } from './pages/CaiDat';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-[64px] font-bold text-[#3b82f6]">404</h1>
        <p className="text-[24px] text-[#64748b] mb-4">Không tìm thấy trang</p>
        <a href="/" className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb]">
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/dang-nhap',
    element: <DangNhap />,
  },
  {
    path: '/dang-ky',
    element: <DangKy />,
  },
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/de-thi',
    element: <Layout><DeThi /></Layout>,
  },
  {
    path: '/de-thi/tao-moi',
    element: <Layout><TaoDeThiMoi /></Layout>,
  },
  {
    path: '/de-thi/chinh-sua/:id',
    element: <Layout><ChinhSuaDeThi /></Layout>,
  },
  {
    path: '/ngan-hang-cau-hoi',
    element: <Layout><NganHangCauHoi /></Layout>,
  },
  {
    path: '/ngan-hang-cau-hoi/them-moi',
    element: <Layout><ThemCauHoi /></Layout>,
  },
  {
    path: '/ngan-hang-cau-hoi/chinh-sua/:id',
    element: <Layout><ChinhSuaCauHoi /></Layout>,
  },
  {
    path: '/cham-thi/danh-sach/:id',
    element: <Layout><DanhSachHocSinhChamThi /></Layout>,
  },
  {
    path: '/cham-thi/cham-diem/:id',
    element: <Layout><ChamDiem /></Layout>,
  },
  {
    path: '/cham-thi/xem-chi-tiet/:id',
    element: <Layout><XemChiTietBaiThi /></Layout>,
  },
  {
    path: '/quan-ly-lop',
    element: <Layout><QuanLyLop /></Layout>,
  },
  {
    path: '/quan-ly-lop/them-moi',
    element: <Layout><ThemLop /></Layout>,
  },
  {
    path: '/quan-ly-lop/chi-tiet/:id',
    element: <Layout><ChiTietLop /></Layout>,
  },
  {
    path: '/quan-ly-lop/nhap-hoc-sinh/:id',
    element: <Layout><NhapDanhSachHocSinh /></Layout>,
  },
  {
    path: '/api-docs',
    element: <Layout><APIDocumentation /></Layout>,
  },
  {
    path: '/migration-guide',
    element: <Layout><MigrationGuide /></Layout>,
  },
  {
    path: '/backend-specification',
    element: <Layout><BackendSpecification /></Layout>,
  },
  {
    path: '/cai-dat',
    element: <Layout><CaiDat /></Layout>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
]);
