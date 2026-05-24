import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Button, Form, Badge } from 'react-bootstrap';

const NganHangCauHoi = () => {
  const allQuestions = [
    { id: 'Q-IT007-001', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management', usage: 3 },
    { id: 'Q-IT007-002', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management', usage: 2 },
    { id: 'Q-IT005-001', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model', usage: 5 },
    { id: 'Q-IT005-002', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP', usage: 4 },
    { id: 'Q-SS006-001', subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp', usage: 6 },
  ];

  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const subjects = Array.from(new Set(allQuestions.map(q => q.subject)));

  const filteredQuestions = allQuestions.filter(question => {
    const matchesDifficulty = filterDifficulty === '' || question.difficulty === filterDifficulty;
    const matchesSubject = filterSubject === '' || question.subject === filterSubject;
    return matchesDifficulty && matchesSubject;
  });

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Dễ': return <Badge bg="success" className="rounded-pill px-3">Dễ</Badge>;
      case 'Trung bình': return <Badge bg="warning" text="dark" className="rounded-pill px-3">Trung bình</Badge>;
      case 'Khó': return <Badge bg="danger" className="rounded-pill px-3">Khó</Badge>;
      default: return <Badge bg="secondary" className="rounded-pill px-3">{diff}</Badge>;
    }
  };

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Ngân hàng câu hỏi</h2>
          <p className="text-secondary mb-0 small fw-medium">Quản lý kho câu hỏi và các chủ đề đào tạo</p>
        </div>
        <Button as={Link} to="/ngan-hang-cau-hoi/them-moi" variant="primary" className="fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i> Thêm câu hỏi
        </Button>
      </div>

      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-info text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-75 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Tổng số câu hỏi trong kho</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">124</h1>
                <span className="stat-badge-light">Tất cả các độ khó</span>
              </div>
            </div>
            <i className="bi bi-database-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '120px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-warning text-white">
            <div className="card-body p-4 position-relative z-1">
              <h6 className="text-white text-opacity-75 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Môn học đã có câu hỏi</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">15</h1>
                <span className="stat-badge-light">Môn đào tạo</span>
              </div>
            </div>
            <i className="bi bi-journal-bookmark-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '120px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm p-4 mb-4">
        <div className="mb-4">
          <h5 className="fw-bold mb-2">Bộ lọc tìm kiếm</h5>
          <p className="text-secondary small fw-medium">Sử dụng các tùy chọn bên dưới để lọc danh sách câu hỏi</p>
        </div>
        <Row className="g-3 align-items-center">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="small fw-bold text-secondary">Môn học</Form.Label>
              <Form.Select className="rounded-3" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                <option value="">Tất cả môn học</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label className="small fw-bold text-secondary">Độ khó</Form.Label>
              <Form.Select className="rounded-3" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="">Tất cả độ khó</option>
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            { (filterSubject || filterDifficulty) && (
              <Button variant="outline-secondary" className="rounded-3 border-0 fw-bold" onClick={() => { setFilterSubject(''); setFilterDifficulty(''); }}>
                <i className="bi bi-x-circle me-2"></i> Xóa bộ lọc
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách câu hỏi</h5>
          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">{filteredQuestions.length} kết quả</span>
        </div>
        <Table responsive hover className="mb-0">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-3 text-muted small border-0">Mã Câu hỏi</th>
              <th className="px-4 py-3 text-muted small border-0">Môn học</th>
              <th className="px-4 py-3 text-muted small border-0">Độ khó</th>
              <th className="px-4 py-3 text-muted small border-0 text-end">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-5 text-muted italic">
                  <i className="bi bi-search fs-2 d-block mb-2 opacity-25"></i>
                  Không tìm thấy câu hỏi nào phù hợp với bộ lọc
                </td>
              </tr>
            ) : (
              filteredQuestions.map((q) => (
                <tr key={q.id} className="align-middle border-bottom">
                  <td className="px-4 py-3 fw-bold text-primary">{q.id}</td>
                  <td className="px-4 py-3 text-dark">{q.subject}</td>
                  <td className="px-4 py-3">{getDifficultyBadge(q.difficulty)}</td>
                  <td className="px-4 py-3 text-end">
                    <Button as={Link} to={`/ngan-hang-cau-hoi/chinh-sua/${q.id}`} variant="light" size="sm" className="border-0 rounded-3 text-primary p-2">
                      <i className="bi bi-pencil-square fs-5"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      <style>{`
        .qbank-stat-card {
          transition: all 0.3s ease;
          border-radius: 20px !important;
        }
        .stat-badge-light {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
        }
        .display-4 {
          font-size: 3.5rem;
          line-height: 1;
        }
      `}</style>
    </Container>
  );
};

export default NganHangCauHoi;
