import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button, Tab } from 'react-bootstrap';

const CaiDat = () => {
  const [key, setKey] = useState('profile');

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
                <Nav.Item>
                  <Nav.Link eventKey="notifications" className="d-flex align-items-center gap-2 py-2">
                    <i className="bi bi-bell"></i> Thông báo
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
                      X
                    </div>
                    <div>
                      <Button variant="primary" size="sm" className="me-2">Thay ảnh</Button>
                      <Button variant="outline-danger" size="sm">Xóa ảnh</Button>
                      <p className="text-muted x-small mt-2 mb-0">JPG, PNG tối đa 800KB</p>
                    </div>
                  </div>
                  <Form>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Họ và tên</Form.Label>
                          <Form.Control defaultValue="Nguyễn Văn X" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Email</Form.Label>
                          <Form.Control defaultValue="dr.x@uit.edu.vn" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Học hàm/Học vị</Form.Label>
                          <Form.Control defaultValue="Tiến sĩ" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="small fw-bold">Khoa/Bộ môn</Form.Label>
                          <Form.Control defaultValue="Công nghệ phần mềm" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" className="fw-bold px-4">Lưu thay đổi</Button>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="security">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom">Đổi mật khẩu</h5>
                  <Form className="max-w-md" style={{ maxWidth: '400px' }}>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Mật khẩu hiện tại</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Mật khẩu mới</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold">Xác nhận mật khẩu mới</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="primary" className="fw-bold">Cập nhật mật khẩu</Button>
                  </Form>
                </Tab.Pane>

                <Tab.Pane eventKey="notifications">
                  <h5 className="fw-bold mb-4 pb-2 border-bottom">Cấu hình thông báo</h5>
                  <Form>
                    <Form.Check type="switch" label="Gửi email khi học sinh nộp bài" className="mb-3" defaultChecked />
                    <Form.Check type="switch" label="Gửi báo cáo định kỳ hàng tuần" className="mb-3" />
                    <Form.Check type="switch" label="Thông báo hệ thống quan trọng" className="mb-3" defaultChecked />
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
