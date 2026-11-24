# ARCHITECTURE.md — Kiến trúc hệ thống DrawPath AI

## 1. Tổng quan

Hệ thống là **một tiến trình Node.js 24 thuần** phục vụ cả API lẫn frontend tĩnh:

- Runtime: Node.js 24, chỉ dùng module tích hợp: `node:http` (HTTP server), `node:sqlite` (`DatabaseSync`) làm cơ sở dữ liệu nhúng, `node:crypto` (scrypt, random, timing-safe compare).
- **Không framework, không npm dependency** — `npm install` không cần thiết, chạy ngay bằng `node server/...`.
- Frontend: vanilla JS/CSS trong `public/`, không build step.
- Lý do chọn stack: xem DECISIONS.md (ADR-001, ADR-002). Master Prompt cho phép thay stack khi có lý do kỹ thuật rõ ràng.

## 2. Sơ đồ thành phần (logic)

```
Trình duyệt (public/ — vanilla JS/CSS)
  ├─ Marketing UI (landing)
  ├─ Learning UI (dashboard, roadmap, lesson)
  └─ Drawing UI (canvas engine, feedback, portfolio)
        │  HTTP/JSON + cookie session + header CSRF
        ▼
Node.js server (node:http)
  ├─ Router + middleware: session, CSRF, rate limit, logging, error chuẩn hóa
  ├─ Domain modules:
  │    auth · users · curriculum (tracks/modules/lessons/skills)
  │    exercises+rubrics · drawing projects · uploads
  │    submissions · assessments · tutor · progress/mastery
  │    recommendations · portfolio · admin · audit
  ├─ Assessment orchestration:
  │    1) Engine hình học/CV cục bộ (stroke data) — luôn chạy
  │    2) AI Provider Abstraction — chuỗi fallback free (OpenAI-compatible)
  │    3) Validate schema → persist Assessment + Annotations
  └─ AI Job queue nội bộ (bảng AIJob trong SQLite, xử lý bất đồng bộ trong tiến trình)
        │
        ▼
SQLite (node:sqlite, file trong data/)  +  Thư mục lưu file upload/export (data/)
```

## 3. Nguyên tắc kiến trúc

- Logic chấm điểm quan trọng nằm ở **server**, không chỉ ở frontend.
- Backend tách theo domain module, không dồn vào một file khổng lồ.
- Mọi truy cập dữ liệu đều qua lớp repository/service có kiểm tra ownership.
- AI Provider là một abstraction: đổi provider/model không sửa nghiệp vụ (xem AI_ASSESSMENT.md).
- Assessment chạy theo pipeline: Validation → Classification → Preprocessing → Local CV/Geometry → Multimodal (nếu có key) → Rubric Scoring → Schema Validation → Persist → UI.
- Job chấm bài có trạng thái bền vững trong DB (QUEUED/PROCESSING/COMPLETED/FAILED/CANCELLED/EXPIRED), người dùng rời trang không làm mất trạng thái.
- Chống nộp trùng: một submission đang có job active thì không tạo job mới ngoài ý muốn (idempotency theo submission + version).

## 4. Luồng dữ liệu chính (vertical slice P0)

Register → Onboarding → Roadmap → Lesson → Guided Practice → Canvas → Submit → Assessment (local engine + AI fallback nếu có key) → Feedback/Annotation → Revision → Progress/Mastery cập nhật.

## 5. Bảo mật ở tầng kiến trúc

- Mật khẩu: scrypt + salt riêng từng user (ADR-003).
- Session: cookie HttpOnly, SameSite phù hợp; CSRF token gửi qua header cho request thay đổi dữ liệu.
- Authorization kiểm tra ở backend cho mọi route, gồm object-level (IDOR).
- API key AI chỉ ở biến môi trường phía server, không bao giờ xuống client, không hardcode.
- Upload: kiểm tra MIME thực tế, kích thước, khả năng giải mã; lưu ngoài thư mục public.
- Security headers, rate limiting theo route nhạy cảm (auth, upload, AI job).

## 6. Lưu trữ

- Dữ liệu quan hệ: SQLite (schema xem DATABASE.md).
- File nhị phân lớn (ảnh gốc, ảnh tiền xử lý, PNG export): lưu file trên đĩa trong `data/`, DB chỉ giữ metadata + đường dẫn nội bộ. Không công khai URL trực tiếp tới ảnh riêng tư; tải xuống qua route có kiểm tra quyền.
- Định dạng project vẽ có version (xem DRAWING_ENGINE.md) để tương thích ngược khi nâng cấp.

## 7. Quan trắc (Observability)

- Structured logging cho request, AI job, lỗi assessment.
- AuditLog ghi hành động nhạy cảm (đăng nhập, đổi quyền, publish nội dung, chấm lại...).
- Health endpoint cho Docker/CI kiểm tra tiến trình + DB.

## 8. Triển khai

- Một container Docker duy nhất (xem DEPLOYMENT.md), volume cho `data/`.
- Không microservices: quy mô hiện tại không cần, tránh phức tạp thừa (YAGNI).

## 9. Giới hạn kiến trúc đã biết

- Queue nội bộ trong tiến trình: không scale ngang nhiều instance; chấp nhận ở giai đoạn này, ghi ở KNOWN_LIMITATIONS.md.
- SQLite phù hợp tải vừa; nếu sau này cần PostgreSQL thì lớp repository là điểm thay thế.
- Chi tiết trạng thái triển khai: IMPLEMENTATION_STATUS.md.
