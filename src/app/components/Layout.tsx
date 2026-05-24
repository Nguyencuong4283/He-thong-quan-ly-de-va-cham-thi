import { Link, useLocation, useNavigate } from 'react-router';
import svgPaths from '../../imports/DềThi/svg-kdizl55zy0';
import imgImg from '../../imports/DềThi/cf009e9b858b3b0bc726bb62ae99b0df4508f554.png';

function Logo() {
  return (
    <div className="absolute left-[24px] size-[24px] top-[24.25px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p462d500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 10V16" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2b645f80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid h-[73.5px] left-0 top-0 w-[260px]">
      <Logo />
      <p className="absolute font-bold leading-[1.2] left-[60px] not-italic text-[20px] text-white top-[24px] tracking-[0.5px] w-[128.563px]">EduManage</p>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`absolute h-[48px] left-0 w-[260px] ${
        isActive ? 'bg-[#334155] border-[#3b82f6]' : 'border-[rgba(0,0,0,0)]'
      } border-l-4 border-solid`}
    >
      {icon}
      <p className={`absolute font-medium leading-[1.2] left-[60px] not-italic text-[16px] top-[14.25px] ${
        isActive ? 'text-[#3b82f6]' : 'text-[#94a3b8]'
      }`} style={{ maxWidth: '180px', lineHeight: '1.2' }}>
        {label}
      </p>
    </Link>
  );
}

function Navigation() {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Trang chủ',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d={svgPaths.p13b4cd00} stroke={location.pathname === '/' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p32939e80} stroke={location.pathname === '/' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.pdc9c900} stroke={location.pathname === '/' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p20de0972} stroke={location.pathname === '/' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/de-thi',
      label: 'Đề thi',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d={svgPaths.pb007f00} stroke={location.pathname === '/de-thi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1b58ab00} stroke={location.pathname === '/de-thi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M10 9H8" stroke={location.pathname === '/de-thi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M16 13H8" stroke={location.pathname === '/de-thi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M16 17H8" stroke={location.pathname === '/de-thi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/ngan-hang-cau-hoi',
      label: 'Ngân hàng câu hỏi',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d={svgPaths.p11feba00} stroke={location.pathname === '/ngan-hang-cau-hoi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1b1afa80} stroke={location.pathname === '/ngan-hang-cau-hoi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p3eed8380} stroke={location.pathname === '/ngan-hang-cau-hoi' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/quan-ly-lop',
      label: 'Quản lý lớp và Chấm thi',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={(location.pathname.startsWith('/quan-ly-lop') || location.pathname.startsWith('/cham-thi')) ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke={(location.pathname.startsWith('/quan-ly-lop') || location.pathname.startsWith('/cham-thi')) ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke={(location.pathname.startsWith('/quan-ly-lop') || location.pathname.startsWith('/cham-thi')) ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke={(location.pathname.startsWith('/quan-ly-lop') || location.pathname.startsWith('/cham-thi')) ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/api-docs',
      label: 'API Documentation',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke={location.pathname === '/api-docs' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/migration-guide',
      label: 'Migration Guide',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d="M9 12H15M9 16H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke={location.pathname === '/migration-guide' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M9 7H15" stroke={location.pathname === '/migration-guide' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
    {
      to: '/backend-specification',
      label: 'Backend Specification',
      icon: (
        <div className="absolute left-[24px] size-[24px] top-[12px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g>
              <path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7M4 7H20M8 12H16" stroke={location.pathname === '/backend-specification' ? '#3B82F6' : '#94A3B8'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      ),
    },
  ];

  const totalHeight = navItems.length * 56;

  return (
    <nav className="absolute left-0 top-[73.5px] w-[260px]" style={{ height: `${totalHeight}px` }}>
      {navItems.map((item, index) => (
        <div key={item.to} className="relative" style={{ top: `${index * 56}px` }}>
          <NavItem
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={item.to === '/quan-ly-lop' ? (location.pathname.startsWith('/quan-ly-lop') || location.pathname.startsWith('/cham-thi')) : location.pathname === item.to}
          />
        </div>
      ))}
    </nav>
  );
}

function Sidebar() {
  return (
    <aside className="absolute bg-[#1e293b] h-full left-0 top-0 w-[260px]">
      <Header />
      <Navigation />
    </aside>
  );
}

function TopBar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const userName = 'TS. Nguyễn Văn X';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/dang-nhap');
  };

  return (
    <header className="absolute bg-white border-[#e2e8f0] border-b border-solid h-[72px] left-0 top-0 w-full">
      <div className="absolute right-[32px] top-[14px] flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px]">
          <img alt="" className="size-[36px] rounded-full object-cover border-2 border-[#e2e8f0]" src={imgImg} />
          <div>
            <p className="text-[#0f172a] text-[14px] font-semibold">{userName}</p>
            <p className="text-[#64748b] text-[12px]">{userEmail}</p>
            <p className="text-[#64748b] text-[11px]">Giảng viên</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded-[8px] hover:bg-[#fef2f2] transition-colors"
        >
          <svg className="size-[18px] text-[#ef4444]" fill="none" viewBox="0 0 24 24">
            <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 17.7956 12.6839 18.5587 12.1213 19.1213C11.5587 19.6839 10.7956 20 10 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17V7C3 6.20435 3.31607 5.44129 3.87868 4.87868C4.44129 4.31607 5.20435 4 6 4H10C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#ef4444] text-[14px] font-semibold">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f4f6f8] h-screen w-screen overflow-hidden relative">
      <Sidebar />
      <main className="absolute h-full left-[260px] overflow-auto top-0 right-0">
        <TopBar />
        <div className="pt-[72px] h-full overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
