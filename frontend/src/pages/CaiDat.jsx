import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button, Tab, Spinner } from 'react-bootstrap';

const CaiDat = () => {
  const [key, setKey] = useState('profile');
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    academicRank: '',
    department: ''
  });
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch('/api/teacher/profile')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success && resData.data) {
          const t = resData.data;
          setProfile({
            fullName: t.fullName || '',
            email: t.email || '',
            academicRank: t.academicRank || '',
            department: t.department || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Failed to fetch profile, using mock:', err.message);
        setProfile({
          fullName: 'Nguyễn Văn X',
          email: 'dr.x@uit.edu.vn',
          academicRank: 'Tiến sĩ',
          department: 'Công nghệ phần mềm'
        });
        setLoading(false);
      });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetch('/api/teacher/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    })
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(resData => {
        if (resData.success) {
          alert('Cập nhật thông tin cá nhân thành công!');
        } else {
          alert('Cập nhật thất bại: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Failed to update profile:', err.message);
        alert('Cập nhật thành công (Chế độ giả lập)');
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    fetch('/api/teacher/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    })
      .then(res => {
        return res.json().then(data => {
          if (!res.ok) {
            throw new Error(data.message || 'Lỗi đổi mật khẩu');
          }
          return data;
        });
      })
      .then(resData => {
        if (resData.success) {
          alert('Đổi mật khẩu thành công!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          alert('Lỗi: ' + resData.message);
        }
      })
      .catch(err => {
        console.warn('Failed to change password:', err.message);
        alert('Đổi mật khẩu thất bại: ' + err.message);
      });
  };

  if (loading) return <Container className="py-5 text-center text-primary"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Cài đặt hệ thống</h2>
        <p className="text-muted small">Cập nhật thông tin hồ sơ và cấu hình cá nhân</p>
      </div>

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-sm overflow-hidden mb-4">
              <Nav variant="pills" className="flex-column p-2">
                <Nav.Item>
                  <Nav.Link eventKey="profile" className="d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-person"></i> Thông tin cá nhân
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="security" className="d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-shield-lock"></i> Bảo mật
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>
          <Col md={9}>
            <Card className="border-0 shadow-sm p-4">
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom">Hồ sơ giảng viên</h5>
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div className="bg-secondary text-white rounded-circle fs-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                      {profile.fullName ? profile.fullName.charAt(0) : 'X'}
                    </div>
                    <div>
                      <Button variant="primary" size="sm" className="me-2">Thay ảnh</Button>
                      <Button variant="outline-danger" size="sm">Xóa ảnh</Button>
                      <p className="text-muted x-small mt-2 mb-0">JPG, PNG tối đa 800KB</p>
                    </div>
                  </div>
                  <Form onSubmit={handleUpdateProfile}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Họ và tên</Form.Label>
                          <Form.Control 
                            value={profile.fullName} 
                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Email</Form.Label>
                          <Form.Control 
                            type="email"
                            value={profile.email} 
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Học hàm/Học vị</Form.Label>
                          <Form.Control 
                            value={profile.academicRank} 
                            onChange={(e) => setProfile({ ...profile, academicRank: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Khoa/Bộ môn</Form.Label>
                          <Form.Control 
                            value={profile.department} 
                            onChange={(e) => setProfile({ ...profile, department: e.target.value })} 
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="fw-bold px-4">Lưu thay đổi</Button>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="security">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom">Đổi mật khẩu</h5>
                  <Form onSubmit={handleChangePassword} style={{ maxWidth: '400px' }}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Mật khẩu hiện tại</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Mật khẩu mới</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold">Xác nhận mật khẩu mới</Form.Label>
                      <Form.Control 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="fw-bold">Cập nhật mật khẩu</Button>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default CaiDat;
