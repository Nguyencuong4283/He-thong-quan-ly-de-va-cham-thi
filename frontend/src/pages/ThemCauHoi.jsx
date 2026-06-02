import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import questionApi from '../api/questionApi';
import teacherApi from '../api/teacherApi';
import { buildQuestionCreateRequest } from '../models/question';

const ThemCauHoi = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const [formData, setFormData] = useState({
    monHoc: '',
    doKho: '',
    noiDung: '',
    outline: '',
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.monHoc) newErrors.monHoc = 'Vui lòng chọn môn học';
    if (!formData.doKho) newErrors.doKho = 'Vui lòng chọn độ khó';
    if (!formData.noiDung.trim()) newErrors.noiDung = 'Vui lòng nhập nội dung câu hỏi';
    if (!formData.outline.trim()) newErrors.outline = 'Vui lòng nhập outline chấm điểm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const questionData = buildQuestionCreateRequest({
      content: formData.noiDung,
      answer: formData.outline,
      difficulty: formData.doKho,
      subjectId: formData.monHoc,
    });

    try {
      setSaving(true);
      const result = await questionApi.createQuestion(questionData);
      if (result.success) {
        alert('Câu hỏi đã được thêm thành công!');
        navigate('/ngan-hang-cau-hoi');
      } else {
        alert(result.message || 'Thêm câu hỏi thất bại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo câu hỏi.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingSubjects(true);
      const res = await teacherApi.getSubjects();
      if (!mounted) return;
      if (res.success) {
        setSubjects(res.data || []);
      } else {
        // keep empty list; optionally show a message
        setSubjects([]);
      }
      setLoadingSubjects(false);
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/ngan-hang-cau-hoi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">THÊM CÂU HỎI MỚI</h2>
        <p className="text-muted small">Tạo câu hỏi mới theo biểu mẫu BM1</p>
      </div>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h4 className="fw-bold mb-0">BM1</h4>
          <h4 className="fw-bold mb-0">CÂU HỎI TỰ LUẬN</h4>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Môn học <span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.monHoc} onChange={(e) => handleInputChange('monHoc', e.target.value)} isInvalid={!!errors.monHoc}>
              <option value="">Chọn môn học</option>
              {loadingSubjects ? (
                <option value="">Đang tải môn học...</option>
              ) : (
                subjects.map(s => <option key={s.subjectId || s.id} value={s.subjectId || s.id}>{s.subjectName || s.name || s.label}</option>)
              )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.monHoc}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Độ khó <span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.doKho} onChange={(e) => handleInputChange('doKho', e.target.value)} isInvalid={!!errors.doKho}>
              <option value="">Chọn độ khó</option>
              <option value="Dễ">Dễ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Khó">Khó</option>
            </Form.Select>
            <Form.Text className="text-muted x-small">QĐ1: Có 3 độ khó (Dễ, Trung bình, Khó)</Form.Text>
            <Form.Control.Feedback type="invalid">{errors.doKho}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Nội dung câu hỏi <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              placeholder="Nhập nội dung câu hỏi..." 
              value={formData.noiDung} 
              onChange={(e) => handleInputChange('noiDung', e.target.value)}
              isInvalid={!!errors.noiDung}
            />
            <Form.Control.Feedback type="invalid">{errors.noiDung}</Form.Control.Feedback>
          </Form.Group>

          <Alert variant="info" className="mb-4 border-0 small py-2">
            📝 Học sinh sẽ trả lời bằng văn bản và giảng viên sẽ chấm điểm dựa trên Outline / Hướng dẫn chấm điểm.
          </Alert>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold small">Outline / Hướng dẫn chấm điểm <span className="text-danger">*</span></Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              placeholder="Nhập outline chi tiết để hỗ trợ chấm thi..." 
              value={formData.outline} 
              onChange={(e) => handleInputChange('outline', e.target.value)}
              isInvalid={!!errors.outline}
            />
            <Form.Control.Feedback type="invalid">{errors.outline}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-3 pt-3 border-top">
            <Button variant="primary" type="submit" className="fw-bold px-4" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Thêm câu hỏi'}
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/ngan-hang-cau-hoi')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ThemCauHoi;
