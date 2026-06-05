import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchWithTimeout } from '../utils/api';

const dataByYear = {
  '2024': {
    submissionRate: [
      { id: '2024-sub-1', className: 'IT007.N11', rate: 82 },
      { id: '2024-sub-2', className: 'IT005.N12', rate: 89 },
      { id: '2024-sub-3', className: 'SS006.N13', rate: 75 },
    ],
    avgScore: [
      { id: '2024-avg-1', className: 'IT007.N11', avgScore: 7.9 },
      { id: '2024-avg-2', className: 'IT005.N12', avgScore: 7.5 },
      { id: '2024-avg-3', className: 'SS006.N13', avgScore: 8.2 },
    ],
  },
  '2025': {
    submissionRate: [
      { id: '2025-sub-1', className: 'IT007.N11', rate: 85 },
      { id: '2025-sub-2', className: 'IT005.N12', rate: 92 },
      { id: '2025-sub-3', className: 'SS006.N13', rate: 78 },
    ],
    avgScore: [
      { id: '2025-avg-1', className: 'IT007.N11', avgScore: 8.2 },
      { id: '2025-avg-2', className: 'IT005.N12', avgScore: 7.8 },
      { id: '2025-avg-3', className: 'SS006.N13', avgScore: 8.5 },
    ],
  },
};

const Home = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [totalClasses, setTotalClasses] = useState(12);
  const [totalExams, setTotalExams] = useState(34);
  const [currentData, setCurrentData] = useState(dataByYear['2025']);

  useEffect(() => {
    Promise.all([
      fetchWithTimeout(`/api/report/dashboard?year=${selectedYear}`).then(res => {
        if (!res.ok) throw new Error('Report API error');
        return res.json();
      }),
      fetchWithTimeout('/api/classes').then(res => {
        if (!res.ok) throw new Error('Classes API error');
        return res.json();
      })
    ])
      .then(([reportRes, classesRes]) => {
        if (reportRes.success && reportRes.data && classesRes.success && classesRes.data) {
          const report = reportRes.data;
          const classes = classesRes.data;
          
          setTotalClasses(report.totalClasses || 0);
          setTotalExams(report.totalExams || 0);

          const yearInt = parseInt(selectedYear, 10);
          const activeClasses = classes.filter(c => c.year === yearInt);

          const mappedSubRates = activeClasses.map((c, idx) => {
            const subRateItem = (report.submissionRates || []).find(item => item.classId === c.classId);
            return {
              id: `${selectedYear}-sub-${idx}`,
              className: c.name || c.classId,
              rate: subRateItem ? Math.round(subRateItem.value) : 0
            };
          });

          const mappedAvgScores = activeClasses.map((c, idx) => {
            const avgScoreItem = (report.averageScores || []).find(item => item.classId === c.classId);
            return {
              id: `${selectedYear}-avg-${idx}`,
              className: c.name || c.classId,
              avgScore: avgScoreItem ? parseFloat(avgScoreItem.value.toFixed(1)) : 0.0
            };
          });

          setCurrentData({
            submissionRate: mappedSubRates,
            avgScore: mappedAvgScores
          });
        }
      })
      .catch(err => {
        console.warn('Backend API report is not available, using mock statistics:', err.message);
        // Fallback to static mock data
        setTotalClasses(selectedYear === '2025' ? 12 : 10);
        setTotalExams(selectedYear === '2025' ? 34 : 28);
        setCurrentData(dataByYear[selectedYear] || dataByYear['2024']);
      });
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
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Form.Select>
        </div>
      </div>

      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden bg-primary">
            <div className="card-body p-4 position-relative z-1 text-white">
              <h6 className="text-white text-opacity-75 text-uppercase fw-bold small mb-4" style={{ letterSpacing: '1px' }}>Lớp học đang quản lý</h6>
              <div className="d-flex align-items-end gap-3 mb-4">
                <h1 className="display-4 fw-bold mb-0">{totalClasses}</h1>
                <span className="stat-badge stat-badge-primary">+2 lớp mới</span>
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
                <h1 className="display-4 fw-bold mb-0">{totalExams}</h1>
                <span className="stat-badge stat-badge-success">15 bản nháp</span>
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
                  <BarChart data={currentData.submissionRate}>
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
                  <BarChart data={currentData.avgScore}>
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
