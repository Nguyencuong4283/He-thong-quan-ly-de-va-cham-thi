import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface ExamSubmission {
  id: string;
  examId: string;
  examName: string;
  student: string;
  studentId: string;
  subject: string;
  submitted: string; // Trong trường hợp thi giấy, có thể hiểu là ngày nộp bài thi giấy
}

// Mock data cho bài thi giấy
const mockSubmissions: Record<string, ExamSubmission> = {
  'SUB-001': {
    id: 'SUB-001',
    examId: 'EX-IT007-2025-01',
    examName: 'Hệ điều hành',
    student: 'Nguyễn Văn A',
    studentId: 'SV001',
    subject: 'Hệ điều hành',
    submitted: '25/04/2026',
  },
  'SUB-003': {
    id: 'SUB-003',
    examId: 'EX-IT005-2025-02',
    examName: 'Nhập môn mạng máy tính',
    student: 'Lê Văn C',
    studentId: 'SV003',
    subject: 'Nhập môn mạng máy tính',
    submitted: '25/04/2026',
  },
  'SUB-005': {
    id: 'SUB-005',
    examId: 'EX-SS006-2025-01',
    examName: 'Pháp luật đại cương',
    student: 'Hoàng Văn E',
    studentId: 'SV005',
    subject: 'Pháp luật đại cương',
    submitted: '24/04/2026',
  },
};

export function ChamDiem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [submission, setSubmission] = useState<ExamSubmission | null>(null);
  const [scoreNumber, setScoreNumber] = useState('');
  const [scoreText, setScoreText] = useState('');
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && mockSubmissions[id]) {
      setSubmission(mockSubmissions[id]);
      setLoading(false);
    } else {
      // Giả lập tìm thấy nếu không trùng mock data để test UI
      setSubmission({
        id: id || 'SUB-UNKNOWN',
        examId: 'EX-UNKNOWN',
        examName: 'Chưa xác định',
        student: 'Nguyễn Văn Test',
        studentId: 'SV-TEST',
        subject: 'Chưa xác định',
        submitted: '25/04/2026',
      });
      setLoading(false);
    }
  }, [id, navigate]);

  const handleScoreNumberChange = (value: string) => {
    setScoreNumber(value);
    if (errors.scoreNumber) {
      setErrors({ ...errors, scoreNumber: '' });
    }
  };

  const handleScoreTextChange = (value: string) => {
    setScoreText(value);
    if (errors.scoreText) {
      setErrors({ ...errors, scoreText: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const scoreNum = parseFloat(scoreNumber);
    if (!scoreNumber) {
      newErrors.scoreNumber = 'Vui lòng nhập điểm số';
    } else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      newErrors.scoreNumber = 'Điểm số phải từ 0 đến 10';
    }

    if (!scoreText.trim()) {
      newErrors.scoreText = 'Vui lòng nhập điểm chữ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Grading result:', { submissionId: id, scoreNumber, scoreText, comments });
      alert(`Đã nhập điểm thành công!\nĐiểm số: ${scoreNumber}\nĐiểm chữ: ${scoreText}`);
      navigate(-1); // Quay lại trang danh sách lớp trước đó
    }
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

  if (!submission) return null;

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
          <span>Quay lại</span>
        </button>
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">NHẬP ĐIỂM BÀI THI GIẤY</h1>
        <p className="text-[#64748b] text-[16px]">Mã phách / Mã bài thi: {submission.id}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Học sinh</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{submission.student}</p>
          <p className="text-[#64748b] text-[14px]">{submission.studentId}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Môn học</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{submission.subject}</p>
          <p className="text-[#64748b] text-[14px]">{submission.examId}</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13px] mb-1">Ngày thi</p>
          <p className="text-[#0f172a] font-semibold text-[18px]">{submission.submitted}</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-w-3xl">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
          Thông tin điểm số
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Điểm số (0-10): <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={scoreNumber}
                  onChange={(e) => handleScoreNumberChange(e.target.value)}
                  className={`w-full border ${errors.scoreNumber ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-3 text-[#0f172a] text-[18px] font-bold focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: 8.5"
                />
              </div>
              {errors.scoreNumber && (
                <p className="text-red-500 text-[13px] mt-1">{errors.scoreNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Điểm chữ: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={scoreText}
                onChange={(e) => handleScoreTextChange(e.target.value)}
                className={`w-full border ${errors.scoreText ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-3 text-[#0f172a] text-[18px] font-bold focus:outline-none focus:border-[#3b82f6]`}
                placeholder="VD: Tám phẩy năm"
              />
              {errors.scoreText && (
                <p className="text-red-500 text-[13px] mt-1">{errors.scoreText}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
              Ghi chú / Nhận xét bài làm (nếu có):
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border border-[#e2e8f0] rounded-[6px] px-4 py-3 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] min-h-[120px]"
              placeholder="Nhập ghi chú hoặc nhận xét..."
            />
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-[#e2e8f0]">
            <button
              type="submit"
              className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
            >
              <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Lưu điểm
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-[#64748b] px-6 py-3 rounded-[8px] font-semibold hover:bg-[#f8fafc]"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}