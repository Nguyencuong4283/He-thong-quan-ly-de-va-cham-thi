import { useState } from 'react';
import imgImg from '../../imports/CaiDặt/cf009e9b858b3b0bc726bb62ae99b0df4508f554.png';

export function CaiDat() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Thông tin bản thân', icon: '👤' },
    { id: 'notifications', label: 'Thông báo', icon: '🔔' },
    { id: 'security', label: 'Bảo mật', icon: '🔒' },
    { id: 'appearance', label: 'Giao diện', icon: '🎨' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">Tài khoản</h1>
        <p className="text-[#64748b] text-[16px]">Cập nhật thông tin hồ sơ của bạn.</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
        </div>

        <div className="col-span-3 bg-white border border-[#e2e8f0] rounded-[12px] p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
                Thông tin đầy đủ về profile
              </h2>

              <div className="flex items-center gap-6 mb-8">
                <div className="rounded-full size-[80px] overflow-hidden">
                  <img alt="" className="w-full h-full object-cover" src={imgImg} />
                </div>
                <div>
                  <div className="flex gap-3 mb-2">
                    <button className="bg-[#3b82f6] text-white px-4 py-2 rounded-[8px] text-[13.333px] font-semibold hover:bg-[#2563eb]">
                      Change Avatar
                    </button>
                    <button className="border border-[#e2e8f0] px-4 py-2 rounded-[8px] text-[13.333px] font-semibold hover:bg-[#f8fafc]">
                      Remove
                    </button>
                  </div>
                  <p className="text-[#64748b] text-[13.6px]">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Tên</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2 text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Họ</label>
                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2 text-[#0f172a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="dr.smith@university.edu"
                      className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2 text-[#0f172a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Academic Title</label>
                    <input
                      type="text"
                      defaultValue="Senior Lecturer"
                      className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2 text-[#0f172a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Department</label>
                  <select className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2 text-[#0f172a]">
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#3b82f6] text-white px-6 py-2 rounded-[8px] font-semibold hover:bg-[#2563eb]"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
                Cài đặt thông báo
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Thông báo email khi có đề thi mới', checked: true },
                  { label: 'Thông báo khi học sinh nộp bài', checked: true },
                  { label: 'Thông báo báo cáo hàng tuần', checked: false },
                  { label: 'Thông báo hệ thống', checked: true },
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 p-4 border border-[#e2e8f0] rounded-[8px]">
                    <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5" />
                    <span className="text-[#0f172a]">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
                Bảo mật tài khoản
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    className="w-full border border-[#e2e8f0] rounded-[6px] px-3 py-2"
                  />
                </div>
                <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-[8px] font-semibold hover:bg-[#2563eb]">
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-[#0f172a] text-[20px] font-semibold mb-6 pb-4 border-b border-[#e2e8f0]">
                Giao diện
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#64748b] text-[13.6px] font-semibold mb-2">Chế độ hiển thị</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Sáng', 'Tối', 'Tự động'].map((mode) => (
                      <label key={mode} className="border-2 border-[#e2e8f0] rounded-[8px] p-4 cursor-pointer hover:border-[#3b82f6]">
                        <input type="radio" name="theme" className="mr-2" />
                        <span className="text-[#0f172a]">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
