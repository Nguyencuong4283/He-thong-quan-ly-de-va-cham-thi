import { Link } from 'react-router';
import svgPaths from "../../imports/DềThi/svg-kdizl55zy0";

export function DeThi() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">ĐỀ THI</h1>
          <p className="text-[#64748b] text-[16px]">Quản lý đề thi và đáp án do bạn sáng tạo</p>
        </div>
        <Link
          to="/de-thi/tao-moi"
          className="bg-[#3b82f6] h-[40px] rounded-[8px] px-5 flex items-center gap-2 hover:bg-[#2563eb] transition-colors"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M6 13H20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M13 6V20" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
          <span className="font-bold text-[14px] text-white">Tạo đề thi</span>
        </Link>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">ID của Đề Thi</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Môn học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Học kì & Năm học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thời gian</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#e2e8f0]">
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">EX-IT007-2025-01</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Hệ điều hành</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Fall 2025</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">90 phút</td>
              <td className="px-6 py-6">
                <div className="flex gap-2">
                  <button className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc]" title="Xem chi tiết">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p31e77980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p11c4fd00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p258ef980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <Link to="/de-thi/chinh-sua/EX-IT007-2025-01" className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc] inline-block" title="Chỉnh sửa">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p37c73510} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
            <tr className="border-b border-[#e2e8f0]">
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">EX-IT005-2025-02</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Nhập môn mạng máy tính</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Fall 2025</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">60 phút</td>
              <td className="px-6 py-6">
                <div className="flex gap-2">
                  <button className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc]" title="Xem chi tiết">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p31e77980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p11c4fd00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p258ef980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <Link to="/de-thi/chinh-sua/EX-IT005-2025-02" className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc] inline-block" title="Chỉnh sửa">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p37c73510} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
            <tr className="border-b border-[#e2e8f0]">
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">EX-SS006-2025-01</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Pháp luật đại cương</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">Spring 2026</td>
              <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">60 phút</td>
              <td className="px-6 py-6">
                <div className="flex gap-2">
                  <button className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc]" title="Xem chi tiết">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p31e77980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p11c4fd00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d={svgPaths.p258ef980} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </button>
                  <Link to="/de-thi/chinh-sua/EX-SS006-2025-01" className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc] inline-block" title="Chỉnh sửa">
                    <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path d={svgPaths.p37c73510} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
