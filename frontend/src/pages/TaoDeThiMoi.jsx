import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Modal, Table, Badge } from 'react-bootstrap';
import { fetchWithTimeout } from '../utils/api';

const TaoDeThiMoi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    examCode: '',
    subjectId: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 60,
  });

  const [subjects, setSubjects] = useState([]);
  const [allBankQuestions, setAllBankQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWithTimeout('/api/teacher/subjects')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          const mapped = resData.data.map(sub => ({
            id: sub.subjectId,
            name: `${sub.subjectId} - ${sub.subjectName}`
          }));
          setSubjects(mapped.length > 0 ? mapped : [
            { id: 'IT007', name: 'IT007 - Hệ điều hành' },
            { id: 'IT005', name: 'IT005 - Mạng máy tính' },
            { id: 'SS006', name: 'SS006 - Pháp luật' },
            { id: 'IT001', name: 'IT001 - Lập trình hướng đối tượng' },
          ]);
        } else {
          setSubjects([
            { id: 'IT007', name: 'IT007 - Hệ điều hành' },
            { id: 'IT005', name: 'IT005 - Mạng máy tính' },
            { id: 'SS006', name: 'SS006 - Pháp luật' },
            { id: 'IT001', name: 'IT001 - Lập trình hướng đối tượng' },
          ]);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch subjects in TaoDeThiMoi, using fallback:', err.message);
        setSubjects([
          { id: 'IT007', name: 'IT007 - Hệ điều hành' },
          { id: 'IT005', name: 'IT005 - Mạng máy tính' },
          { id: 'SS006', name: 'SS006 - Pháp luật' },
          { id: 'IT001', name: 'IT001 - Lập trình hướng đối tượng' },
        ]);
      });

    // 2. Fetch questions
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
      })
      .catch(err => {
        console.warn('Failed to fetch questions in TaoDeThiMoi, using fallback:', err.message);
        setAllBankQuestions(fallbackQuestions);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'subjectId') {
      setSelectedQuestions([]); // Clear selected questions if subject changes
    }
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const filteredBankQuestions = allBankQuestions.filter(q => {
    const examSubject = subjects.find(s => s.id === formData.subjectId);
    if (!examSubject) return false;

    // Ràng buộc môn học: Chỉ hiển thị câu hỏi thuộc môn thi đang chọn
    const matchesSubject = q.subject === examSubject.name.split(' - ')[1] || q.subject === examSubject.id;
    if (!matchesSubject) return false;

    const matchesDifficulty = filterDifficulty === '' || q.difficulty === filterDifficulty;
    const notSelected = !selectedQuestions.some(sq => sq.id === q.id);
    return matchesDifficulty && notSelected;
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
    if (!formData.examCode || !formData.subjectId || !formData.hocKy || !formData.namHoc) {
      setErrors({
        examCode: !formData.examCode ? 'Vui lòng nhập mã đề thi' : '',
        subjectId: !formData.subjectId ? 'Vui lòng chọn môn thi' : '',
        hocKy: !formData.hocKy ? 'Vui lòng chọn học kỳ' : '',
        namHoc: !formData.namHoc ? 'Vui lòng nhập năm học' : ''
      });
      return;
    }

    if (selectedQuestions.length === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi');
      return;
    }

    const cleanYear = parseInt(formData.namHoc.split('-')[0]) || 2025;
    
    // Gửi yêu cầu tạo đề thi
    fetchWithTimeout('/api/exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examCode: formData.examCode,
        semester: formData.hocKy,
        year: cleanYear,
        duration: formData.thoiLuong,
        subjectId: formData.subjectId,
        questionsId: selectedQuestions.map(q => q.dbId)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Create exam error');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert('Đề thi đã được tạo thành công!');
          navigate('/de-thi');
        } else {
          alert('Không thể tạo đề thi: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Backend Create Exam failed, fallback to mock successful creation:', err.message);

        // Save new exam to mock localStorage database
        const defaultExams = [
          { id: 'EX-IT007-2025-01', subject: 'Hệ điều hành', semester: 'Fall 2025', duration: '90 phút' },
          { id: 'EX-IT005-2025-02', subject: 'Nhập môn mạng máy tính', semester: 'Fall 2025', duration: '60 phút' },
          { id: 'EX-SS006-2025-01', subject: 'Pháp luật đại cương', semester: 'Spring 2026', duration: '60 phút' },
        ];

        let stored = localStorage.getItem('mockExams');
        let examsList = stored ? JSON.parse(stored) : defaultExams;

        const matchedSubject = subjects.find(s => s.id === formData.subjectId);
        const subjectName = matchedSubject ? matchedSubject.name.split(' - ')[1] : 'Chưa xác định';

        examsList.push({
          id: formData.examCode,
          subject: subjectName,
          semester: `${formData.hocKy} ${formData.namHoc.split('-')[0]}`,
          duration: `${formData.thoiLuong} phút`
        });

        localStorage.setItem('mockExams', JSON.stringify(examsList));

        alert('Đề thi đã được tạo thành công (Chế độ giả lập)!');
        navigate('/de-thi');
      });
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
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small">Mã đề thi <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="VD: EX-IT007-2025-01" value={formData.examCode} onChange={(e) => handleInputChange('examCode', e.target.value)} isInvalid={!!errors.examCode} />
                <Form.Control.Feedback type="invalid">{errors.examCode}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small">Tên môn thi <span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.subjectId} onChange={(e) => handleInputChange('subjectId', e.target.value)} isInvalid={!!errors.subjectId}>
                  <option value="">Chọn môn thi</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.subjectId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small">Học kỳ <span className="text-danger">*</span></Form.Label>
                <Form.Select value={formData.hocKy} onChange={(e) => handleInputChange('hocKy', e.target.value)} isInvalid={!!errors.hocKy}>
                  <option value="">Chọn học kỳ</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.hocKy}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-bold small">Năm học <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" placeholder="VD: 2025-2026" value={formData.namHoc} onChange={(e) => handleInputChange('namHoc', e.target.value)} isInvalid={!!errors.namHoc} />
                <Form.Control.Feedback type="invalid">{errors.namHoc}</Form.Control.Feedback>
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
              <div className="d-flex align-items-center gap-3">
                {!formData.subjectId && <span className="text-danger small fw-medium">Vui lòng chọn môn thi trước</span>}
                <Button variant="success" size="sm" onClick={() => setShowQuestionBank(true)} disabled={!formData.subjectId || selectedQuestions.length >= 5}>
                  <i className="bi bi-plus-lg"></i> Thêm câu hỏi
                </Button>
              </div>
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
