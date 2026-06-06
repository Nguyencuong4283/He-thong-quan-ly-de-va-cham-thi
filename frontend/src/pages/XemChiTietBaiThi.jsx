import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { submissionApi } from '../api/submissionApi';
import classApi from '../api/classApi';

const XemChiTietBaiThi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const res = await submissionApi.getSubmissionById(id);
        if (res && res.success) {
          const subData = res.data;
          setData(subData);
          
          // Tải thêm thông tin môn học và mã đề từ lớp
          if (subData.classId) {
            const classRes = await classApi.getStudentsByClassId(subData.classId);
            if (classRes && classRes.success) {
              setData(prev => ({
                ...prev,
                subjectName: classRes.data.subjectName,
                examCode: classRes.data.examCode
              }));
            }
          }
        }
      } catch (err) {
        console.error('Fetch submission detail error', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading) return <Container className="py-5 text-center"><p>Đang tải...</p></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button variant="link" onClick={() => navigate(-1)} className="p-0 text-muted text-decoration-none">
            <i className="bi bi-arrow-left"></i> Quay lại
          </Button>
          <Button 
            variant="warning" 
            onClick={() => navigate(`/cham-thi/cham-diem/${data.id}`)}
            className="fw-bold d-flex align-items-center gap-2 shadow-sm text-dark px-3 py-1.5"
            size="sm"
          >
            <i className="bi bi-pencil-square"></i> Sửa điểm bài thi
          </Button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold text-dark mb-1">CHI TIẾT ĐIỂM BÀI THI</h2>
            <p className="text-muted small">Mã bài nộp: {id} | Mã đề: <span className="text-primary fw-bold">{data?.examCode || '---'}</span></p>
          </div>
          <div className="d-flex gap-3">
            <Card className="border-0 shadow-sm px-4 py-2 text-center bg-light">
              <h6 className="text-muted small mb-0 fw-bold">Điểm chữ</h6>
              <p className="mb-0 fw-bold fs-5 text-dark">{data.scoreText}</p>
            </Card>
            <Card className="border-0 shadow-sm px-4 py-2 text-center bg-success bg-opacity-10 border border-success">
              <h6 className="text-success small mb-0 fw-bold">Điểm số</h6>
              <div className="d-flex align-items-end justify-content-center">
                <span className="fs-2 fw-bold text-success leading-none">{data.score}</span>
                <span className="text-success mb-1 ms-1">/10</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Row className="mb-4 g-3">
        <Col md={4}><Card className="border-0 shadow-sm p-3 text-center"><h6 className="text-muted small fw-bold">Học sinh</h6><p className="mb-0 fw-bold">{data.studentName || data.fullName}</p><p className="text-muted x-small mb-0">{data.studentId}</p></Card></Col>
        <Col md={4}><Card className="border-0 shadow-sm p-3 text-center"><h6 className="text-muted small fw-bold">Môn học</h6><p className="mb-0 fw-bold">{data.subjectName}</p></Card></Col>
      </Row>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <h5 className="fw-bold mb-4 pb-2 border-bottom">Thông tin chấm điểm</h5>
        <Row className="mb-4">
          <Col md={6}>
            <div className="bg-light p-3 rounded-3">
              <h6 className="text-muted small fw-bold">Giảng viên chấm</h6>
              <p className="mb-0 fw-medium">{data.gradedBy}</p>
            </div>
          </Col>
        </Row>
        <div className="mt-2">
          <h6 className="text-dark fw-bold small mb-2">Ghi chú bài làm:</h6>
          <Card className="p-3 bg-light border-0">
            <p className="mb-0 text-dark small">{data.note || 'Không có nhận xét.'}</p>
          </Card>
        </div>
      </Card>
    </Container>
  );
};

export default XemChiTietBaiThi;
