# SECURITY.md — Bảo mật và quyền riêng tư

## 1. Xác thực (Authentication)

- Mật khẩu băm bằng **scrypt** (`node:crypto`) với salt ngẫu nhiên riêng từng user; so sánh bằng timing-safe compare. Không lưu mật khẩu dạng rõ ở bất kỳ đâu, kể cả log.
- Session: cookie **HttpOnly**, SameSite phù hợp, có thời hạn; session id lưu phía server dạng băm. Đăng xuất hủy session phía server.
- CSRF: request thay đổi dữ liệu bắt buộc header `X-CSRF-Token` khớp token gắn với session.
- Quên/đặt lại mật khẩu: token một lần, có hạn, băm khi lưu; chỉ hoạt động đầy đủ khi có cấu hình gửi email (chưa cấu hình thì thông báo trung thực, xem BLOCKERS.md).
- Đăng nhập/đăng ký có rate limit; thông báo lỗi đăng nhập không tiết lộ email có tồn tại hay không.

## 2. Phân quyền (Authorization)

- Vai trò: `guest`, `learner`, `instructor`, `admin`. Kiểm tra role ở **backend** cho mọi route admin/instructor.
- **Object-level authorization:** mọi truy cập project/submission/assessment/portfolio/conversation đều đối chiếu `owner_id` với user trong session. Ẩn nút ở frontend không được coi là biện pháp bảo mật.
- Không tin `owner_id`, `score`, `role` do client gửi.
- Kiểm thử bắt buộc: IDOR + Broken Access Control bằng cách gọi API trực tiếp (E2E F, TC-SEC-*).

## 3. Upload và file

- Chỉ nhận JPG/PNG/WebP cho ảnh bài vẽ (và định dạng avatar tương ứng); kiểm tra **MIME thực tế** từ nội dung file, không tin phần mở rộng/`Content-Type` client khai.
- Giới hạn kích thước file và độ phân giải; kiểm tra file giải mã được trước khi lưu vào pipeline chấm.
- File lưu ngoài thư mục tĩnh công khai; tải xuống qua route có kiểm tra quyền. Tên file trên đĩa do server sinh (không dùng tên client gửi → chống path traversal).
- Ảnh riêng tư không có URL công khai đoán được.

## 4. Chống tấn công web phổ biến

- XSS: escape mặc định khi render nội dung người dùng; không chèn HTML thô từ input/AI output chưa qua xử lý; AI output phải validate schema + escape trước khi hiển thị.
- Injection: truy vấn SQLite dùng tham số hóa (prepared statements) 100%; không nối chuỗi SQL từ input.
- Security headers: `Content-Security-Policy` phù hợp frontend vanilla, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options`/frame-ancestors, `Strict-Transport-Security` khi chạy HTTPS.
- Rate limiting: auth, upload, tạo AI job, tutor.
- Lỗi trả về chuẩn hóa, không lộ stack trace/SQL/đường dẫn nội bộ ra client; chi tiết lỗi chỉ ở log server.

## 5. Bí mật và cấu hình

- API key AI, secret session, tài khoản admin seed: chỉ qua biến môi trường (`.env`, không commit). Repo có `.env.example` không chứa giá trị thật.
- Không hardcode secret trong code/tài liệu. Log không ghi key, mật khẩu, token, nội dung ảnh.

## 6. Dữ liệu gửi cho AI provider

- Khi chấm bằng tầng B, ảnh bài vẽ + rubric + ngữ cảnh bài tập được gửi tới provider đang hoạt động trong chuỗi fallback (AI_ASSESSMENT.md mục 3). Provider thực tế của từng lần chấm được ghi trong Assessment (`ai_provider`, `ai_model`).
- Không dùng tác phẩm riêng tư của người dùng làm dữ liệu huấn luyện.
- Người dùng được biết dữ liệu của mình được xử lý bởi provider nào qua trang Settings/Privacy (mô tả trong USER_GUIDE.md).
- Prompt injection: nội dung người dùng, chú thích và tài liệu không đáng tin được coi là **dữ liệu**, không phải chỉ thị; system prompt và rubric không bị ghi đè bởi input.

## 7. Quyền dữ liệu của người dùng

- Bài vẽ mặc định **riêng tư**; chỉ chủ sở hữu (và instructor/admin trong phạm vi rà soát chất lượng đã gắn cờ, có audit log) mới truy cập được.
- Người dùng xuất được dữ liệu cá nhân và yêu cầu xóa tài khoản/dữ liệu (API.md mục 3). Xóa gồm bản ghi + file trên đĩa theo chính sách lưu trữ.
- AuditLog ghi hành động nhạy cảm: đăng nhập, đổi role, publish nội dung, chấm lại, gắn cờ assessment, truy cập quản trị.

## 8. Trẻ em và pháp lý

- Sản phẩm có thể có người dùng chưa thành niên: cần đánh giá bổ sung về độ tuổi, sự đồng ý và quyền riêng tư trước khi mở đăng ký công khai cho nhóm này.
- Tài liệu này **không** tuyên bố đã tuân thủ toàn bộ pháp luật; cần rà soát pháp lý riêng trước production (KNOWN_LIMITATIONS.md).

## 9. Kiểm thử bảo mật

Danh mục kiểm thử và trạng thái: SECURITY_REVIEW.md và TEST_CASES.md nhóm TC-SEC. Chưa chạy thì ghi NOT RUN — không tuyên bố "đã bảo mật" khi chưa kiểm chứng phân quyền bằng API trực tiếp.
