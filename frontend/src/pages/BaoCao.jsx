import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = [
  { month: 'T1', avgScore: 7.2 },
  { month: 'T2', avgScore: 7.5 },
  { month: 'T3', avgScore: 7.8 },
  { month: 'T4', avgScore: 8.1 },
  { month: 'T5', avgScore: 8.3 },
  { month: 'T6', avgScore: 8.5 },
];

const subjectData = [
  { subject: 'Hệ điều hành', avgScore: 8.2, students: 45 },
  { subject: 'Mạng máy tính', avgScore: 7.8, students: 52 },
  { subject: 'Pháp luật', avgScore: 8.5, students: 38 },
  { subject: 'Cấu trúc dữ liệu', avgScore: 7.5, students: 48 },
  { subject: 'Cơ sở dữ liệu', avgScore: 8.0, students: 40 },
];

const BaoCao = () => {
  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">BÁO CÁO & THỐNG KÊ</h2>
        <p className="text-muted small">Phân tích kết quả học tập và hiệu suất giảng dạy</p>
      </div>

      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 border-start border-primary border-4">
            <h6 className="text-muted small fw-bold">TỔNG HỌC SINH</h6>
            <h2 className="mb-1 fw-bold text-primary">245</h2>
            <span className="text-muted x-small">Học kỳ hiện tại</span>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 border-start border-success border-4">
            <h6 className="text-muted small fw-bold">ĐIỂM TRUNG BÌNH</h6>
            <h2 className="mb-1 fw-bold text-success">8.1</h2>
            <span className="text-success x-small">+0.3 so với kỳ trước</span>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 border-start border-info border-4">
            <h6 className="text-muted small fw-bold">TỶ LỆ ĐẠT</h6>
            <h2 className="mb-1 fw-bold text-info">92%</h2>
            <span className="text-muted x-small">Điểm trên 5.0</span>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm p-3 border-start border-warning border-4">
            <h6 className="text-muted small fw-bold">TỶ LỆ GIỎI</h6>
            <h2 className="mb-1 fw-bold text-warning">38%</h2>
            <span className="text-muted x-small">Điểm trên 8.5</span>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Xu hướng điểm trung bình</h5>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 10]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="avgScore" stroke="#0d6efd" strokeWidth={3} dot={{ fill: '#0d6efd', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4">Kết quả theo môn học</h5>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 10]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="avgScore" fill="#198754" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm overflow-hidden mb-4">
        <div className="px-4 py-3 bg-light border-bottom">
          <h5 className="mb-0 fw-bold text-dark small text-uppercase">Chi tiết theo môn học</h5>
        </div>
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th className="px-4 py-3 small text-muted border-0">Môn học</th>
              <th className="px-4 py-3 small text-muted border-0">Số học sinh</th>
              <th className="px-4 py-3 small text-muted border-0">Điểm TB</th>
              <th className="px-4 py-3 small text-muted border-0">Tỷ lệ đạt</th>
              <th className="px-4 py-3 small text-muted border-0">Tỷ lệ giỏi</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map(s => (
              <tr key={s.subject} className="align-middle border-bottom">
                <td className="px-4 py-3 fw-bold">{s.subject}</td>
                <td className="px-4 py-3">{s.students}</td>
                <td className="px-4 py-3 fw-bold text-primary">{s.avgScore}/10</td>
                <td className="px-4 py-3 text-success fw-semibold">92%</td>
                <td className="px-4 py-3 text-warning fw-semibold">38%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default BaoCao;
