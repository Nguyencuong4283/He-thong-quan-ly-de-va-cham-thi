import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { fetchWithTimeout } from '../utils/api';

const ChinhSuaCauHoi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const subjects = ['Hệ điều hành', 'Mạng máy tính', 'Pháp luật', 'Lập trình hướng đối tượng', 'Cơ sở dữ liệu'];

  const [formData, setFormData] = useState({
    monHoc: '',
    doKho: '',
    noiDung: '',
    outline: '',
  });

  useEffect(() => {
    fetchWithTimeout(`/api/question/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success && resData.data) {
          const q = resData.data;
          setFormData({
            monHoc: q.subjectName || 'Chưa xác định',
            doKho: q.difficulty || 'Trung bình',
            noiDung: q.content || '',
            outline: q.answer || '',
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend question fetch failed, fallback to mock detail:', err.message);
        const stored = localStorage.getItem('mockQuestions');
        if (stored) {
          const list = JSON.parse(stored);
          const found = list.find(q => q.dbId === parseInt(id) || q.id === id);
          if (found) {
            setFormData({
              monHoc: found.subject,
              doKho: found.difficulty,
              noiDung: found.content || 'Giải thích khái niệm về process và thread trong hệ điều hành.',
              outline: found.outline || '1. Khái niệm process (5đ)\n2. Khái niệm thread (5đ)',
            });
            setLoading(false);
            return;
          }
        }
        setFormData({
          monHoc: 'Hệ điều hành',
          doKho: 'Trung bình',
          noiDung: 'Giải thích khái niệm về process và thread trong hệ điều hành.',
          outline: '1. Khái niệm process (5đ)\n2. Khái niệm thread (5đ)',
        });
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.noiDung.trim() || !formData.outline.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    fetchWithTimeout(`/api/question/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: formData.noiDung,
        answer: formData.outline,
        difficulty: formData.doKho
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert('Câu hỏi đã được cập nhật thành công!');
          navigate('/ngan-hang-cau-hoi');
        } else {
          alert('Không thể cập nhật câu hỏi: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Backend question update failed, fallback to mock successful update:', err.message);
        const stored = localStorage.getItem('mockQuestions');
        if (stored) {
          const list = JSON.parse(stored);
          const updated = list.map(q => {
            if (q.dbId === parseInt(id) || q.id === id) {
              return {
                ...q,
                difficulty: formData.doKho,
                content: formData.noiDung,
                outline: formData.outline
              };
            }
            return q;
          });
          localStorage.setItem('mockQuestions', JSON.stringify(updated));
        }
        alert('Câu hỏi đã được cập nhật thành công (Chế độ giả lập)!');
        navigate('/ngan-hang-cau-hoi');
      });
  };

  if (loading) return <Container className="py-5 text-center"><p>Đang tải...</p></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/ngan-hang-cau-hoi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">CHỈNH SỬA CÂU HỎI</h2>
        <p className="text-muted small">Mã câu hỏi: {id}</p>
      </div>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h4 className="fw-bold mb-0">BM1</h4>
          <h4 className="fw-bold mb-0">CÂU HỎI TỰ LUẬN</h4>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Môn học</Form.Label>
            <Form.Select value={formData.monHoc} onChange={(e) => handleInputChange('monHoc', e.target.value)}>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Độ khó</Form.Label>
            <Form.Select value={formData.doKho} onChange={(e) => handleInputChange('doKho', e.target.value)}>
              <option value="Dễ">Dễ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Khó">Khó</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Nội dung câu hỏi</Form.Label>
            <Form.Control as="textarea" rows={5} value={formData.noiDung} onChange={(e) => handleInputChange('noiDung', e.target.value)} />
          </Form.Group>

          <Alert variant="info" className="mb-4 py-2 small border-0">
            📝 Học sinh sẽ trả lời bằng văn bản và giảng viên sẽ chấm điểm dựa trên Outline.
          </Alert>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold small">Outline / Hướng dẫn chấm điểm</Form.Label>
            <Form.Control as="textarea" rows={5} value={formData.outline} onChange={(e) => handleInputChange('outline', e.target.value)} />
          </Form.Group>

          <div className="d-flex gap-3 pt-3 border-top">
            <Button variant="primary" type="submit" className="fw-bold px-4">Cập nhật câu hỏi</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/ngan-hang-cau-hoi')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ChinhSuaCauHoi;
