import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Badge, Modal } from 'react-bootstrap';
import questionApi from '../api/questionApi';
import teacherApi from '../api/teacherApi';
import examApi from '../api/examApi';
import { mapExamDetailItem, buildExamUpdateRequest } from '../models/exam';

const ChinhSuaDeThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    examCode: '',
    maMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 90,
  });

  const [subjectList, setSubjectList] = useState([]);
  const [loadedSubjectId, setLoadedSubjectId] = useState('');
  const [loadedSubjectName, setLoadedSubjectName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [bankQuestions, setBankQuestions] = useState([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await examApi.getExamById(id);
        if (res && res.success) {
          const mapped = mapExamDetailItem(res.data || {});
          const summary = mapped.examSummary || {};
          setFormData({
            examCode: summary.examCode || '',
            maMonThi: summary.subjectId ?? summary.subject_id ?? '',
            hocKy: summary.semester || '',
            namHoc: summary.year || '',
            thoiLuong: summary.duration || 90,
          });
          setLoadedSubjectId(summary.subjectId ?? summary.subject_id ?? '');
          setLoadedSubjectName(summary.subjectName || '');
          setQuestions((mapped.questions || []).map((q) => ({ id: q.questionId, content: q.content, answer: q.answer || '', difficulty: q.difficulty })));
        } else {
          setFormData({ examCode: '', maMonThi: '', hocKy: '', namHoc: '', thoiLuong: 90 });
          setQuestions([]);
        }
      } catch (err) {
        console.error('Load exam error', err);
        setFormData({ examCode: '', maMonThi: '', hocKy: '', namHoc: '', thoiLuong: 90 });
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const res = await teacherApi.getSubjects();
        if (res && res.success) {
          const subjects = res.data || [];
          setSubjectList(subjects);
          if (loadedSubjectId) {
            setFormData((prev) => ({ ...prev, maMonThi: loadedSubjectId }));
          } else if (loadedSubjectName) {
            const match = subjects.find((s) => (s.subjectName || s.name || s.label) === loadedSubjectName);
            if (match) setFormData((prev) => ({ ...prev, maMonThi: match.subjectId || match.id }));
          }
        } else {
          setSubjectList([]);
        }
      } catch (err) {
        console.error('Load subjects error', err);
        setSubjectList([]);
      }
    };

    const loadBank = async () => {
      try {
        const res = await questionApi.getAllQuestions();
        if (res && res.success) setBankQuestions(res.data || []);
        else setBankQuestions([]);
      } catch (err) {
        console.error('Load bank questions', err);
        setBankQuestions([]);
      }
    };

    loadSubjects();
    loadBank();
  }, [loadedSubjectName]);

  const addQuestion = () => {
    // Không cho phép tạo câu hỏi mới tay ở đây. Người dùng phải chọn từ ngân hàng.
  };

  const addQuestionFromBank = async (q) => {
    if (questions.length >= 5) return;
    try {
      const res = await questionApi.getQuestionById(q.questionId || q.id);
      const detail = res && res.success ? res.data : null;
      const newQ = { id: q.questionId || q.id, content: detail?.content || '', answer: detail?.answer || '' };
      setQuestions([...questions, newQ]);
      setShowQuestionBank(false);
    } catch (err) {
      console.error('Add from bank error', err);
    }
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.maMonThi) {
      alert('Vui lòng chọn môn thi');
      return;
    }
    const payload = buildExamUpdateRequest({
      duration: formData.thoiLuong,
      questions: questions.map((q) => q.id),
    });

    (async () => {
      try {
        const res = await examApi.updateExam(id, payload);
        if (res && res.success) {
          alert('Đề thi đã được cập nhật!');
          navigate('/de-thi');
        } else {
          alert(res.message || 'Cập nhật thất bại');
        }
      } catch (err) {
        console.error('Update exam error', err);
        alert('Lỗi khi cập nhật đề thi');
      }
    })();
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
                <Form.Label className="fw-bold small">Môn thi</Form.Label>
                <Form.Select value={formData.maMonThi} onChange={(e) => handleInputChange('maMonThi', e.target.value)}>
                  <option value="">Chọn môn thi</option>
                  {subjectList.map((s) => (
                    <option key={s.subjectId || s.id} value={s.subjectId || s.id}>
                      {s.subjectName || s.name || s.label}
                    </option>
                  ))}
                </Form.Select>
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
              <div>
                <h5 className="fw-bold mb-0">Câu hỏi</h5>
                <Form.Text className="text-muted small">Chỉ được chọn/xóa câu hỏi. Không cho phép sửa nội dung câu hỏi trực tiếp.</Form.Text>
              </div>
              <Button variant="outline-primary" size="sm" onClick={() => setShowQuestionBank(true)} disabled={questions.length >= 5}>
                <i className="bi bi-list-ul"></i> Chọn từ ngân hàng
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
                  <Form.Control as="textarea" rows={3} value={q.content} readOnly />
                  <Form.Text className="text-muted small">Nội dung câu hỏi chỉ để tham khảo, không thể chỉnh sửa tại đây.</Form.Text>
                  <div className="mt-2 p-2 bg-light rounded">
                    <strong className="small">Hướng dẫn chấm:</strong>
                    <p className="mb-0 text-muted small">{q.answer && q.answer.length ? q.answer : 'Chưa có hướng dẫn chấm'}</p>
                  </div>
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
      <Modal show={showQuestionBank} onHide={() => setShowQuestionBank(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Ngân hàng câu hỏi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3 g-2">
            <Col md={6}>
              <Form.Select size="sm" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                <option value="">Tất cả môn học</option>
                {Array.from(new Set(bankQuestions.map(b => b.subjectName || b.subject))).map(s => <option key={s} value={s}>{s}</option>)}
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
            {bankQuestions.filter(b => (filterSubject === '' || b.subjectName === filterSubject) && (filterDifficulty === '' || b.difficulty === filterDifficulty) && !questions.some(q => q.id === (b.questionId || b.id))).length === 0 ? (
              <p className="text-center py-4 text-muted">Không còn câu hỏi phù hợp</p>
            ) : (
              <div className="list-group">
                {bankQuestions.filter(b => (filterSubject === '' || b.subjectName === filterSubject) && (filterDifficulty === '' || b.difficulty === filterDifficulty) && !questions.some(q => q.id === (b.questionId || b.id))).map(b => (
                  <button key={b.questionId || b.id} className="list-group-item list-group-item-action p-3" onClick={() => addQuestionFromBank(b)}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-primary">{b.questionId || b.id}</span>
                      <Badge bg={b.difficulty === 'Dễ' ? 'success' : b.difficulty === 'Khó' ? 'danger' : 'warning'} text={b.difficulty === 'Trung bình' ? 'dark' : 'white'} className="rounded-pill px-2">
                        {b.difficulty}
                      </Badge>
                    </div>
                    <p className="mb-1 text-dark small fw-medium">{b.subjectName}</p>
                    <p className="mb-0 text-muted x-small">{b.content ? `${b.content.slice(0, 120)}${b.content.length > 120 ? '...' : ''}` : ''}</p>
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
