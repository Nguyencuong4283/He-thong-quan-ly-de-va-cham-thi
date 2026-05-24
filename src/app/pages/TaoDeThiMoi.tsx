import { useState } from 'react';
import { useNavigate } from 'react-router';

interface BankQuestion {
  id: string;
  subject: string;
  type: string;
  difficulty: string;
  topic: string;
  usage: number;
}

interface SelectedQuestion extends BankQuestion {
  orderIndex: number;
}

export function TaoDeThiMoi() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenMonThi: '',
    hocKy: '',
    namHoc: '',
    thoiLuong: 30,
  });

  const [selectedQuestions, setSelectedQuestions] = useState<SelectedQuestion[]>([]);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const allBankQuestions: BankQuestion[] = [
    { id: 'Q-IT007-001', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management', usage: 3 },
    { id: 'Q-IT007-002', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management', usage: 2 },
    { id: 'Q-IT005-001', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model', usage: 5 },
    { id: 'Q-IT005-002', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP', usage: 4 },
    { id: 'Q-SS006-001', subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp', usage: 6 },
    { id: 'Q-IT008-001', subject: 'Lập trình hướng đối tượng', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Kế thừa và đa hình', usage: 4 },
    { id: 'Q-IT008-002', subject: 'Lập trình hướng đối tượng', type: 'Tự luận', difficulty: 'Khó', topic: 'Design Patterns', usage: 2 },
  ];

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const subjects = Array.from(new Set(allBankQuestions.map(q => q.subject)));

  const filteredBankQuestions = allBankQuestions.filter(question => {
    const matchesDifficulty = filterDifficulty === '' || question.difficulty === filterDifficulty;
    const matchesSubject = filterSubject === '' || question.subject === filterSubject;
    const notSelected = !selectedQuestions.some(q => q.id === question.id);

    return matchesDifficulty && matchesSubject && notSelected;
  });

  const addQuestionFromBank = (question: BankQuestion) => {
    if (selectedQuestions.length < 5) {
      setSelectedQuestions([...selectedQuestions, { ...question, orderIndex: selectedQuestions.length + 1 }]);
      setShowQuestionBank(false);
      setFilterDifficulty('');
      setFilterSubject('');
      if (errors.questions) {
        setErrors({ ...errors, questions: '' });
      }
    }
  };

  const removeQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId).map((q, index) => ({ ...q, orderIndex: index + 1 })));
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

    if (selectedQuestions.length === 0) {
      newErrors.questions = 'Vui lòng chọn ít nhất một câu hỏi từ ngân hàng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form data:', { ...formData, questions: selectedQuestions });
      alert('Đề thi đã được tạo thành công!');
      navigate('/de-thi');
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', { ...formData, questions: selectedQuestions });
    alert('Đã lưu bản nháp!');
  };

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
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">TẠO ĐỀ THI MỚI</h1>
        <p className="text-[#64748b] text-[16px]">Tạo đề thi theo biểu mẫu BM2</p>
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
              {selectedQuestions.length < 5 && (
                <button
                  type="button"
                  onClick={() => setShowQuestionBank(true)}
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

            {selectedQuestions.length === 0 ? (
              <div className="border-2 border-dashed border-[#e2e8f0] rounded-[8px] p-12 text-center">
                <svg className="size-[48px] text-[#cbd5e1] mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[#64748b] text-[16px] mb-3">Chưa có câu hỏi nào được chọn</p>
                <button
                  type="button"
                  onClick={() => setShowQuestionBank(true)}
                  className="text-[#3b82f6] text-[14px] font-semibold hover:underline"
                >
                  Chọn câu hỏi từ ngân hàng
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedQuestions.map((question) => (
                  <div key={question.id} className="border border-[#e2e8f0] rounded-[8px] p-4 bg-white hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#0f172a] font-bold text-[16px]">Câu {question.orderIndex}:</span>
                          <span className="text-[#3b82f6] font-medium text-[14px]">{question.id}</span>
                          <span
                            className={`px-3 py-1 rounded-[20px] text-[12px] font-semibold ${
                              question.difficulty === 'Dễ'
                                ? 'bg-[#d1fae5] text-[#059669]'
                                : question.difficulty === 'Trung bình'
                                ? 'bg-[#fef3c7] text-[#d97706]'
                                : 'bg-[#fee2e2] text-[#dc2626]'
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </div>
                        <p className="text-[#64748b] text-[14px]">
                          <span className="font-medium">Môn học:</span> {question.subject} | <span className="font-medium">Chủ đề:</span> {question.topic}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700 p-1 ml-4"
                        title="Xóa câu hỏi"
                      >
                        <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showQuestionBank && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-[12px] shadow-xl max-w-[900px] w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-[#e2e8f0]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[#0f172a] text-[24px] font-bold">Chọn câu hỏi từ Ngân hàng</h2>
                    <button
                      onClick={() => {
                        setShowQuestionBank(false);
                        setFilterDifficulty('');
                        setFilterSubject('');
                      }}
                      className="text-[#64748b] hover:text-[#0f172a] p-1"
                    >
                      <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filterSubject}
                      onChange={(e) => setFilterSubject(e.target.value)}
                      className="border border-[#e2e8f0] rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] flex-1"
                    >
                      <option value="">Tất cả môn học</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      className="border border-[#e2e8f0] rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] flex-1"
                    >
                      <option value="">Tất cả độ khó</option>
                      <option value="Dễ">Dễ</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Khó">Khó</option>
                    </select>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  {filteredBankQuestions.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="size-[48px] text-[#cbd5e1] mx-auto mb-3" fill="none" viewBox="0 0 24 24">
                        <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-[#64748b] text-[16px]">Không tìm thấy câu hỏi nào</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredBankQuestions.map((question) => (
                        <div
                          key={question.id}
                          className="border border-[#e2e8f0] rounded-[8px] p-4 hover:border-[#3b82f6] hover:bg-[#f8fafc] cursor-pointer transition-all"
                          onClick={() => addQuestionFromBank(question)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[#3b82f6] font-semibold text-[14px]">{question.id}</span>
                              <span
                                className={`px-3 py-1 rounded-[20px] text-[12px] font-semibold ${
                                  question.difficulty === 'Dễ'
                                    ? 'bg-[#d1fae5] text-[#059669]'
                                    : question.difficulty === 'Trung bình'
                                    ? 'bg-[#fef3c7] text-[#d97706]'
                                    : 'bg-[#fee2e2] text-[#dc2626]'
                                }`}
                              >
                                {question.difficulty}
                              </span>
                            </div>
                            <svg className="size-[20px] text-[#10b981]" fill="none" viewBox="0 0 24 24">
                              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <p className="text-[#0f172a] font-medium text-[14px] mb-1">{question.subject}</p>
                          <p className="text-[#64748b] text-[13px]">Chủ đề: {question.topic}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc]">
                  <p className="text-[#64748b] text-[13px] text-center">
                    Đã chọn {selectedQuestions.length}/5 câu hỏi
                  </p>
                </div>
              </div>
            </div>
          )}

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
                Tạo đề thi
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
