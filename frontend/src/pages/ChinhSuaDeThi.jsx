import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Badge, Modal, Spinner } from 'react-bootstrap';
import { fetchWithTimeout } from '../utils/api';

const ChinhSuaDeThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    examCode: '',
    tenMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 90,
  });

  const [questions, setQuestions] = useState([]);
  const [allBankQuestions, setAllBankQuestions] = useState([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  useEffect(() => {
    // 1. Fetch exam detail
    fetchWithTimeout(`/api/exam/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success && resData.data) {
          const detail = resData.data;
          setFormData({
            examCode: detail.examSummary?.examCode || '',
            tenMonThi: detail.examSummary?.subjectName || '',
            hocKy: detail.examSummary?.semester || '',
            namHoc: detail.examSummary?.year?.toString() || '',
            thoiLuong: detail.examSummary?.duration || 90
          });
          const mappedQ = (detail.questions || []).map((q, idx) => ({
            id: `Q-${q.questionId}`,
            dbId: q.questionId,
            content: q.content,
            difficulty: q.difficulty,
            subject: q.subjectName,
            topic: '-',
            orderIndex: idx + 1
          }));
          setQuestions(mappedQ);
        }
      })
      .catch(err => {
        console.warn('Backend exam detail fetch failed in ChinhSuaDeThi, using fallback:', err.message);
        // Fallback mock details
        const storedExams = localStorage.getItem('mockExams');
        const listExams = storedExams ? JSON.parse(storedExams) : [];
        const found = listExams.find(e => e.dbId === parseInt(id) || e.id === id);
        setFormData({
          examCode: found?.id || 'EX-MOCK',
          tenMonThi: found?.subject || 'Hệ điều hành',
          hocKy: found?.semester?.split(' ')[0] || 'Fall 2025',
          namHoc: found?.semester?.split(' ')[1] || '2025-2026',
          thoiLuong: found ? parseInt(found.duration) : 90
        });
        setQuestions([
          { id: 'Q-IT007-001', dbId: 1, content: 'Giải thích khái niệm về process và thread trong hệ điều hành.', difficulty: 'Trung bình', subject: found?.subject || 'Hệ điều hành', topic: 'Process', orderIndex: 1 },
          { id: 'Q-IT007-002', dbId: 2, content: 'Trình bày các thuật toán lập lịch CPU phổ biến.', difficulty: 'Khó', subject: found?.subject || 'Hệ điều hành', topic: 'Scheduling', orderIndex: 2 }
        ]);
      });

    // 2. Fetch question bank
    const fallbackQuestions = [
      { id: 'Q-IT007-001', dbId: 1, subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management' },
      { id: 'Q-IT007-002', dbId: 2, subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management' },
      { id: 'Q-IT005-001', dbId: 3, subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model' },
      { id: 'Q-IT005-002', dbId: 4, subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP' },
      { id: 'Q-SS006-001', dbId: 5, subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp' },
    ];

    fetchWithTimeout('/api/question')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          const mapped = resData.data.map(q => ({
            id: `Q-${q.questionId}`,
            dbId: q.questionId,
            subject: q.subjectName || 'Chưa xác định',
            difficulty: q.difficulty || 'Trung bình',
            type: 'Tự luận',
            topic: '-'
          }));
          setAllBankQuestions(mapped.length > 0 ? mapped : fallbackQuestions);
        } else {
          setAllBankQuestions(fallbackQuestions);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Failed to fetch question bank in ChinhSuaDeThi, using mock:', err.message);
        const stored = localStorage.getItem('mockQuestions');
        const listQ = stored ? JSON.parse(stored) : fallbackQuestions;
        setAllBankQuestions(listQ);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const filteredBankQuestions = allBankQuestions.filter(q => {
    // Ràng buộc môn học: Chỉ hiển thị câu hỏi của môn đang thi
    const matchesSubject = q.subject === formData.tenMonThi;
    if (!matchesSubject) return false;

    const matchesDifficulty = filterDifficulty === '' || q.difficulty === filterDifficulty;
    const notSelected = !questions.some(sq => sq.dbId === q.dbId);
    return matchesDifficulty && notSelected;
  });

  const addQuestion = (q) => {
    if (questions.length < 5) {
      setQuestions([...questions, { ...q, orderIndex: questions.length + 1 }]);
      setShowQuestionBank(false);
    }
  };

  const removeQuestion = (dbId) => {
    setQuestions(questions.filter(q => q.dbId !== dbId).map((q, i) => ({ ...q, orderIndex: i + 1 })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi');
      return;
    }

    fetchWithTimeout(`/api/exam/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        duration: formData.thoiLuong,
        questionsId: questions.map(q => q.dbId)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Update exam error');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert('Đề thi đã được cập nhật thành công!');
          navigate('/de-thi');
        } else {
          alert('Không thể cập nhật đề thi: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Backend Update Exam failed, fallback to mock successful update:', err.message);

        // Update in mock localStorage database
        const stored = localStorage.getItem('mockExams');
        if (stored) {
          const list = JSON.parse(stored);
          const updated = list.map(exam => {
            if (exam.dbId === parseInt(id) || exam.id === id) {
              return {
                ...exam,
                duration: `${formData.thoiLuong} phút`
              };
            }
            return exam;
          });
          localStorage.setItem('mockExams', JSON.stringify(updated));
        }

        alert('Đề thi đã được cập nhật thành công (Chế độ giả lập)!');
        navigate('/de-thi');
      });
  };

  const subjectsList = Array.from(new Set(allBankQuestions.map(q => q.subject)));

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" variant="primary" /><p className="mt-2 text-muted">Đang tải...</p></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/de-thi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold text-dark mb-1">CHỈNH SỬA ĐỀ THI</h2>
            <p className="text-muted small">Mã đề thi: {formData.examCode}</p>
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
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small text-secondary">Mã đề thi</Form.Label>
                <Form.Control type="text" value={formData.examCode} disabled />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small text-secondary">Tên môn thi</Form.Label>
                <Form.Control type="text" value={formData.tenMonThi} disabled />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small text-secondary">Học kỳ</Form.Label>
                <Form.Control type="text" value={formData.hocKy} disabled />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small text-secondary">Năm học</Form.Label>
                <Form.Control type="text" value={formData.namHoc} disabled />
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
              <h5 className="fw-bold mb-0">Câu hỏi trong đề (Tối đa 5 câu)</h5>
              <Button variant="success" size="sm" onClick={() => setShowQuestionBank(true)} disabled={questions.length >= 5}>
                <i className="bi bi-plus-lg"></i> Thêm câu hỏi
              </Button>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-5 border rounded-3 bg-light text-muted">
                <i className="bi bi-file-earmark-plus fs-1"></i>
                <p className="mt-2">Chưa có câu hỏi nào được chọn</p>
              </div>
            ) : (
              <div className="list-group list-group-flush border rounded-3">
                {questions.map((q) => (
                  <div key={q.dbId} className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="flex-grow-1 me-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="fw-bold">Câu {q.orderIndex}:</span>
                        <span className="text-primary small fw-semibold">{q.id}</span>
                        <Badge bg={q.difficulty === 'Dễ' ? 'success' : q.difficulty === 'Khó' ? 'danger' : 'warning'} className="rounded-pill px-2">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="mb-0 text-dark fw-medium" style={{ whiteSpace: 'pre-wrap' }}>{q.content}</p>
                    </div>
                    <Button variant="link" className="text-danger p-0" onClick={() => removeQuestion(q.dbId)}>
                      <i className="bi bi-trash fs-5"></i>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-top d-flex gap-3">
            <Button variant="primary" type="submit" className="fw-bold px-4">Cập nhật đề thi</Button>
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
            <Col md={12}>
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
              <p className="text-center py-4 text-muted">Không còn câu hỏi phù hợp hoặc đã chọn hết</p>
            ) : (
              <div className="list-group">
                {filteredBankQuestions.map(q => (
                  <button key={q.dbId} className="list-group-item list-group-item-action p-3" onClick={() => addQuestion(q)}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-primary">{q.id}</span>
                      <Badge bg={q.difficulty === 'Dễ' ? 'success' : q.difficulty === 'Khó' ? 'danger' : 'warning'} className="rounded-pill px-2">
                        {q.difficulty}
                      </Badge>
                    </div>
                    <p className="mb-1 text-dark small fw-semibold" style={{ whiteSpace: 'pre-wrap' }}>{q.content}</p>
                    <p className="mb-0 text-muted x-small">Chủ đề: {q.topic} | Môn: {q.subject}</p>
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

export default ChinhSuaDeThi;
