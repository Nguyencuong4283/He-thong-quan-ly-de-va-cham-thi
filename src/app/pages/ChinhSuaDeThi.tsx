import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

interface Question {
  id: number;
  content: string;
}

interface ExamData {
  id: string;
  tenMonThi: string;
  hocKy: string;
  namHoc: string;
  thoiLuong: number;
  questions: Question[];
  status: string;
}

// Mock data - trong thực tế sẽ fetch từ API
const mockExams: Record<string, ExamData> = {
  'EX-IT007-2025-01': {
    id: 'EX-IT007-2025-01',
    tenMonThi: 'Hệ điều hành',
    hocKy: 'Fall 2025',
    namHoc: '2025-2026',
    thoiLuong: 90,
    status: 'Hoàn thành',
    questions: [
      { id: 1, content: 'Giải thích khái niệm về process và thread trong hệ điều hành.' },
      { id: 2, content: 'Trình bày các thuật toán lập lịch CPU phổ biến.' },
      { id: 3, content: 'Phân tích vấn đề deadlock và cách phòng tránh.' },
    ],
  },
  'EX-IT005-2025-02': {
    id: 'EX-IT005-2025-02',
    tenMonThi: 'Nhập môn mạng máy tính',
    hocKy: 'Fall 2025',
    namHoc: '2025-2026',
    thoiLuong: 60,
    status: 'Hoàn thành',
    questions: [
      { id: 1, content: 'Giải thích mô hình OSI 7 lớp.' },
      { id: 2, content: 'So sánh giao thức TCP và UDP.' },
    ],
  },
  'EX-SS006-2025-01': {
    id: 'EX-SS006-2025-01',
    tenMonThi: 'Pháp luật đại cương',
    hocKy: 'Spring 2026',
    namHoc: '2025-2026',
    thoiLuong: 60,
    status: 'Bản nháp',
    questions: [
      { id: 1, content: 'Trình bày cấu trúc của Hiến pháp Việt Nam.' },
      { id: 2, content: 'Phân tích vai trò của pháp luật trong xã hội.' },
    ],
  },
};

export function ChinhSuaDeThi() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    tenMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 30,
  });

  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, content: '' },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load exam data
    if (id && mockExams[id]) {
      const exam = mockExams[id];
      setFormData({
        tenMonThi: exam.tenMonThi,
        hocKy: exam.hocKy,
        namHoc: exam.namHoc,
        thoiLuong: exam.thoiLuong,
      });
      setQuestions(exam.questions);
      setLoading(false);
    } else {
      // Exam not found
      alert('Không tìm thấy đề thi!');
      navigate('/de-thi');
    }
  }, [id, navigate]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleQuestionChange = (id: number, content: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, content } : q));
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      const maxId = Math.max(...questions.map(q => q.id), 0);
      setQuestions([...questions, { id: maxId + 1, content: '' }]);
    }
  };

  const removeQuestion = (questionId: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.tenMonThi.trim()) {
      newErrors.tenMonThi = 'Vui lòng nhập tên môn thi';
    }

    if (!formData.hocKy.trim()) {
      newErrors.hocKy = 'Vui lòng nhập học kỳ';
    }

    if (!formData.namHoc.trim()) {
      newErrors.namHoc = 'Vui lòng nhập năm học';
    }

    if (formData.thoiLuong < 30 || formData.thoiLuong > 180) {
      newErrors.thoiLuong = 'Thời lượng phải từ 30 đến 180 phút';
    }

    const hasEmptyQuestion = questions.some(q => !q.content.trim());
    if (hasEmptyQuestion) {
      newErrors.questions = 'Vui lòng điền nội dung cho tất cả các câu hỏi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Updated exam data:', { id, ...formData, questions });
      alert('Đề thi đã được cập nhật thành công!');
      navigate('/de-thi');
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { id, ...formData, questions });
    alert('Đã lưu bản nháp!');
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/de-thi')}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] mb-4"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">CHỈNH SỬA ĐỀ THI</h1>
            <p className="text-[#64748b] text-[16px]">Mã đề thi: {id}</p>
          </div>
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] px-4 py-2">
            <p className="text-[#64748b] text-[13px]">Trạng thái</p>
            <p className="text-[#0f172a] font-semibold">{mockExams[id!]?.status}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-w-[1200px]">
        <div className="mb-6 pb-6 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#0f172a] text-[24px] font-bold">BM2</h2>
            <h2 className="text-[#0f172a] text-[24px] font-bold">ĐỀ THI</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Tên môn thi: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.tenMonThi}
                onChange={(e) => handleInputChange('tenMonThi', e.target.value)}
                className={`w-full border ${errors.tenMonThi ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                placeholder="VD: Hệ điều hành"
              />
              {errors.tenMonThi && (
                <p className="text-red-500 text-[13px] mt-1">{errors.tenMonThi}</p>
              )}
            </div>

            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Học kỳ: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.hocKy}
                onChange={(e) => handleInputChange('hocKy', e.target.value)}
                className={`w-full border ${errors.hocKy ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
              >
                <option value="">Chọn học kỳ</option>
                <option value="Fall 2025">Fall 2025</option>
                <option value="Spring 2026">Spring 2026</option>
                <option value="Summer 2026">Summer 2026</option>
              </select>
              {errors.hocKy && (
                <p className="text-red-500 text-[13px] mt-1">{errors.hocKy}</p>
              )}
            </div>

            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Năm học: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namHoc}
                onChange={(e) => handleInputChange('namHoc', e.target.value)}
                className={`w-full border ${errors.namHoc ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                placeholder="VD: 2025-2026"
              />
              {errors.namHoc && (
                <p className="text-red-500 text-[13px] mt-1">{errors.namHoc}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
              Thời lượng (phút): <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="30"
                max="180"
                step="10"
                value={formData.thoiLuong}
                onChange={(e) => handleInputChange('thoiLuong', parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min="30"
                max="180"
                value={formData.thoiLuong}
                onChange={(e) => handleInputChange('thoiLuong', parseInt(e.target.value))}
                className={`w-[100px] border ${errors.thoiLuong ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
              />
              <span className="text-[#64748b]">phút</span>
            </div>
            <p className="text-[#64748b] text-[13px] mt-1">
              QĐ2: Thời lượng thi tối đa là 180 phút và tối thiểu là 30 phút
            </p>
            {errors.thoiLuong && (
              <p className="text-red-500 text-[13px] mt-1">{errors.thoiLuong}</p>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[#0f172a] text-[18px] font-semibold">
                  Câu hỏi <span className="text-red-500">*</span>
                </h3>
                <p className="text-[#64748b] text-[13px]">
                  QĐ2: Đề thi có tối đa 5 câu
                </p>
              </div>
              {questions.length < 5 && (
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-[#10b981] text-white px-4 py-2 rounded-[6px] text-[14px] font-semibold hover:bg-[#059669] flex items-center gap-2"
                >
                  <svg className="size-[16px]" fill="none" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Thêm câu hỏi
                </button>
              )}
            </div>

            {errors.questions && (
              <p className="text-red-500 text-[14px] mb-4 bg-red-50 border border-red-200 rounded-[6px] p-3">
                {errors.questions}
              </p>
            )}

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-[#e2e8f0] rounded-[8px] p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-[#0f172a] font-semibold text-[16px]">
                      Câu {index + 1}:
                    </h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <textarea
                    value={question.content}
                    onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                    className="w-full border border-[#e2e8f0] rounded-[6px] px-4 py-3 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] min-h-[120px]"
                    placeholder="Nhập nội dung câu hỏi..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#e2e8f0]">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-4 mb-6">
              <h4 className="text-[#0f172a] font-semibold mb-2">Quy định (QĐ2):</h4>
              <ul className="text-[#64748b] text-[14px] space-y-1 list-disc list-inside">
                <li>Đề thi có tối đa 5 câu</li>
                <li>Giảng viên ước tính số lượng lớp giảng dạy trong một năm là 50 lớp</li>
                <li>Thời lượng thi tối đa là 180 phút và tối thiểu là 30 phút</li>
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Cập nhật đề thi
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="bg-white border border-[#e2e8f0] text-[#0f172a] px-6 py-3 rounded-[8px] font-semibold hover:bg-[#f8fafc] flex items-center gap-2"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                  <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Lưu bản nháp
              </button>

              <button
                type="button"
                onClick={() => navigate('/de-thi')}
                className="text-[#64748b] px-6 py-3 rounded-[8px] font-semibold hover:bg-[#f8fafc]"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
