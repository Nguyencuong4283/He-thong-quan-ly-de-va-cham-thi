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
    name: '',
    subject: '',
    semester: '',
    year: '',
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

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
    if (!formData.name || !formData.subject) {
      setErrors({ name: !formData.name ? 'Vui lòng nhập mã lớp' : '', subject: !formData.subject ? 'Vui lòng chọn môn học' : '' });
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
            <Form.Label className="fw-bold small">Mã lớp <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="VD: IT007.N11" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Môn học <span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} isInvalid={!!errors.subject}>
              <option value="">Chọn môn học</option>
              {loadingSubjects ? <option>Đang tải...</option> : subjects.map(s => (
                <option key={s.subjectId || s.id} value={s.subjectId || s.id}>{s.subjectName || s.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
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
