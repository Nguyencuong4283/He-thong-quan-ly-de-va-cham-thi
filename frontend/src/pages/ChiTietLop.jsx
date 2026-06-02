import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import classApi from '../api/classApi';
import examApi from '../api/examApi';
import { mapStudentListItem } from '../models/student';
import { mapExamListItem } from '../models/exam';

const ChiTietLop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [classDetail, setClassDetail] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');
  const [availableExams, setAvailableExams] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [classRes, examsRes] = await Promise.all([
          classApi.getStudentsByClassId(id),
          examApi.getExams()
        ]);

        if (classRes && classRes.success) {
          const rawData = classRes.data || {};
          const studentList = Array.isArray(rawData.students) 
            ? rawData.students.map(mapStudentListItem) 
            : [];
            
          setClassDetail({
            ...rawData,
            className: rawData.name || rawData.className || 'Chưa đặt tên',
            students: studentList 
          });
          setSelectedExam(rawData.examId || '');
          console.log("Class Detail Loaded:", rawData);
        }
        if (examsRes && examsRes.success) {
          setAvailableExams((examsRes.data || []).map(mapExamListItem));
        }
      } catch (err) {
        console.error('Load class detail error', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleAssign = async () => {
    if (!selectedExam) return;
    setIsAssigning(true);
    try {
      const res = await classApi.assignExam(id, selectedExam);
      if (res && res.success) {
        // Sau khi gán thành công, tìm lại thông tin đề thi để cập nhật UI
        const assignedExamDetail = availableExams.find(e => String(e.examId) === String(selectedExam));
        setClassDetail({ ...classDetail, examId: selectedExam, examCode: assignedExamDetail?.examCode });
        setShowAssignModal(false);
        alert('Đã gán đề thi thành công!');
      } else {
        alert(res.message || 'Gán đề thi thất bại');
      }
    } catch (err) {
      console.error('Assign exam error', err);
      alert('Lỗi khi gán đề thi');
    } finally {
      setIsAssigning(false);
    }
  };

  if (loading) return <Container className="py-5 text-center text-primary"><p className="fw-bold">Đang tải dữ liệu...</p></Container>;

  if (!classDetail) return <Container className="py-5 text-center"><p className="text-danger fw-bold">Không tìm thấy thông tin lớp học.</p></Container>;

  return (
    <Container fluid className="page-fade-in">
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/quan-ly-lop')} className="p-0 text-dark text-decoration-none mb-2 d-flex align-items-center gap-2 fw-bold">
          <i className="bi bi-arrow-left"></i> Quay lại danh sách lớp
        </Button>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>{classDetail.className}</h2>
            <p className="text-secondary mb-0 fw-bold">{classDetail.subjectName}</p>
          </div>
          <Button as={Link} to={`/quan-ly-lop/nhap-hoc-sinh/${id}`} className="btn-success d-flex align-items-center gap-2 shadow-sm">
            <i className="bi bi-person-plus-fill"></i> Nhập danh sách học sinh
          </Button>
        </div>
      </div>

      <Row className="mb-4 g-3">
        <Col md={6}>
          <Card className="border shadow-sm p-4 h-100">
            <h6 className="text-secondary small fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>Học kỳ / Năm học</h6>
            <div className="d-flex align-items-center gap-3">
               <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                 <i className="bi bi-calendar3 fs-4"></i>
               </div>
               <h4 className="mb-0 fw-bold" style={{ color: '#000000' }}>{classDetail.semester} | {classDetail.year}</h4>
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border shadow-sm p-4 h-100 text-center">
            <h6 className="text-secondary small fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Tổng số học sinh</h6>
            <h2 className="mb-0 text-primary fw-bold display-6">{classDetail.students.length}</h2>
          </Card>
        </Col>
      </Row>

      <Card className="border shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-4" style={{ color: '#000000' }}>Đề thi đang áp dụng</h5>
        {classDetail.examCode ? (
          <div className="d-flex justify-content-between align-items-center border rounded-4 p-4 bg-light bg-opacity-50">
            <div className="d-flex align-items-center gap-4">
              <div className="bg-info bg-opacity-20 text-info rounded-4 p-3 fs-3">
                <i className="bi bi-file-earmark-check-fill"></i>
              </div>
              <div>
                <p className="mb-1 fw-bold text-primary fs-5">{classDetail.examCode}</p>
                <p className="mb-0 text-dark fw-bold">{availableExams.find(e => e.examCode === classDetail.examCode)?.subjectName}</p>
              </div>
            </div>
            <Button variant="outline-primary" className="fw-bold px-4 rounded-3 shadow-sm bg-white" onClick={() => { setSelectedExam(classDetail.examId); setShowAssignModal(true); }}>
              Thay đổi đề thi
            </Button>
          </div>
        ) : (
          <div className="text-center py-5 border rounded-4 border-dashed bg-light bg-opacity-50">
            <i className="bi bi-file-earmark-plus fs-1 text-secondary opacity-50 d-block mb-3"></i>
            <Button className="btn-primary shadow-sm" onClick={() => setShowAssignModal(true)}>Gán đề thi cho lớp</Button>
          </div>
        )}
      </Card>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách học sinh của lớp</h5>
          <span className="badge bg-secondary rounded-pill px-3 fw-bold">{classDetail.students.length} Thành viên</span>
        </div>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th className="px-4 py-3 border-0">Mã số sinh viên</th>
              <th className="px-4 py-3 border-0">Họ tên học sinh</th>
              <th className="px-4 py-3 border-0">Email liên hệ</th>
            </tr>
          </thead>
          <tbody>
            {classDetail.students.map(s => (
              <tr key={s.studentId} className="align-middle">
                <td className="px-4 py-3 fw-bold text-primary">{s.studentId}</td>
                <td className="px-4 py-3 fw-bold text-dark">{s.fullName}</td>
                <td className="px-4 py-3 text-secondary fw-medium">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton><Modal.Title className="fw-bold">Gán đề thi</Modal.Title></Modal.Header>
        <Modal.Body className="p-4">
          <Form.Group>
            <Form.Label className="small fw-bold text-dark text-uppercase mb-2">Chọn đề thi phù hợp</Form.Label>
            <Form.Select className="py-3 rounded-3 fw-bold border-2" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
              <option value="">-- Chọn đề thi --</option>
              {availableExams.map(e => (
                <option key={e.examId} value={e.examId}>{e.examCode} - {e.subjectName}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" className="fw-bold px-4 border" onClick={() => setShowAssignModal(false)}>Hủy</Button>
          <Button className="btn-primary px-4 shadow-sm" onClick={handleAssign}>Xác nhận gán</Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        .table thead th {
          background-color: #f1f5f9 !important;
          color: #1e293b !important;
          font-weight: 800 !important;
          border-bottom: 2px solid #cbd5e1 !important;
        }
      `}</style>
    </Container>
  );
};

export default ChiTietLop;
