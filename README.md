# Hệ thống Quản lý Đề và Chấm thi Trực tuyến

Hệ thống quản lý đề thi, danh sách lớp, câu hỏi và chấm thi trực tuyến dành cho quản trị viên và giảng viên. Dự án được chia làm hai phần chính: **Backend** (Spring Boot) và **Frontend** (React + Vite).

---

## 🛠️ Công nghệ sử dụng

### Backend (Thư mục `/backend`)
*   **Framework:** Spring Boot 3.x / 4.x (Java 21)
*   **Database:** MySQL 8.0 (Được cấu hình chạy qua Docker)
*   **ORM / Data Access:** Spring Data JPA / Hibernate
*   **Security:** Spring Security (Xác thực không mã hóa mật khẩu NoOpPasswordEncoder phục vụ môi trường phát triển thử nghiệm) + JWT Token
*   **Build Tool:** Maven

### Frontend (Thư mục `/frontend`)
*   **Framework/Bundler:** React + Vite
*   **Styling:** Bootstrap 5 & React Bootstrap (Hỗ trợ responsive và giao diện sáng)
*   **Thư viện xử lý Excel:** `xlsx` (Hỗ trợ kéo thả nhập danh sách sinh viên từ file Excel và xuất bảng điểm)
*   **HTTP Client:** Axios

---

## 📋 Các tính năng chính của hệ thống

1.  **Quản lý Hệ thống (Dành cho Quản trị viên - Admin)**:
    *   Quản lý giáo viên: Thêm mới tài khoản, sửa thông tin (họ tên, cập nhật mật khẩu), xóa giáo viên.
    *   Quản lý môn học: Thiết lập danh sách môn học của trường (thêm mới, chỉnh sửa, xóa môn học).
    *   Phân công giảng dạy: Phân chia các môn học giảng dạy cho từng giáo viên.
    *   Quản lý ngân hàng câu hỏi toàn hệ thống và biên soạn, sửa đổi tất cả đề thi.

2.  **Quản lý & Biên soạn Đề thi (Giảng viên & Admin)**:
    *   Tạo đề thi mới, chọn danh sách câu hỏi trong ngân hàng câu hỏi.
    *   Ràng buộc môn học: Đề thi của môn học nào chỉ được phép chọn các câu hỏi thuộc môn học đó.
    *   Hỗ trợ in ấn: Xuất bản in đề thi và in hướng dẫn chấm điểm.
    *   Xem trước nội dung đề thi (Preview Modal) nhanh chóng từ danh sách đề.

3.  **Quản lý Lớp học (Giảng viên)**:
    *   Tạo lớp học, phân công giảng viên và môn học.
    *   Nhập danh sách học sinh từ file Excel/CSV bằng kéo thả, hỗ trợ tải về file mẫu tiêu chuẩn.
    *   Khóa cập nhật đề thi: Ràng buộc lớp học đang trong quá trình chấm thi (đã có ít nhất 1 bài nộp đã được chấm) thì không được phép thay đổi đề thi của lớp đó.

4.  **Ngân hàng Câu hỏi (Giảng viên & Admin)**:
    *   Tạo mới, chỉnh sửa câu hỏi tự luận theo từng môn học và phân loại độ khó (Dễ, Trung bình, Khó).
    *   Xem trước nội dung và đáp án gợi ý trực tiếp bằng Modal từ danh sách câu hỏi.

5.  **Chấm thi & Sửa điểm (Giảng viên)**:
    *   Danh sách bài thi của học sinh hiển thị trực quan trạng thái (Đã chấm / Chưa chấm).
    *   Hỗ trợ chấm điểm tự luận kèm nhận xét của giảng viên.
    *   Hỗ trợ sửa lại điểm và nhận xét của bài thi sau khi đã chấm.
    *   Xuất bảng điểm lớp học ra file Excel.

6.  **Tự động chuyển hướng & Quản lý Session**:
    *   Tự động phát hiện trạng thái đăng nhập và hiệu lực của token để chuyển hướng thông minh (từ trang đăng nhập vào thẳng dashboard nếu token còn hạn).
    *   Tích hợp interceptor bắt lỗi `401 Unauthorized` từ API để tự động xóa thông tin đăng nhập đã hết hạn trên client và chuyển hướng về trang đăng nhập.

---

## 🚀 Hướng dẫn khởi chạy dự án

### Bước 1: Khởi động Cơ sở dữ liệu (MySQL Docker)
Thư mục `/backend` đã được tích hợp sẵn cấu hình Docker Compose cho MySQL.
1.  Mở terminal và di chuyển đến thư mục `/backend`.
2.  Khởi chạy container MySQL:
    ```bash
    docker-compose up -d
    ```
    *Cơ sở dữ liệu sẽ chạy trên cổng `3307` của máy host (được ánh xạ từ cổng `3306` của container).*

### Bước 2: Khởi chạy Backend (Spring Boot)
1.  Trong thư mục `/backend`, chạy lệnh khởi động server:
    ```bash
    ./mvnw spring-boot:run
    ```
    *Server API sẽ chạy tại địa chỉ `http://localhost:8080`.*
    *Hệ thống tự động chạy lớp `DataSeeder.java` để nạp dữ liệu mẫu ban đầu (Admin, Giáo viên, các môn học UIT, lớp học, học sinh, câu hỏi, đề thi mẫu và bài nộp).*

### Bước 3: Khởi chạy Frontend (React)
1.  Mở một cửa sổ terminal khác và di chuyển đến thư mục `/frontend`.
2.  Cài đặt các thư viện cần thiết (nếu là lần đầu chạy):
    ```bash
    npm install
    ```
3.  Khởi chạy dev server:
    ```bash
    npm start
    ```
    *Ứng dụng sẽ chạy tại địa chỉ `http://localhost:3000`.*

---

## 🔐 Tài khoản thử nghiệm (Dữ liệu mẫu)

Hệ thống hỗ trợ đăng nhập bằng tài khoản quản trị viên và các giảng viên được tạo sẵn:

| Tên hiển thị | Mã đăng nhập (Username) | Mật khẩu | Phân quyền & Nhiệm vụ |
| :--- | :--- | :--- | :--- |
| **Hệ thống Admin** | `admin` | `admin123` | **Quản trị viên**: Quản lý giáo viên, môn học, phân công giảng dạy, ngân hàng câu hỏi và toàn bộ đề thi |
| **Nguyen Van A** | `GV001` | `123456` | **Giảng viên**: Nhập môn CNPM (`SE104`), Phương pháp mô hình hóa (`SE101`), Nhập môn lập trình (`IT001`), Lập trình hướng đối tượng (`IT002`), Cấu trúc dữ liệu và giải thuật (`IT003`) |
| **Tran Thi B** | `GV002` | `123456` | **Giảng viên**: Triết học Mác - Lênin (`SS001`), Kinh tế Chính trị Mác - Lênin (`SS008`), Nhập môn CNPM (`SE104`), Cơ sở dữ liệu (`IT004`), Mạng máy tính (`IT005`) |
| **Le Hoang C** | `GV003` | `123456` | **Giảng viên**: Nhập môn lập trình (`IT001`), Nhập môn CNPM (`SE104`), Thiết kế phần mềm (`SE114`), Kiểm thử và đảm bảo chất lượng phần mềm (`SE320`) |
