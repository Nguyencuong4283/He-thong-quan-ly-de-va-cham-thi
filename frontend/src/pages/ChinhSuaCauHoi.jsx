import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import questionApi from '../api/questionApi';
import teacherApi from '../api/teacherApi';
import { buildQuestionUpdateRequest } from '../models/question';

const ChinhSuaCauHoi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    monHoc: '',
    doKho: '',
    noiDung: '',
    outline: '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [questionRes, subjectsRes] = await Promise.all([
          questionApi.getQuestionById(id),
          teacherApi.getSubjects(),
        ]);

        if (subjectsRes && subjectsRes.success) {
          setSubjects(subjectsRes.data || []);
        }

        if (questionRes && questionRes.success) {
          const question = questionRes.data || {};
          setFormData({
            monHoc: question.subjectName || question.subject || '',
            doKho: question.difficulty || '',
            noiDung: question.content || '',
            outline: question.answer || '',
          });
        } else {
          setError(questionRes?.message || 'Không tải được chi tiết câu hỏi.');
        }
      } catch (err) {
        console.error('Load question error', err);
        setError(err?.message || 'Lỗi khi tải dữ liệu câu hỏi.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = buildQuestionUpdateRequest({
        content: formData.noiDung,
        answer: formData.outline,
        difficulty: formData.doKho,
      });
      const result = await questionApi.updateQuestion(id, payload);
      if (result && result.success) {
        alert('Câu hỏi đã được cập nhật thành công!');
        navigate('/ngan-hang-cau-hoi');
      } else {
        setError(result.message || 'Cập nhật thất bại.');
      }
    } catch (err) {
      console.error('Update question error', err);
      setError(err?.message || 'Lỗi khi cập nhật câu hỏi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Container className="py-5 text-center"><p>Đang tải...</p></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <Button variant="link" onClick={() => navigate('/ngan-hang-cau-hoi')} className="p-0 text-muted text-decoration-none mb-2">
          <i className="bi bi-arrow-left"></i> Quay lại
        </Button>
        <h2 className="fw-bold text-dark mb-1">CHỈNH SỬA CÂU HỎI</h2>
        <p className="text-muted small">Mã câu hỏi: {id}</p>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>

      <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <h4 className="fw-bold mb-0">BM1</h4>
          <h4 className="fw-bold mb-0">CÂU HỎI TỰ LUẬN</h4>
        </div>

        <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Môn học</Form.Label>
            <Form.Select value={formData.monHoc} onChange={(e) => handleInputChange('monHoc', e.target.value)}>
              <option value="">Chọn môn học</option>
              {subjects.length > 0 ? (
                subjects.map((s) => (
                  <option key={s.subjectId || s.id || s.subjectName} value={s.subjectName || s.name || s.label || s.subjectName}>
                    {s.subjectName || s.name || s.label}
                  </option>
                ))
              ) : (
                <option value="">{formData.monHoc || 'Không có môn học'}</option>
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Độ khó</Form.Label>
            <Form.Select value={formData.doKho} onChange={(e) => handleInputChange('doKho', e.target.value)}>
              <option value="Dễ">Dễ</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Khó">Khó</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold small">Nội dung câu hỏi</Form.Label>
            <Form.Control as="textarea" rows={5} value={formData.noiDung} onChange={(e) => handleInputChange('noiDung', e.target.value)} />
          </Form.Group>

          <Alert variant="info" className="mb-4 py-2 small border-0">
            📝 Học sinh sẽ trả lời bằng văn bản và giảng viên sẽ chấm điểm dựa trên Outline.
          </Alert>

          <Form.Group className="mb-5">
            <Form.Label className="fw-bold small">Outline / Hướng dẫn chấm điểm</Form.Label>
            <Form.Control as="textarea" rows={5} value={formData.outline} onChange={(e) => handleInputChange('outline', e.target.value)} />
          </Form.Group>

          <div className="d-flex gap-3 pt-3 border-top">
            <Button variant="primary" type="submit" className="fw-bold px-4" disabled={saving}>
              {saving ? 'Đang cập nhật...' : 'Cập nhật câu hỏi'}
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/ngan-hang-cau-hoi')} className="px-4" disabled={saving}>
              Hủy
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ChinhSuaCauHoi;
