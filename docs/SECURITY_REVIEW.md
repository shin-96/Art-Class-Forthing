# SECURITY_REVIEW.md — Rà soát bảo mật

> Trạng thái tại thời điểm viết: checklist theo thiết kế (SECURITY.md). Cột "Kết quả kiểm thử" là **NOT RUN** cho mọi mục chưa được kiểm chứng bằng hành động thật (đặc biệt: phân quyền phải gọi API trực tiếp, không kết luận từ việc ẩn nút trên giao diện).

## 1. Checklist rà soát

| # | Hạng mục | Biện pháp thiết kế | Test liên quan | Kết quả kiểm thử |
|---|---|---|---|---|
| 1 | Băm mật khẩu | scrypt + salt riêng, timing-safe compare | TC-INT-01 | NOT RUN |
| 2 | Session an toàn | Cookie HttpOnly, hủy session khi logout, hết hạn | TC-SEC-09 | NOT RUN |
| 3 | CSRF | Header token bắt buộc cho request ghi | TC-SEC-10 | NOT RUN |
| 4 | IDOR / Broken Access Control | Ownership check ở server mọi route dữ liệu cá nhân | TC-SEC-02, E2E F | NOT RUN |
| 5 | Phân quyền role | learner không gọi được API admin/instructor | TC-SEC-03, E2E F | NOT RUN |
| 6 | XSS | Escape khi render; AI output validate + escape | TC-SEC-04 | NOT RUN |
| 7 | SQL Injection | Prepared statements 100% | TC-SEC-05 | NOT RUN |
| 8 | Upload độc hại | Kiểm MIME thực, giới hạn kích thước, tên file do server sinh | TC-SEC-06/07/08 | NOT RUN |
| 9 | Path Traversal | Không dùng tên file client cho đường dẫn đĩa | TC-SEC-08 | NOT RUN |
| 10 | Rate Limiting | Auth, upload, AI job, tutor | TC-SEC-11 | NOT RUN |
| 11 | Secret Exposure | `.env` không commit; quét repo | TC-SEC-12 | NOT RUN |
| 12 | Rò rỉ qua log | Log không chứa mật khẩu/token/key/ảnh | TC-SEC-13 | NOT RUN |
| 13 | Security Headers | CSP, nosniff, Referrer-Policy, frame protection, HSTS khi HTTPS | Kiểm tra response headers | NOT RUN |
| 14 | AI Prompt Injection | Input là dữ liệu, không phải chỉ thị; system prompt không bị ghi đè | TC-SEC-14 | NOT RUN |
| 15 | Duplicate Processing | Khóa chống trùng job/submission | TC-SEC-15, E2E G | NOT RUN |
| 16 | Lỗi không lộ chi tiết | Error chuẩn hóa, không stack/SQL ra client | Đọc response lỗi mẫu | NOT RUN |
| 17 | Quyền riêng tư ảnh | Không URL công khai; tải qua route có quyền | TC-SEC-02 | NOT RUN |
| 18 | Audit Log | Ghi hành động nhạy cảm, chỉ đọc qua admin | E2E E | NOT RUN |

## 2. Vấn đề đã biết tại thời điểm viết

- Chưa có kết quả kiểm thử bảo mật nào — không có cơ sở tuyên bố hệ thống "đã an toàn".
- Gửi email (quên mật khẩu/thông báo) phụ thuộc cấu hình SMTP; chưa cấu hình thì luồng đặt lại mật khẩu qua email chưa hoàn chỉnh (BLOCKERS.md).
- Cần rà soát pháp lý riêng về người dùng chưa thành niên trước khi mở công khai (SECURITY.md mục 8).

## 3. Quy trình cập nhật

Mỗi đợt rà soát ghi: ngày, người thực hiện, phạm vi, kết quả từng mục (PASS/FAIL kèm bằng chứng), lỗ hổng phát hiện → chuyển thành bug trong BUG_REPORT.md với severity, sửa và chạy regression TC-SEC liên quan trước khi đóng.

## 4. Kết luận hiện tại

**Chưa đủ bằng chứng để kết luận bảo mật đạt.** Gate F (Release) yêu cầu các kiểm tra bảo mật quan trọng PASS — hiện chưa mục nào đạt trạng thái đó.
