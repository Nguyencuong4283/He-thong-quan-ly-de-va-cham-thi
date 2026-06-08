import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import adminApi from '../../api/adminApi';

const AdminDashboard = () => {
  const [teachersCount, setTeachersCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const teachersRes = await adminApi.getTeachers();
        const subjectsRes = await adminApi.getSubjects();
        if (teachersRes.success) setTeachersCount(teachersRes.data.length);
        if (subjectsRes.success) setSubjectsCount(subjectsRes.data.length);
      } catch (error) {
        console.error('Fetch admin stats error', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Tổng quan hệ thống (Admin)</h2>
          <p className="text-secondary small mb-0 fw-bold">Quản trị viên quản lý danh sách giáo viên, môn học và phân công giảng dạy</p>
        </div>
      </div>

      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-primary text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-80 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Quản lý Giáo viên</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{loading ? '...' : teachersCount < 10 ? `0${teachersCount}` : teachersCount}</h1>
                <span className="stat-badge-light">Tài khoản giáo viên</span>
              </div>
              <Button as={Link} to="/admin/giao-vien" variant="light" className="rounded-pill px-4 fw-bold text-primary shadow-sm border-0">
                Quản lý danh sách <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
            <i className="bi bi-people-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-success text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-80 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Quản lý Môn học</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{loading ? '...' : subjectsCount < 10 ? `0${subjectsCount}` : subjectsCount}</h1>
                <span className="stat-badge-light">Môn học đang có</span>
              </div>
              <Button as={Link} to="/admin/mon-hoc" variant="light" className="rounded-pill px-4 fw-bold text-success shadow-sm border-0">
                Quản lý môn học <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
            <i className="bi bi-journal-bookmark-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>
      </Row>

      <Card className="border shadow-sm p-4">
        <h5 className="fw-bold mb-3">Thông tin cấu hình Admin (Local)</h5>
        <p className="text-muted small">
          Tài khoản admin hiện đang được chạy cục bộ phục vụ việc quản trị hệ thống của trường học.
          Tất cả dữ liệu được lưu trực tiếp trong cơ sở dữ liệu.
        </p>
        <hr />
        <div className="d-flex gap-3">
          <Button as={Link} to="/admin/giao-vien" variant="outline-primary" className="fw-bold">
            <i className="bi bi-person-gear me-2"></i> Thiết lập Giáo viên & Phân công
          </Button>
          <Button as={Link} to="/admin/mon-hoc" variant="outline-success" className="fw-bold">
            <i className="bi bi-book me-2"></i> Thiết lập Môn học mới
          </Button>
        </div>
      </Card>

      <style>{`
        .stat-badge-light {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          margin-bottom: 8px;
        }
      `}</style>
    </Container>
  );
};

export default AdminDashboard;
