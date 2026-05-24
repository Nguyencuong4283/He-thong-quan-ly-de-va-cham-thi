import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataByYear: Record<string, { submissionRate: Array<{ id: string; className: string; rate: number }>; avgScore: Array<{ id: string; className: string; avgScore: number }> }> = {
  '2024': {
    submissionRate: [
      { id: '2024-sub-1', className: 'IT007.N11', rate: 82 },
      { id: '2024-sub-2', className: 'IT005.N12', rate: 89 },
      { id: '2024-sub-3', className: 'SS006.N13', rate: 75 },
      { id: '2024-sub-4', className: 'IT004.N14', rate: 85 },
      { id: '2024-sub-5', className: 'IT003.N15', rate: 91 },
    ],
    avgScore: [
      { id: '2024-avg-1', className: 'IT007.N11', avgScore: 7.9 },
      { id: '2024-avg-2', className: 'IT005.N12', avgScore: 7.5 },
      { id: '2024-avg-3', className: 'SS006.N13', avgScore: 8.2 },
      { id: '2024-avg-4', className: 'IT004.N14', avgScore: 7.3 },
      { id: '2024-avg-5', className: 'IT003.N15', avgScore: 7.8 },
    ],
  },
  '2025': {
    submissionRate: [
      { id: '2025-sub-1', className: 'IT007.N11', rate: 85 },
      { id: '2025-sub-2', className: 'IT005.N12', rate: 92 },
      { id: '2025-sub-3', className: 'SS006.N13', rate: 78 },
      { id: '2025-sub-4', className: 'IT004.N14', rate: 88 },
      { id: '2025-sub-5', className: 'IT003.N15', rate: 95 },
    ],
    avgScore: [
      { id: '2025-avg-1', className: 'IT007.N11', avgScore: 8.2 },
      { id: '2025-avg-2', className: 'IT005.N12', avgScore: 7.8 },
      { id: '2025-avg-3', className: 'SS006.N13', avgScore: 8.5 },
      { id: '2025-avg-4', className: 'IT004.N14', avgScore: 7.5 },
      { id: '2025-avg-5', className: 'IT003.N15', avgScore: 8.0 },
    ],
  },
  '2026': {
    submissionRate: [
      { id: '2026-sub-1', className: 'IT007.N11', rate: 88 },
      { id: '2026-sub-2', className: 'IT005.N12', rate: 94 },
      { id: '2026-sub-3', className: 'SS006.N13', rate: 81 },
      { id: '2026-sub-4', className: 'IT004.N14', rate: 90 },
      { id: '2026-sub-5', className: 'IT003.N15', rate: 97 },
    ],
    avgScore: [
      { id: '2026-avg-1', className: 'IT007.N11', avgScore: 8.4 },
      { id: '2026-avg-2', className: 'IT005.N12', avgScore: 8.1 },
      { id: '2026-avg-3', className: 'SS006.N13', avgScore: 8.7 },
      { id: '2026-avg-4', className: 'IT004.N14', avgScore: 7.8 },
      { id: '2026-avg-5', className: 'IT003.N15', avgScore: 8.3 },
    ],
  },
};

export function Home() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const currentData = dataByYear[selectedYear];
  const teacherName = localStorage.getItem('userEmail') || 'user@example.com';

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-1">Trang chủ</h1>
        <p className="text-[#64748b] text-[16px]">Giảng viên: {teacherName}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 max-w-[600px]">
        <div className="bg-[#fef3c7] border border-[#fde68a] rounded-[12px] p-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="size-[20px] text-[#a16207]" fill="none" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#64748b] text-[14px] font-medium">Lớp học</p>
          </div>
          <p className="text-[#a16207] text-[48px] font-bold leading-none mb-2">12</p>
          <p className="text-[#64748b] text-[13px]">GET /classes</p>
        </div>

        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-[12px] p-6">
          <div className="flex items-center gap-2 mb-3">
            <svg className="size-[20px] text-[#15803d]" fill="none" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#64748b] text-[14px] font-medium">Đề thi</p>
          </div>
          <p className="text-[#15803d] text-[48px] font-bold leading-none mb-2">34</p>
          <p className="text-[#64748b] text-[13px]">GET /exams</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-4">Báo cáo năm</h2>
        <div className="flex items-center gap-3">
          <label className="text-[#0f172a] text-[15px] font-semibold">Lọc theo năm:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-[#e2e8f0] rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div key={`chart-container-submission-${selectedYear}`} className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <h2 className="text-[#0f172a] text-[18px] font-semibold mb-6">Tỷ lệ nộp bài theo lớp</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart key={`bar-submission-${selectedYear}`} data={currentData.submissionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="className" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Tỷ lệ nộp" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div key={`chart-container-avgscore-${selectedYear}`} className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <h2 className="text-[#0f172a] text-[18px] font-semibold mb-6">Điểm trung bình theo lớp</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart key={`bar-avgscore-${selectedYear}`} data={currentData.avgScore}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="className" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 10]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                formatter={(value: number) => value.toFixed(1)}
              />
              <Bar dataKey="avgScore" fill="#10b981" radius={[4, 4, 0, 0]} name="Điểm TB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
