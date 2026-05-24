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

export function BaoCao() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">BÁO CÁO & THỐNG KÊ</h1>
        <p className="text-[#64748b] text-[16px]">Phân tích kết quả học tập và hiệu suất giảng dạy</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỔNG SỐ HỌC SINH</p>
          <p className="text-[#3b82f6] text-[32px] font-bold mb-1">245</p>
          <p className="text-[#64748b] text-[14.4px]">Học kỳ hiện tại</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">ĐIỂM TRUNG BÌNH</p>
          <p className="text-[#10b981] text-[32px] font-bold mb-1">8.1</p>
          <p className="text-[#64748b] text-[14.4px]">+0.3 so với kỳ trước</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỶ LỆ ĐẠT</p>
          <p className="text-[#8b5cf6] text-[32px] font-bold mb-1">92%</p>
          <p className="text-[#64748b] text-[14.4px]">Điểm trên 5.0</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỶ LỆ GIỎI</p>
          <p className="text-[#f59e0b] text-[32px] font-bold mb-1">38%</p>
          <p className="text-[#64748b] text-[14.4px]">Điểm trên 8.5</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6">Xu hướng điểm trung bình</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid key="line-grid" strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis key="line-xaxis" dataKey="month" stroke="#64748b" />
              <YAxis key="line-yaxis" stroke="#64748b" domain={[0, 10]} />
              <Tooltip key="line-tooltip" />
              <Line key="line-performance" type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6">Kết quả theo môn học</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid key="bar-grid" strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis key="bar-xaxis" dataKey="subject" stroke="#64748b" angle={-15} textAnchor="end" height={80} />
              <YAxis key="bar-yaxis" stroke="#64748b" domain={[0, 10]} />
              <Tooltip key="bar-tooltip" />
              <Bar key="bar-score" dataKey="avgScore" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6">Chi tiết theo môn học</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Môn học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Số học sinh</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Điểm TB</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Tỷ lệ đạt</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Tỷ lệ giỏi</th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((subject) => (
              <tr key={`subject-row-${subject.subject}`} className="border-b border-[#e2e8f0]">
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{subject.subject}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{subject.students}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-semibold">{subject.avgScore}/10</td>
                <td className="px-6 py-6 text-[#10b981] text-[15.2px] font-semibold">
                  {Math.round((subject.students * 0.92))} ({Math.round(92)}%)
                </td>
                <td className="px-6 py-6 text-[#f59e0b] text-[15.2px] font-semibold">
                  {Math.round((subject.students * 0.38))} ({Math.round(38)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
