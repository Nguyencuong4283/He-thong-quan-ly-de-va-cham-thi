import { useState } from 'react';
import { useNavigate } from 'react-router';

type Difficulty = 'Dễ' | 'Trung Bình' | 'Phức Tạp' | 'Khó';

export function ThemCauHoi() {
  const navigate = useNavigate();

  const subjects = [
    'Hệ điều hành',
    'Mạng máy tính',
    'Pháp luật',
    'Lập trình hướng đối tượng',
    'Cơ sở dữ liệu',
  ];

  const [formData, setFormData] = useState({
    monHoc: '',
    doKho: '' as Difficulty | '',
    noiDung: '',
    outline: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.monHoc.trim()) {
      newErrors.monHoc = 'Vui lòng nhập môn học';
    }

    if (!formData.doKho) {
      newErrors.doKho = 'Vui lòng chọn độ khó';
    }

    if (!formData.noiDung.trim()) {
      newErrors.noiDung = 'Vui lòng nhập nội dung câu hỏi';
    }

    if (!formData.outline.trim()) {
      newErrors.outline = 'Vui lòng nhập outline/hướng dẫn để chấm điểm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const questionData = {
        ...formData,
      };
      console.log('New question:', questionData);
      alert('Câu hỏi đã được thêm thành công!');
      navigate('/ngan-hang-cau-hoi');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/ngan-hang-cau-hoi')}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] mb-4"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại</span>
        </button>
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">THÊM CÂU HỎI MỚI</h1>
        <p className="text-[#64748b] text-[16px]">Tạo câu hỏi mới theo biểu mẫu BM1</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-w-[1000px]">
        <div className="mb-6 pb-6 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#0f172a] text-[24px] font-bold">BM1</h2>
            <h2 className="text-[#0f172a] text-[24px] font-bold">CÂU HỎI TỰ LUẬN</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Subject */}
          <div className="mb-6">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
              Môn học: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.monHoc}
              onChange={(e) => handleInputChange('monHoc', e.target.value)}
              className={`w-full border ${errors.monHoc ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
            >
              <option value="">Chọn môn học</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            {errors.monHoc && (
              <p className="text-red-500 text-[13px] mt-1">{errors.monHoc}</p>
            )}
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
              Độ khó: <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.doKho}
              onChange={(e) => handleInputChange('doKho', e.target.value)}
              className={`w-full border ${errors.doKho ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
            >
              <option value="">Chọn độ khó</option>
              <option value="Dễ">Dễ</option>
              <option value="Trung Bình">Trung Bình</option>
              <option value="Phức Tạp">Phức Tạp</option>
              <option value="Khó">Khó</option>
            </select>
            <p className="text-[#64748b] text-[13px] mt-1">
              QĐ1: Giảng viên hiện đang giảng dạy 4 môn. Có 4 độ khó (Dễ, Trung Bình, Phức Tạp, Khó)
            </p>
            {errors.doKho && (
              <p className="text-red-500 text-[13px] mt-1">{errors.doKho}</p>
            )}
          </div>

          {/* Question Content */}
          <div className="mb-6">
            <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
              Nội dung câu hỏi: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.noiDung}
              onChange={(e) => handleInputChange('noiDung', e.target.value)}
              className={`w-full border ${errors.noiDung ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-3 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] min-h-[150px]`}
              placeholder="Nhập nội dung câu hỏi..."
            />
            {errors.noiDung && (
              <p className="text-red-500 text-[13px] mt-1">{errors.noiDung}</p>
            )}
          </div>

          {/* Essay Outline */}
          <div className="mb-8">
            <div className="mb-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-4">
              <p className="text-[#64748b] text-[14px]">
                📝 Học sinh sẽ trả lời bằng văn bản và giảng viên sẽ chấm điểm dựa trên Outline / Hướng dẫn chấm điểm.
              </p>
            </div>

            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Outline / Hướng dẫn chấm điểm: <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.outline}
                onChange={(e) => handleInputChange('outline', e.target.value)}
                className={`w-full border ${errors.outline ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-3 text-[#0f172a] focus:outline-none focus:border-[#3b82f6] min-h-[150px]`}
                placeholder="Nhập outline chi tiết, các ý chính hoặc tiêu chí và mức điểm tương ứng để hỗ trợ quá trình chấm thi..."
              />
              {errors.outline && (
                <p className="text-red-500 text-[13px] mt-1">{errors.outline}</p>
              )}
            </div>
          </div>

          {/* Regulation */}
          <div className="pt-6 border-t border-[#e2e8f0]">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Thêm câu hỏi
              </button>

              <button
                type="button"
                onClick={() => navigate('/ngan-hang-cau-hoi')}
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