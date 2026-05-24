import { Link } from 'react-router';
import { useState } from 'react';

export function NganHangCauHoi() {
  const allQuestions = [
    { id: 'Q-IT007-001', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Trung bình', topic: 'Process Management', usage: 3 },
    { id: 'Q-IT007-002', subject: 'Hệ điều hành', type: 'Tự luận', difficulty: 'Khó', topic: 'Memory Management', usage: 2 },
    { id: 'Q-IT005-001', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Dễ', topic: 'OSI Model', usage: 5 },
    { id: 'Q-IT005-002', subject: 'Mạng máy tính', type: 'Tự luận', difficulty: 'Trung bình', topic: 'TCP/IP', usage: 4 },
    { id: 'Q-SS006-001', subject: 'Pháp luật', type: 'Tự luận', difficulty: 'Dễ', topic: 'Hiến pháp', usage: 6 },
  ];

  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const subjects = Array.from(new Set(allQuestions.map(q => q.subject)));

  const filteredQuestions = allQuestions.filter(question => {
    const matchesDifficulty = filterDifficulty === '' || question.difficulty === filterDifficulty;
    const matchesSubject = filterSubject === '' || question.subject === filterSubject;

    return matchesDifficulty && matchesSubject;
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">NGÂN HÀNG CÂU HỎI</h1>
          <p className="text-[#64748b] text-[16px]">Quản lý kho câu hỏi cho các môn học</p>
        </div>
        <Link
          to="/ngan-hang-cau-hoi/them-moi"
          className="bg-[#3b82f6] h-[44px] rounded-[8px] px-6 text-white font-bold hover:bg-[#2563eb] flex items-center gap-2"
        >
          <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Thêm câu hỏi</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 max-w-[600px]">
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">TỔNG SỐ CÂU HỎI TỰ LUẬN</p>
          <p className="text-[#3b82f6] text-[32px] font-bold">124</p>
        </div>
        <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <p className="text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px] mb-2">MÔN HỌC</p>
          <p className="text-[#8b5cf6] text-[32px] font-bold">15</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] mb-6 p-4">
        <div className="flex gap-4 items-center">
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
            <option value="Phức Tạp">Phức Tạp</option>
            <option value="Khó">Khó</option>
          </select>
          {(filterSubject || filterDifficulty) && (
            <button
              onClick={() => {
                setFilterSubject('');
                setFilterDifficulty('');
              }}
              className="text-[#64748b] hover:text-[#0f172a] px-3 py-2 text-[14px] font-medium whitespace-nowrap"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">ID Câu hỏi</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Môn học</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Độ khó</th>
              <th className="text-left px-6 py-4 text-[#64748b] text-[13.6px] font-semibold tracking-[0.68px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="size-[48px] text-[#cbd5e1]" fill="none" viewBox="0 0 24 24">
                      <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#64748b] text-[16px]">Không tìm thấy câu hỏi nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredQuestions.map((question, index) => (
              <tr key={index} className="border-b border-[#e2e8f0]">
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px] font-medium">{question.id}</td>
                <td className="px-6 py-6 text-[#0f172a] text-[15.2px]">{question.subject}</td>
                <td className="px-6 py-6">
                  <span
                    className={`px-3 py-1 rounded-[20px] text-[12.8px] font-semibold ${
                      question.difficulty === 'Dễ'
                        ? 'bg-[#d1fae5] text-[#059669]'
                        : question.difficulty === 'Trung bình'
                        ? 'bg-[#fef3c7] text-[#d97706]'
                        : 'bg-[#fee2e2] text-[#dc2626]'
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex gap-2">
                    <Link to={`/ngan-hang-cau-hoi/chinh-sua/${question.id}`} className="border border-[#e2e8f0] rounded-[6px] p-2 hover:bg-[#f8fafc] inline-block" title="Chỉnh sửa">
                      <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
