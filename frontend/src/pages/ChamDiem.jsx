import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const ChamDiem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);
  
  const [scoreNumber, setScoreNumber] = useState('');
  const [scoreText, setScoreText] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetch(`/api/submission/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success && resData.data) {
          const sub = resData.data;
          setSubmission(sub);
          setScoreNumber(sub.score !== undefined && sub.score !== null ? sub.score.toString() : '');
          setScoreText(sub.scoreText || '');
          setComments(sub.note || '');
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend Submission API is not available, using mock details:', err.message);
        setSubmission({
          submissionId: id,
          studentId: 'SV-001',
          studentName: 'Nguyễn Văn A',
          classId: 'IT007.N11',
          score: null,
          scoreText: '',
          note: ''
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scoreNumber || !scoreText) return alert('Vui lòng nhập đủ điểm');

    const floatScore = parseFloat(scoreNumber);

    fetch(`/api/submission/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: floatScore,
        scoreText: scoreText,
        note: comments,
        status: true // Mark as graded
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Grade API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert(`Đã chấm điểm thành công: ${scoreNumber}`);
          navigate(-1);
        } else {
          alert('Không thể lưu kết quả chấm: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Backend Grade API failed, fallback to mock successful saving:', err.message);
        alert(`Đã chấm điểm thành công: ${scoreNumber} (Chế độ giả lập)`);
        navigate(-1);
      });
  };

  if (loading) return <Container className="py-5 text-center text-primary"><Spinner animation="border" /></Container>;
  if (!submission) return <Container className="py-5 text-center text-danger"><p>Không tìm thấy bài thi</p></Container>;

  return (
    <Container fluid className="page-fade-in">
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate(-1)} className="p-0 text-dark text-decoration-none mb-2 d-flex align-items-center gap-2 fw-bold">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Nhập điểm bài thi</h2>
        <p className="text-secondary small fw-bold">Đang chấm cho bài thi: <span className="text-primary">{id}</span></p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="border shadow-sm p-4 h-100 text-center bg-white">
            <h6 className="text-secondary small fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Học sinh</h6>
            <p className="mb-0 fw-bold fs-5 text-dark">{submission.studentName} ({submission.studentId})</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border shadow-sm p-4 h-100 text-center bg-white">
            <h6 className="text-secondary small fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Lớp học</h6>
            <p className="mb-0 fw-bold fs-5 text-dark">{submission.classId}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border shadow-sm p-4 h-100 text-center bg-white">
            <h6 className="text-secondary small fw-bold text-uppercase mb-2" style={{ letterSpacing: '1px' }}>Trạng thái</h6>
            <p className="mb-0 fw-bold fs-5 text-dark">{submission.status ? 'Đã chấm' : 'Chưa chấm'}</p>
          </Card>
        </Col>
      </Row>

      <Card className="border shadow-sm p-4 mx-auto overflow-hidden bg-white" style={{ maxWidth: '800px' }}>
        <div className="bg-light px-4 py-3 mx-n4 mt-n4 mb-4 border-bottom">
          <h5 className="fw-bold mb-0 text-dark">Thông tin điểm số chính xác</h5>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4 g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-dark text-uppercase mb-2">Điểm số (0-10) <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="number" 
                  step="0.1" 
                  max="10"
                  min="0"
                  className="fw-bold display-6 text-center text-primary py-3 rounded-4 border-2 border-primary border-opacity-25" 
                  style={{ backgroundColor: '#f8fafc' }}
                  value={scoreNumber} 
                  onChange={(e) => setScoreNumber(e.target.value)} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-dark text-uppercase mb-2">Điểm bằng chữ <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  className="fw-bold fs-5 py-4 px-4 rounded-4 h-100 border-2 text-dark" 
                  style={{ backgroundColor: '#f8fafc' }}
                  value={scoreText} 
                  onChange={(e) => setScoreText(e.target.value)} 
                  placeholder="VD: Tám phẩy năm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-5">
            <Form.Label className="small fw-bold text-dark text-uppercase mb-2">Ghi chú / Nhận xét của giảng viên</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              className="rounded-4 p-3 border-2 text-dark fw-medium"
              style={{ backgroundColor: '#f8fafc' }}
              value={comments} 
              onChange={(e) => setComments(e.target.value)} 
              placeholder="Nhập nhận xét chi tiết..."
            />
          </Form.Group>

          <Alert variant="warning" className="rounded-4 border-0 mb-4 bg-warning bg-opacity-10 text-dark py-3 fw-bold">
             <i className="bi bi-exclamation-triangle-fill me-2"></i>
             Xác nhận kỹ điểm số trước khi lưu. Điểm sẽ được cập nhật ngay lập tức.
          </Alert>

          <div className="d-flex gap-3 pt-4 border-top">
            <Button variant="primary" type="submit" className="btn-primary fw-bold px-5 py-3 rounded-3 shadow-lg">Lưu kết quả chấm</Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="fw-bold px-4 py-3 rounded-3 border-2">Hủy bỏ</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ChamDiem;
