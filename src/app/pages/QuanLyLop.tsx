import { Link } from 'react-router';

interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  totalStudents: number;
  assignedExam?: string;
  gradedCount: number;
  pendingCount: number;
}

export function QuanLyLop() {
  const classes: ClassInfo[] = [
    {
      id: 'CLASS-001',
      name: 'IT007.N11',
      subject: 'Hệ điều hành',
      teacher: 'TS. Nguyễn Văn X',
      totalStudents: 45,
      assignedExam: 'EX-IT007-2025-01',
      gradedCount: 32,
      pendingCount: 13,
    },
    {
      id: 'CLASS-002',
      name: 'IT005.N12',
      subject: 'Nhập môn mạng máy tính',
      teacher: 'TS. Nguyễn Văn X',
      totalStudents: 50,
      assignedExam: 'EX-IT005-2025-02',
      gradedCount: 48,
      pendingCount: 2,
    },
    {
      id: 'CLASS-003',
      name: 'SS006.N13',
      subject: 'Pháp luật đại cương',
      teacher: 'TS. Trần Thị Y',
      totalStudents: 40,
      assignedExam: 'EX-SS006-2025-01',
      gradedCount: 15,
      pendingCount: 25,
    },
    {
      id: 'CLASS-004',
      name: 'IT001.N14',
      subject: 'Lập trình hướng đối tượng',
      teacher: 'TS. Nguyễn Văn X',
      totalStudents: 38,
      assignedExam: undefined,
      gradedCount: 0,
      pendingCount: 0,
    },
  ];

  const totalClasses = classes.length;
  const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">QUẢN LÝ LỚP HỌC VÀ CHẤM THI</h1>
          <p className="text-[#64748b] text-[16px]">Quản lý danh sách lớp, gán đề thi và chấm điểm bài thi</p>
        </div>
        <Link
          to="/quan-ly-lop/them-moi"
          className="bg-[#3b82f6] h-[40px] rounded-[8px] px-5 flex items-center gap-2 hover:bg-[#2563eb] transition-colors"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-[14px] text-white">Thêm lớp</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỔNG SỐ LỚP</p>
          <p className="text-[#3b82f6] text-[32px] font-bold">{totalClasses}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỔNG HỌC SINH</p>
          <p className="text-[#10b981] text-[32px] font-bold">{totalStudents}</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Mã lớp</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Môn học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Số học sinh</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Đề thi</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classInfo) => {
              return (
                <tr key={classInfo.id} className="border-b border-[#e2e8f0]">
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{classInfo.name}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{classInfo.subject}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{classInfo.totalStudents}</td>
                  <td className="px-6 py-6">
                    {classInfo.assignedExam ? (
                      <span className="text-[#0f172a] text-[15.2px] font-medium">{classInfo.assignedExam}</span>
                    ) : (
                      <span className="text-[#94a3b8] text-[14px] italic">Chưa gán</span>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-2">
                      <Link
                        to={`/quan-ly-lop/chi-tiet/${classInfo.id}`}
                        className="bg-[#3b82f6] text-white px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#2563eb] inline-block whitespace-nowrap"
                      >
                        Quản lý
                      </Link>
                      {classInfo.assignedExam && (
                        <Link
                          to={`/cham-thi/danh-sach/${classInfo.id}`}
                          className="bg-[#10b981] text-white px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#059669] inline-block whitespace-nowrap"
                        >
                          Chấm thi
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
