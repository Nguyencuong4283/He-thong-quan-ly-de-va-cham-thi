import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const ThemLop = () => {
  const navigate = useNavigate();
  const subjects = ['Hệ điều hành', 'Mạng máy tính', 'Pháp luật', 'Lập trình hướng đối tượng'];

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    semester: '',
    year: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) {
      setErrors({ name: !formData.name ? 'Vui lòng nhập mã lớp' : '', subject: !formData.subject ? 'Vui lòng chọn môn học' : '' });
      return;
    }
    alert('Lớp học đã được tạo thành công!');
    navigate('/quan-ly-lop');
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
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
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
