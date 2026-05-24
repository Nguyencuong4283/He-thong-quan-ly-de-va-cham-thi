import { Link, useParams, useNavigate } from 'react-router';
import { useState } from 'react';

export function DanhSachHocSinhChamThi() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data cho danh sách học sinh của một lớp
  const classInfo = {
    id: id,
    name: 'Lớp Hệ điều hành - N01',
    subject: 'Hệ điều hành',
    examId: 'EX-IT007-2025-01'
  };

  const students = [
    { studentId: 'SV-001', submissionId: 'SUB-001', name: 'Nguyễn Văn A', status: 'Chưa chấm', score: null },
    { studentId: 'SV-002', submissionId: 'SUB-002', name: 'Trần Thị B', status: 'Đã chấm', score: 8.5 },
    { studentId: 'SV-003', submissionId: 'SUB-003', name: 'Lê Văn C', status: 'Chưa chấm', score: null },
    { studentId: 'SV-004', submissionId: 'SUB-004', name: 'Phạm Thị D', status: 'Đã chấm', score: 9.0 },
    { studentId: 'SV-005', submissionId: 'SUB-005', name: 'Hoàng Văn E', status: 'Chưa chấm', score: null },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || student.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/quan-ly-lop')}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] mb-4"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại Danh sách lớp</span>
        </button>
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">DANH SÁCH BÀI THI: {classInfo.name}</h1>
        <p className="text-[#64748b] text-[16px]">Môn học: {classInfo.subject} | Mã đề thi: {classInfo.examId}</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-6 p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-[20px] text-[#64748b]" fill="none" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo MSSV, tên học sinh..."
              className="w-full border border-[#e2e8f0] rounded-[6px] pl-10 pr-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-[#e2e8f0] rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Chưa chấm">Chưa chấm</option>
            <option value="Đã chấm">Đã chấm</option>
          </select>
          {(searchTerm || filterStatus) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('');
              }}
              className="text-[#64748b] hover:text-[#0f172a] px-3 py-2 text-[14px] font-medium whitespace-nowrap"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">MSSV</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Họ và tên</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Trạng thái</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Điểm</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#64748b]">
                  Không tìm thấy bài thi nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={index} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc]">
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{student.studentId}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{student.name}</td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-3 py-1 rounded-[20px] text-[12.8px] font-semibold whitespace-nowrap ${
                        student.status === 'Đã chấm'
                          ? 'bg-[#d1fae5] text-[#059669]'
                          : 'bg-[#fef3c7] text-[#d97706]'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-semibold">
                    {student.score !== null ? `${student.score}/10` : '-'}
                  </td>
                  <td className="px-6 py-6">
                    <Link
                      to={student.status === 'Đã chấm' ? `/cham-thi/xem-chi-tiet/${student.submissionId}` : `/cham-thi/cham-diem/${student.submissionId}`}
                      className={`px-4 py-2 rounded-[6px] text-[14px] font-semibold inline-block whitespace-nowrap ${
                        student.status === 'Đã chấm'
                          ? 'bg-white border border-[#e2e8f0] text-[#0f172a] hover:bg-[#f8fafc]'
                          : 'bg-[#3b82f6] text-white hover:bg-[#2563eb]'
                      }`}
                    >
                      {student.status === 'Đã chấm' ? 'Xem chi tiết' : 'Chấm điểm'}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}