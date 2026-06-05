import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { fetchWithTimeout } from '../utils/api';

const ThemCauHoi = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    subjectId: '',
    doKho: '',
    noiDung: '',
    outline: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Tải danh sách môn học từ backend với timeout 1 giây
    fetchWithTimeout('/api/teacher/subjects')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setSubjects(resData.data);
        }
      })
      .catch(err => {
        console.warn('Backend subjects API failed in ThemCauHoi, using fallback:', err.message);
        setSubjects([
          { subjectId: 'IT007', subjectName: 'Hệ điều hành' },
          { subjectId: 'IT005', subjectName: 'Mạng máy tính' },
          { subjectId: 'SS006', subjectName: 'Pháp luật' },
          { subjectId: 'IT001', subjectName: 'Lập trình hướng đối tượng' },
        ]);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subjectId) newErrors.subjectId = 'Vui lòng chọn môn học';
    if (!formData.doKho) newErrors.doKho = 'Vui lòng chọn độ khó';
    if (!formData.noiDung.trim()) newErrors.noiDung = 'Vui lòng nhập nội dung câu hỏi';
    if (!formData.outline.trim()) newErrors.outline = 'Vui lòng nhập outline chấm điểm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetchWithTimeout('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formData.noiDung,
          answer: formData.outline,
          difficulty: formData.doKho,
          subjectId: formData.subjectId
        })
      })
        .then(res => {
          if (!res.ok) throw new Error('Create question error');
          return res.json();
        })
        .then(resData => {
          if (resData.success) {
            alert('Câu hỏi đã được thêm thành công!');
            navigate('/ngan-hang-cau-hoi');
          } else {
            alert('Không thể thêm câu hỏi: ' + resData.message);
          }
        })
        .catch(err => {
          console.warn('Backend question creation failed, fallback to mock successful creation:', err.message);
          
          // Save new question to mock localStorage database
          const defaultQuestions = [
            { id: 'Q-IT007-001', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management', usage: 3 },
            { id: 'Q-IT007-002', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management', usage: 2 },
            { id: 'Q-IT005-001', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model', usage: 5 },
            { id: 'Q-IT005-002', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP', usage: 4 },
            { id: 'Q-SS006-001', subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp', usage: 6 },
          ];

          let stored = localStorage.getItem('mockQuestions');
          let questionsList = stored ? JSON.parse(stored) : defaultQuestions;

          const matchedSubject = subjects.find(s => s.subjectId === formData.subjectId);
          const subjectName = matchedSubject ? matchedSubject.subjectName : 'Chưa xác định';

          questionsList.push({
            id: `Q-T${Math.floor(Math.random() * 10000)}`,
            subject: subjectName,
            type: 'Tự luận',
            difficulty: formData.doKho || 'Trung bình',
            topic: '-',
            usage: 0
          });

          localStorage.setItem('mockQuestions', JSON.stringify(questionsList));

          alert('Câu hỏi đã được thêm thành công (Chế độ giả lập)!');
          navigate('/ngan-hang-cau-hoi');
        });
    }
  };

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
            <Form.Select value={formData.subjectId} onChange={(e) => handleInputChange('subjectId', e.target.value)} isInvalid={!!errors.subjectId}>
              <option value="">Chọn môn học</option>
              {subjects.map(s => <option key={s.subjectId} value={s.subjectId}>{s.subjectId} - {s.subjectName}</option>)}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subjectId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Độ khó <span className="text-danger">*</span></Form.Label>
            <Form.Select value={formData.doKho} onChange={(e) => handleInputChange('doKho', e.target.value)} isInvalid={!!errors.doKho}>
              <option value="">Chọn độ khó</option>
              <option value="Dễ">Dễ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Phức tạp">Phức tạp</option>
              <option value="Khó">Khó</option>
            </Form.Select>
            <Form.Text className="text-muted x-small">QĐ1: Có 4 độ khó (Dễ, Trung Bình, Phức Tạp, Khó)</Form.Text>
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
            <Button variant="primary" type="submit" className="fw-bold px-4">Thêm câu hỏi</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/ngan-hang-cau-hoi')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ThemCauHoi;
