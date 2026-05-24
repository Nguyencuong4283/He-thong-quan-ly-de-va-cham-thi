import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Modal, Table, Badge } from 'react-bootstrap';

const TaoDeThiMoi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 30,
  });

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const allBankQuestions = [
    { id: 'Q-IT007-001', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management', usage: 3 },
    { id: 'Q-IT007-002', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management', usage: 2 },
    { id: 'Q-IT005-001', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model', usage: 5 },
    { id: 'Q-IT005-002', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP', usage: 4 },
    { id: 'Q-SS006-001', subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp', usage: 6 },
  ];

  const subjects = Array.from(new Set(allBankQuestions.map(q => q.subject)));
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const filteredBankQuestions = allBankQuestions.filter(q => {
    const matchesDifficulty = filterDifficulty === '' || q.difficulty === filterDifficulty;
    const matchesSubject = filterSubject === '' || q.subject === filterSubject;
    const notSelected = !selectedQuestions.some(sq => sq.id === q.id);
    return matchesDifficulty && matchesSubject && notSelected;
  });

  const addQuestion = (q) => {
    if (selectedQuestions.length < 5) {
      setSelectedQuestions([...selectedQuestions, { ...q, orderIndex: selectedQuestions.length + 1 }]);
      setShowQuestionBank(false);
    }
  };

  const removeQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id).map((q, i) => ({ ...q, orderIndex: i + 1 })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedQuestions.length === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi');
      return;
    }
    alert('Đề thi đã được tạo thành công!');
    navigate('/de-thi');
  };

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/de-thi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">TẠO ĐỀ THI MỚI</h2>
        <p className="text-muted small">Tạo đề thi theo biểu mẫu BM2</p>
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
                <Form.Label className="fw-bold small">Tên môn thi <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="VD: Hệ điều hành" value={formData.tenMonThi} onChange={(e) => handleInputChange('tenMonThi', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold small">Học kỳ <span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.hocKy} onChange={(e) => handleInputChange('hocKy', e.target.value)}>
                  <option value="">Chọn học kỳ</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold small">Năm học <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="VD: 2025-2026" value={formData.namHoc} onChange={(e) => handleInputChange('namHoc', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold small">Thời lượng: {formData.thoiLuong} phút</Form.Label>
            <Form.Range min="30" max="180" step="10" value={formData.thoiLuong} onChange={(e) => handleInputChange('thoiLuong', parseInt(e.target.value))} />
            <Form.Text className="text-muted small">QĐ2: Từ 30 đến 180 phút</Form.Text>
          </Form.Group>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Câu hỏi (Tối đa 5 câu)</h5>
              <Button variant="success" size="sm" onClick={() => setShowQuestionBank(true)} disabled={selectedQuestions.length >= 5}>
                <i className="bi bi-plus-lg"></i> Thêm câu hỏi
              </Button>
            </div>

            {selectedQuestions.length === 0 ? (
              <div className="text-center py-5 border rounded-3 bg-light text-muted">
                <i className="bi bi-file-earmark-plus fs-1"></i>
                <p className="mt-2">Chưa có câu hỏi nào được chọn</p>
              </div>
            ) : (
              <div className="list-group list-group-flush border rounded-3">
                {selectedQuestions.map((q) => (
                  <div key={q.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div>
                      <span className="fw-bold me-2">Câu {q.orderIndex}:</span>
                      <span className="text-primary small me-3">{q.id}</span>
                      <Badge bg={q.difficulty === 'Dễ' ? 'success' : q.difficulty === 'Khó' ? 'danger' : 'warning'} text={q.difficulty === 'Trung bình' ? 'dark' : 'white'} className="rounded-pill px-2">
                        {q.difficulty}
                      </Badge>
                      <p className="mb-0 text-muted x-small mt-1">{q.subject} | {q.topic}</p>
                    </div>
                    <Button variant="link" className="text-danger p-0" onClick={() => removeQuestion(q.id)}>
                      <i className="bi bi-trash fs-5"></i>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-top d-flex gap-3">
            <Button variant="primary" type="submit" className="fw-bold px-4">Tạo đề thi</Button>
            <Button variant="outline-secondary" onClick={() => navigate('/de-thi')} className="px-4">Hủy</Button>
          </div>
        </Form>
      </Card>

      <Modal show={showQuestionBank} onHide={() => setShowQuestionBank(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Ngân hàng câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 g-2">
            <Col md={6}>
              <Form.Select size="sm" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                <option value="">Tất cả môn học</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select size="sm" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="">Tất cả độ khó</option>
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="overflow-auto" style={{ maxHeight: '400px' }}>
            {filteredBankQuestions.length === 0 ? (
              <p className="text-center py-4 text-muted">Không còn câu hỏi phù hợp</p>
            ) : (
              <div className="list-group">
                {filteredBankQuestions.map(q => (
                  <button key={q.id} className="list-group-item list-group-item-action p-3" onClick={() => addQuestion(q)}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-primary">{q.id}</span>
                      <Badge bg={q.difficulty === 'Dễ' ? 'success' : q.difficulty === 'Khó' ? 'danger' : 'warning'} text={q.difficulty === 'Trung bình' ? 'dark' : 'white'} className="rounded-pill px-2">
                        {q.difficulty}
                      </Badge>
                    </div>
                    <p className="mb-1 text-dark small fw-medium">{q.subject}</p>
                    <p className="mb-0 text-muted x-small">Chủ đề: {q.topic}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaoDeThiMoi;
