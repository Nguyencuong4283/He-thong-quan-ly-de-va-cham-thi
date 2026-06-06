import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Table } from 'react-bootstrap';
import classApi from '../api/classApi';
import { buildStudentCreateRequest } from '../models/student';
import { submissionApi } from '../api/submissionApi';
import { buildSubmissionCreateAndUpdateRequest } from '../models/submission';

const NhapDanhSachHocSinh = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [importMethod, setImportMethod] = useState('manual');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ mssv: '', name: '', email: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.mssv || !formData.name) return;
    setStudents([...students, { ...formData }]);
    setFormData({ mssv: '', name: '', email: '', phone: '' });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const parsedStudents = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const columns = line.split(',');
        if (columns.length >= 2) {
          const mssv = columns[0].trim();
          const name = columns[1].trim();
          const email = columns[2] ? columns[2].trim() : `${mssv.toLowerCase()}@uit.edu.vn`;
          parsedStudents.push({ mssv, name, email });
        }
      }

      if (parsedStudents.length > 0) {
        setStudents([...students, ...parsedStudents]);
        alert(`Đã đọc thành công ${parsedStudents.length} học sinh từ file! Bấm "Hoàn tất nhập" để lưu.`);
      } else {
        alert('File không hợp lệ hoặc rỗng. Định dạng CSV mẫu: mssv,name,email');
      }
    };
    reader.readAsText(file);
  };

  const handleRemove = (mssv) => setStudents(students.filter(s => s.mssv !== mssv));

  const handleSubmit = async () => {
    if (students.length === 0) return alert('Chưa có học sinh nào');
    if (!id) return alert('Không xác định được lớp học');

    setIsSaving(true);
    try {
      const studentPayload = buildStudentCreateRequest(students);
      const studentRes = await classApi.createStudent(id, studentPayload);

      if (!studentRes.success) {
        throw new Error(studentRes.message || 'Không thể tạo danh sách học sinh');
      }

      const classRes = await classApi.getStudentsByClassId(id);
      const targetExamId = classRes.data?.examId;

      if (targetExamId !== undefined && targetExamId !== null) {
        console.log('Students added, now initializing submissions for examId:', targetExamId);
        const studentsToCreate = Array.isArray(studentRes.data) ? studentRes.data : students;
        
        const submissionPromises = studentsToCreate.map((s) => {
          const subPayload = buildSubmissionCreateAndUpdateRequest({
            examId: targetExamId,
            score: 0,
            scoreText: '',
            note: '',
            status: false,
          });
          const sid = s.studentId || s.mssv;
          return submissionApi.createSubmission(id, sid, subPayload);
        });
        await Promise.all(submissionPromises);
        alert('Nhập danh sách học sinh và khởi tạo bài thi thành công!');
      } else {
        alert('Đã thêm học sinh, nhưng không thể khởi tạo bài chấm vì lớp học này chưa được gán đề thi.');
      }

      navigate(`/quan-ly-lop/chi-tiet/${id}`);
    } catch (err) {
      console.error('Create student error', err);
      alert(err.message || 'Không thể tạo học sinh.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate(-1)} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">NHẬP DANH SÁCH HỌC SINH</h2>
        <p className="text-muted small">Thêm học sinh vào lớp học: {id}</p>
      </div>

      <Card className="border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-4">Phương thức nhập</h5>
        <div className="d-flex gap-3 mb-5">
          <Button 
            variant={importMethod === 'manual' ? 'primary' : 'outline-primary'} 
            className="flex-grow-1 py-4 shadow-none" 
            onClick={() => setImportMethod('manual')}
          >
            <i className="bi bi-person-plus fs-3 d-block mb-2"></i>
            <span className="fw-bold">Nhập thủ công</span>
          </Button>
          <Button 
            variant={importMethod === 'excel' ? 'success' : 'outline-success'} 
            className="flex-grow-1 py-4 shadow-none" 
            onClick={() => setImportMethod('excel')}
          >
            <i className="bi bi-file-earmark-excel fs-3 d-block mb-2"></i>
            <span className="fw-bold">Nhập từ Excel</span>
          </Button>
        </div>

        {importMethod === 'manual' ? (
          <Form onSubmit={handleAdd}>
            <Row className="g-3 mb-4">
              <Col md={3}>
                <Form.Control placeholder="MSSV" value={formData.mssv} onChange={(e) => setFormData({...formData, mssv: e.target.value})} />
              </Col>
              <Col md={3}>
                <Form.Control placeholder="Họ tên" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </Col>
              <Col md={3}>
                <Form.Control placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </Col>
              <Col md={3}>
                <Button variant="primary" type="submit" className="w-100 fw-bold">Thêm</Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <div className="text-center py-5 border rounded-3 border-dashed bg-light">
            <i className="bi bi-file-earmark-excel fs-1 text-success mb-3 d-block"></i>
            <p className="mt-2 text-muted fw-bold">Chọn file danh sách học sinh (định dạng CSV)</p>
            <Form.Group className="mb-3 mx-auto" style={{ maxWidth: '400px' }}>
              <Form.Control type="file" accept=".csv" onChange={handleFileUpload} className="border-2 text-dark" />
            </Form.Group>
            <p className="text-muted small">Định dạng file CSV mẫu: <code className="bg-light p-1 rounded border text-danger">mssv,name,email</code></p>
            <Button as="a" href="/student_template.csv" download="student_template.csv" variant="outline-success" size="sm">
              Tải file mẫu CSV
            </Button>
          </div>
        )}
      </Card>

      {students.length > 0 && (
        <Card className="border-0 shadow-sm overflow-hidden mb-4">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 small text-muted">MSSV</th>
                <th className="px-4 py-3 small text-muted">Họ tên</th>
                <th className="px-4 py-3 small text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.mssv}>
                  <td className="px-4 py-3 fw-bold">{s.mssv}</td>
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">
                    <Button variant="link" className="text-danger p-0" onClick={() => handleRemove(s.mssv)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {students.length > 0 && (
        <div className="d-flex gap-3">
          <Button variant="primary" className="fw-bold px-4 py-2" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Đang lưu...' : 'Hoàn tất nhập'}
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} disabled={isSaving}>Hủy</Button>
        </div>
      )}
    </Container>
  );
};

export default NhapDanhSachHocSinh;
