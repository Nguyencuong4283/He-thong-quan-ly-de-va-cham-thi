import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface GradedExam {
  id: string;
  examId: string;
  examName: string;
  student: string;
  studentId: string;
  subject: string;
  submitted: string; // Ngày thi
  score: number;
  scoreText: string;
  comments: string;
  gradedBy: string;
  gradedDate: string;
}

// Mock data cho bài thi giấy đã chấm
const mockGradedExams: Record<string, GradedExam> = {
  'SUB-002': {
    id: 'SUB-002',
    examId: 'EX-IT007-2025-01',
    examName: 'Hệ điều hành',
    student: 'Trần Thị B',
    studentId: 'SV002',
    subject: 'Hệ điều hành',
    submitted: '25/04/2026',
    score: 8.5,
    scoreText: 'Tám phẩy năm',
    comments: 'Làm bài rất tốt, chữ viết rõ ràng.',
    gradedBy: 'TS. Nguyễn Văn X',
    gradedDate: '26/04/2026 16:00',
  },
  'SUB-004': {
    id: 'SUB-004',
    examId: 'EX-IT005-2025-02',
    examName: 'Nhập môn mạng máy tính',
    student: 'Phạm Thị D',
    studentId: 'SV004',
    subject: 'Nhập môn mạng máy tính',
    submitted: '25/04/2026',
    score: 9.0,
    scoreText: 'Chín điểm',
    comments: 'Bài làm xuất sắc! Học sinh nắm vững kiến thức.',
    gradedBy: 'TS. Nguyễn Văn X',
    gradedDate: '26/04/2026 15:30',
  },
};

export function XemChiTietBaiThi() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [gradedExam, setGradedExam] = useState<GradedExam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && mockGradedExams[id]) {
      setGradedExam(mockGradedExams[id]);
      setLoading(false);
    } else {
      // Giả lập cho việc preview test
      setGradedExam({
        id: id || 'SUB-UNKNOWN',
        examId: 'EX-UNKNOWN',
        examName: 'Chưa xác định',
        student: 'Nguyễn Văn Test',
        studentId: 'SV-TEST',
        subject: 'Chưa xác định',
        submitted: '25/04/2026',
        score: 8.0,
        scoreText: 'Tám điểm',
        comments: 'Bài làm đạt yêu cầu.',
        gradedBy: 'Giảng viên chấm',
        gradedDate: '26/04/2026',
      });
      setLoading(false);
    }
  }, [id, navigate]);

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

  if (!gradedExam) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] mb-4"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại Danh sách lớp</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">CHI TIẾT ĐIỂM BÀI THI GIẤY</h1>
            <p className="text-[#64748b] text-[16px]">Mã phách / Mã bài thi: {gradedExam.id}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-[12px] px-6 py-4 flex flex-col justify-center items-center">
              <p className="text-[#64748b] text-[14px] font-semibold mb-1">Điểm chữ</p>
              <p className="text-[#0f172a] text-[24px] font-bold">{gradedExam.scoreText}</p>
            </div>
            <div className="bg-[#d1fae5] border-2 border-[#059669] rounded-[12px] px-6 py-4">
              <p className="text-[#059669] text-[14px] font-semibold mb-1">Điểm số</p>
              <div className="flex items-end">
                <p className="text-[#059669] text-[48px] font-bold leading-none">{gradedExam.score}</p>
                <p className="text-[#059669] text-[18px] font-medium mb-1">/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Học sinh</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{gradedExam.student}</p>
          <p className="text-[#64748b] text-[14px]">{gradedExam.studentId}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Môn học</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{gradedExam.subject}</p>
          <p className="text-[#64748b] text-[14px]">{gradedExam.examId}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Ngày thi</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{gradedExam.submitted}</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-6 max-w-3xl">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-4">Thông tin chấm điểm</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#f8fafc] rounded-[8px] p-4">
            <p className="text-[#64748b] text-[13px] mb-1">Giảng viên chấm</p>
            <p className="text-[#0f172a] font-medium">{gradedExam.gradedBy}</p>
          </div>
          <div className="bg-[#f8fafc] rounded-[8px] p-4">
            <p className="text-[#64748b] text-[13px] mb-1">Ngày cập nhật điểm</p>
            <p className="text-[#0f172a] font-medium">{gradedExam.gradedDate}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-[#0f172a] font-semibold text-[15px] mb-2">Ghi chú / Nhận xét bài làm:</h3>
          <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 min-h-[100px]">
            {gradedExam.comments ? (
              <p className="text-[#0f172a] text-[15px]">{gradedExam.comments}</p>
            ) : (
              <p className="text-[#64748b] italic">Không có nhận xét nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}