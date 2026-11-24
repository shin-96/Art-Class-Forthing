# API.md — Đặc tả API DrawPath AI

> Base: cùng origin với web (server Node `node:http`). Dữ liệu JSON. Xác thực bằng cookie session HttpOnly; request thay đổi dữ liệu (POST/PUT/PATCH/DELETE) bắt buộc kèm header CSRF: `X-CSRF-Token: <token>` (token lấy từ `GET /api/auth/me` / response đăng nhập).
> Không tin `owner_id`, `score` do client gửi — server luôn lấy chủ sở hữu từ session và tự tính điểm.

## 1. Quy ước chung

- **Lỗi chuẩn hóa:** `{ "error": { "code": "STRING_CODE", "message": "Thông báo tiếng Việt", "details": {} } }` kèm HTTP status đúng nghĩa (400 validation, 401 chưa đăng nhập, 403 không có quyền/không phải chủ sở hữu, 404 không tồn tại, 409 xung đột/trùng, 413 file quá lớn, 429 rate limit, 500 lỗi máy chủ không lộ chi tiết nội bộ).
- **Phân trang:** query `?page=1&pageSize=20` (pageSize tối đa 100); response `{ "items": [...], "page": 1, "pageSize": 20, "total": 123 }`.
- **Rate limit:** đăng nhập/đăng ký và tạo AI job giới hạn theo IP + tài khoản; upload giới hạn kích thước và tần suất; vượt giới hạn trả 429 kèm `Retry-After`.
- **Idempotency:** nộp bài/tạo AI job dùng khóa chống trùng theo submission version — nhấn Submit nhiều lần không tạo nhiều job.
- Mọi endpoint riêng tư đều kiểm tra ownership ở server (chống IDOR), kể cả khi client đã ẩn nút.

## 2. Auth — `/api/auth`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/auth/register` | guest | Đăng ký email + mật khẩu (băm scrypt) |
| POST | `/api/auth/login` | guest | Đăng nhập, đặt cookie session, trả CSRF token |
| POST | `/api/auth/logout` | learner+ | Đăng xuất, hủy session |
| GET | `/api/auth/me` | learner+ | Thông tin user + role + CSRF token hiện tại |
| POST | `/api/auth/forgot-password` | guest | Yêu cầu đặt lại mật khẩu (cần cấu hình email; nếu chưa cấu hình trả trạng thái rõ ràng, không giả vờ đã gửi) |
| POST | `/api/auth/reset-password` | guest | Đặt lại mật khẩu bằng token một lần, có hạn |
| POST | `/api/auth/change-password` | learner+ | Đổi mật khẩu khi đã đăng nhập |

## 3. Users — `/api/users`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/users/me/profile` | learner+ | Hồ sơ + onboarding (mục tiêu, trình độ, phương thức vẽ, thời gian luyện) |
| PUT | `/api/users/me/profile` | learner+ | Cập nhật hồ sơ/onboarding |
| PUT | `/api/users/me/preferences` | learner+ | Theme, ngôn ngữ, thông báo, riêng tư |
| POST | `/api/users/me/avatar` | learner+ | Tải avatar (qua pipeline upload an toàn) |
| POST | `/api/users/me/export` | learner+ | Xuất dữ liệu cá nhân |
| DELETE | `/api/users/me` | learner+ | Yêu cầu xóa tài khoản/dữ liệu theo chính sách |

## 4. Tracks / Modules / Lessons / Exercises

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/tracks` | guest (chỉ published) | Danh sách track nền tảng + chuyên ngành |
| GET | `/api/tracks/:slug` | guest | Chi tiết track + module |
| GET | `/api/modules/:id` | guest | Chi tiết module + bài học |
| GET | `/api/lessons/:id` | guest (giới thiệu) / learner (đầy đủ) | Nội dung bài, bước hướng dẫn, stroke demo, rubric tóm tắt, cảnh báo tiên quyết |
| GET | `/api/lessons/:id/demo-strokes` | learner+ | Dữ liệu stroke mẫu để replay |
| GET | `/api/exercises/:id` | learner+ | Bài tập + rubric đang hiệu lực |
| GET | `/api/skills` | learner+ | Skill graph: kỹ năng, prerequisite, trạng thái của user |
| POST | `/api/lessons/:id/complete` | learner+ | Đánh dấu hoàn thành theo điều kiện đạt (server kiểm tra, không tự phong mastery) |

## 5. Drawing Projects — `/api/projects`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/projects` | learner+ (của mình) | Danh sách project, phân trang |
| POST | `/api/projects` | learner+ | Tạo project (gắn lesson/exercise nếu có) |
| GET | `/api/projects/:id` | chủ sở hữu | Project + layers + strokes (để load/replay) |
| PUT | `/api/projects/:id` | chủ sở hữu | Lưu/autosave (debounce phía client; server kiểm tra version chống ghi đè bản mới hơn) |
| DELETE | `/api/projects/:id` | chủ sở hữu | Xóa project (có xác nhận phía client) |
| POST | `/api/projects/:id/export` | chủ sở hữu | Xuất PNG phía server hoặc nhận dữ liệu để client render — bản xuất thuộc về chủ sở hữu |

## 6. Uploads — `/api/uploads`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/uploads/drawing` | learner+ | Upload ảnh bài giấy JPG/PNG/WebP; kiểm tra MIME thực, kích thước, độ phân giải, giải mã được; trả metadata + cảnh báo chất lượng (mờ/tối/sáng/nghiêng) |
| POST | `/api/uploads/:id/transform` | chủ sở hữu | Crop/rotate bản tiền xử lý (không sửa bản gốc) |

## 7. Submissions & Assessments

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/submissions` | learner+ | Tạo submission từ project (canvas) hoặc upload; tạo version 1 + AIJob |
| POST | `/api/submissions/:id/revisions` | chủ sở hữu | Nộp bản sửa (version mới, giữ bản gốc) |
| GET | `/api/submissions` | learner+ (của mình) | Danh sách + trạng thái phân tích |
| GET | `/api/submissions/:id` | chủ sở hữu | Chi tiết + toàn bộ version history |
| GET | `/api/submissions/:id/versions/:v/assessment` | chủ sở hữu | Assessment: điểm tổng (nếu đủ dữ liệu), điểm tiêu chí, điểm mạnh/yếu, annotations, correction, confidence, provider/model |
| GET | `/api/ai-jobs/:id` | chủ sở hữu job | Trạng thái job (polling): QUEUED/PROCESSING/COMPLETED/FAILED/... |
| POST | `/api/submissions/:id/reassess` | chủ sở hữu / instructor | Chấm lại — tạo assessment mới, không sửa assessment cũ |

## 8. AI Tutor — `/api/tutor`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| POST | `/api/tutor/conversations` | learner+ | Tạo hội thoại với ngữ cảnh lesson/submission của chính user |
| POST | `/api/tutor/conversations/:id/messages` | chủ sở hữu | Gửi câu hỏi; trả lời qua chuỗi fallback AI free hoặc rule-based cục bộ (ghi rõ nguồn trả lời) |
| GET | `/api/tutor/conversations` | learner+ (của mình) | Lịch sử hội thoại |

## 9. Progress / Mastery / Recommendations

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/progress/me` | learner+ | Tiến độ theo module/lesson |
| GET | `/api/mastery/me` | learner+ | Hồ sơ kỹ năng + trạng thái mastery + bằng chứng tóm tắt |
| GET | `/api/recommendations/me` | learner+ | Bài đề xuất kèm `reason` giải thích |
| POST | `/api/recommendations/:id/dismiss` | chủ sở hữu | Bỏ qua một đề xuất |

## 10. Portfolio — `/api/portfolio`

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| GET | `/api/portfolio` | learner+ (của mình) | Danh sách tác phẩm |
| POST | `/api/portfolio` | learner+ | Thêm tác phẩm từ project/submission |
| PUT | `/api/portfolio/:id` | chủ sở hữu | Đổi tên / quyền riêng tư |
| DELETE | `/api/portfolio/:id` | chủ sở hữu | Xóa khỏi portfolio |
| GET | `/api/portfolio/:id/download` | chủ sở hữu | Tải file (qua kiểm tra quyền, không URL công khai trực tiếp) |

## 11. Admin — `/api/admin` (instructor/admin, kiểm tra role ở server)

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/admin/overview` | Tổng quan hệ thống |
| GET/PUT | `/api/admin/users`, `/api/admin/users/:id/role` | Quản lý user và role |
| POST/PUT | `/api/admin/tracks`, `/api/admin/modules`, `/api/admin/lessons`, `/api/admin/exercises`, `/api/admin/rubrics` | CRUD nội dung + đổi trạng thái Draft/In Review/Published/Archived |
| GET | `/api/admin/ai-jobs` | Giám sát AI jobs, lỗi, provider/model |
| POST | `/api/admin/assessments/:id/flag` | Gắn cờ assessment cần rà soát chất lượng |
| GET | `/api/admin/audit-logs` | Audit log (phân trang, chỉ đọc) |
| GET | `/api/admin/analytics` | Thống kê học tập tổng hợp (không lộ bài riêng tư) |

## 12. Hệ thống

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/health` | Health check: tiến trình + kết nối DB |
| GET | `/api/config/public` | Brand name, tính năng bật/tắt an toàn cho client (không chứa secret) |
