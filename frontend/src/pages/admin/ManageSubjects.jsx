import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import adminApi from '../../api/adminApi';

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ subjectId: '', subjectName: '' });
  const [editData, setEditData] = useState({ subjectId: '', subjectName: '' });

  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSubjects();
      if (res.success) setSubjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await adminApi.createSubject(formData);
    if (res.success) {
      setShowAddModal(false);
      setFormData({ subjectId: '', subjectName: '' });
      loadData();
    } else {
      setError(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await adminApi.updateSubject(editData.subjectId, {
      subjectName: editData.subjectName
    });
    if (res.success) {
      setShowEditModal(false);
      setEditData({ subjectId: '', subjectName: '' });
      loadData();
    } else {
      setError(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleDelete = async (subjectId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa môn học ${subjectId} không?`)) {
      const res = await adminApi.deleteSubject(subjectId);
      if (res.success) {
        loadData();
      } else {
        alert(res.message || 'Không thể xóa môn học');
      }
    }
  };

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Quản lý Môn học</h2>
          <p className="text-secondary small mb-0 fw-bold">Thiết lập danh sách môn học của hệ thống thi và đánh giá</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="btn-primary d-flex align-items-center gap-2 shadow-sm">
          <i className="bi bi-plus-circle-fill"></i> Thêm Môn học
        </Button>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách môn học</h5>
          <Badge bg="success" className="rounded-pill px-3 py-1.5 fw-bold">{subjects.length} Môn học</Badge>
        </div>
        {loading ? (
          <div className="p-5 text-center text-secondary fw-bold">Đang tải dữ liệu...</div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3 border-0">Mã môn học</th>
                <th className="px-4 py-3 border-0">Tên môn học</th>
                <th className="px-4 py-3 border-0 text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.subjectId} className="align-middle">
                  <td className="px-4 py-3 fw-bold text-success">{sub.subjectId}</td>
                  <td className="px-4 py-3 fw-bold">{sub.subjectName}</td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="rounded-3 fw-bold px-3"
                        onClick={() => {
                          setEditData({ subjectId: sub.subjectId, subjectName: sub.subjectName });
                          setShowEditModal(true);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="rounded-3 fw-bold px-3"
                        onClick={() => handleDelete(sub.subjectId)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* ADD SUBJECT MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Thêm môn học mới</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Body>
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mã môn học</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ví dụ: SE105" 
                required
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Tên môn học</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ví dụ: Kiến trúc phần mềm" 
                required
                value={formData.subjectName}
                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit">Thêm môn học</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* EDIT SUBJECT MODAL */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Sửa tên môn học</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mã môn học (Không thể sửa)</Form.Label>
              <Form.Control type="text" disabled value={editData.subjectId} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Tên môn học</Form.Label>
              <Form.Control 
                type="text" 
                required
                value={editData.subjectName}
                onChange={(e) => setEditData({ ...editData, subjectName: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit">Lưu thay đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>

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
      `}</style>
    </Container>
  );
};

export default ManageSubjects;
