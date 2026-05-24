import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export function DangNhap() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Login data:', formData);
      // Mock login - in real app, call API here
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#1e40af] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="bg-white rounded-[16px] shadow-[0px_10px_40px_0px_rgba(0,0,0,0.15)] p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-[#3b82f6] rounded-[12px] size-[64px] mb-4">
              <svg className="size-[36px]" fill="none" viewBox="0 0 24 24">
                <path d="M12 14L21 9L12 4L3 9L12 14ZM12 14L18.16 10.94C18.68 12.15 19 13.54 19 15C19 15.79 18.93 16.54 18.78 17.24M12 14L5.84 10.94C5.32 12.15 5 13.54 5 15C5 18.87 8.13 22 12 22C14.21 22 16.21 21.07 17.61 19.61M22 10V16M22 10L12 4M22 10L12 14M2 10L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-[#0f172a] text-[28px] font-bold mb-2">Đăng nhập</h1>
            <p className="text-[#64748b] text-[15px]">Chào mừng quay trở lại với EduManage</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-[#0f172a] text-[14px] font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="size-[20px] text-[#64748b]" fill="none" viewBox="0 0 24 24">
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[8px] pl-11 pr-4 py-3 text-[#0f172a] text-[15px] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-20`}
                    placeholder="example@uit.edu.vn"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0f172a] text-[14px] font-semibold mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="size-[20px] text-[#64748b]" fill="none" viewBox="0 0 24 24">
                      <path d="M12 15V17M6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#e2e8f0]'} rounded-[8px] pl-11 pr-11 py-3 text-[#0f172a] text-[15px] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-20`}
                    placeholder="Nhập mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a]"
                  >
                    {showPassword ? (
                      <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                        <path d="M13.875 18.825C13.26 18.93 12.636 19 12 19C7 19 2.73 15.11 1 10C2.13 6.67 4.89 4.07 8.31 2.89M6.61 6.61C4.62 7.96 3.06 9.89 2.18 12.18C3.73 16.39 7.54 19 12 19C13.55 19 15.03 18.68 16.38 18.11M9.88 9.88C9.32 10.44 9 11.2 9 12C9 13.66 10.34 15 12 15C12.8 15 13.56 14.68 14.12 14.12M12.01 5.07C12.34 5.02 12.67 5 13 5C18 5 22.27 8.89 24 14C23.28 16.15 21.88 18.02 20.05 19.38M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[13px] mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0] text-[#3b82f6] focus:ring-[#3b82f6]" />
                  <span className="text-[#64748b] text-[14px]">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-[#3b82f6] text-[14px] font-semibold hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3b82f6] text-white py-3 rounded-[8px] font-semibold text-[15px] hover:bg-[#2563eb] transition-colors mt-6 shadow-[0px_4px_12px_0px_rgba(59,130,246,0.3)]"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#64748b] text-[14px]">
              Chưa có tài khoản?{' '}
              <Link to="/dang-ky" className="text-[#3b82f6] font-semibold hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-white text-[13px] opacity-80">
            © 2026 EduManage. Hệ thống quản lý đề thi trực tuyến.
          </p>
        </div>
      </div>
    </div>
  );
}
