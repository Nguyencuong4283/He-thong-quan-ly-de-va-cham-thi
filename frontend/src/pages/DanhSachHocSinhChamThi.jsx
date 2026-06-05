import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Card, Table, Button, Form, Badge } from 'react-bootstrap';

const DanhSachHocSinhChamThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [students, setStudents] = useState([]);
  const [examCode, setExamCode] = useState('EX-IT007-2025-01');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch class details to get the exam code
    fetch(`/api/classes/${id}/students`)
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setExamCode(resData.data.examCode || 'Chưa gán đề thi');
        }
      })
      .catch(err => console.warn('Failed to fetch class info in DanhSachHocSinhChamThi:', err.message));

    // 2. Fetch submissions
    fetch(`/api/classes/${id}/submission`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        const mockList = [
          { id: 'SV-001', submissionId: 'SUB-001', name: 'Nguyễn Văn A', status: 'Chưa chấm', score: null },
          { id: 'SV-002', submissionId: 'SUB-002', name: 'Trần Thị B', status: 'Đã chấm', score: 8.5 },
          { id: 'SV-003', submissionId: 'SUB-003', name: 'Lê Văn C', status: 'Chưa chấm', score: null },
          { id: 'SV-004', submissionId: 'SUB-004', name: 'Phạm Thị D', status: 'Đã chấm', score: 9.0 },
        ];
        if (resData.success && resData.data) {
          const mapped = resData.data.map(sub => ({
            id: sub.studentId,
            submissionId: sub.submissionId,
            name: sub.fullName,
            status: sub.status ? 'Đã chấm' : 'Chưa chấm',
            score: sub.score !== undefined && sub.score !== null ? sub.score : null
          }));
          setStudents(mapped.length > 0 ? mapped : mockList);
        } else {
          setStudents(mockList);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend submissions API is not available, using mock data:', err.message);
        setStudents([
          { id: 'SV-001', submissionId: 'SUB-001', name: 'Nguyễn Văn A', status: 'Chưa chấm', score: null },
          { id: 'SV-002', submissionId: 'SUB-002', name: 'Trần Thị B', status: 'Đã chấm', score: 8.5 },
          { id: 'SV-003', submissionId: 'SUB-003', name: 'Lê Văn C', status: 'Chưa chấm', score: null },
          { id: 'SV-004', submissionId: 'SUB-004', name: 'Phạm Thị D', status: 'Đã chấm', score: 9.0 },
        ]);
        setLoading(false);
      });
  }, [id]);

  const filtered = students.filter(s => {
    return (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm)) &&
           (filterStatus === '' || s.status === filterStatus);
  });

  return (
    <Container fluid className="page-fade-in">
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/quan-ly-lop')} className="p-0 text-dark text-decoration-none mb-2 d-flex align-items-center gap-2 fw-bold">
          <i className="bi bi-arrow-left"></i> Quay lại Danh sách lớp
        </Button>
        <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Danh sách chấm thi</h2>
        <p className="text-secondary small fw-bold">Lớp: <span className="text-primary">{id}</span> | Mã đề: <span className="text-info">{examCode}</span></p>
      </div>

      <Card className="border shadow-sm p-3 mb-4">
        <div className="d-flex gap-3">
          <div className="position-relative flex-grow-1">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-dark fw-bold"></i>
            <Form.Control 
              className="ps-5 py-2.5 rounded-3 border-2 fw-medium text-dark" 
              placeholder="Tìm kiếm MSSV hoặc tên học sinh..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <Form.Select className="w-25 py-2.5 rounded-3 border-2 fw-bold text-dark" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="Chưa chấm">Chưa chấm</option>
            <option value="Đã chấm">Đã chấm</option>
          </Form.Select>
        </div>
      </Card>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
           <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách bài nộp của học sinh</h5>
           <div className="d-flex gap-2">
             <Badge bg="success" className="rounded-pill px-3 fw-bold">Đã chấm: {students.filter(s => s.status === 'Đã chấm').length}</Badge>
             <Badge bg="warning" text="dark" className="rounded-pill px-3 fw-bold">Chưa chấm: {students.filter(s => s.status === 'Chưa chấm').length}</Badge>
           </div>
        </div>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th className="px-4 py-3 border-0 text-dark">MSSV</th>
              <th className="px-4 py-3 border-0 text-dark">Họ tên học sinh</th>
              <th className="px-4 py-3 border-0 text-center text-dark">Trạng thái</th>
              <th className="px-4 py-3 border-0 text-center text-dark">Điểm số</th>
              <th className="px-4 py-3 border-0 text-end text-dark" style={{ minWidth: '220px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="align-middle">
                <td className="px-4 py-3 fw-bold text-primary">{s.id}</td>
                <td className="px-4 py-3 fw-bold text-dark">{s.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`badge rounded-pill px-3 py-2 fw-bold ${s.status === 'Đã chấm' ? 'bg-success bg-opacity-15 text-success' : 'bg-warning bg-opacity-20 text-dark'}`}>
                    <i className={`bi bi-${s.status === 'Đã chấm' ? 'check-circle-fill' : 'clock-history'} me-2`}></i>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center fw-bold fs-5" style={{ color: s.score !== null ? '#16a34a' : '#64748b' }}>
                  {s.score !== null ? `${s.score}/10` : '--'}
                </td>
                <td className="px-4 py-3 text-end" style={{ whiteSpace: 'nowrap' }}>
                  {s.status === 'Đã chấm' ? (
                    <div className="d-flex gap-2 justify-content-end">
                      <Button 
                        as={Link} 
                        to={`/cham-thi/xem-chi-tiet/${s.submissionId}`}
                        className="fw-bold px-3 rounded-3 shadow-sm btn-outline-dark border-2"
                        size="sm"
                      >
                        Xem lại
                      </Button>
                      <Button 
                        as={Link} 
                        to={`/cham-thi/cham-diem/${s.submissionId}`}
                        className="fw-bold px-3 rounded-3 shadow-sm btn-warning text-dark"
                        size="sm"
                      >
                        <i className="bi bi-pencil-square me-1"></i> Sửa điểm
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      as={Link} 
                      to={`/cham-thi/cham-diem/${s.submissionId}`}
                      className="fw-bold px-4 rounded-3 shadow-sm btn-primary"
                      size="sm"
                    >
                      Chấm ngay
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <style>{`
        .table thead th {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          font-weight: 800 !important;
          border-bottom: 2px solid #cbd5e1 !important;
        }
      `}</style>
    </Container>
  );
};

export default DanhSachHocSinhChamThi;
