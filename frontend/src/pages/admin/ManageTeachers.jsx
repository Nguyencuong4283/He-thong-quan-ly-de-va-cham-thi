import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import adminApi from '../../api/adminApi';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ teacherId: '', fullName: '', password: '' });
  const [editData, setEditData] = useState({ teacherId: '', fullName: '', password: '' });
  const [assignData, setAssignData] = useState({ teacherId: '', subjectId: '' });

  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const teachersRes = await adminApi.getTeachers();
      const subjectsRes = await adminApi.getSubjects();
      if (teachersRes.success) setTeachers(teachersRes.data);
      if (subjectsRes.success) setSubjects(subjectsRes.data);
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
    const res = await adminApi.createTeacher(formData);
    if (res.success) {
      setShowAddModal(false);
      setFormData({ teacherId: '', fullName: '', password: '' });
      loadData();
    } else {
      setError(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await adminApi.updateTeacher(editData.teacherId, {
      fullName: editData.fullName,
      password: editData.password
    });
    if (res.success) {
      setShowEditModal(false);
      setEditData({ teacherId: '', fullName: '', password: '' });
      loadData();
    } else {
      setError(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!assignData.subjectId) {
      setError('Vui lòng chọn môn học');
      return;
    }
    const res = await adminApi.assignSubject(assignData.teacherId, assignData.subjectId);
    if (res.success) {
      setShowAssignModal(false);
      setAssignData({ teacherId: '', subjectId: '' });
      loadData();
    } else {
      setError(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleDelete = async (teacherId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa giáo viên ${teacherId} không?`)) {
      const res = await adminApi.deleteTeacher(teacherId);
      if (res.success) {
        loadData();
      } else {
        alert(res.message || 'Không thể xóa giáo viên');
      }
    }
  };

  const handleUnassign = async (teacherId, subjectId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy phân công môn học này cho giáo viên không?')) {
      const res = await adminApi.unassignSubject(teacherId, subjectId);
      if (res.success) {
        loadData();
      } else {
        alert(res.message || 'Không thể hủy phân công');
      }
    }
  };

  return (
    <Container fluid className="page-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: 'var(--bs-body-color)' }}>Quản lý Giáo viên</h2>
          <p className="text-secondary small mb-0 fw-bold">Danh sách giáo viên trong trường và các môn học được phân công giảng dạy</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="btn-primary d-flex align-items-center gap-2 shadow-sm">
          <i className="bi bi-person-plus-fill"></i> Thêm Giáo viên
        </Button>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Danh sách giáo viên</h5>
          <Badge bg="primary" className="rounded-pill px-3 py-1.5 fw-bold">{teachers.length} Giáo viên</Badge>
        </div>
        {loading ? (
          <div className="p-5 text-center text-secondary fw-bold">Đang tải dữ liệu...</div>
        ) : (
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3 border-0">Mã GV</th>
                <th className="px-4 py-3 border-0">Họ và tên</th>
                <th className="px-4 py-3 border-0">Môn giảng dạy</th>
                <th className="px-4 py-3 border-0 text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.teacherId} className="align-middle">
                  <td className="px-4 py-3 fw-bold text-primary">{teacher.teacherId}</td>
                  <td className="px-4 py-3 fw-bold">{teacher.fullName}</td>
                  <td className="px-4 py-3">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      {teacher.subjects && teacher.subjects.length > 0 ? (
                        teacher.subjects.map((sub) => (
                          <Badge 
                            key={sub.subjectId} 
                            bg="light" 
                            text="dark" 
                            className="border p-2 d-flex align-items-center gap-2 rounded-3"
                          >
                            <span>{sub.subjectId} - {sub.subjectName}</span>
                            <i 
                              className="bi bi-x-circle text-danger cursor-pointer hover-opacity-75"
                              onClick={() => handleUnassign(teacher.teacherId, sub.subjectId)}
                              title="Hủy phân công"
                            ></i>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-secondary small italic fw-medium">Chưa phân công</span>
                      )}
                      <Button 
                        variant="link" 
                        className="p-0 text-success text-decoration-none fw-bold small d-flex align-items-center gap-1 ms-1"
                        onClick={() => {
                          setAssignData({ teacherId: teacher.teacherId, subjectId: '' });
                          setShowAssignModal(true);
                        }}
                      >
                        <i className="bi bi-plus-circle-fill"></i> Phân công
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        className="rounded-3 fw-bold px-3"
                        onClick={() => {
                          setEditData({ teacherId: teacher.teacherId, fullName: teacher.fullName, password: '' });
                          setShowEditModal(true);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="rounded-3 fw-bold px-3"
                        onClick={() => handleDelete(teacher.teacherId)}
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

      {/* ADD TEACHER MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Thêm giáo viên mới</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Body>
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mã giáo viên</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ví dụ: GV004" 
                required
                value={formData.teacherId}
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Họ và tên</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ví dụ: Nguyễn Văn D" 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mật khẩu</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mật khẩu đăng nhập" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit">Thêm giáo viên</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* EDIT TEACHER MODAL */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Sửa thông tin giáo viên</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mã giáo viên (Không thể sửa)</Form.Label>
              <Form.Control type="text" disabled value={editData.teacherId} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Họ và tên</Form.Label>
              <Form.Control 
                type="text" 
                required
                value={editData.fullName}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mật khẩu mới (Để trống nếu không đổi)</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mật khẩu mới" 
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit">Lưu thay đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ASSIGN SUBJECT MODAL */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Phân công môn dạy</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAssignSubmit}>
          <Modal.Body>
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mã giáo viên</Form.Label>
              <Form.Control type="text" disabled value={assignData.teacherId} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Chọn Môn học</Form.Label>
              <Form.Select 
                required
                value={assignData.subjectId}
                onChange={(e) => setAssignData({ ...assignData, subjectId: e.target.value })}
              >
                <option value="">-- Chọn môn học --</option>
                {subjects.map((sub) => (
                  <option key={sub.subjectId} value={sub.subjectId}>
                    {sub.subjectId} - {sub.subjectName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAssignModal(false)}>Hủy</Button>
            <Button variant="primary" type="submit">Xác nhận phân công</Button>
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

export default ManageTeachers;
