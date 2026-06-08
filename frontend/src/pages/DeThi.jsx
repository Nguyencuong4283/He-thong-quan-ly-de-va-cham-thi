import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card, Modal, Spinner } from 'react-bootstrap';
import examApi from '../api/examApi';
import { mapExamList } from '../models/exam';
import {Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeThi = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Preview Modal States
  const [showPreview, setShowPreview] = useState(false);
  const [previewExam, setPreviewExam] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await examApi.getExams();
        if (res && res.success) {
          setExams(mapExamList(res.data || []));
        } else {
          setExams([]);
        }
      } catch (err) {
        console.error('Load exams error', err);
        setExams([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleShowPreview = async (examId) => {
    setShowPreview(true);
    setPreviewLoading(true);
    try {
      const res = await examApi.getExamById(examId);
      if (res && res.success) {
        setPreviewExam(res.data);
      } else {
        setPreviewExam(null);
      }
    } catch (err) {
      console.error('Fetch exam details error', err);
      setPreviewExam(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handlePrint = (examId, type) => {
    navigate(`/print-exam/${examId}?type=${type}`);
  };

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Quản lý đề thi</h2>
          <p className="text-secondary small mb-0 fw-bold">Quản lý và biên soạn các bộ đề thi trực tuyến</p>
        </div>
        <Button as={Link} to="/de-thi/tao-moi" className="btn-primary d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i> Tạo đề thi mới
        </Button>
      </div>
      <Card className="border shadow-sm overflow-hidden">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Mã đề thi</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Môn học</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Học kì & Năm học</th>
              <th className="px-4 py-3 border-0 text-dark fw-bold">Thời gian</th>
              <th className="px-4 py-3 border-0 text-end text-dark fw-bold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">Đang tải danh sách đề thi...</td>
              </tr>
            ) : exams.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">Chưa có đề thi nào</td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam.examId} className="align-middle">
                  <td className="px-4 py-3">
                    <span 
                      className="clickable-code text-primary fw-bold"
                      onClick={() => handleShowPreview(exam.examId)}
                    >
                      {exam.examCode || exam.examId}
                    </span>
                  </td>
                  <td className="px-4 py-3 fw-bold" style={{ color: 'var(--bs-body-color)' }}>{exam.subjectName}</td>
                  <td className="px-4 py-3 text-secondary fw-medium">{exam.semester} | {exam.year}</td>
                  <td className="px-4 py-3 text-secondary fw-medium">{exam.duration ? `${exam.duration} phút` : '-'}</td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" className="d-flex align-items-center gap-2">
                          <i className="bi bi-printer-fill"></i> In tài liệu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handlePrint(exam.examId, "exam")}>In đề thi</Dropdown.Item>
                          <Dropdown.Item onClick={() => handlePrint(exam.examId, "answer")}>In hướng dẫn chấm</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Button as={Link} to={`/de-thi/chinh-sua/${exam.examId || exam.examCode}`} variant="light" size="sm" className="border-0 rounded-3 text-primary p-2 shadow-xs" title="Chỉnh sửa">
                        <i className="bi bi-pencil-square fs-5"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Xem trước đề thi */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-dark">Xem trước đề thi</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {previewLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" className="mb-2" />
              <div className="text-muted fw-semibold">Đang tải chi tiết đề thi...</div>
            </div>
          ) : previewExam ? (
            <div>
              {/* Thông tin chung */}
              <div className="mb-4 p-3 bg-light rounded-3 border">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="small text-secondary fw-semibold">Môn học</div>
                    <div className="fw-bold text-dark">{previewExam.examSummary?.subjectName || '-'}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="small text-secondary fw-semibold">Mã đề thi</div>
                    <div className="fw-bold text-dark">{previewExam.examSummary?.examCode || previewExam.examSummary?.examId || '-'}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="small text-secondary fw-semibold">Học kỳ & Năm học</div>
                    <div className="fw-bold text-dark">{previewExam.examSummary?.semester || '-'} | {previewExam.examSummary?.year || '-'}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="small text-secondary fw-semibold">Thời gian làm bài</div>
                    <div className="fw-bold text-dark">{previewExam.examSummary?.duration ? `${previewExam.examSummary?.duration} phút` : '-'}</div>
                  </div>
                </div>
              </div>

              {/* Danh sách câu hỏi */}
              <h5 className="fw-bold text-dark mb-3">Nội dung câu hỏi ({previewExam.questions?.length || 0})</h5>
              {(!previewExam.questions || previewExam.questions.length === 0) ? (
                <div className="text-center py-4 text-muted border rounded-3 bg-white">
                  Đề thi này chưa có câu hỏi nào.
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {previewExam.questions.map((q, idx) => (
                    <div key={q.questionId} className="p-3 border rounded-3 bg-white shadow-xs">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold text-primary">Câu {idx + 1} (Mã: {q.questionId})</span>
                        <span className={`badge rounded-pill px-2.5 py-1 fw-bold ${
                          q.difficulty === 'Dễ' ? 'bg-success text-white' : 
                          q.difficulty === 'Khó' ? 'bg-danger text-white' : 'bg-warning text-dark'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <div className="text-dark fw-medium mb-3" style={{ whiteSpace: 'pre-line' }}>{q.content}</div>
                      {q.answer && (
                        <div className="p-3 bg-light rounded-3 border-start border-4 border-success">
                          <div className="small text-success fw-bold mb-1">Hướng dẫn chấm / Đáp án:</div>
                          <div className="text-secondary small fw-medium" style={{ whiteSpace: 'pre-line' }}>{q.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-danger">Không thể tải thông tin đề thi. Vui lòng thử lại.</div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" className="fw-bold px-4 rounded-3" onClick={() => setShowPreview(false)}>Đóng</Button>
          {previewExam?.examSummary && (
            <Button 
              as={Link} 
              to={`/de-thi/chinh-sua/${previewExam.examSummary.examId || previewExam.examSummary.examCode}`} 
              variant="primary" 
              className="fw-bold px-4 rounded-3"
            >
              Chỉnh sửa đề
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <style>{`
        .card {
          overflow: visible !important;
        }
        .table-responsive {
          overflow: visible !important;
        }
        .table thead th {
          background-color: #f1f5f9 !important;
          color: #000000 !important;
          font-weight: 800 !important;
          border-bottom: 2px solid #cbd5e1 !important;
        }
        [data-bs-theme='dark'] .table thead th {
          background-color: var(--bs-tertiary-bg) !important;
          color: var(--bs-secondary-color) !important;
          border-bottom: 2px solid var(--bs-border-color) !important;
        }
        [data-bs-theme='dark'] .btn-light {
          background-color: rgba(255, 255, 255, 0.05);
          color: #60a5fa !important;
        }
        [data-bs-theme='dark'] .btn-light:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .clickable-code {
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .clickable-code:hover {
          text-decoration: underline !important;
          color: #0d6efd !important;
        }
      `}</style>
    </Container>
  );
};

export default DeThi;
