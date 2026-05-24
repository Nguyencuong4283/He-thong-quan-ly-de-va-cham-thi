import { useState } from 'react';

export function MigrationGuide() {
  const [activeTab, setActiveTab] = useState<'overview' | 'backend' | 'frontend' | 'deployment'>('overview');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">MIGRATION GUIDE</h1>
        <p className="text-[#64748b] text-[16px]">Hướng dẫn migrate sang Spring Boot + React + Bootstrap</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex border-b border-[#e2e8f0]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('backend')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeTab === 'backend'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Backend (Spring Boot)
          </button>
          <button
            onClick={() => setActiveTab('frontend')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeTab === 'frontend'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Frontend (React + Bootstrap)
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeTab === 'deployment'
                ? 'bg-[#3b82f6] text-white'
                : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Deployment
          </button>
        </div>

        <div className="p-8 max-h-[calc(100vh-300px)] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Tổng quan Migration</h2>
                <p className="text-[#64748b] text-[15px] mb-6">
                  Hướng dẫn này mô tả cách migrate hệ thống EduManage từ mock data sang production-ready với Spring Boot backend và React + Bootstrap frontend.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-[#e2e8f0] rounded-[12px] p-6 bg-[#f8fafc]">
                  <h3 className="text-[#0f172a] text-[18px] font-semibold mb-3">Current Stack</h3>
                  <ul className="space-y-2 text-[#64748b] text-[14px]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#ef4444]">✗</span>
                      Frontend: React + Tailwind CSS
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ef4444]">✗</span>
                      No real backend (mock data)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ef4444]">✗</span>
                      No database integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ef4444]">✗</span>
                      Local storage for auth
                    </li>
                  </ul>
                </div>

                <div className="border border-[#10b981] rounded-[12px] p-6 bg-[#f0fdf4]">
                  <h3 className="text-[#0f172a] text-[18px] font-semibold mb-3">Target Stack</h3>
                  <ul className="space-y-2 text-[#64748b] text-[14px]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#10b981]">✓</span>
                      Frontend: React + Bootstrap 5
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10b981]">✓</span>
                      Backend: Spring Boot 3.x + Java 17
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10b981]">✓</span>
                      Database: PostgreSQL / MySQL
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#10b981]">✓</span>
                      Auth: JWT + Spring Security
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#eff6ff] border border-[#3b82f6] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Migration Roadmap</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Setup Spring Boot Backend', desc: 'Initialize project, configure database, implement entities & repositories' },
                    { title: 'Implement REST APIs', desc: 'Create controllers, services, and DTOs for all endpoints' },
                    { title: 'Add Security Layer', desc: 'Configure Spring Security, JWT authentication, and role-based access' },
                    { title: 'Migrate Frontend to Bootstrap', desc: 'Replace Tailwind with Bootstrap 5, update component styles' },
                    { title: 'Integrate API Calls', desc: 'Replace mock data with real API calls using Axios' },
                    { title: 'Testing & Deployment', desc: 'Write tests, configure CI/CD, deploy to production' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-[#3b82f6] text-white rounded-full size-[32px] flex items-center justify-center font-bold flex-shrink-0">{index + 1}</div>
                      <div>
                        <h4 className="text-[#0f172a] text-[16px] font-semibold">{step.title}</h4>
                        <p className="text-[#64748b] text-[14px]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-[12px] p-6">
                <div className="flex items-start gap-3">
                  <svg className="size-[24px] text-[#f59e0b] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                    <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-[#0f172a] text-[16px] font-semibold mb-2">Prerequisites</h3>
                    <ul className="space-y-1 text-[#64748b] text-[14px]">
                      <li>• Java 17 hoặc cao hơn</li>
                      <li>• Maven 3.8+ hoặc Gradle 7+</li>
                      <li>• Node.js 18+ và npm/yarn</li>
                      <li>• PostgreSQL 14+ hoặc MySQL 8+</li>
                      <li>• IDE: IntelliJ IDEA / Eclipse / VS Code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Spring Boot Backend Implementation</h2>
                <p className="text-[#64748b] text-[15px]">
                  Chi tiết cấu trúc và implementation của backend Spring Boot
                </p>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">1. Project Structure</h3>
                <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`edumanage-backend/
├── src/main/java/com/edumanage/
│   ├── config/         # Security, JWT, CORS
│   ├── controller/     # REST endpoints
│   ├── service/        # Business logic
│   ├── repository/     # Data access
│   ├── model/          # JPA entities
│   ├── dto/            # Request/Response objects
│   └── security/       # JWT & filters
└── pom.xml`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">2. Key Dependencies</h3>
                <ul className="text-[#64748b] text-[14px] space-y-2">
                  <li>• spring-boot-starter-web - REST API</li>
                  <li>• spring-boot-starter-data-jpa - Database ORM</li>
                  <li>• spring-boot-starter-security - Authentication</li>
                  <li>• jjwt - JWT tokens</li>
                  <li>• postgresql - Database driver</li>
                  <li>• lombok - Code generation</li>
                </ul>
              </div>

              <div className="bg-[#dcfce7] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Quick Start</h3>
                <div className="space-y-3">
                  <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[13px] font-mono">
{`# 1. Create database
createdb edumanage_db

# 2. Build project
mvn clean install

# 3. Run application
mvn spring-boot:run

# Backend runs at: http://localhost:8080`}
                  </pre>
                </div>
              </div>

              <div className="text-center py-4">
                <p className="text-[#64748b] text-[14px]">
                  👉 Xem chi tiết code examples tại tab <strong>API Documentation</strong>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'frontend' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">React + Bootstrap Frontend</h2>
                <p className="text-[#64748b] text-[15px]">
                  Migrate từ Tailwind CSS sang Bootstrap 5 và tích hợp API calls
                </p>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">1. Install Dependencies</h3>
                <pre className="bg-[#0f172a] text-[#3b82f6] p-4 rounded-[8px] text-[13px] font-mono">
{`npm install bootstrap@5.3.2 react-bootstrap axios`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">2. Tailwind to Bootstrap Mapping</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-[#e2e8f0]">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">Tailwind</th>
                        <th className="px-4 py-2 text-left font-semibold">Bootstrap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      {[
                        ['flex items-center', 'd-flex align-items-center'],
                        ['grid grid-cols-3', 'row row-cols-3'],
                        ['bg-blue-500 text-white', 'bg-primary text-white'],
                        ['p-4 m-2', 'p-3 m-2'],
                        ['rounded-lg shadow', 'rounded shadow'],
                        ['text-sm font-bold', 'fs-6 fw-bold']
                      ].map(([tw, bs], i) => (
                        <tr key={i}>
                          <td className="px-4 py-2 font-mono text-[#3b82f6]">{tw}</td>
                          <td className="px-4 py-2 font-mono text-[#10b981]">{bs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#dcfce7] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Quick Start</h3>
                <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[13px] font-mono">
{`# Start dev server
npm start

# Build for production
npm run build

# Frontend runs at: http://localhost:3000`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Production Deployment</h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: 'Docker', icon: '🐳', desc: 'Containerize & deploy anywhere' },
                  { title: 'AWS', icon: '☁️', desc: 'Elastic Beanstalk + S3' },
                  { title: 'Heroku', icon: '🚀', desc: 'Simple git push deploy' }
                ].map((option, i) => (
                  <div key={i} className="border border-[#e2e8f0] rounded-[12px] p-6 text-center">
                    <div className="text-[48px] mb-2">{option.icon}</div>
                    <h3 className="text-[#0f172a] text-[16px] font-semibold mb-1">{option.title}</h3>
                    <p className="text-[#64748b] text-[13px]">{option.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-3">Production Checklist</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Set up HTTPS/SSL',
                    'Configure CORS',
                    'Enable database backups',
                    'Set up monitoring',
                    'Configure rate limiting',
                    'Database connection pooling',
                    'CI/CD pipeline',
                    'Environment variables',
                    'Test all endpoints',
                    'Error tracking'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-[#64748b] text-[13px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#dcfce7] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-3">🎉 Ready for Production!</h3>
                <p className="text-[#64748b] text-[14px]">
                  Hệ thống đã sẵn sàng phục vụ người dùng thực tế với backend mạnh mẽ và frontend responsive.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
