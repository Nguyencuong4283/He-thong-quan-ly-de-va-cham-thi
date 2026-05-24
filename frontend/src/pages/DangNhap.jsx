import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap';

const DangNhap = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field] : '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Login data:', formData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" 
         style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="border-0 rounded-4 shadow-lg p-3">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 mb-3" 
                       style={{ width: '64px', height: '64px' }}>
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.16 10.94C18.68 12.15 19 13.54 19 15C19 15.79 18.93 16.54 18.78 17.24M12 14L5.84 10.94C5.32 12.15 5 13.54 5 15C5 18.87 8.13 22 12 22C14.21 22 16.21 21.07 17.61 19.61M22 10V16M22 10L12 4M22 10L12 14M2 10L12 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="fw-bold mb-1">Đăng nhập</h2>
                  <p className="text-muted small">Chào mừng quay trở lại với EduManage</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text className="bg-white border-end-0">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b">
                          <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="example@uit.edu.vn"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        isInvalid={!!errors.email}
                        className="border-start-0 ps-0"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Mật khẩu</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text className="bg-white border-end-0">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b">
                          <path d="M12 15V17M6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        isInvalid={!!errors.password}
                        className="border-start-0 border-end-0 ps-0"
                      />
                      <InputGroup.Text 
                        className="bg-white border-start-0 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b">
                            <path d="M13.875 18.825C13.26 18.93 12.636 19 12 19C7 19 2.73 15.11 1 10C2.13 6.67 4.89 4.07 8.31 2.89M6.61 6.61C4.62 7.96 3.06 9.89 2.18 12.18C3.73 16.39 7.54 19 12 19C13.55 19 15.03 18.68 16.38 18.11M9.88 9.88C9.32 10.44 9 11.2 9 12C9 13.66 10.34 15 12 15C12.8 15 13.56 14.68 14.12 14.12M12.01 5.07C12.34 5.02 12.67 5 13 5C18 5 22.27 8.89 24 14C23.28 16.15 21.88 18.02 20.05 19.38M3 3L21 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#64748b">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" label={<span className="small text-muted">Ghi nhớ đăng nhập</span>} />
                    <a href="#" className="small text-primary text-decoration-none fw-semibold">Quên mật khẩu?</a>
                  </div>

                  <Button variant="primary" type="submit" className="w-full py-2 fw-bold shadow-sm">
                    Đăng nhập
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <p className="small text-muted">
                    Chưa có tài khoản?{' '}
                    <Link to="/dang-ky" className="text-primary fw-bold text-decoration-none">
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <div className="text-center mt-4">
              <p className="text-white small opacity-75">
                © 2026 EduManage. Hệ thống quản lý đề thi trực tuyến.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DangNhap;
