import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card } from 'react-bootstrap';
import examApi from '../api/examApi';
import { mapExamList } from '../models/exam';

const DeThi = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

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
                  <td className="px-4 py-3 fw-bold text-primary">{exam.examCode || exam.examId}</td>
                  <td className="px-4 py-3 fw-bold" style={{ color: 'var(--bs-body-color)' }}>{exam.subjectName}</td>
                  <td className="px-4 py-3 text-secondary fw-medium">{exam.semester} | {exam.year}</td>
                  <td className="px-4 py-3 text-secondary fw-medium">{exam.duration ? `${exam.duration} phút` : '-'}</td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button variant="light" size="sm" className="border-0 rounded-3 text-primary p-2 shadow-xs" title="Xem chi tiết">
                        <i className="bi bi-eye fs-5"></i>
                      </Button>
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

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Chi tiết đề thi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Đang tải chi tiết đề thi...</p>
            </div>
          ) : selectedExam ? (
            <div>
              <div className="mb-4 p-3 bg-light rounded border">
                <h5 className="fw-bold text-primary mb-3">Thông tin tổng quan</h5>
                <Table borderless size="sm" className="mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-bold" style={{ width: '180px' }}>Mã đề thi:</td>
                      <td className="text-dark">{selectedExam.examSummary?.examCode}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Môn học:</td>
                      <td className="text-dark">{selectedExam.examSummary?.subjectName}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Học kỳ / Năm học:</td>
                      <td className="text-dark">{selectedExam.examSummary?.semester} - {selectedExam.examSummary?.year}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Thời lượng thi:</td>
                      <td className="text-dark">{selectedExam.examSummary?.duration} phút</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <h5 className="fw-bold text-success mb-3">Danh sách câu hỏi ({selectedExam.questions?.length || 0} câu)</h5>
              <div className="list-group">
                {selectedExam.questions && selectedExam.questions.length > 0 ? (
                  selectedExam.questions.map((q, idx) => (
                    <div key={q.questionId} className="list-group-item p-3 mb-2 rounded border bg-white shadow-xs">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-secondary small">Câu {idx + 1} (Mã: Q-{q.questionId})</span>
                        <Badge bg={q.difficulty === 'Dễ' ? 'success' : q.difficulty === 'Khó' ? 'danger' : 'warning'} className="rounded-pill px-2">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="mb-2 text-dark fw-medium" style={{ whiteSpace: 'pre-wrap' }}>{q.content}</p>
                      {q.answer && (
                        <div className="mt-2 p-2 bg-light rounded text-muted small border-start border-3 border-info">
                          <strong className="text-info d-block mb-1">Hướng dẫn chấm điểm:</strong>
                          <div style={{ whiteSpace: 'pre-wrap' }}>{q.answer}</div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center py-3">Không có câu hỏi nào trong đề thi này.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-danger">Không thể tải thông tin đề thi.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedExam && (
            <Button variant="primary" onClick={() => window.print()} className="d-flex align-items-center gap-2">
              <i className="bi bi-printer-fill"></i> In đề thi
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {/* Printable Exam Paper */}
      {selectedExam && (
        <div id="printable-exam-area">
          <table style={{ width: '100%', marginBottom: '30px' }}>
            <tbody>
              <tr>
                <td style={{ width: '55%', textAlign: 'center', verticalAlign: 'top' }}>
                  <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px' }}>ĐẠI HỌC QUỐC GIA TP.HCM</div>
                  <div style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '13px', textDecoration: 'underline' }}>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</div>
                </td>
                <td style={{ width: '45%', textAlign: 'center', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>ĐỀ THI HỌC KỲ</div>
                  <div style={{ fontSize: '12px' }}>Học kỳ: {selectedExam.examSummary?.semester} -- Năm học: {selectedExam.examSummary?.year}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>Mã đề thi: {selectedExam.examSummary?.examCode}</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 5px 0' }}>ĐỀ THI MÔN: {selectedExam.examSummary?.subjectName}</h4>
            <div style={{ fontStyle: 'italic' }}>Thời gian làm bài: {selectedExam.examSummary?.duration} phút (Không kể thời gian phát đề)</div>
          </div>

          <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '30px' }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '65%', borderRight: '1px solid #000', paddingRight: '10px' }}>
                    <strong>Họ và tên thí sinh:</strong> ....................................................................................
                  </td>
                  <td style={{ width: '35%', paddingLeft: '10px' }}>
                    <strong>Mã số học sinh:</strong> .........................
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: '20px', fontWeight: 'bold', borderBottom: '1px double #000', paddingBottom: '5px' }}>
            NỘI DUNG ĐỀ THI:
          </div>

          <div>
            {selectedExam.questions && selectedExam.questions.length > 0 ? (
              selectedExam.questions.map((q, idx) => (
                <div key={q.questionId} className="print-question-item">
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Câu {idx + 1} (Độ khó: {q.difficulty}):
                  </div>
                  <div style={{ paddingLeft: '15px', whiteSpace: 'pre-wrap', marginBottom: '15px' }}>
                    {q.content}
                  </div>
                </div>
              ))
            ) : (
              <p>Không có câu hỏi.</p>
            )}
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}>
            ------ HẾT ------
            <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '5px' }}>Thí sinh không được sử dụng tài liệu. Giám thị không giải thích gì thêm.</div>
          </div>
        </div>
      )}

      <style>{`
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
      `}</style>
    </Container>
  );
};

export default DeThi;
