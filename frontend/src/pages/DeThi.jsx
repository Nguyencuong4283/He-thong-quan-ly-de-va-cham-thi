import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card } from 'react-bootstrap';

const DeThi = () => {
  const exams = [
    { id: 'EX-IT007-2025-01', subject: 'Hệ điều hành', semester: 'Fall 2025', duration: '90 phút' },
    { id: 'EX-IT005-2025-02', subject: 'Nhập môn mạng máy tính', semester: 'Fall 2025', duration: '60 phút' },
    { id: 'EX-SS006-2025-01', subject: 'Pháp luật đại cương', semester: 'Spring 2026', duration: '60 phút' },
  ];

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Quản lý đề thi</h2>
          <p className="text-secondary small mb-0 fw-bold">Quản lý và biên soạn các bộ đề thi trực tuyến</p>
        </div>
        <Button as={Link} to="/de-thi/tao-moi" className="btn-primary d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i> Tạo đề thi mới
        </Button>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Mã đề thi</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Môn học</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Học kì & Năm học</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Thời gian</th>
              <th className="px-4 py-3 border-0 text-end text-dark fw-bold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="align-middle">
                <td className="px-4 py-3 fw-bold text-primary">{exam.id}</td>
                <td className="px-4 py-3 fw-bold" style={{ color: 'var(--bs-body-color)' }}>{exam.subject}</td>
                <td className="px-4 py-3 text-secondary fw-medium">{exam.semester}</td>
                <td className="px-4 py-3 text-secondary fw-medium">{exam.duration}</td>
                <td className="px-4 py-3 text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    <Button variant="light" size="sm" className="border-0 rounded-3 text-primary p-2 shadow-xs" title="Xem chi tiết">
                      <i className="bi bi-eye fs-5"></i>
                    </Button>
                    <Button as={Link} to={`/de-thi/chinh-sua/${exam.id}`} variant="light" size="sm" className="border-0 rounded-3 text-primary p-2 shadow-xs" title="Chỉnh sửa">
                      <i className="bi bi-pencil-square fs-5"></i>
                    </Button>
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
        [data-bs-theme='dark'] .btn-light {
          background-color: rgba(255, 255, 255, 0.05);
          color: #60a5fa !important;
        }
        [data-bs-theme='dark'] .btn-light:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </Container>
  );
};

export default DeThi;
