import { useState } from 'react';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
  validation?: string;
}

interface StatusCode {
  code: number;
  description: string;
  example?: string;
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
  authentication: boolean;
  pathParams?: Parameter[];
  queryParams?: Parameter[];
  requestBody?: {
    description: string;
    schema: Parameter[];
    example: string;
  };
  responses: {
    success: {
      statusCode: number;
      description: string;
      schema: Parameter[];
      example: string;
    };
    errors?: StatusCode[];
  };
  notes?: string[];
  curlExample?: string;
}

const endpoints: Record<string, Endpoint[]> = {
  'Dashboard': [
    {
      method: 'GET',
      path: '/api/dashboard/stats',
      description: 'Lấy thống kê tổng quan cho trang chủ (tổng hợp tất cả số liệu trong một request)',
      authentication: true,
      responses: {
        success: {
          statusCode: 200,
          description: 'Thống kê được lấy thành công',
          schema: [
            { name: 'exams.total', type: 'number', required: true, description: 'Tổng số đề thi trong hệ thống' },
            { name: 'exams.published', type: 'number', required: true, description: 'Số đề thi đã xuất bản' },
            { name: 'exams.draft', type: 'number', required: true, description: 'Số đề thi ở trạng thái nháp' },
            { name: 'exams.grading', type: 'number', required: true, description: 'Số đề thi đang chấm' },
            { name: 'exams.growthRate', type: 'number', required: true, description: 'Tỷ lệ tăng trưởng so với tháng trước (%)' },
            { name: 'monthlyStats', type: 'array', required: true, description: 'Thống kê theo tháng cho biểu đồ' },
          ],
          example: `{
  "success": true,
  "data": {
    "exams": {
      "total": 68,
      "published": 45,
      "draft": 15,
      "grading": 8,
      "growthRate": 12
    },
    "students": {
      "total": 245,
      "averageScore": 8.1,
      "passRate": 92,
      "excellentRate": 38
    },
    "submissions": {
      "pending": 12,
      "grading": 5,
      "completed": 143
    },
    "monthlyStats": [
      { "month": "T1", "count": 12 },
      { "month": "T2", "count": 19 }
    ]
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ hoặc đã hết hạn', example: '{"success": false, "error": {"code": "UNAUTHORIZED", "message": "Token không hợp lệ"}}' },
          { code: 500, description: 'Lỗi server khi tính toán thống kê' }
        ]
      },
      notes: [
        'Endpoint này tối ưu hóa bằng cách gom tất cả thống kê cần thiết cho dashboard trong 1 request',
        'Dữ liệu được cache 5 phút để giảm tải database',
        'Chỉ giảng viên (TEACHER) và quản trị viên (ADMIN) mới có quyền truy cập'
      ],
      curlExample: `curl -X GET "https://api.example.com/api/dashboard/stats" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
    },
    {
      method: 'GET',
      path: '/api/dashboard/activity',
      description: 'Lấy danh sách hoạt động gần đây của hệ thống',
      authentication: true,
      queryParams: [
        { name: 'limit', type: 'number', required: false, description: 'Số lượng hoạt động trả về', example: '20', validation: 'Min: 1, Max: 100, Default: 20' },
        { name: 'offset', type: 'number', required: false, description: 'Vị trí bắt đầu (phân trang)', example: '0', validation: 'Min: 0, Default: 0' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Danh sách hoạt động được lấy thành công',
          schema: [
            { name: 'type', type: 'string', required: true, description: 'Loại hoạt động: exam_created, exam_updated, submission_graded, class_created' },
            { name: 'user', type: 'string', required: true, description: 'Tên người thực hiện hành động' },
            { name: 'description', type: 'string', required: true, description: 'Mô tả chi tiết hoạt động' },
            { name: 'timestamp', type: 'string (ISO 8601)', required: true, description: 'Thời gian thực hiện', example: '2026-05-04T10:30:00Z' },
          ],
          example: `{
  "success": true,
  "data": [
    {
      "type": "exam_created",
      "user": "TS. Nguyễn Văn X",
      "description": "Tạo đề thi mới: Kiểm tra giữa kỳ",
      "timestamp": "2026-05-04T10:30:00Z"
    },
    {
      "type": "submission_graded",
      "user": "TS. Nguyễn Văn X",
      "description": "Chấm xong 15 bài thi",
      "timestamp": "2026-05-04T09:15:00Z"
    }
  ]
}`
        },
        errors: [
          { code: 401, description: 'Chưa đăng nhập hoặc token không hợp lệ' },
          { code: 422, description: 'Tham số query không hợp lệ (limit vượt quá 100)' }
        ]
      },
      curlExample: `curl -X GET "https://api.example.com/api/dashboard/activity?limit=20&offset=0" \\
  -H "Authorization: Bearer <token>"`
    }
  ],
  'Authentication': [
    {
      method: 'POST',
      path: '/api/auth/register',
      description: 'Đăng ký tài khoản mới cho giảng viên hoặc quản trị viên',
      authentication: false,
      requestBody: {
        description: 'Thông tin đăng ký tài khoản mới',
        schema: [
          { name: 'name', type: 'string', required: true, description: 'Họ và tên đầy đủ', example: 'Nguyễn Văn A', validation: 'Độ dài: 3-100 ký tự' },
          { name: 'email', type: 'string', required: true, description: 'Email đăng nhập', example: 'teacher@uit.edu.vn', validation: 'Phải là email hợp lệ, chưa tồn tại trong hệ thống' },
          { name: 'password', type: 'string', required: true, description: 'Mật khẩu', example: 'SecurePass@123', validation: 'Tối thiểu 6 ký tự' },
          { name: 'role', type: 'string', required: true, description: 'Vai trò: teacher hoặc admin', example: 'teacher', validation: 'Chỉ chấp nhận: teacher, admin' },
        ],
        example: `{
  "name": "Nguyễn Văn A",
  "email": "teacher@uit.edu.vn",
  "password": "SecurePass@123",
  "role": "teacher"
}`
      },
      responses: {
        success: {
          statusCode: 201,
          description: 'Tài khoản được tạo thành công',
          schema: [
            { name: 'userId', type: 'string', required: true, description: 'ID của user vừa tạo' },
            { name: 'email', type: 'string', required: true, description: 'Email đã đăng ký' },
          ],
          example: `{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "userId": "user_123",
    "email": "teacher@uit.edu.vn"
  }
}`
        },
        errors: [
          { code: 422, description: 'Dữ liệu không hợp lệ (email sai format, password quá ngắn)', example: '{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "Email không hợp lệ"}}' },
          { code: 409, description: 'Email đã tồn tại trong hệ thống', example: '{"success": false, "error": {"code": "EMAIL_EXISTS", "message": "Email đã được đăng ký"}}' },
          { code: 500, description: 'Lỗi server khi tạo tài khoản' }
        ]
      },
      notes: [
        'Mật khẩu sẽ được mã hóa bằng BCrypt với cost factor 12 trước khi lưu vào database',
        'Email phải là duy nhất trong hệ thống',
        'Vai trò "student" không được phép đăng ký qua endpoint này (học sinh được thêm vào lớp bởi giảng viên)'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Nguyễn Văn A",
    "email": "teacher@uit.edu.vn",
    "password": "SecurePass@123",
    "role": "teacher"
  }'`
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'Đăng nhập vào hệ thống và nhận JWT token',
      authentication: false,
      requestBody: {
        description: 'Thông tin đăng nhập',
        schema: [
          { name: 'email', type: 'string', required: true, description: 'Email đã đăng ký', example: 'teacher@uit.edu.vn' },
          { name: 'password', type: 'string', required: true, description: 'Mật khẩu', example: 'SecurePass@123' },
        ],
        example: `{
  "email": "teacher@uit.edu.vn",
  "password": "SecurePass@123"
}`
      },
      responses: {
        success: {
          statusCode: 200,
          description: 'Đăng nhập thành công, trả về JWT token',
          schema: [
            { name: 'token', type: 'string', required: true, description: 'JWT access token (hết hạn sau 1 giờ)', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            { name: 'refreshToken', type: 'string', required: true, description: 'Refresh token (hết hạn sau 7 ngày)', example: 'refresh_abc123...' },
            { name: 'user.id', type: 'string', required: true, description: 'ID của user' },
            { name: 'user.name', type: 'string', required: true, description: 'Tên đầy đủ' },
            { name: 'user.email', type: 'string', required: true, description: 'Email' },
            { name: 'user.role', type: 'string', required: true, description: 'Vai trò: teacher/admin/student' },
          ],
          example: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_abc123def456",
  "user": {
    "id": "user_123",
    "name": "Nguyễn Văn A",
    "email": "teacher@uit.edu.vn",
    "role": "teacher"
  }
}`
        },
        errors: [
          { code: 401, description: 'Email hoặc mật khẩu không đúng', example: '{"success": false, "error": {"code": "INVALID_CREDENTIALS", "message": "Email hoặc mật khẩu không đúng"}}' },
          { code: 422, description: 'Thiếu email hoặc password trong request' },
          { code: 429, description: 'Quá nhiều lần đăng nhập thất bại (rate limit: 5 lần/5 phút)' }
        ]
      },
      notes: [
        'Access token có thời gian sống 1 giờ, sau đó cần dùng refresh token để lấy token mới',
        'Refresh token có thời gian sống 7 ngày',
        'Hệ thống có rate limiting: tối đa 5 lần đăng nhập thất bại trong 5 phút từ cùng một IP',
        'Token chứa thông tin: userId, email, role, và thời gian hết hạn'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "teacher@uit.edu.vn",
    "password": "SecurePass@123"
  }'`
    },
    {
      method: 'POST',
      path: '/api/auth/logout',
      description: 'Đăng xuất khỏi hệ thống và vô hiệu hóa refresh token',
      authentication: true,
      responses: {
        success: {
          statusCode: 200,
          description: 'Đăng xuất thành công',
          schema: [
            { name: 'message', type: 'string', required: true, description: 'Thông báo đăng xuất thành công' },
          ],
          example: `{
  "success": true,
  "message": "Đăng xuất thành công"
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ hoặc đã hết hạn' }
        ]
      },
      notes: [
        'Endpoint này sẽ xóa refresh token khỏi database',
        'Access token vẫn còn hiệu lực cho đến khi hết hạn (tối đa 1 giờ)',
        'Client nên xóa token khỏi localStorage/sessionStorage ngay sau khi logout'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/auth/logout" \\
  -H "Authorization: Bearer <token>"`
    },
    {
      method: 'POST',
      path: '/api/auth/refresh',
      description: 'Làm mới access token bằng refresh token',
      authentication: false,
      requestBody: {
        description: 'Refresh token để lấy access token mới',
        schema: [
          { name: 'refreshToken', type: 'string', required: true, description: 'Refresh token nhận được khi đăng nhập', example: 'refresh_abc123def456' },
        ],
        example: `{
  "refreshToken": "refresh_abc123def456"
}`
      },
      responses: {
        success: {
          statusCode: 200,
          description: 'Token mới được tạo thành công',
          schema: [
            { name: 'token', type: 'string', required: true, description: 'JWT access token mới (hết hạn sau 1 giờ)' },
          ],
          example: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token đã được làm mới"
}`
        },
        errors: [
          { code: 401, description: 'Refresh token không hợp lệ hoặc đã hết hạn', example: '{"success": false, "error": {"code": "INVALID_REFRESH_TOKEN", "message": "Refresh token không hợp lệ"}}' },
          { code: 404, description: 'Refresh token không tồn tại trong database (đã bị revoke)' }
        ]
      },
      notes: [
        'Refresh token có thời gian sống 7 ngày',
        'Mỗi user có thể có nhiều refresh token (đăng nhập từ nhiều thiết bị)',
        'Khi refresh token hết hạn, user phải đăng nhập lại'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/auth/refresh" \\
  -H "Content-Type: application/json" \\
  -d '{"refreshToken": "refresh_abc123def456"}'`
    }
  ],
  'Exams': [
    {
      method: 'GET',
      path: '/api/exams',
      description: 'Lấy danh sách đề thi với phân trang và bộ lọc',
      authentication: true,
      queryParams: [
        { name: 'page', type: 'number', required: false, description: 'Số trang (bắt đầu từ 1)', example: '1', validation: 'Min: 1, Default: 1' },
        { name: 'limit', type: 'number', required: false, description: 'Số lượng đề thi mỗi trang', example: '10', validation: 'Min: 1, Max: 100, Default: 10' },
        { name: 'status', type: 'string', required: false, description: 'Lọc theo trạng thái', example: 'published', validation: 'Giá trị: draft, published, grading' },
        { name: 'subject', type: 'string', required: false, description: 'Lọc theo môn học', example: 'Hệ điều hành' },
        { name: 'semester', type: 'string', required: false, description: 'Lọc theo học kỳ', example: 'Fall 2025' },
        { name: 'search', type: 'string', required: false, description: 'Tìm kiếm theo tên đề thi', example: 'giữa kỳ' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Danh sách đề thi được lấy thành công',
          schema: [
            { name: 'examId', type: 'string', required: true, description: 'Mã định danh duy nhất của đề thi', example: 'EX-IT007-2025-01' },
            { name: 'title', type: 'string', required: true, description: 'Tên đề thi' },
            { name: 'subject', type: 'string', required: true, description: 'Môn học' },
            { name: 'semester', type: 'string', required: true, description: 'Học kỳ' },
            { name: 'duration', type: 'number', required: true, description: 'Thời gian làm bài (phút)', example: '90' },
            { name: 'status', type: 'string', required: true, description: 'Trạng thái: draft, published, grading' },
            { name: 'totalQuestions', type: 'number', required: true, description: 'Tổng số câu hỏi' },
            { name: 'createdAt', type: 'string (ISO 8601)', required: true, description: 'Thời gian tạo' },
          ],
          example: `{
  "success": true,
  "data": [
    {
      "examId": "EX-IT007-2025-01",
      "title": "Kiểm tra giữa kỳ",
      "subject": "Hệ điều hành",
      "semester": "Fall 2025",
      "year": "2025-2026",
      "duration": 90,
      "status": "published",
      "totalQuestions": 20,
      "createdAt": "2026-04-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 68,
    "totalPages": 7
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ hoặc đã hết hạn' },
          { code: 422, description: 'Tham số query không hợp lệ (ví dụ: limit > 100)' }
        ]
      },
      notes: [
        'Kết quả được sắp xếp theo thời gian tạo mới nhất',
        'Có thể kết hợp nhiều bộ lọc cùng lúc',
        'Giảng viên chỉ thấy đề thi của mình, Admin thấy tất cả'
      ],
      curlExample: `curl -X GET "https://api.example.com/api/exams?page=1&limit=10&status=published" \\
  -H "Authorization: Bearer <token>"`
    },
    {
      method: 'GET',
      path: '/api/exams/:id',
      description: 'Lấy chi tiết đầy đủ của một đề thi bao gồm danh sách câu hỏi',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã định danh đề thi', example: 'EX-IT007-2025-01' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Chi tiết đề thi được lấy thành công',
          schema: [
            { name: 'examId', type: 'string', required: true, description: 'Mã định danh đề thi' },
            { name: 'title', type: 'string', required: true, description: 'Tên đề thi' },
            { name: 'subject', type: 'string', required: true, description: 'Môn học' },
            { name: 'duration', type: 'number', required: true, description: 'Thời gian làm bài (phút)' },
            { name: 'status', type: 'string', required: true, description: 'Trạng thái đề thi' },
            { name: 'questions', type: 'array', required: true, description: 'Mảng các câu hỏi trong đề thi' },
          ],
          example: `{
  "success": true,
  "data": {
    "examId": "EX-IT007-2025-01",
    "title": "Kiểm tra giữa kỳ",
    "subject": "Hệ điều hành",
    "semester": "Fall 2025",
    "year": "2025-2026",
    "duration": 90,
    "status": "published",
    "questions": [
      {
        "questionId": "Q-001",
        "content": "Process là gì?",
        "type": "multiple-choice",
        "points": 2
      }
    ]
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 404, description: 'Không tìm thấy đề thi', example: '{"success": false, "error": {"code": "EXAM_NOT_FOUND", "message": "Đề thi không tồn tại"}}' },
          { code: 403, description: 'Không có quyền xem đề thi này (giảng viên chỉ xem được đề thi của mình)' }
        ]
      },
      curlExample: `curl -X GET "https://api.example.com/api/exams/EX-IT007-2025-01" \\
  -H "Authorization: Bearer <token>"`
    },
    {
      method: 'POST',
      path: '/api/exams',
      description: 'Tạo đề thi mới với danh sách câu hỏi',
      authentication: true,
      requestBody: {
        description: 'Thông tin đề thi mới cần tạo',
        schema: [
          { name: 'title', type: 'string', required: true, description: 'Tên đề thi', example: 'Kiểm tra giữa kỳ', validation: 'Độ dài: 5-200 ký tự' },
          { name: 'subject', type: 'string', required: true, description: 'Môn học', example: 'Hệ điều hành', validation: 'Độ dài: 3-100 ký tự' },
          { name: 'semester', type: 'string', required: true, description: 'Học kỳ', example: 'Fall 2025', validation: 'Format: Fall/Spring + năm' },
          { name: 'year', type: 'string', required: true, description: 'Năm học', example: '2025-2026', validation: 'Format: YYYY-YYYY' },
          { name: 'duration', type: 'number', required: true, description: 'Thời gian làm bài (phút)', example: '90', validation: 'Min: 30, Max: 180' },
          { name: 'questions', type: 'array', required: true, description: 'Mảng các câu hỏi', validation: 'Tối thiểu 2 câu, tối đa 50 câu' },
          { name: 'questions[].questionId', type: 'string', required: true, description: 'ID câu hỏi từ ngân hàng', example: 'Q-001' },
          { name: 'questions[].points', type: 'number', required: true, description: 'Điểm của câu hỏi', example: '2', validation: 'Min: 0.5, Max: 10' },
        ],
        example: `{
  "title": "Kiểm tra giữa kỳ",
  "subject": "Hệ điều hành",
  "semester": "Fall 2025",
  "year": "2025-2026",
  "duration": 90,
  "questions": [
    {
      "questionId": "Q-001",
      "points": 2
    },
    {
      "questionId": "Q-002",
      "points": 3
    }
  ]
}`
      },
      responses: {
        success: {
          statusCode: 201,
          description: 'Đề thi được tạo thành công',
          schema: [
            { name: 'examId', type: 'string', required: true, description: 'Mã định danh của đề thi mới tạo' },
          ],
          example: `{
  "success": true,
  "message": "Tạo đề thi thành công",
  "data": {
    "examId": "EX-IT007-2025-01"
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 422, description: 'Dữ liệu không hợp lệ (thiếu trường bắt buộc, duration vượt quá giới hạn)', example: '{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "Thời gian làm bài phải từ 30-180 phút"}}' },
          { code: 404, description: 'Một hoặc nhiều câu hỏi không tồn tại trong ngân hàng', example: '{"success": false, "error": {"code": "QUESTION_NOT_FOUND", "message": "Câu hỏi Q-999 không tồn tại"}}' },
          { code: 403, description: 'Không có quyền tạo đề thi (chỉ TEACHER và ADMIN)' }
        ]
      },
      notes: [
        'Đề thi mới được tạo mặc định ở trạng thái "draft"',
        'Tổng điểm của các câu hỏi nên bằng 10 (có thể điều chỉnh sau)',
        'Các câu hỏi phải tồn tại trong ngân hàng câu hỏi trước khi thêm vào đề',
        'ExamId được tự động tạo theo format: EX-{SubjectCode}-{Year}-{SequentialNumber}'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/exams" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Kiểm tra giữa kỳ",
    "subject": "Hệ điều hành",
    "semester": "Fall 2025",
    "year": "2025-2026",
    "duration": 90,
    "questions": [
      {"questionId": "Q-001", "points": 2},
      {"questionId": "Q-002", "points": 3}
    ]
  }'`
    },
    {
      method: 'PUT',
      path: '/api/exams/:id',
      description: 'Cập nhật thông tin đề thi (chỉ được phép cập nhật đề thi ở trạng thái draft)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã định danh đề thi', example: 'EX-IT007-2025-01' },
      ],
      requestBody: {
        description: 'Các trường cần cập nhật (tất cả đều optional)',
        schema: [
          { name: 'title', type: 'string', required: false, description: 'Tên đề thi mới' },
          { name: 'duration', type: 'number', required: false, description: 'Thời gian làm bài mới (phút)', validation: 'Min: 30, Max: 180' },
          { name: 'status', type: 'string', required: false, description: 'Trạng thái mới', validation: 'Giá trị: draft, published' },
          { name: 'questions', type: 'array', required: false, description: 'Danh sách câu hỏi mới (thay thế toàn bộ)' },
        ],
        example: `{
  "title": "Kiểm tra giữa kỳ (Updated)",
  "duration": 120,
  "status": "published"
}`
      },
      responses: {
        success: {
          statusCode: 200,
          description: 'Đề thi được cập nhật thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Cập nhật đề thi thành công"
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 404, description: 'Không tìm thấy đề thi' },
          { code: 403, description: 'Không có quyền cập nhật đề thi này hoặc đề thi đã được publish' },
          { code: 422, description: 'Dữ liệu không hợp lệ' }
        ]
      },
      notes: [
        'Chỉ có thể cập nhật đề thi ở trạng thái "draft"',
        'Sau khi publish, đề thi không thể chỉnh sửa để đảm bảo tính công bằng',
        'Nếu cần thay đổi đề thi đã publish, tạo đề thi mới'
      ],
      curlExample: `curl -X PUT "https://api.example.com/api/exams/EX-IT007-2025-01" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"status": "published"}'`
    },
    {
      method: 'DELETE',
      path: '/api/exams/:id',
      description: 'Xóa đề thi (chỉ xóa được đề thi chưa có học sinh nào làm)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã định danh đề thi', example: 'EX-IT007-2025-01' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Đề thi được xóa thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Xóa đề thi thành công"
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 404, description: 'Không tìm thấy đề thi' },
          { code: 403, description: 'Không có quyền xóa đề thi này' },
          { code: 409, description: 'Không thể xóa đề thi đã có học sinh nộp bài', example: '{"success": false, "error": {"code": "EXAM_HAS_SUBMISSIONS", "message": "Không thể xóa đề thi đã có 15 bài nộp"}}' }
        ]
      },
      notes: [
        'Xóa đề thi sẽ xóa luôn tất cả liên kết với lớp học',
        'Không thể xóa đề thi nếu đã có học sinh nộp bài',
        'Hành động này không thể hoàn tác'
      ],
      curlExample: `curl -X DELETE "https://api.example.com/api/exams/EX-IT007-2025-01" \\
  -H "Authorization: Bearer <token>"`
    }
  ],
  'Questions': [
    {
      method: 'GET',
      path: '/api/questions',
      description: 'Lấy danh sách câu hỏi từ ngân hàng với bộ lọc và phân trang',
      authentication: true,
      queryParams: [
        { name: 'page', type: 'number', required: false, description: 'Số trang', example: '1', validation: 'Default: 1' },
        { name: 'limit', type: 'number', required: false, description: 'Số lượng mỗi trang', example: '20', validation: 'Max: 100, Default: 20' },
        { name: 'type', type: 'string', required: false, description: 'Loại câu hỏi', example: 'multiple-choice', validation: 'Giá trị: multiple-choice, essay' },
        { name: 'difficulty', type: 'string', required: false, description: 'Độ khó', example: 'easy', validation: 'Giá trị: easy, medium, hard' },
        { name: 'subject', type: 'string', required: false, description: 'Môn học', example: 'Hệ điều hành' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Danh sách câu hỏi được lấy thành công',
          schema: [
            { name: 'questionId', type: 'string', required: true, description: 'Mã câu hỏi' },
            { name: 'content', type: 'string', required: true, description: 'Nội dung câu hỏi' },
            { name: 'type', type: 'string', required: true, description: 'Loại: multiple-choice hoặc essay' },
            { name: 'difficulty', type: 'string', required: true, description: 'Độ khó: easy, medium, hard' },
            { name: 'subject', type: 'string', required: true, description: 'Môn học' },
          ],
          example: `{
  "success": true,
  "data": [
    {
      "questionId": "Q-001",
      "content": "Process là gì?",
      "type": "multiple-choice",
      "difficulty": "easy",
      "subject": "Hệ điều hành",
      "createdAt": "2026-03-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 245,
    "totalPages": 13
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 422, description: 'Tham số query không hợp lệ' }
        ]
      },
      curlExample: `curl -X GET "https://api.example.com/api/questions?type=multiple-choice&difficulty=easy" \\
  -H "Authorization: Bearer <token>"`
    },
    {
      method: 'POST',
      path: '/api/questions',
      description: 'Thêm câu hỏi mới vào ngân hàng (hỗ trợ cả trắc nghiệm và tự luận)',
      authentication: true,
      requestBody: {
        description: 'Thông tin câu hỏi mới',
        schema: [
          { name: 'content', type: 'string', required: true, description: 'Nội dung câu hỏi', example: 'Process là gì?', validation: 'Độ dài: 10-2000 ký tự' },
          { name: 'type', type: 'string', required: true, description: 'Loại câu hỏi', example: 'multiple-choice', validation: 'Giá trị: multiple-choice, essay' },
          { name: 'difficulty', type: 'string', required: true, description: 'Độ khó', example: 'easy', validation: 'Giá trị: easy, medium, hard' },
          { name: 'subject', type: 'string', required: true, description: 'Môn học', example: 'Hệ điều hành' },
          { name: 'answers', type: 'object', required: false, description: 'Các đáp án (chỉ cho trắc nghiệm)', example: '{"A": "...", "B": "..."}', validation: 'Bắt buộc nếu type = multiple-choice, phải có 2-4 đáp án' },
          { name: 'correctAnswer', type: 'string', required: false, description: 'Đáp án đúng (chỉ cho trắc nghiệm)', example: 'A', validation: 'Bắt buộc nếu type = multiple-choice' },
          { name: 'rubric', type: 'string', required: false, description: 'Đáp án mẫu/Thang điểm (chỉ cho tự luận)', validation: 'Khuyến nghị nên có cho câu tự luận' },
        ],
        example: `{
  "content": "Process là gì?",
  "type": "multiple-choice",
  "difficulty": "easy",
  "subject": "Hệ điều hành",
  "answers": {
    "A": "Một chương trình đang chạy",
    "B": "Một file",
    "C": "Một thư mục",
    "D": "Một driver"
  },
  "correctAnswer": "A"
}`
      },
      responses: {
        success: {
          statusCode: 201,
          description: 'Câu hỏi được tạo thành công',
          schema: [
            { name: 'questionId', type: 'string', required: true, description: 'Mã câu hỏi vừa tạo' },
          ],
          example: `{
  "success": true,
  "message": "Thêm câu hỏi thành công",
  "data": {
    "questionId": "Q-246"
  }
}`
        },
        errors: [
          { code: 401, description: 'Token không hợp lệ' },
          { code: 403, description: 'Không có quyền thêm câu hỏi (chỉ TEACHER và ADMIN)' },
          { code: 422, description: 'Dữ liệu không hợp lệ', example: '{"success": false, "error": {"code": "VALIDATION_ERROR", "message": "Câu trắc nghiệm phải có từ 2-4 đáp án"}}' }
        ]
      },
      notes: [
        'Câu trắc nghiệm (multiple-choice) bắt buộc phải có answers và correctAnswer',
        'Câu tự luận (essay) nên có rubric để hướng dẫn chấm điểm',
        'QuestionId được tự động tạo theo format: Q-{SequentialNumber}',
        'Nội dung câu hỏi có thể chứa ký tự đặc biệt, công thức, code block'
      ],
      curlExample: `curl -X POST "https://api.example.com/api/questions" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Process là gì?",
    "type": "multiple-choice",
    "difficulty": "easy",
    "subject": "Hệ điều hành",
    "answers": {
      "A": "Một chương trình đang chạy",
      "B": "Một file"
    },
    "correctAnswer": "A"
  }'`
    },
    {
      method: 'PUT',
      path: '/api/questions/:id',
      description: 'Cập nhật câu hỏi (chỉ cập nhật được câu hỏi chưa được dùng trong đề thi nào)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã câu hỏi', example: 'Q-001' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Cập nhật thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Cập nhật câu hỏi thành công"
}`
        },
        errors: [
          { code: 404, description: 'Câu hỏi không tồn tại' },
          { code: 409, description: 'Không thể sửa câu hỏi đã được sử dụng trong đề thi', example: '{"success": false, "error": {"code": "QUESTION_IN_USE", "message": "Câu hỏi đã được dùng trong 3 đề thi"}}' }
        ]
      },
      notes: ['Không thể sửa câu hỏi đã được thêm vào đề thi để đảm bảo tính nhất quán']
    },
    {
      method: 'DELETE',
      path: '/api/questions/:id',
      description: 'Xóa câu hỏi (chỉ xóa được câu hỏi chưa được dùng)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã câu hỏi', example: 'Q-001' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Xóa thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Xóa câu hỏi thành công"
}`
        },
        errors: [
          { code: 404, description: 'Câu hỏi không tồn tại' },
          { code: 409, description: 'Không thể xóa câu hỏi đã được sử dụng' }
        ]
      }
    }
  ],
  'Classes': [
    {
      method: 'GET',
      path: '/api/classes',
      description: 'Lấy danh sách lớp học',
      authentication: true,
      queryParams: [
        { name: 'page', type: 'number', required: false, description: 'Số trang', example: '1' },
        { name: 'limit', type: 'number', required: false, description: 'Số lượng mỗi trang', example: '10' },
        { name: 'semester', type: 'string', required: false, description: 'Lọc theo học kỳ', example: 'Fall 2025' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Danh sách lớp học',
          schema: [],
          example: `{
  "success": true,
  "data": [
    {
      "classId": "CLASS-001",
      "name": "IT007.N11",
      "subject": "Hệ điều hành",
      "teacher": "TS. Nguyễn Văn X",
      "totalStudents": 45,
      "assignedExam": "EX-IT007-2025-01"
    }
  ]
}`
        }
      }
    },
    {
      method: 'POST',
      path: '/api/classes',
      description: 'Tạo lớp học mới',
      authentication: true,
      requestBody: {
        description: 'Thông tin lớp học',
        schema: [
          { name: 'name', type: 'string', required: true, description: 'Mã lớp', example: 'IT007.N11' },
          { name: 'subject', type: 'string', required: true, description: 'Môn học', example: 'Hệ điều hành' },
          { name: 'teacher', type: 'string', required: true, description: 'Tên giảng viên' },
          { name: 'semester', type: 'string', required: true, description: 'Học kỳ', example: 'Fall 2025' },
          { name: 'year', type: 'string', required: true, description: 'Năm học', example: '2025-2026' },
        ],
        example: `{
  "name": "IT007.N11",
  "subject": "Hệ điều hành",
  "teacher": "TS. Nguyễn Văn X",
  "semester": "Fall 2025",
  "year": "2025-2026"
}`
      },
      responses: {
        success: {
          statusCode: 201,
          description: 'Lớp học được tạo thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Tạo lớp học thành công",
  "data": {
    "classId": "CLASS-005"
  }
}`
        }
      }
    },
    {
      method: 'POST',
      path: '/api/classes/:id/students',
      description: 'Thêm nhiều học sinh vào lớp (bulk import từ CSV/Excel)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã lớp học', example: 'CLASS-001' },
      ],
      requestBody: {
        description: 'Danh sách học sinh cần thêm',
        schema: [
          { name: 'students', type: 'array', required: true, description: 'Mảng thông tin học sinh' },
          { name: 'students[].mssv', type: 'string', required: true, description: 'Mã số sinh viên (unique)', example: '21520001', validation: 'Phải là duy nhất trong hệ thống' },
          { name: 'students[].name', type: 'string', required: true, description: 'Họ tên học sinh' },
          { name: 'students[].email', type: 'string', required: true, description: 'Email học sinh', validation: 'Phải là email hợp lệ' },
          { name: 'students[].phone', type: 'string', required: false, description: 'Số điện thoại' },
        ],
        example: `{
  "students": [
    {
      "mssv": "21520001",
      "name": "Nguyễn Văn A",
      "email": "student1@uit.edu.vn",
      "phone": "0123456789"
    },
    {
      "mssv": "21520002",
      "name": "Trần Thị B",
      "email": "student2@uit.edu.vn",
      "phone": "0987654321"
    }
  ]
}`
      },
      responses: {
        success: {
          statusCode: 201,
          description: 'Nhập học sinh thành công',
          schema: [
            { name: 'imported', type: 'number', required: true, description: 'Số lượng học sinh đã nhập' },
            { name: 'duplicates', type: 'number', required: true, description: 'Số lượng MSSV trùng (bỏ qua)' },
          ],
          example: `{
  "success": true,
  "message": "Nhập 48/50 học sinh thành công",
  "data": {
    "imported": 48,
    "duplicates": 2,
    "duplicateMSSVs": ["21520001", "21520015"]
  }
}`
        },
        errors: [
          { code: 404, description: 'Lớp học không tồn tại' },
          { code: 422, description: 'Dữ liệu không hợp lệ (email sai format, thiếu MSSV)' }
        ]
      },
      notes: [
        'Hệ thống tự động bỏ qua các MSSV trùng lặp',
        'Học sinh được tạo tài khoản với password mặc định là MSSV',
        'Email được dùng để gửi thông báo đăng nhập'
      ]
    },
    {
      method: 'PUT',
      path: '/api/classes/:id/assign-exam',
      description: 'Gán hoặc thay đổi đề thi cho lớp',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã lớp học', example: 'CLASS-001' },
      ],
      requestBody: {
        description: 'Mã đề thi cần gán',
        schema: [
          { name: 'examId', type: 'string', required: true, description: 'Mã đề thi (phải ở trạng thái published)', example: 'EX-IT007-2025-01' },
        ],
        example: `{
  "examId": "EX-IT007-2025-01"
}`
      },
      responses: {
        success: {
          statusCode: 200,
          description: 'Gán đề thi thành công',
          schema: [],
          example: `{
  "success": true,
  "message": "Gán đề thi thành công"
}`
        },
        errors: [
          { code: 404, description: 'Lớp hoặc đề thi không tồn tại' },
          { code: 422, description: 'Đề thi chưa ở trạng thái published', example: '{"success": false, "error": {"code": "EXAM_NOT_PUBLISHED", "message": "Chỉ có thể gán đề thi đã publish"}}' }
        ]
      },
      notes: [
        'Chỉ gán được đề thi đã publish',
        'Có thể thay đổi đề thi cho lớp nếu chưa có học sinh nào nộp bài'
      ]
    }
  ],
  'Submissions': [
    {
      method: 'GET',
      path: '/api/submissions',
      description: 'Lấy danh sách bài nộp (cho giảng viên chấm thi)',
      authentication: true,
      queryParams: [
        { name: 'page', type: 'number', required: false, description: 'Số trang', example: '1' },
        { name: 'limit', type: 'number', required: false, description: 'Số lượng mỗi trang', example: '20' },
        { name: 'status', type: 'string', required: false, description: 'Lọc theo trạng thái', example: 'pending', validation: 'Giá trị: pending, grading, completed' },
        { name: 'examId', type: 'string', required: false, description: 'Lọc theo đề thi', example: 'EX-IT007-2025-01' },
        { name: 'classId', type: 'string', required: false, description: 'Lọc theo lớp', example: 'CLASS-001' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Danh sách bài nộp',
          schema: [],
          example: `{
  "success": true,
  "data": [
    {
      "submissionId": "SUB-001",
      "examId": "EX-IT007-2025-01",
      "examTitle": "Kiểm tra giữa kỳ",
      "studentId": "STU-001",
      "studentName": "Nguyễn Văn A",
      "studentMSSV": "21520001",
      "status": "pending",
      "submittedAt": "2026-04-25T14:30:00Z"
    }
  ]
}`
        }
      }
    },
    {
      method: 'GET',
      path: '/api/submissions/:id',
      description: 'Lấy chi tiết bài nộp để chấm điểm',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã bài nộp', example: 'SUB-001' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Chi tiết bài nộp',
          schema: [
            { name: 'submissionId', type: 'string', required: true, description: 'Mã bài nộp' },
            { name: 'answers', type: 'array', required: true, description: 'Mảng câu trả lời của học sinh' },
            { name: 'answers[].questionId', type: 'string', required: true, description: 'Mã câu hỏi' },
            { name: 'answers[].answer', type: 'string', required: true, description: 'Câu trả lời (A/B/C/D hoặc text)' },
            { name: 'answers[].isCorrect', type: 'boolean', required: false, description: 'Đúng/sai (chỉ có với trắc nghiệm)' },
          ],
          example: `{
  "success": true,
  "data": {
    "submissionId": "SUB-001",
    "examId": "EX-IT007-2025-01",
    "student": {
      "id": "STU-001",
      "name": "Nguyễn Văn A",
      "mssv": "21520001"
    },
    "answers": [
      {
        "questionId": "Q-001",
        "questionContent": "Process là gì?",
        "type": "multiple-choice",
        "answer": "A",
        "isCorrect": true,
        "maxPoints": 2
      },
      {
        "questionId": "Q-002",
        "questionContent": "Giải thích deadlock",
        "type": "essay",
        "answer": "Deadlock là tình trạng...",
        "maxPoints": 3
      }
    ],
    "score": null,
    "status": "pending",
    "submittedAt": "2026-04-25T14:30:00Z"
  }
}`
        },
        errors: [
          { code: 404, description: 'Bài nộp không tồn tại' },
          { code: 403, description: 'Không có quyền xem bài nộp này' }
        ]
      }
    },
    {
      method: 'POST',
      path: '/api/submissions/:id/grade',
      description: 'Chấm điểm bài thi (tự động chấm trắc nghiệm, thủ công chấm tự luận)',
      authentication: true,
      pathParams: [
        { name: 'id', type: 'string', required: true, description: 'Mã bài nộp', example: 'SUB-001' },
      ],
      requestBody: {
        description: 'Điểm số và điểm từng câu',
        schema: [
          { name: 'questionScores', type: 'array', required: true, description: 'Điểm của từng câu (bao gồm cả tự luận và trắc nghiệm)' },
          { name: 'questionScores[].questionId', type: 'string', required: true, description: 'Mã câu hỏi' },
          { name: 'questionScores[].points', type: 'number', required: true, description: 'Điểm đạt được (≤ maxPoints)', validation: 'Phải ≤ điểm tối đa của câu' },
          { name: 'questionScores[].feedback', type: 'string', required: false, description: 'Nhận xét (cho câu tự luận)' },
          { name: 'overallFeedback', type: 'string', required: false, description: 'Nhận xét chung về bài thi' },
        ],
        example: `{
  "questionScores": [
    {
      "questionId": "Q-001",
      "points": 2
    },
    {
      "questionId": "Q-002",
      "points": 2.5,
      "feedback": "Giải thích tốt nhưng thiếu ví dụ"
    }
  ],
  "overallFeedback": "Làm tốt! Cần cải thiện phần tự luận."
}`
      },
      responses: {
        success: {
          statusCode: 200,
          description: 'Chấm điểm thành công',
          schema: [
            { name: 'totalScore', type: 'number', required: true, description: 'Tổng điểm đạt được' },
          ],
          example: `{
  "success": true,
  "message": "Chấm điểm thành công",
  "data": {
    "totalScore": 8.5,
    "submissionId": "SUB-001"
  }
}`
        },
        errors: [
          { code: 404, description: 'Bài nộp không tồn tại' },
          { code: 422, description: 'Điểm vượt quá điểm tối đa của câu hỏi', example: '{"success": false, "error": {"code": "INVALID_SCORE", "message": "Câu Q-002 chỉ có tối đa 3 điểm"}}' },
          { code: 409, description: 'Bài thi đã được chấm điểm rồi' }
        ]
      },
      notes: [
        'Câu trắc nghiệm được tự động chấm khi học sinh nộp bài',
        'Giảng viên chỉ cần chấm các câu tự luận',
        'Tổng điểm được tính tự động từ questionScores',
        'Sau khi chấm xong, học sinh có thể xem điểm và feedback'
      ]
    }
  ],
  'Reports': [
    {
      method: 'GET',
      path: '/api/reports/statistics',
      description: 'Lấy thống kê tổng quan về kết quả học tập',
      authentication: true,
      queryParams: [
        { name: 'classId', type: 'string', required: false, description: 'Lọc theo lớp', example: 'CLASS-001' },
        { name: 'examId', type: 'string', required: false, description: 'Lọc theo đề thi', example: 'EX-IT007-2025-01' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Thống kê',
          schema: [],
          example: `{
  "success": true,
  "data": {
    "totalStudents": 245,
    "totalSubmissions": 230,
    "averageScore": 8.1,
    "passRate": 92,
    "excellentRate": 38,
    "scoreDistribution": {
      "0-4": 8,
      "4-6": 15,
      "6-8": 89,
      "8-10": 118
    }
  }
}`
        }
      }
    },
    {
      method: 'GET',
      path: '/api/reports/performance',
      description: 'Lấy báo cáo xu hướng điểm theo thời gian',
      authentication: true,
      queryParams: [
        { name: 'startDate', type: 'string', required: false, description: 'Ngày bắt đầu (ISO 8601)', example: '2026-01-01' },
        { name: 'endDate', type: 'string', required: false, description: 'Ngày kết thúc (ISO 8601)', example: '2026-05-31' },
        { name: 'subject', type: 'string', required: false, description: 'Lọc theo môn học' },
      ],
      responses: {
        success: {
          statusCode: 200,
          description: 'Xu hướng điểm',
          schema: [],
          example: `{
  "success": true,
  "data": [
    {
      "month": "T1",
      "avgScore": 7.2,
      "totalExams": 8,
      "totalSubmissions": 156
    },
    {
      "month": "T2",
      "avgScore": 7.5,
      "totalExams": 10,
      "totalSubmissions": 198
    }
  ]
}`
        }
      }
    }
  ]
};

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: 'bg-[#10b981]', text: 'text-[#10b981]' },
  POST: { bg: 'bg-[#3b82f6]', text: 'text-[#3b82f6]' },
  PUT: { bg: 'bg-[#f59e0b]', text: 'text-[#f59e0b]' },
  DELETE: { bg: 'bg-[#ef4444]', text: 'text-[#ef4444]' },
};

export function APIDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState('Authentication');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-[#0f172a] text-[28.8px] font-bold mb-2">API DOCUMENTATION</h1>
        <p className="text-[#64748b] text-[16px]">Tài liệu chi tiết về các API endpoints của hệ thống</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="bg-white border border-[#e2e8f0] rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sticky top-8">
            <h2 className="text-[#0f172a] text-[16px] font-semibold mb-4">Categories</h2>
            <nav className="space-y-2">
              {Object.keys(endpoints).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-[8px] text-[14px] font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#3b82f6] text-white'
                      : 'text-[#64748b] hover:bg-[#f8fafc]'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-[12px] opacity-70">
                    ({endpoints[category].length})
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="col-span-3">
          <div className="space-y-4">
            {endpoints[selectedCategory].map((endpoint, index) => {
              const endpointKey = `${endpoint.method}-${endpoint.path}`;
              const isExpanded = expandedEndpoint === endpointKey;

              return (
                <div
                  key={endpointKey}
                  className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedEndpoint(isExpanded ? null : endpointKey)}
                    className="w-full p-6 text-left hover:bg-[#f8fafc] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`${methodColors[endpoint.method].bg} text-white px-3 py-1 rounded-[6px] text-[13px] font-bold min-w-[70px] text-center`}
                      >
                        {endpoint.method}
                      </span>
                      <div className="flex-1">
                        <code className="text-[#0f172a] text-[15px] font-mono font-semibold">
                          {endpoint.path}
                        </code>
                        <p className="text-[#64748b] text-[14px] mt-1">{endpoint.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          {endpoint.authentication && (
                            <span className="inline-flex items-center gap-1 text-[#f59e0b] text-[12px] font-semibold">
                              <svg className="size-[14px]" fill="none" viewBox="0 0 24 24">
                                <path d="M12 15V17M6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V13C20 12.4696 19.7893 11.9609 19.4142 11.5858C19.0391 11.2107 18.5304 11 18 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21ZM16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Authentication Required
                            </span>
                          )}
                          {endpoint.queryParams && endpoint.queryParams.length > 0 && (
                            <span className="text-[#64748b] text-[12px]">
                              Query Params: {endpoint.queryParams.map(p => p.name).join(', ')}
                            </span>
                          )}
                          {endpoint.pathParams && endpoint.pathParams.length > 0 && (
                            <span className="text-[#3b82f6] text-[12px]">
                              Path Params: {endpoint.pathParams.map(p => p.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      <svg
                        className={`size-[20px] text-[#64748b] transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#e2e8f0] bg-[#f8fafc]">
                      <div className="p-6 space-y-6">
                        {endpoint.pathParams && endpoint.pathParams.length > 0 && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">Path Parameters</h3>
                            <div className="space-y-2">
                              {endpoint.pathParams.map((param) => (
                                <div key={param.name} className="bg-white border border-[#e2e8f0] rounded-[8px] p-3">
                                  <div className="flex items-start gap-3">
                                    <code className="text-[#3b82f6] text-[13px] font-mono font-semibold">{param.name}</code>
                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${param.required ? 'bg-[#fef2f2] text-[#ef4444]' : 'bg-[#f8fafc] text-[#64748b]'}`}>
                                      {param.required ? 'REQUIRED' : 'OPTIONAL'}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[11px] font-mono">{param.type}</span>
                                  </div>
                                  <p className="text-[#64748b] text-[13px] mt-2">{param.description}</p>
                                  {param.example && (
                                    <p className="text-[#10b981] text-[12px] mt-1 font-mono">Example: {param.example}</p>
                                  )}
                                  {param.validation && (
                                    <p className="text-[#f59e0b] text-[12px] mt-1">⚠ {param.validation}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {endpoint.queryParams && endpoint.queryParams.length > 0 && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">Query Parameters</h3>
                            <div className="space-y-2">
                              {endpoint.queryParams.map((param) => (
                                <div key={param.name} className="bg-white border border-[#e2e8f0] rounded-[8px] p-3">
                                  <div className="flex items-start gap-3">
                                    <code className="text-[#3b82f6] text-[13px] font-mono font-semibold">{param.name}</code>
                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${param.required ? 'bg-[#fef2f2] text-[#ef4444]' : 'bg-[#f8fafc] text-[#64748b]'}`}>
                                      {param.required ? 'REQUIRED' : 'OPTIONAL'}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[11px] font-mono">{param.type}</span>
                                  </div>
                                  <p className="text-[#64748b] text-[13px] mt-2">{param.description}</p>
                                  {param.example && (
                                    <p className="text-[#10b981] text-[12px] mt-1 font-mono">Example: {param.example}</p>
                                  )}
                                  {param.validation && (
                                    <p className="text-[#f59e0b] text-[12px] mt-1">⚠ {param.validation}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {endpoint.requestBody && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">Request Body</h3>
                            <p className="text-[#64748b] text-[13px] mb-3">{endpoint.requestBody.description}</p>

                            <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 mb-4">
                              <h4 className="text-[#0f172a] text-[13px] font-semibold mb-3">Schema</h4>
                              <div className="space-y-2">
                                {endpoint.requestBody.schema.map((field) => (
                                  <div key={field.name} className="flex items-start gap-3 pb-2 border-b border-[#f1f5f9] last:border-0">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <code className="text-[#3b82f6] text-[12px] font-mono font-semibold">{field.name}</code>
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${field.required ? 'bg-[#fef2f2] text-[#ef4444]' : 'bg-[#f8fafc] text-[#64748b]'}`}>
                                          {field.required ? 'REQUIRED' : 'OPTIONAL'}
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[10px] font-mono">{field.type}</span>
                                      </div>
                                      <p className="text-[#64748b] text-[12px]">{field.description}</p>
                                      {field.example && (
                                        <p className="text-[#10b981] text-[11px] mt-1 font-mono">Example: {field.example}</p>
                                      )}
                                      {field.validation && (
                                        <p className="text-[#f59e0b] text-[11px] mt-1">⚠ {field.validation}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <h4 className="text-[#0f172a] text-[13px] font-semibold mb-2">Example</h4>
                            <pre className="bg-[#0f172a] text-[#10b981] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
                              {endpoint.requestBody.example}
                            </pre>
                          </div>
                        )}

                        <div>
                          <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">
                            Success Response <span className="text-[#10b981] text-[13px] font-mono ml-2">{endpoint.responses.success.statusCode}</span>
                          </h3>
                          <p className="text-[#64748b] text-[13px] mb-3">{endpoint.responses.success.description}</p>

                          <div className="bg-white border border-[#e2e8f0] rounded-[8px] p-4 mb-4">
                            <h4 className="text-[#0f172a] text-[13px] font-semibold mb-3">Response Schema</h4>
                            <div className="space-y-2">
                              {endpoint.responses.success.schema.map((field) => (
                                <div key={field.name} className="flex items-start gap-3 pb-2 border-b border-[#f1f5f9] last:border-0">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <code className="text-[#10b981] text-[12px] font-mono font-semibold">{field.name}</code>
                                      <span className="px-1.5 py-0.5 rounded bg-[#f1f5f9] text-[#475569] text-[10px] font-mono">{field.type}</span>
                                      {field.required && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#fef2f2] text-[#ef4444]">REQUIRED</span>
                                      )}
                                    </div>
                                    <p className="text-[#64748b] text-[12px]">{field.description}</p>
                                    {field.example && (
                                      <p className="text-[#10b981] text-[11px] mt-1 font-mono">Example: {field.example}</p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <h4 className="text-[#0f172a] text-[13px] font-semibold mb-2">Example Response</h4>
                          <pre className="bg-[#0f172a] text-[#3b82f6] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
                            {endpoint.responses.success.example}
                          </pre>
                        </div>

                        {endpoint.responses.errors && endpoint.responses.errors.length > 0 && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">Error Responses</h3>
                            <div className="space-y-2">
                              {endpoint.responses.errors.map((error) => (
                                <div key={error.code} className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] p-3">
                                  <div className="flex items-start gap-3">
                                    <span className="px-2 py-1 rounded bg-[#ef4444] text-white text-[12px] font-bold font-mono">{error.code}</span>
                                    <div className="flex-1">
                                      <p className="text-[#991b1b] text-[13px] font-medium">{error.description}</p>
                                      {error.example && (
                                        <pre className="bg-[#7f1d1d] text-[#fca5a5] p-2 rounded mt-2 text-[11px] font-mono overflow-x-auto">
                                          {error.example}
                                        </pre>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {endpoint.notes && endpoint.notes.length > 0 && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">📝 Important Notes</h3>
                            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-[8px] p-4">
                              <ul className="space-y-2">
                                {endpoint.notes.map((note, index) => (
                                  <li key={index} className="text-[#92400e] text-[13px] flex items-start gap-2">
                                    <span className="text-[#f59e0b] mt-0.5">•</span>
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {endpoint.curlExample && (
                          <div>
                            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-3">cURL Example</h3>
                            <pre className="bg-[#1e293b] text-[#e2e8f0] p-4 rounded-[8px] overflow-x-auto text-[12px] font-mono">
                              {endpoint.curlExample}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h2 className="text-[#0f172a] text-[18px] font-semibold mb-4">Best Practices & Important Information</h2>
        <div className="space-y-6 text-[14px]">
          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">💡 Tối ưu cho Trang chủ (Dashboard)</h3>
            <p className="text-[#64748b] mb-2">
              Thay vì gọi nhiều API riêng lẻ (<code className="bg-[#f8fafc] px-2 py-1 rounded text-[#64748b]">/api/exams</code>, <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#64748b]">/api/submissions</code>, etc.),
              hãy sử dụng endpoint tối ưu:
            </p>
            <pre className="bg-[#dcfce7] border border-[#86efac] text-[#0f172a] p-4 rounded-[8px] font-mono text-[13px]">
              GET /api/dashboard/stats
            </pre>
            <p className="text-[#10b981] mt-2 font-semibold">
              ✓ Chỉ 1 request duy nhất thay vì 5-6 requests
            </p>
          </div>

          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">📄 Pagination (Phân trang)</h3>
            <p className="text-[#64748b] mb-2">
              Tất cả endpoints trả về danh sách đều hỗ trợ phân trang với 2 tham số:
            </p>
            <ul className="space-y-1 text-[#64748b] ml-4">
              <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#3b82f6]">page</code>: Số trang (bắt đầu từ 1, mặc định: 1)</li>
              <li>• <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#3b82f6]">limit</code>: Số lượng items mỗi trang (mặc định: 10-20, tối đa: 100)</li>
            </ul>
            <p className="text-[#64748b] mt-2">
              Response luôn bao gồm object <code className="bg-[#f8fafc] px-2 py-1 rounded">pagination</code> với thông tin:
            </p>
            <pre className="bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] p-3 rounded-[8px] font-mono text-[12px] mt-2">
{`"pagination": {
  "page": 1,
  "limit": 10,
  "total": 245,
  "totalPages": 25
}`}
            </pre>
          </div>

          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">⏱️ Rate Limiting</h3>
            <p className="text-[#64748b] mb-2">
              Hệ thống áp dụng rate limiting để đảm bảo tính ổn định:
            </p>
            <ul className="space-y-1 text-[#64748b] ml-4">
              <li>• <span className="font-semibold">Endpoints thông thường:</span> 100 requests/phút mỗi IP</li>
              <li>• <span className="font-semibold">Authentication endpoints:</span> 5 lần đăng nhập thất bại/5 phút</li>
              <li>• <span className="font-semibold">Bulk operations:</span> 10 requests/phút</li>
            </ul>
            <p className="text-[#f59e0b] mt-2 text-[13px]">
              ⚠️ Khi vượt quá giới hạn, server trả về <code className="bg-[#fef2f2] px-2 py-0.5 rounded text-[#ef4444]">429 Too Many Requests</code>
            </p>
          </div>

          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">🔐 Security Best Practices</h3>
            <ul className="space-y-1 text-[#64748b] ml-4">
              <li>• Luôn sử dụng HTTPS trong production</li>
              <li>• Không lưu token trong localStorage nếu có thể, ưu tiên httpOnly cookies</li>
              <li>• Refresh token trước khi hết hạn (trước 5 phút)</li>
              <li>• Logout khi chuyển trang hoặc đóng trình duyệt</li>
              <li>• Không gửi sensitive data qua query parameters (dùng request body)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">📊 Response Format</h3>
            <p className="text-[#64748b] mb-2">
              Tất cả responses đều tuân theo cấu trúc chuẩn:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#10b981] text-[13px] font-semibold mb-2">✓ Success Response</p>
                <pre className="bg-[#dcfce7] border border-[#86efac] text-[#0f172a] p-3 rounded-[8px] font-mono text-[11px]">
{`{
  "success": true,
  "data": {...},
  "message": "..."
}`}
                </pre>
              </div>
              <div>
                <p className="text-[#ef4444] text-[13px] font-semibold mb-2">✗ Error Response</p>
                <pre className="bg-[#fef2f2] border border-[#fecaca] text-[#0f172a] p-3 rounded-[8px] font-mono text-[11px]">
{`{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "..."
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">🚀 Performance Tips</h3>
            <ul className="space-y-1 text-[#64748b] ml-4">
              <li>• Sử dụng các endpoint tổng hợp (như <code className="bg-[#f8fafc] px-1.5 py-0.5 rounded">/dashboard/stats</code>) thay vì gọi nhiều API riêng lẻ</li>
              <li>• Cache kết quả ở client-side khi phù hợp (dashboard stats cache 5 phút)</li>
              <li>• Sử dụng pagination với limit hợp lý (10-20 items) thay vì lấy toàn bộ</li>
              <li>• Áp dụng debouncing cho search/filter requests</li>
              <li>• Sử dụng query parameters để filter thay vì lấy toàn bộ rồi filter ở client</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h2 className="text-[#0f172a] text-[18px] font-semibold mb-4">Authentication</h2>
        <div className="space-y-3 text-[14px]">
          <p className="text-[#64748b]">
            Hầu hết các endpoints yêu cầu authentication. Sử dụng Bearer token trong header:
          </p>
          <pre className="bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] p-4 rounded-[8px] font-mono text-[13px]">
            Authorization: Bearer &lt;your-token-here&gt;
          </pre>
          <p className="text-[#64748b]">
            Token được nhận sau khi đăng nhập thành công qua endpoint <code className="bg-[#f8fafc] px-2 py-1 rounded text-[#3b82f6]">/api/auth/login</code>
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white border border-[#e2e8f0] rounded-[12px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h2 className="text-[#0f172a] text-[18px] font-semibold mb-4">Error Responses</h2>
        <div className="space-y-3 text-[14px]">
          <p className="text-[#64748b]">Tất cả lỗi trả về theo format:</p>
          <pre className="bg-[#0f172a] text-[#ef4444] p-4 rounded-[8px] font-mono text-[13px]">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Thông tin không hợp lệ"
  }
}`}
          </pre>
          <div className="mt-4">
            <h3 className="text-[#0f172a] text-[15px] font-semibold mb-2">Common Error Codes:</h3>
            <ul className="space-y-1 text-[#64748b]">
              <li><code className="text-[#ef4444] bg-[#fef2f2] px-2 py-0.5 rounded">401</code> - Unauthorized (Chưa đăng nhập hoặc token không hợp lệ)</li>
              <li><code className="text-[#ef4444] bg-[#fef2f2] px-2 py-0.5 rounded">403</code> - Forbidden (Không có quyền truy cập)</li>
              <li><code className="text-[#ef4444] bg-[#fef2f2] px-2 py-0.5 rounded">404</code> - Not Found (Không tìm thấy tài nguyên)</li>
              <li><code className="text-[#ef4444] bg-[#fef2f2] px-2 py-0.5 rounded">422</code> - Validation Error (Dữ liệu không hợp lệ)</li>
              <li><code className="text-[#ef4444] bg-[#fef2f2] px-2 py-0.5 rounded">500</code> - Internal Server Error (Lỗi server)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
