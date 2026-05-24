import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';

const ChinhSuaDeThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    tenMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 90,
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Mock load data
    setTimeout(() => {
      setFormData({
        tenMonThi: 'Hệ điều hành',
        hocKy: 'Fall 2025',
        namHoc: '2025-2026',
        thoiLuong: 90,
      });
      setQuestions([
        { id: 1, content: 'Giải thích khái niệm về process và thread trong hệ điều hành.' },
        { id: 2, content: 'Trình bày các thuật toán lập lịch CPU phổ biến.' },
      ]);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleQuestionChange = (id, content) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, content } : q));
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { id: Date.now(), content: '' }]);
    }
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đề thi đã được cập nhật!');
    navigate('/de-thi');
  };

  if (loading) return <Container className="py-5 text-center"><p>Đang tải...</p></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/de-thi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold text-dark mb-1">CHỈNH SỬA ĐỀ THI</h2>
            <p className="text-muted small">Mã đề thi: {id}</p>
          </div>
          <Badge bg="info" className="px-3 py-2">Bản nháp</Badge>
        </div>
      </div>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h4 className="fw-bold mb-0">BM2</h4>
          <h4 className="fw-bold mb-0">ĐỀ THI</h4>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold small">Tên môn thi</Form.Label>
                <Form.Control type="text" value={formData.tenMonThi} onChange={(e) => handleInputChange('tenMonThi', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold small">Học kỳ</Form.Label>
                <Form.Select value={formData.hocKy} onChange={(e) => handleInputChange('hocKy', e.target.value)}>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold small">Năm học</Form.Label>
                <Form.Control type="text" value={formData.namHoc} onChange={(e) => handleInputChange('namHoc', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold small">Thời lượng: {formData.thoiLuong} phút</Form.Label>
            <Form.Range min="30" max="180" step="10" value={formData.thoiLuong} onChange={(e) => handleInputChange('thoiLuong', parseInt(e.target.value))} />
          </Form.Group>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Câu hỏi</h5>
              <Button variant="success" size="sm" onClick={addQuestion} disabled={questions.length >= 5}>
                <i className="bi bi-plus-lg"></i> Thêm câu hỏi
              </Button>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="p-3 border rounded-3 mb-3 bg-white shadow-xs">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold small">Câu {index + 1}:</span>
                    {questions.length > 1 && (
                      <Button variant="link" className="text-danger p-0" onClick={() => removeQuestion(q.id)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                  </div>
                  <Form.Control as="textarea" rows={3} value={q.content} onChange={(e) => handleQuestionChange(q.id, e.target.value)} placeholder="Nhập nội dung câu hỏi..." />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-top d-flex gap-3">
            <Button variant="primary" type="submit" className="fw-bold px-4">Cập nhật đề thi</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/de-thi')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ChinhSuaDeThi;
