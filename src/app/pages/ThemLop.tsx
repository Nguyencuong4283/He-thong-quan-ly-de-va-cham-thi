import { useState } from 'react';
import { useNavigate } from 'react-router';

export function ThemLop() {
  const navigate = useNavigate();

  const subjects = [
    'Hệ điều hành',
    'Mạng máy tính',
    'Pháp luật',
    'Lập trình hướng đối tượng',
  ];

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    semester: '',
    year: '',
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

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập mã lớp';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng chọn môn học';
    }

    if (!formData.semester.trim()) {
      newErrors.semester = 'Vui lòng chọn học kỳ';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Vui lòng nhập năm học';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('New class:', formData);
      alert('Lớp học đã được tạo thành công!');
      navigate('/quan-ly-lop');
    }
  };

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
          <span>Quay lại</span>
        </button>
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">THÊM LỚP HỌC MỚI</h1>
        <p className="text-[#64748b] text-[16px]">Tạo lớp học mới và quản lý danh sách học sinh</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] max-w-[800px]">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
          Thông tin lớp học
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Mã lớp: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                placeholder="VD: IT007.N11"
              />
              {errors.name && (
                <p className="text-red-500 text-[13px] mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                Môn học: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`w-full border ${errors.subject ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
              >
                <option value="">Chọn môn học</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-500 text-[13px] mt-1">{errors.subject}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  Học kỳ: <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => handleInputChange('semester', e.target.value)}
                  className={`w-full border ${errors.semester ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                >
                  <option value="">Chọn học kỳ</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2026">Spring 2026</option>
                  <option value="Summer 2026">Summer 2026</option>
                </select>
                {errors.semester && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.semester}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  Năm học: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className={`w-full border ${errors.year ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: 2025-2026"
                />
                {errors.year && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.year}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-[#e2e8f0]">
            <button
              type="submit"
              className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
            >
              <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tạo lớp học
            </button>

            <button
              type="button"
              onClick={() => navigate('/quan-ly-lop')}
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
