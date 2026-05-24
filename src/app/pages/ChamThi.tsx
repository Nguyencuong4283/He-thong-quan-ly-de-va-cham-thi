import { Link } from 'react-router';

export function ChamThi() {
  const classesToGrade = [
    { id: 'CLASS-001', name: 'Lớp Hệ điều hành - N01', subject: 'Hệ điều hành', examId: 'EX-IT007-2025-01', totalStudents: 45, graded: 30, pending: 15, status: 'Đang chấm' },
    { id: 'CLASS-002', name: 'Lớp Mạng máy tính - N03', subject: 'Nhập môn mạng máy tính', examId: 'EX-IT005-2025-02', totalStudents: 40, graded: 40, pending: 0, status: 'Đã hoàn thành' },
    { id: 'CLASS-003', name: 'Lớp Pháp luật đại cương - N02', subject: 'Pháp luật đại cương', examId: 'EX-SS006-2025-01', totalStudents: 50, graded: 0, pending: 50, status: 'Chờ chấm' },
    { id: 'CLASS-004', name: 'Lớp Cấu trúc dữ liệu - N01', subject: 'Cấu trúc dữ liệu', examId: 'EX-IT003-2025-01', totalStudents: 38, graded: 12, pending: 26, status: 'Đang chấm' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">QUẢN LÝ CHẤM THI</h1>
        <p className="text-[#64748b] text-[16px]">Chọn lớp học để bắt đầu chấm điểm bài thi của học sinh</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỔNG SỐ LỚP</p>
          <p className="text-[#3b82f6] text-[32px] font-bold">4</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">BÀI THI CHỜ CHẤM</p>
          <p className="text-[#f59e0b] text-[32px] font-bold">91</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">BÀI THI ĐÃ CHẤM</p>
          <p className="text-[#10b981] text-[32px] font-bold">82</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Mã lớp</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Tên lớp</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Môn học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Mã đề thi</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Tiến độ chấm</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Trạng thái</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {classesToGrade.map((cls, index) => (
              <tr key={index} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc]">
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{cls.id}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{cls.name}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{cls.subject}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{cls.examId}</td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-[#e2e8f0] rounded-full h-2 max-w-[100px]">
                      <div 
                        className="bg-[#3b82f6] h-2 rounded-full" 
                        style={{ width: `${(cls.graded / cls.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[13px] text-[#64748b]">{cls.graded}/{cls.totalStudents}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span
                    className={`px-3 py-1 rounded-[20px] text-[12.8px] font-semibold whitespace-nowrap ${
                      cls.status === 'Đã hoàn thành'
                        ? 'bg-[#d1fae5] text-[#059669]'
                        : cls.status === 'Đang chấm'
                        ? 'bg-[#dbeafe] text-[#0369a1]'
                        : 'bg-[#fef3c7] text-[#d97706]'
                    }`}
                  >
                    {cls.status}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <Link
                    to={`/cham-thi/danh-sach/${cls.id}`}
                    className="bg-[#3b82f6] text-white px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#2563eb] inline-block whitespace-nowrap"
                  >
                    Danh sách học sinh
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}