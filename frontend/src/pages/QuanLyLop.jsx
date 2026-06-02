import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import classApi from '../api/classApi';

const QuanLyLop = () => {
  const [classes, setClasses] = useState([]);
  const [meta, setMeta] = useState({ totalClass: 0, totalStudent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClasses = async () => {
      setLoading(true);
      try {
        const res = await classApi.getClasses();
        if (res && res.success) {
          setClasses(res.data || []);
          setMeta(res.meta || { totalClass: 0, totalStudent: 0 });
        }
      } catch (err) {
        console.error('Fetch classes error', err);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  const totalClasses = meta.totalClass;
  const totalStudents = meta.totalStudent;

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Quản lý lớp học</h2>
          <p className="text-secondary small mb-0 fw-bold">Quản lý danh sách lớp và theo dõi tiến độ chấm thi</p>
        </div>
        <Button as={Link} to="/quan-ly-lop/them-moi" className="btn-primary d-flex align-items-center gap-2 shadow-sm">
          <i className="bi bi-plus-circle-fill"></i> Thêm lớp học
        </Button>
      </div>

      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-primary text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-80 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Tổng số lớp học</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{totalClasses < 10 ? `0${totalClasses}` : totalClasses}</h1>
                <span className="stat-badge-light">Đang đào tạo</span>
              </div>
              <Button as={Link} to="/quan-ly-lop/them-moi" variant="light" className="rounded-pill px-4 fw-bold text-primary shadow-sm border-0">
                Thêm lớp mới <i className="bi bi-plus ms-2"></i>
              </Button>
            </div>
            <i className="bi bi-collection-play-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-success text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-80 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Tổng số học sinh</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{totalStudents}</h1>
                <span className="stat-badge-light">Sĩ số tổng</span>
              </div>
              <div className="stat-badge-light" style={{ padding: '6px 16px' }}>
                <i className="bi bi-check2-circle me-2"></i> Dữ liệu hệ thống
              </div>
            </div>
            <i className="bi bi-person-video3 position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>
      </Row>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách các lớp đang mở</h5>
          <span className="badge bg-primary rounded-pill px-3 fw-bold">{classes.length} Lớp</span>
        </div>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th className="px-4 py-3 border-0">Mã lớp</th>
              <th className="px-4 py-3 border-0">Môn học</th>
              <th className="px-4 py-3 border-0 text-center">Sĩ số</th>
              <th className="px-4 py-3 border-0">Đề thi gán</th>
              <th className="px-4 py-3 border-0 text-end">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.classId || cls.id} className="align-middle">
                <td className="px-4 py-3 fw-bold text-primary">{cls.name || cls.className}</td>
                <td className="px-4 py-3 fw-bold" style={{ color: 'var(--bs-body-color)' }}>{cls.subjectName || cls.subject}</td>
                <td className="px-4 py-3 text-center">
                  <span className="fw-bold" style={{ color: 'var(--bs-body-color)' }}>{cls.totalStudent || cls.totalStudents}</span>
                </td>
                <td className="px-4 py-3">
                  {cls.examCode || cls.assignedExam ? (
                    <span className="badge bg-primary text-white fw-bold rounded-2 px-2 py-1.5 shadow-sm" style={{ letterSpacing: '0.5px' }}>{cls.examCode || cls.assignedExam}</span>
                  ) : (
                    <span className="text-secondary small italic opacity-75 fw-medium">Chưa gán đề</span>
                  )}
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button as={Link} to={`/quan-ly-lop/chi-tiet/${cls.classId || cls.id}`} variant="light" size="sm" className="border fw-bold rounded-3 text-dark px-3 hover-shadow-sm">
                      Chi tiết
                    </Button>
                    {(cls.examCode || cls.assignedExam) && (
                      <Button as={Link} to={`/cham-thi/danh-sach/${cls.classId || cls.id}`} className="btn-success border-0 rounded-3 px-3 shadow-sm d-flex align-items-center gap-2">
                        <i className="bi bi-pencil-square"></i> Chấm thi
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <style>{`
        .table thead th {
          background-color: #f1f5f9 !important;
          color: #000000 !important;
          font-weight: 800 !important;
          border-bottom: 2px solid #cbd5e1 !important;
        }
        [data-bs-theme='dark'] .table thead th {
          background-color: var(--bs-tertiary-bg) !important;
          color: var(--bs-secondary-color) !important;
          border-bottom: 2px solid var(--bs-border-color) !important;
        }
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
        .hover-shadow-sm:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          background-color: #ffffff !important;
        }
      `}</style>
    </Container>
  );
};

export default QuanLyLop;
