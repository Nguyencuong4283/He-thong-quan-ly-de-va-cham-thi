import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import reportApi from '../api/reportApi';

const defaultDashboard = {
  totalClasses: 0,
  totalExams: 0,
  submissionRates: [],
  averageScores: [],
};

const Home = () => {
  // Tự động sinh danh sách năm từ 2024 đến hiện tại
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => (startYear + i).toString()
  ).reverse(); // Đảo ngược để năm mới nhất hiện lên đầu

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submissionRateData = dashboard.submissionRates;
  const avgScoreData = dashboard.averageScores;

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await reportApi.getDashboard(selectedYear);
        if (res.success) {
          setDashboard({
            totalClasses: res.data.totalClasses ?? res.data.total_classes ?? 0,
            totalExams: res.data.totalExams ?? res.data.total_exams ?? 0,
            submissionRates: Array.isArray(res.data.submissionRates)
              ? res.data.submissionRates.map((item, index) => ({
                  id: item.classId ?? item.className ?? `submission-${index}`,
                  className: item.className ?? item.classId ?? item.class ?? `Lớp ${index + 1}`,
                  rate: item.value ?? item.rate ?? 0,
                }))
              : [],
            averageScores: Array.isArray(res.data.averageScores)
              ? res.data.averageScores.map((item, index) => ({
                  id: item.classId ?? item.className ?? `avg-${index}`,
                  className: item.className ?? item.classId ?? item.class ?? `Lớp ${index + 1}`,
                  avgScore: item.value ?? item.average ?? item.avgScore ?? 0,
                }))
              : [],
          });
        } else {
          setError(res.message || 'Không thể tải dữ liệu dashboard');
          setDashboard(defaultDashboard);
        }
      } catch (err) {
        setError(err.message || 'Lỗi khi tải dashboard');
        setDashboard(defaultDashboard);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [selectedYear]);

  return (
    <Container fluid className="page-fade-in">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold mb-1">Tổng quan hệ thống</h2>
          <p className="text-secondary mb-0 small fw-medium">Theo dõi hiệu suất giảng dạy và quản lý học tập</p>
        </div>
        <div className="bg-white dark-bg-card border rounded-3 p-1 px-3 d-flex align-items-center gap-2 shadow-sm">
          <span className="small fw-bold text-secondary">Năm học:</span>
          <Form.Select 
            size="sm" 
            className="border-0 bg-transparent fw-bold text-primary shadow-none" 
            style={{ width: '90px' }} 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
          {loading && <Spinner animation="border" size="sm" className="text-primary" />}
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-primary">
            <div className="card-body p-4 position-relative z-1 text-white">
              <h6 className="text-white text-opacity-75 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Lớp học đang quản lý</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{dashboard.totalClasses}</h1>
                <span className="stat-badge stat-badge-primary">Năm {selectedYear}</span>
              </div>
              <Button as={Link} to="/quan-ly-lop" variant="light" className="rounded-pill px-4 fw-bold text-primary shadow-sm border-0">
                Xem danh sách lớp <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
            <i className="bi bi-people-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-success">
            <div className="card-body p-4 position-relative z-1 text-white">
              <h6 className="text-white text-opacity-75 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Tổng số đề thi</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{dashboard.totalExams}</h1>
                <span className="stat-badge stat-badge-success">Năm {selectedYear}</span>
              </div>
              <Button as={Link} to="/de-thi" variant="light" className="rounded-pill px-4 fw-bold text-success shadow-sm border-0">
                Quản lý đề thi <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
            <i className="bi bi-file-earmark-text-fill position-absolute end-0 bottom-0 opacity-10" style={{ fontSize: '150px', transform: 'translate(10%, 20%)' }}></i>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h5 className="fw-bold mb-1">Hiệu suất học tập theo lớp</h5>
            <p className="text-secondary small mb-0 fw-medium">Biểu đồ so sánh tỷ lệ nộp bài và điểm trung bình</p>
          </div>
        </div>

        <Row className="g-5">
          <Col lg={6}>
            <div className="p-3 rounded-4" style={{ backgroundColor: 'rgba(var(--bs-primary-rgb), 0.03)' }}>
              <h6 className="text-center mb-4 fw-bold text-secondary text-uppercase small" style={{ letterSpacing: '1px' }}>Tỷ lệ nộp bài (%)</h6>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={submissionRateData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="className" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(var(--bs-primary-rgb), 0.05)' }}
                      contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--bs-border-color)', borderRadius: '12px', color: 'var(--bs-body-color)' }}
                    />
                    <Bar dataKey="rate" fill="var(--bs-primary)" radius={[6, 6, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="p-3 rounded-4" style={{ backgroundColor: 'rgba(var(--bs-success-rgb), 0.03)' }}>
              <h6 className="text-center mb-4 fw-bold text-secondary text-uppercase small" style={{ letterSpacing: '1px' }}>Điểm trung bình (Hệ 10)</h6>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={avgScoreData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="className" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(var(--bs-success-rgb), 0.05)' }}
                      contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--bs-border-color)', borderRadius: '12px', color: 'var(--bs-body-color)' }}
                    />
                    <Bar dataKey="avgScore" fill="var(--bs-success)" radius={[6, 6, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <style>{`
        .stat-badge-primary {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        .stat-badge-success {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        .dark-bg-card { background-color: var(--surface-color); }
      `}</style>
    </Container>
  );
};

export default Home;
