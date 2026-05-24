import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Đã nộp' | 'Chưa nộp';
  score?: number;
}

interface ClassDetail {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  semester: string;
  year: string;
  assignedExam?: string;
  students: Student[];
}

const mockClasses: Record<string, ClassDetail> = {
  'CLASS-001': {
    id: 'CLASS-001',
    name: 'IT007.N11',
    subject: 'Hệ điều hành',
    teacher: 'TS. Nguyễn Văn X',
    semester: 'Fall 2025',
    year: '2025-2026',
    assignedExam: 'EX-IT007-2025-01',
    students: [
      { id: 'SV001', name: 'Nguyễn Văn A', email: 'sv001@uit.edu.vn', phone: '0901234567', status: 'Đã nộp', score: undefined },
      { id: 'SV002', name: 'Trần Thị B', email: 'sv002@uit.edu.vn', phone: '0901234568', status: 'Đã nộp', score: 8.5 },
      { id: 'SV006', name: 'Lê Văn F', email: 'sv006@uit.edu.vn', phone: '0901234572', status: 'Chưa nộp' },
    ],
  },
  'CLASS-002': {
    id: 'CLASS-002',
    name: 'IT005.N12',
    subject: 'Nhập môn mạng máy tính',
    teacher: 'TS. Nguyễn Văn X',
    semester: 'Fall 2025',
    year: '2025-2026',
    assignedExam: 'EX-IT005-2025-02',
    students: [
      { id: 'SV003', name: 'Lê Văn C', email: 'sv003@uit.edu.vn', phone: '0901234569', status: 'Đã nộp' },
      { id: 'SV004', name: 'Phạm Thị D', email: 'sv004@uit.edu.vn', phone: '0901234570', status: 'Đã nộp', score: 9.0 },
    ],
  },
};

const availableExams = [
  { id: 'EX-IT007-2025-01', name: 'Hệ điều hành - Giữa kỳ Fall 2025' },
  { id: 'EX-IT005-2025-02', name: 'Nhập môn mạng máy tính - Cuối kỳ Fall 2025' },
  { id: 'EX-SS006-2025-01', name: 'Pháp luật đại cương - Giữa kỳ Spring 2026' },
];

export function ChiTietLop() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState('');
  const [showAssignExam, setShowAssignExam] = useState(false);

  useEffect(() => {
    if (id && mockClasses[id]) {
      const classData = mockClasses[id];
      setClassDetail(classData);
      setSelectedExam(classData.assignedExam || '');
      setLoading(false);
    } else {
      alert('Không tìm thấy lớp học!');
      navigate('/quan-ly-lop');
    }
  }, [id, navigate]);

  const handleAssignExam = () => {
    if (!selectedExam) {
      alert('Vui lòng chọn đề thi!');
      return;
    }
    console.log('Assigning exam:', selectedExam);
    alert('Đã gán đề thi thành công!');
    if (classDetail) {
      setClassDetail({ ...classDetail, assignedExam: selectedExam });
    }
    setShowAssignExam(false);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto mb-4"></div>
          <p className="text-[#64748b]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!classDetail) return null;

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
          <span>Quay lại danh sách lớp</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">{classDetail.name}</h1>
            <p className="text-[#64748b] text-[16px]">{classDetail.subject}</p>
          </div>
          <Link
            to={`/quan-ly-lop/nhap-hoc-sinh/${classDetail.id}`}
            className="bg-[#10b981] text-white px-5 py-2 rounded-[8px] font-semibold hover:bg-[#059669] flex items-center gap-2"
          >
            <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
              <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nhập danh sách học sinh
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Học kỳ</p>
          <p className="text-[#0f172a] font-semibold text-[16px]">{classDetail.semester}</p>
          <p className="text-[#64748b] text-[14px]">{classDetail.year}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Tổng học sinh</p>
          <p className="text-[#3b82f6] text-[32px] font-bold">{classDetail.students.length}</p>
        </div>
      </div>

      {/* Assign Exam Section */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#0f172a] text-[18px] font-semibold">Đề thi được gán</h2>
        </div>

        {showAssignExam ? (
          <div className="border border-[#e2e8f0] rounded-[8px] p-4 bg-[#f8fafc]">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-3">
              Chọn đề thi:
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full border border-[#e2e8f0] rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] mb-4"
            >
              <option value="">-- Chọn đề thi --</option>
              {availableExams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={handleAssignExam}
                className="bg-[#3b82f6] text-white px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#2563eb]"
              >
                Xác nhận
              </button>
              <button
                onClick={() => {
                  setShowAssignExam(false);
                  setSelectedExam(classDetail.assignedExam || '');
                }}
                className="text-[#64748b] px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#e2e8f0]"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div>
            {classDetail.assignedExam ? (
              <div className="flex items-center justify-between border border-[#e2e8f0] rounded-[8px] p-4">
                <div>
                  <p className="text-[#0f172a] font-semibold text-[16px]">{classDetail.assignedExam}</p>
                  <p className="text-[#64748b] text-[14px]">
                    {availableExams.find(e => e.id === classDetail.assignedExam)?.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowAssignExam(true)}
                  className="text-[#3b82f6] text-[14px] font-semibold hover:underline"
                >
                  Thay đổi
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <button
                  onClick={() => setShowAssignExam(true)}
                  className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
                >
                  <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Thêm đề thi
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Students List */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e8f0]">
          <h2 className="text-[#0f172a] text-[18px] font-semibold">Danh sách học sinh</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">MSSV</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Họ tên</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Email</th>
            </tr>
          </thead>
          <tbody>
            {classDetail.students.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="size-[48px] text-[#cbd5e1]" fill="none" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#64748b] text-[16px]">Chưa có học sinh nào</p>
                    <Link
                      to={`/quan-ly-lop/nhap-hoc-sinh/${classDetail.id}`}
                      className="text-[#3b82f6] text-[14px] hover:underline"
                    >
                      Nhập danh sách học sinh
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              classDetail.students.map((student) => (
                <tr key={student.id} className="border-b border-[#e2e8f0]">
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{student.id}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{student.name}</td>
                  <td className="px-6 py-6 text-[#64748b] text-[15.2px]">{student.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
