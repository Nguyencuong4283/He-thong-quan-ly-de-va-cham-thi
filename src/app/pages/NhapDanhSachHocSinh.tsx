import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

interface Student {
  mssv: string;
  name: string;
  email: string;
  phone: string;
}

export function NhapDanhSachHocSinh() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [importMethod, setImportMethod] = useState<'manual' | 'excel'>('manual');
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    mssv: '',
    name: '',
    email: '',
    phone: '',
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

    if (!formData.mssv.trim()) {
      newErrors.mssv = 'Vui lòng nhập MSSV';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const isDuplicate = students.some(s => s.mssv === formData.mssv);

      if (isDuplicate) {
        setErrors({ mssv: 'MSSV đã tồn tại trong danh sách' });
        return;
      }

      setStudents([...students, { ...formData }]);
      setFormData({ mssv: '', name: '', email: '', phone: '' });
    }
  };

  const handleRemoveStudent = (mssv: string) => {
    setStudents(students.filter(s => s.mssv !== mssv));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());

        if (lines.length < 2) {
          alert('File không có dữ liệu hoặc sai định dạng.');
          return;
        }

        const newStudents: Student[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
          if (cells.length >= 4 && cells[0]) {
            newStudents.push({
              mssv: cells[0],
              name: cells[1],
              email: cells[2],
              phone: cells[3],
            });
          }
        }

        const existingMSSVs = new Set(students.map(s => s.mssv));
        const uniqueNewStudents = newStudents.filter(s => !existingMSSVs.has(s.mssv));
        const duplicateCount = newStudents.length - uniqueNewStudents.length;

        setStudents([...students, ...uniqueNewStudents]);

        if (uniqueNewStudents.length > 0) {
          alert(`Đã nhập thành công ${uniqueNewStudents.length} học sinh!${duplicateCount > 0 ? ` (Bỏ qua ${duplicateCount} MSSV trùng lặp)` : ''}`);
        } else {
          alert('Không có học sinh mới nào được thêm. Tất cả MSSV đã tồn tại.');
        }
      } catch (error) {
        alert('Lỗi khi đọc file. Vui lòng kiểm tra định dạng file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const downloadSampleFile = () => {
    const csvContent = 'MSSV,Họ tên,Email,Số điện thoại\n21520001,Nguyễn Văn A,student1@uit.edu.vn,0123456789\n21520002,Trần Thị B,student2@uit.edu.vn,0987654321\n21520003,Lê Văn C,student3@uit.edu.vn,0912345678';
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'mau_danh_sach_hoc_sinh.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = () => {
    if (students.length === 0) {
      alert('Vui lòng thêm ít nhất 1 học sinh');
      return;
    }

    console.log('Importing students to class:', id, students);
    alert(`Đã nhập thành công ${students.length} học sinh!`);
    navigate(`/quan-ly-lop/chi-tiet/${id}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(`/quan-ly-lop/chi-tiet/${id}`)}
          className="flex items-center gap-2 text-[#64748b] hover:text-[#0f172a] mb-4"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Quay lại</span>
        </button>
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">NHẬP DANH SÁCH HỌC SINH</h1>
        <p className="text-[#64748b] text-[16px]">Thêm học sinh vào lớp học</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-6">
        <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
          Chọn phương thức nhập
        </h2>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setImportMethod('manual')}
            className={`flex-1 border-2 ${importMethod === 'manual' ? 'border-[#3b82f6] bg-[#eff6ff]' : 'border-[#e2e8f0] bg-white'} rounded-[8px] p-6 transition-all hover:border-[#3b82f6]`}
          >
            <svg className="size-[32px] mx-auto mb-3 text-[#3b82f6]" fill="none" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#0f172a] text-[16px] font-semibold">Nhập thủ công</p>
            <p className="text-[#64748b] text-[14px] mt-1">Nhập từng học sinh một</p>
          </button>

          <button
            onClick={() => setImportMethod('excel')}
            className={`flex-1 border-2 ${importMethod === 'excel' ? 'border-[#3b82f6] bg-[#eff6ff]' : 'border-[#e2e8f0] bg-white'} rounded-[8px] p-6 transition-all hover:border-[#3b82f6]`}
          >
            <svg className="size-[32px] mx-auto mb-3 text-[#10b981]" fill="none" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#0f172a] text-[16px] font-semibold">Nhập từ Excel</p>
            <p className="text-[#64748b] text-[14px] mt-1">Tải file Excel/CSV</p>
          </button>
        </div>

        {importMethod === 'manual' ? (
          <form onSubmit={handleAddStudent}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  MSSV: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mssv}
                  onChange={(e) => handleInputChange('mssv', e.target.value)}
                  className={`w-full border ${errors.mssv ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: 21520001"
                />
                {errors.mssv && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.mssv}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  Họ tên: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full border ${errors.name ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: Nguyễn Văn A"
                />
                {errors.name && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  Email: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: student@uit.edu.vn"
                />
                {errors.email && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0f172a] text-[15px] font-semibold mb-2">
                  Số điện thoại: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[6px] px-4 py-2 text-[#0f172a] focus:outline-none focus:border-[#3b82f6]`}
                  placeholder="VD: 0123456789"
                />
                {errors.phone && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] flex items-center gap-2"
            >
              <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Thêm học sinh
            </button>
          </form>
        ) : (
          <div>
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-[8px] p-8 text-center">
              <svg className="size-[48px] mx-auto mb-4 text-[#64748b]" fill="none" viewBox="0 0 24 24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[#0f172a] text-[16px] font-semibold mb-2">Tải file Excel/CSV</p>
              <p className="text-[#64748b] text-[14px] mb-4">File phải có định dạng: MSSV, Họ tên, Email, Số điện thoại</p>
              <div className="flex gap-3 justify-center">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-[#3b82f6] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#2563eb] cursor-pointer inline-flex items-center gap-2"
                >
                  <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Chọn file
                </label>
                <button
                  onClick={downloadSampleFile}
                  className="bg-[#10b981] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#059669] inline-flex items-center gap-2"
                >
                  <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Tải file mẫu
                </button>
              </div>
            </div>
            <div className="mt-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-4">
              <div className="flex items-start gap-3">
                <svg className="size-[20px] text-[#3b82f6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[#0f172a] text-[14px] font-semibold mb-2">Hướng dẫn nhập file:</p>
                  <ul className="text-[#64748b] text-[13px] space-y-1 list-disc list-inside">
                    <li>File CSV phải có dòng tiêu đề: MSSV,Họ tên,Email,Số điện thoại</li>
                    <li>Mỗi học sinh chiếm một dòng với 4 trường thông tin cách nhau bởi dấu phẩy</li>
                    <li>MSSV trùng lặp sẽ tự động bỏ qua</li>
                    <li>Khuyến nghị: Tải file mẫu để đảm bảo đúng định dạng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {students.length > 0 && (
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <h2 className="text-[#0f172a] text-[20px] font-semibold">
              Danh sách đã thêm ({students.length})
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">MSSV</th>
                <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Họ tên</th>
                <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Email</th>
                <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Số điện thoại</th>
                <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.mssv} className="border-b border-[#e2e8f0]">
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{student.mssv}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{student.name}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{student.email}</td>
                  <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{student.phone}</td>
                  <td className="px-6 py-6">
                    <button
                      onClick={() => handleRemoveStudent(student.mssv)}
                      className="text-red-500 hover:text-red-700 font-semibold text-[14px]"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {students.length > 0 && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-[#10b981] text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-[#059669] flex items-center gap-2"
          >
            <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Hoàn tất nhập ({students.length} học sinh)
          </button>

          <button
            onClick={() => navigate(`/quan-ly-lop/chi-tiet/${id}`)}
            className="text-[#64748b] px-6 py-3 rounded-[8px] font-semibold hover:bg-[#f8fafc]"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
}
