import { useState } from 'react';

export function BackendSpecification() {
  const [activeSection, setActiveSection] = useState<'database' | 'auth' | 'api' | 'business'>('database');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">BACKEND SPECIFICATION</h1>
        <p className="text-[#64748b] text-[16px]">Tài liệu chi tiết về backend architecture và implementation</p>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="flex border-b border-[#e2e8f0]">
          <button
            onClick={() => setActiveSection('database')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeSection === 'database' ? 'bg-[#3b82f6] text-white' : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Database Schema
          </button>
          <button
            onClick={() => setActiveSection('auth')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeSection === 'auth' ? 'bg-[#3b82f6] text-white' : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Authentication Flow
          </button>
          <button
            onClick={() => setActiveSection('api')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeSection === 'api' ? 'bg-[#3b82f6] text-white' : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Complete API Specs
          </button>
          <button
            onClick={() => setActiveSection('business')}
            className={`flex-1 px-6 py-4 text-[14px] font-semibold transition-colors ${
              activeSection === 'business' ? 'bg-[#3b82f6] text-white' : 'text-[#64748b] hover:bg-[#f8fafc]'
            }`}
          >
            Business Logic
          </button>
        </div>

        <div className="p-8 max-h-[calc(100vh-300px)] overflow-y-auto">
          {activeSection === 'database' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Database Schema Design</h2>
                <p className="text-[#64748b] text-[15px] mb-6">
                  Thiết kế database schema hoàn chỉnh với tất cả constraints, indexes và relationships
                </p>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: users</h3>
                <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'TEACHER', 'STUDENT')),
    department VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: exams</h3>
                <pre className="bg-[#0f172a] text-[#3b82f6] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE exams (
    id BIGSERIAL PRIMARY KEY,
    exam_code VARCHAR(50) NOT NULL UNIQUE,  -- EX-IT007-2025-01
    title VARCHAR(500) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,    -- 2025-2026
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes BETWEEN 30 AND 180),
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT'
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'IN_PROGRESS')),
    total_points DECIMAL(5,2) DEFAULT 10.00,
    passing_score DECIMAL(5,2) DEFAULT 5.00,
    teacher_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    description TEXT,
    instructions TEXT,
    allow_review BOOLEAN DEFAULT true,
    shuffle_questions BOOLEAN DEFAULT false,
    shuffle_answers BOOLEAN DEFAULT false,
    show_results BOOLEAN DEFAULT true,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP,
    CONSTRAINT valid_duration CHECK (duration_minutes >= 30 AND duration_minutes <= 180),
    CONSTRAINT valid_dates CHECK (end_date IS NULL OR start_date < end_date),
    CONSTRAINT valid_points CHECK (total_points > 0 AND passing_score <= total_points)
);

CREATE INDEX idx_exams_code ON exams(exam_code);
CREATE INDEX idx_exams_teacher ON exams(teacher_id);
CREATE INDEX idx_exams_status ON exams(status);
CREATE INDEX idx_exams_subject ON exams(subject);
CREATE INDEX idx_exams_semester ON exams(semester);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: questions</h3>
                <pre className="bg-[#0f172a] text-[#f59e0b] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    question_code VARCHAR(50) NOT NULL UNIQUE,  -- Q-IT007-001
    content TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL
        CHECK (question_type IN ('MULTIPLE_CHOICE', 'ESSAY', 'TRUE_FALSE', 'SHORT_ANSWER')),
    difficulty VARCHAR(50) NOT NULL
        CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD', 'VERY_HARD')),
    subject VARCHAR(255) NOT NULL,
    topic VARCHAR(255),
    created_by BIGINT NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_answers (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    answer_key CHAR(1) NOT NULL CHECK (answer_key IN ('A', 'B', 'C', 'D')),
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT false,
    explanation TEXT,
    UNIQUE(question_id, answer_key)
);

CREATE INDEX idx_questions_code ON questions(question_code);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_active ON questions(is_active);
CREATE INDEX idx_question_answers_question ON question_answers(question_id);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: exam_questions (Junction)</h3>
                <pre className="bg-[#0f172a] text-[#8b5cf6] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE exam_questions (
    id BIGSERIAL PRIMARY KEY,
    exam_id BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    question_order INTEGER NOT NULL,
    points DECIMAL(5,2) NOT NULL DEFAULT 1.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(exam_id, question_id),
    UNIQUE(exam_id, question_order),
    CONSTRAINT valid_points CHECK (points > 0)
);

CREATE INDEX idx_exam_questions_exam ON exam_questions(exam_id);
CREATE INDEX idx_exam_questions_question ON exam_questions(question_id);
CREATE INDEX idx_exam_questions_order ON exam_questions(exam_id, question_order);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: classes</h3>
                <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE classes (
    id BIGSERIAL PRIMARY KEY,
    class_code VARCHAR(50) NOT NULL UNIQUE,  -- IT007.N11
    class_name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    teacher_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    room VARCHAR(100),
    schedule VARCHAR(255),  -- "Thứ 2, 7:30-9:30"
    max_students INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_classes_code ON classes(class_code);
CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_semester ON classes(semester);
CREATE INDEX idx_classes_active ON classes(is_active);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: students</h3>
                <pre className="bg-[#0f172a] text-[#ec4899] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,  -- Optional link to user account
    student_code VARCHAR(50) NOT NULL UNIQUE,  -- MSSV: 21520001
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_students_code ON students(student_code);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_active ON students(is_active);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: class_exams (Assignment)</h3>
                <pre className="bg-[#0f172a] text-[#3b82f6] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE class_exams (
    id BIGSERIAL PRIMARY KEY,
    class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    exam_id BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by BIGINT NOT NULL REFERENCES users(id),
    due_date TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(class_id, exam_id)
);

CREATE INDEX idx_class_exams_class ON class_exams(class_id);
CREATE INDEX idx_class_exams_exam ON class_exams(exam_id);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: submissions</h3>
                <pre className="bg-[#0f172a] text-[#6366f1] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE submissions (
    id BIGSERIAL PRIMARY KEY,
    submission_code VARCHAR(50) NOT NULL UNIQUE,  -- SUB-001
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    exam_id BIGINT NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
    class_exam_id BIGINT REFERENCES class_exams(id),
    status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS'
        CHECK (status IN ('IN_PROGRESS', 'SUBMITTED', 'GRADING', 'GRADED', 'RETURNED')),
    total_score DECIMAL(5,2),
    percentage_score DECIMAL(5,2),
    passed BOOLEAN,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP,
    graded_at TIMESTAMP,
    graded_by BIGINT REFERENCES users(id),
    feedback TEXT,
    time_spent_minutes INTEGER,  -- Actual time taken
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, exam_id),  -- One submission per student per exam
    CONSTRAINT valid_score CHECK (total_score IS NULL OR total_score >= 0),
    CONSTRAINT valid_percentage CHECK (percentage_score IS NULL OR
        (percentage_score >= 0 AND percentage_score <= 100))
);

CREATE INDEX idx_submissions_code ON submissions(submission_code);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_exam ON submissions(exam_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_submitted ON submissions(submitted_at);`}
                </pre>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Table: submission_answers</h3>
                <pre className="bg-[#0f172a] text-[#f59e0b] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`CREATE TABLE submission_answers (
    id BIGSERIAL PRIMARY KEY,
    submission_id BIGINT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE RESTRICT,
    exam_question_id BIGINT NOT NULL REFERENCES exam_questions(id),
    selected_answer CHAR(1) CHECK (selected_answer IN ('A', 'B', 'C', 'D')),  -- For MC
    essay_answer TEXT,  -- For essay questions
    is_correct BOOLEAN,
    points_earned DECIMAL(5,2) DEFAULT 0.00,
    teacher_comment TEXT,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(submission_id, question_id),
    CONSTRAINT valid_points CHECK (points_earned >= 0)
);

CREATE INDEX idx_submission_answers_submission ON submission_answers(submission_id);
CREATE INDEX idx_submission_answers_question ON submission_answers(question_id);`}
                </pre>
              </div>

              <div className="bg-[#dcfce7] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Additional Support Tables</h3>
                <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
{`-- Audit log table
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT,
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh tokens for JWT
CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT false
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);`}
                </pre>
              </div>
            </div>
          )}

          {activeSection === 'auth' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Authentication & Authorization Flow</h2>
                <p className="text-[#64748b] text-[15px] mb-6">
                  Chi tiết về authentication flow sử dụng JWT và role-based access control
                </p>
              </div>

              <div className="bg-[#eff6ff] border border-[#3b82f6] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">1. Registration Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#3b82f6] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">1</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Client sends registration request</p>
                      <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`POST /api/auth/register
{
  "email": "teacher@uit.edu.vn",
  "password": "SecurePass123!",
  "fullName": "Nguyen Van A",
  "role": "TEACHER",
  "department": "Computer Science"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#3b82f6] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">2</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Server validates and processes</p>
                      <ul className="text-[#64748b] text-[13px] mt-2 space-y-1">
                        <li>• Validate email format and uniqueness</li>
                        <li>• Validate password strength (min 8 chars, uppercase, number, special char)</li>
                        <li>• Hash password using BCrypt (cost factor: 12)</li>
                        <li>• Create user record with email_verified = false</li>
                        <li>• Generate verification token</li>
                        <li>• Send verification email (optional)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#3b82f6] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">3</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Server responds with user data</p>
                      <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`HTTP 201 Created
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "userId": 123,
    "email": "teacher@uit.edu.vn",
    "fullName": "Nguyen Van A",
    "role": "TEACHER"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f0fdf4] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">2. Login Flow with JWT</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#10b981] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">1</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Client sends credentials</p>
                      <pre className="bg-[#0f172a] text-[#3b82f6] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`POST /api/auth/login
{
  "email": "teacher@uit.edu.vn",
  "password": "SecurePass123!"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#10b981] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">2</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Server validates credentials</p>
                      <ul className="text-[#64748b] text-[13px] mt-2 space-y-1">
                        <li>• Find user by email</li>
                        <li>• Verify password hash using BCrypt</li>
                        <li>• Check if account is active (is_active = true)</li>
                        <li>• Update last_login timestamp</li>
                        <li>• Create audit log entry</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#10b981] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">3</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Generate JWT tokens</p>
                      <pre className="bg-[#0f172a] text-[#f59e0b] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`// Access Token (expires in 1 hour)
{
  "sub": "123",  // user ID
  "email": "teacher@uit.edu.vn",
  "role": "TEACHER",
  "iat": 1735987200,
  "exp": 1735990800
}

// Refresh Token (expires in 7 days)
{
  "sub": "123",
  "type": "refresh",
  "iat": 1735987200,
  "exp": 1736592000
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#10b981] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">4</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Server responds with tokens</p>
                      <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`HTTP 200 OK
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": 123,
    "email": "teacher@uit.edu.vn",
    "fullName": "Nguyen Van A",
    "role": "TEACHER",
    "department": "Computer Science"
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#10b981] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">5</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Client stores tokens</p>
                      <ul className="text-[#64748b] text-[13px] mt-2 space-y-1">
                        <li>• Store accessToken in memory or sessionStorage</li>
                        <li>• Store refreshToken in httpOnly cookie (recommended) or localStorage</li>
                        <li>• Include accessToken in Authorization header for API calls</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fef3c7] border border-[#f59e0b] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">3. Protected Request Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#f59e0b] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">1</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Client sends request with token</p>
                      <pre className="bg-[#0f172a] text-[#3b82f6] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`GET /api/exams
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#f59e0b] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">2</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">JWT Filter validates token</p>
                      <ul className="text-[#64748b] text-[13px] mt-2 space-y-1">
                        <li>• Extract token from Authorization header</li>
                        <li>• Verify signature using secret key</li>
                        <li>• Check expiration time</li>
                        <li>• Extract user ID and role from claims</li>
                        <li>• Load user details from database (optional, can cache)</li>
                        <li>• Set SecurityContext with user authentication</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#f59e0b] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">3</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Authorization check</p>
                      <pre className="bg-[#0f172a] text-[#8b5cf6] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`// Spring Security annotation
@PreAuthorize("hasRole('TEACHER')")
@GetMapping("/api/exams")
public ResponseEntity<List<ExamDTO>> getExams() {
    // Only accessible by TEACHER role
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#f59e0b] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">4</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">If valid, process request</p>
                      <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`HTTP 200 OK
{
  "success": true,
  "data": [...]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fef2f2] border border-[#ef4444] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">4. Token Refresh Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#ef4444] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">1</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Access token expires</p>
                      <pre className="bg-[#0f172a] text-[#ef4444] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`HTTP 401 Unauthorized
{
  "error": "Token expired",
  "code": "TOKEN_EXPIRED"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#ef4444] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">2</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Client sends refresh token</p>
                      <pre className="bg-[#0f172a] text-[#3b82f6] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`POST /api/auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#ef4444] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">3</div>
                    <div className="flex-1">
                      <p className="text-[#0f172a] font-semibold">Server validates refresh token</p>
                      <ul className="text-[#64748b] text-[13px] mt-2 space-y-1">
                        <li>• Verify token signature and expiration</li>
                        <li>• Check if token exists in database and not revoked</li>
                        <li>• Verify user still exists and is active</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-[#ef4444] text-white rounded-full size-[24px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">4</div>
                    <div>
                      <p className="text-[#0f172a] font-semibold">Server issues new tokens</p>
                      <pre className="bg-[#0f172a] text-[#10b981] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`HTTP 200 OK
{
  "success": true,
  "accessToken": "new-access-token...",
  "refreshToken": "new-refresh-token...",
  "expiresIn": 3600
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">5. Role-Based Access Control (RBAC)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-[#e2e8f0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Endpoint</th>
                        <th className="px-4 py-3 text-left font-semibold">ADMIN</th>
                        <th className="px-4 py-3 text-left font-semibold">TEACHER</th>
                        <th className="px-4 py-3 text-left font-semibold">STUDENT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e8f0]">
                      <tr>
                        <td className="px-4 py-3 font-mono text-[12px]">POST /api/exams</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✗</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-[12px]">GET /api/exams</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓*</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-[12px]">DELETE /api/exams/:id</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓**</td>
                        <td className="px-4 py-3 text-center">✗</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-[12px]">POST /api/submissions/:id/grade</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✗</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-[12px]">GET /api/students</td>
                        <td className="px-4 py-3 text-center">✓</td>
                        <td className="px-4 py-3 text-center">✓***</td>
                        <td className="px-4 py-3 text-center">✗</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-3 text-[12px] text-[#64748b]">
                    <p>* Students can only see published exams assigned to their class</p>
                    <p>** Teachers can only delete their own exams</p>
                    <p>*** Teachers can only see students in their classes</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Complete API Specifications</h2>
                <p className="text-[#64748b] text-[15px]">
                  Chi tiết đầy đủ về tất cả API endpoints với request/response examples
                </p>
              </div>

              <div className="text-center py-8">
                <p className="text-[#64748b] text-[15px] mb-4">
                  API Specifications chi tiết được mô tả trong trang <strong>API Documentation</strong>
                </p>
                <p className="text-[#3b82f6] text-[14px]">
                  👉 Vui lòng tham khảo trang <strong>API Documentation</strong> để xem đầy đủ endpoints
                </p>
              </div>

              <div className="bg-[#eff6ff] border border-[#3b82f6] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">API Response Format Standards</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[#64748b] text-[14px] mb-2">Success Response (200, 201):</p>
                    <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] text-[12px] font-mono">
{`{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": {  // Only for paginated endpoints
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}`}
                    </pre>
                  </div>

                  <div>
                    <p className="text-[#64748b] text-[14px] mb-2">Error Response (4xx, 5xx):</p>
                    <pre className="bg-[#0f172a] text-[#ef4444] p-4 rounded-[8px] text-[12px] font-mono">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2026-05-04T10:30:00Z",
  "path": "/api/auth/register"
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-[#f0fdf4] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">Pagination & Filtering Standards</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#64748b] text-[14px] mb-2">Query Parameters:</p>
                    <ul className="text-[#64748b] text-[13px] space-y-1">
                      <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#0f172a]">page</code> - Page number (0-indexed, default: 0)</li>
                      <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#0f172a]">limit</code> - Items per page (default: 10, max: 100)</li>
                      <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#0f172a]">sort</code> - Sort field (e.g., "createdAt,desc")</li>
                      <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#0f172a]">filter</code> - Filter criteria (e.g., "status=PUBLISHED")</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#64748b] text-[14px] mb-2">Example:</p>
                    <pre className="bg-[#0f172a] text-[#3b82f6] p-3 rounded-[6px] text-[11px] font-mono">
{`GET /api/exams?page=0&limit=20&sort=createdAt,desc&status=PUBLISHED&subject=Computer Science`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'business' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[#0f172a] text-[22px] font-bold mb-4">Business Logic & Validation Rules</h2>
                <p className="text-[#64748b] text-[15px] mb-6">
                  Các quy tắc nghiệp vụ và validation rules chi tiết
                </p>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">1. Exam Creation Business Rules</h3>
                <ul className="space-y-2 text-[#64748b] text-[14px]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Một đề thi phải có ít nhất 2 câu hỏi và tối đa 50 câu hỏi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Thời gian làm bài từ 30-180 phút</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Tổng điểm của các câu hỏi phải bằng total_points của đề thi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Exam code phải unique và theo format: EX-{`{SUBJECT}`}-{`{YEAR}`}-{`{NUMBER}`}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Không thể xóa đề thi đã có học sinh nộp bài (có submission)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Chỉ có thể edit đề thi ở trạng thái DRAFT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] font-bold">•</span>
                    <span>Khi publish: validate tất cả câu hỏi đều có đáp án đúng (cho MC questions)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">2. Question Validation Rules</h3>
                <ul className="space-y-2 text-[#64748b] text-[14px]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Multiple choice questions phải có đúng 4 đáp án (A, B, C, D)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Multiple choice questions phải có đúng 1 đáp án đúng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Essay questions không có predefined answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Question content không được rỗng và tối đa 5000 ký tự</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Không thể xóa câu hỏi đang được sử dụng trong đề thi PUBLISHED</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10b981] font-bold">•</span>
                    <span>Question code format: Q-{`{SUBJECT}`}-{`{NUMBER}`}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">3. Submission & Grading Logic</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[#0f172a] font-semibold mb-2">Submission Creation:</p>
                    <ul className="space-y-1 text-[#64748b] text-[13px]">
                      <li>• Student chỉ có thể submit 1 lần cho mỗi exam (UNIQUE constraint)</li>
                      <li>• Check exam còn trong thời gian làm bài (start_date, end_date)</li>
                      <li>• Check student thuộc class được assign exam</li>
                      <li>• Auto-create submission record khi student bắt đầu làm bài</li>
                      <li>• Track thời gian bắt đầu (started_at) và kết thúc (submitted_at)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[#0f172a] font-semibold mb-2">Auto-Grading (Multiple Choice):</p>
                    <ul className="space-y-1 text-[#64748b] text-[13px]">
                      <li>• Khi submit, tự động chấm các câu trắc nghiệm</li>
                      <li>• So sánh selected_answer với correct_answer</li>
                      <li>• Set is_correct = true/false</li>
                      <li>• Calculate points_earned based on is_correct</li>
                      <li>• Update submission.total_score = SUM(points_earned)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[#0f172a] font-semibold mb-2">Manual Grading (Essay):</p>
                    <ul className="space-y-1 text-[#64748b] text-[13px]">
                      <li>• Teacher review essay_answer</li>
                      <li>• Assign points_earned (0 to max_points)</li>
                      <li>• Add teacher_comment (optional)</li>
                      <li>• Recalculate submission.total_score</li>
                      <li>• Set submission.status = 'GRADED'</li>
                      <li>• Set graded_at timestamp and graded_by teacher_id</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[#0f172a] font-semibold mb-2">Score Calculation:</p>
                    <pre className="bg-[#0f172a] text-[#f59e0b] p-3 rounded-[6px] text-[11px] font-mono mt-2">
{`// Total score
total_score = SUM(submission_answers.points_earned)

// Percentage
percentage_score = (total_score / exam.total_points) * 100

// Pass/Fail
passed = total_score >= exam.passing_score`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">4. Class & Student Management</h3>
                <ul className="space-y-2 text-[#64748b] text-[14px]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Class code phải unique (e.g., IT007.N11)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Student code (MSSV) phải unique trong toàn hệ thống</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Một student chỉ thuộc 1 class tại 1 thời điểm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Bulk import students: validate email format và MSSV uniqueness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Không thể xóa class có students hoặc assigned exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">•</span>
                    <span>Teacher chỉ có thể quản lý classes của mình</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#dcfce7] border border-[#10b981] rounded-[12px] p-6">
                <h3 className="text-[#0f172a] text-[18px] font-semibold mb-4">5. Workflow: Complete Exam Lifecycle</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: 'Create Exam', desc: 'Teacher tạo exam với status=DRAFT, thêm questions' },
                    { step: 2, title: 'Publish Exam', desc: 'Validate all rules, set status=PUBLISHED, set published_at' },
                    { step: 3, title: 'Assign to Class', desc: 'Create class_exams record, set due_date' },
                    { step: 4, title: 'Student Takes Exam', desc: 'Create submission, answer questions, submit' },
                    { step: 5, title: 'Auto-Grade MC', desc: 'System auto-grades multiple choice questions' },
                    { step: 6, title: 'Manual Grade Essays', desc: 'Teacher reviews and grades essay questions' },
                    { step: 7, title: 'Return Results', desc: 'Set status=RETURNED, students can view scores' },
                    { step: 8, title: 'Generate Reports', desc: 'Analytics on class performance, statistics' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="bg-[#10b981] text-white rounded-full size-[28px] flex items-center justify-center font-bold text-[12px] flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-[#0f172a] font-semibold">{item.title}</p>
                        <p className="text-[#64748b] text-[13px]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
