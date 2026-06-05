import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { fetchWithTimeout } from '../utils/api';

const ThemLop = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    classId: '',
    name: '',
    subjectId: '',
    semester: '',
    year: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Tải danh sách môn học từ backend với timeout
    fetchWithTimeout('/api/teacher/subjects')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setSubjects(resData.data.map(sub => ({
            id: sub.subjectId,
            name: `${sub.subjectId} - ${sub.subjectName}`
          })));
        }
      })
      .catch(err => {
        console.warn('Backend subjects API failed in ThemLop, using fallback:', err.message);
        setSubjects([
          { id: 'IT007', name: 'IT007 - Hệ điều hành' },
          { id: 'IT005', name: 'IT005 - Mạng máy tính' },
          { id: 'SS006', name: 'SS006 - Pháp luật' },
          { id: 'IT001', name: 'IT001 - Lập trình hướng đối tượng' },
        ]);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.classId || !formData.name || !formData.subjectId || !formData.semester || !formData.year) {
      setErrors({
        classId: !formData.classId ? 'Vui lòng nhập Mã lớp (VD: CLASS-005)' : '',
        name: !formData.name ? 'Vui lòng nhập Tên lớp (VD: IT007.N11)' : '',
        subjectId: !formData.subjectId ? 'Vui lòng chọn môn học' : '',
        semester: !formData.semester ? 'Vui lòng chọn học kỳ' : '',
        year: !formData.year ? 'Vui lòng nhập năm học' : ''
      });
      return;
    }

    // Gửi yêu cầu tạo lớp học đến backend
    const cleanYear = parseInt(formData.year.split('-')[0]) || 2026;
    
    fetchWithTimeout('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        classId: formData.classId,
        name: formData.name,
        semester: formData.semester,
        year: cleanYear,
        subjectId: formData.subjectId
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Create class error');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert('Lớp học đã được tạo thành công!');
          navigate('/quan-ly-lop');
        } else {
          alert('Không thể tạo lớp học: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Backend Class Creation failed, using fallback:', err.message);
        
        // Save new class to mock localStorage database
        const defaultClasses = [
          { id: 'CLASS-001', name: 'IT007.N11', subject: 'Hệ điều hành', teacher: 'TS. Nguyễn Văn X', totalStudents: 45, assignedExam: 'EX-IT007-2025-01', gradedCount: 32, pendingCount: 13 },
          { id: 'CLASS-002', name: 'IT005.N12', subject: 'Nhập môn mạng máy tính', teacher: 'TS. Nguyễn Văn X', totalStudents: 50, assignedExam: 'EX-IT005-2025-02', gradedCount: 48, pendingCount: 2 },
          { id: 'CLASS-003', name: 'SS006.N13', subject: 'Pháp luật đại cương', teacher: 'TS. Trần Thị Y', totalStudents: 40, assignedExam: 'EX-SS006-2025-01', gradedCount: 15, pendingCount: 25 },
          { id: 'CLASS-004', name: 'IT001.N14', subject: 'Lập trình hướng đối tượng', teacher: 'TS. Nguyễn Văn X', totalStudents: 38, assignedExam: null, gradedCount: 0, pendingCount: 0 }
        ];

        let stored = localStorage.getItem('mockClasses');
        let classesList = stored ? JSON.parse(stored) : defaultClasses;

        const matchedSubject = subjects.find(s => s.id === formData.subjectId);
        const subjectName = matchedSubject ? matchedSubject.name.split(' - ')[1] : 'Chưa xác định';

        classesList.push({
          id: formData.classId,
          name: formData.name,
          subject: subjectName,
          teacher: 'TS. Nguyễn Văn X',
          totalStudents: 0,
          assignedExam: null,
          gradedCount: 0,
          pendingCount: 0
        });

        localStorage.setItem('mockClasses', JSON.stringify(classesList));
        
        alert('Lớp học đã được tạo thành công (Chế độ giả lập)!');
        navigate('/quan-ly-lop');
      });
  };

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/quan-ly-lop')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">THÊM LỚP HỌC MỚI</h2>
        <p className="text-muted small">Tạo lớp học mới và quản lý danh sách học sinh</p>
      </div>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <h5 className="fw-bold mb-4 pb-2 border-bottom">Thông tin lớp học</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">ID lớp học (Database) <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="VD: CLASS-005" value={formData.classId} onChange={(e) => handleInputChange('classId', e.target.value)} isInvalid={!!errors.classId} />
            <Form.Control.Feedback type="invalid">{errors.classId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Mã lớp (Tên lớp học) <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="VD: IT007.N11" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Môn học <span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.subjectId} onChange={(e) => handleInputChange('subjectId', e.target.value)} isInvalid={!!errors.subjectId}>
              <option value="">Chọn môn học</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subjectId}</Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold small">Học kỳ <span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.semester} onChange={(e) => handleInputChange('semester', e.target.value)}>
                  <option value="">Chọn học kỳ</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold small">Năm học <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="VD: 2025-2026" value={formData.year} onChange={(e) => handleInputChange('year', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-3 pt-3 border-top">
            <Button variant="primary" type="submit" className="fw-bold px-4">Tạo lớp học</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/quan-ly-lop')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ThemLop;
