import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import classApi from '../api/classApi';
import teacherApi from '../api/teacherApi';
import { buildClassCreateRequest } from '../models/class';

const ThemLop = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [formData, setFormData] = useState({
    classId: '',
    name: '',
    subjectId: '',
    semester: '',
    year: '',
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const res = await teacherApi.getSubjects();
        if (res && res.success) setSubjects(res.data || []);
      } catch (err) {
        console.error('Load subjects error', err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    loadSubjects();
  }, []);

  const handleSubmit = async (e) => {
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
    setIsSaving(true);
    try {
      const payload = buildClassCreateRequest({
        classId: formData.name,
        className: formData.name,
        subjectId: formData.subject,
        semester: formData.semester,
        year: formData.year,
      });
      const res = await classApi.createClass(payload);
      if (res && res.success) {
        alert('Lớp học đã được tạo thành công!');
        navigate('/quan-ly-lop');
      } else {
        alert(res.message || 'Tạo lớp học thất bại');
      }
    } catch (err) {
      console.error('Create class error', err);
      alert('Có lỗi xảy ra khi tạo lớp học.');
    } finally {
      setIsSaving(false);
    }
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
              {loadingSubjects ? <option>Đang tải...</option> : subjects.map(s => (
                <option key={s.subjectId || s.id} value={s.subjectId || s.id}>{s.subjectName || s.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subjectId}</Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold small">Học kỳ <span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.semester} onChange={(e) => handleInputChange('semester', e.target.value)}>
                  <option value="">Chọn học kỳ</option>
                  <option value="Học kỳ 1">Học kỳ 1</option>
                  <option value="Học kỳ 2">Học kỳ 2</option>
                  <option value="Học kỳ hè">Học kỳ hè</option>
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
