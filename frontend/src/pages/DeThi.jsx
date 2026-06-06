import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card } from 'react-bootstrap';
import examApi from '../api/examApi';
import { mapExamList } from '../models/exam';
import {Dropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeThi = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
                  <td className="px-4 py-3 fw-bold text-primary">{exam.examCode || exam.examId}</td>
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
