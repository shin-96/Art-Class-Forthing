# ADMIN_GUIDE.md — Hướng dẫn quản trị (Instructor / Admin)

> Phân quyền được kiểm tra ở server. Instructor/Editor quản lý nội dung; Admin quản lý cả người dùng, vai trò và hệ thống. Mọi hành động nhạy cảm đều ghi Audit Log.

## 1. Đăng nhập quản trị

- Tài khoản admin đầu tiên được tạo từ biến môi trường khi seed (`ADMIN_EMAIL`/`ADMIN_PASSWORD`, xem DEPLOYMENT.md). **Đổi mật khẩu ngay sau lần đăng nhập đầu.**
- Không chia sẻ tài khoản admin; cấp quyền instructor cho từng người biên tập riêng để audit log có ý nghĩa.

## 2. Tổng quan (Admin Overview)

Số lượng user, module/bài học theo trạng thái xuất bản, submission gần đây, AI jobs theo trạng thái, assessment bị gắn cờ. Số liệu lấy từ dữ liệu thật của hệ thống — không có số liệu mẫu.

## 3. Quản lý người dùng và vai trò

- Tìm kiếm/lọc user, xem hồ sơ học tập tổng quan (không xem bài riêng tư ngoài phạm vi rà soát đã gắn cờ).
- Đổi vai trò: learner ↔ instructor ↔ admin. Thao tác đổi vai trò ghi audit log và có hiệu lực ở lần gọi API tiếp theo của user đó.
- Khóa tài khoản khi có dấu hiệu lạm dụng (rate limit/spam AI job).

## 4. Quản lý chương trình học

Thứ tự làm việc khuyến nghị: Track → Module → Lesson → Exercise → Rubric.

- **Module Editor:** tạo/sửa module, thứ tự, track thuộc về, trạng thái.
- **Lesson Editor:** soạn nội dung theo hợp đồng bài học (CURRICULUM.md mục 5): mục tiêu, lý thuyết, ví dụ đúng/sai, các bước, stroke demonstration, lỗi thường gặp, điều kiện đạt, liên kết tiên quyết. Thiếu thành phần bắt buộc → không chuyển được sang In Review.
- **Exercise Editor:** chọn chế độ luyện (guided/assisted/independent) và `eval_strategy` đúng loại bài — chọn sai chiến lược sẽ làm assessment sai bản chất.
- **Rubric Editor:** thêm tiêu chí, đặt trọng số — **tổng phải bằng 100**, hệ thống chặn lưu nếu sai. Sửa rubric đã dùng để chấm sẽ tạo **version mới**, không sửa điểm cũ.
- **Media:** tải minh họa/reference lên qua pipeline upload an toàn; ghi nguồn gốc/quyền sử dụng của từng tài sản.

## 5. Quy trình xuất bản

Draft → In Review → Published → Archived.

- Nội dung do AI hỗ trợ soạn **không tự động xuất bản**; phải qua In Review bởi người có chuyên môn.
- Bài Archived ẩn khỏi learner nhưng dữ liệu submission/assessment cũ vẫn giữ nguyên để tra cứu.

## 6. Giám sát AI Jobs

- Danh sách job: trạng thái (QUEUED/PROCESSING/COMPLETED/FAILED/CANCELLED/EXPIRED), provider/model thực tế, retry count, error code, thời gian xử lý.
- Job FAILED hàng loạt ở một provider → kiểm tra quota/chính sách free của provider đó; chuỗi fallback sẽ tự chuyển nhà, nhưng cần loại provider đã chết khỏi cấu hình (cập nhật AI_ASSESSMENT.md + DECISIONS.md).
- Job kẹt PROCESSING sau khi server restart → theo dõi cơ chế khôi phục; ghi nhận sự cố vào BUG_REPORT.md nếu trạng thái không tự nhất quán.

## 7. Rà soát chất lượng AI (Quality Review)

- Xem các assessment bị người dùng báo sai hoặc bị hệ thống gắn cờ theo confidence thấp.
- Đối chiếu: bài gốc, rubric version, model version, kết quả tầng cục bộ, log xử lý.
- Gắn cờ + ghi chú trường hợp cần rà soát; các ca này là đầu vào cho AI_EVALUATION (dataset/bài học kinh nghiệm), không tự sửa điểm của học viên ngoài quy trình chấm lại (chấm lại tạo assessment mới, giữ lịch sử).

## 8. Analytics và Audit Logs

- Analytics: tiến độ theo module, phân bố mastery, tỷ lệ hoàn thành, lỗi thường gặp theo tổng hợp — chỉ số tổng hợp, không lộ bài cá nhân.
- Audit Logs: lọc theo người thực hiện/hành động/thời gian; dùng khi điều tra sự cố phân quyền hoặc thay đổi nội dung. Audit log chỉ đọc, không sửa/xóa qua giao diện.

## 9. Vận hành thường kỳ

- Sao lưu `data/` (DB + file) theo DEPLOYMENT.md mục 5.
- Theo dõi dung lượng upload và dọn file mồ côi theo chính sách lưu trữ.
- Khi provider free thay đổi chính sách: cập nhật `.env`/chuỗi fallback, ghi DECISIONS.md, thông báo trong CHANGELOG.md.
- Trước mỗi đợt phát hành: đối chiếu RELEASE_ACCEPTANCE.md — không phát hành khi còn bug Blocker/Critical mở.
