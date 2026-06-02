import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Card, Table, Button, Form, Badge } from 'react-bootstrap';
import { submissionApi } from '../api/submissionApi';
import classApi from '../api/classApi';

const DanhSachHocSinhChamThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classDetail, setClassDetail] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [subRes, classRes] = await Promise.all([
          submissionApi.getSubmissions(id),
          classApi.getStudentsByClassId(id)
        ]);

        if (subRes && subRes.success) {
          setSubmissions(subRes.data || []);
        }
        if (classRes && classRes.success) {
          setClassDetail(classRes.data); // Chứa subjectName, year, semester, examCode
        }
      } catch (err) {
        console.error('Load data error', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const filtered = submissions.filter(s => {
    return (s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || String(s.studentId).includes(searchTerm)) &&
           (filterStatus === '' || String(s.status) === filterStatus); // So sánh chuỗi từ Select với Boolean
  });

  return (
    <Container fluid className="page-fade-in">
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/quan-ly-lop')} className="p-0 text-dark text-decoration-none mb-2 d-flex align-items-center gap-2 fw-bold">
          <i className="bi bi-arrow-left"></i> Quay lại Danh sách lớp
        </Button>
        <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Chấm thi: {classDetail?.name || id}</h2>
        <p className="text-secondary small fw-bold">Môn: <span className="text-primary">{classDetail?.subjectName || '---'}</span> | Mã đề: <span className="text-info">{classDetail?.examCode || 'Chưa gán'}</span></p>
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
            <option value="false">Chưa chấm</option>
            <option value="true">Đã chấm</option>
          </Form.Select>
        </div>
      </Card>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
           <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách bài nộp của học sinh</h5>
           <div className="d-flex gap-2">
             <Badge bg="success" className="rounded-pill px-3 fw-bold">Đã chấm: {submissions.filter(s => s.status === true).length}</Badge>
             <Badge bg="warning" text="dark" className="rounded-pill px-3 fw-bold">Chưa chấm: {submissions.filter(s => s.status === false).length}</Badge>
           </div>
        </div>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th className="px-4 py-3 border-0 text-dark">MSSV</th>
              <th className="px-4 py-3 border-0 text-dark">Họ tên học sinh</th>
              <th className="px-4 py-3 border-0 text-center text-dark">Trạng thái</th>
              <th className="px-4 py-3 border-0 text-center text-dark">Điểm số</th>
              <th className="px-4 py-3 border-0 text-end text-dark">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.submissionId} className="align-middle">
                <td className="px-4 py-3 fw-bold text-primary">{s.studentId}</td>
                <td className="px-4 py-3 fw-bold text-dark">{s.fullName}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`badge rounded-pill px-3 py-2 fw-bold shadow-sm ${s.status ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                    <i className={`bi bi-${s.status ? 'check-circle-fill' : 'clock-history'} me-2`}></i>
                    {s.status ? 'Đã chấm' : 'Chưa chấm'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center fw-bold fs-5" style={{ color: s.score !== -1 ? '#16a34a' : '#64748b' }}>
                  {s.score !== -1 ? `${s.score}/10` : '--'}
                </td>
                <td className="px-4 py-3 text-end">
                  <Button 
                    as={Link} 
                    to={s.status ? `/cham-thi/xem-chi-tiet/${s.submissionId}` : `/cham-thi/cham-diem/${s.submissionId}`}
                    className={`fw-bold px-4 rounded-3 shadow-sm ${s.status ? 'btn-outline-dark border-2' : 'btn-primary'}`}
                    size="sm"
                  >
                    {s.status ? 'Xem lại' : 'Chấm ngay'}
                  </Button>
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
