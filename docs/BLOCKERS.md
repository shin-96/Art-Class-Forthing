# BLOCKERS.md — Điều kiện đang chặn

> Mỗi blocker: mô tả, phạm vi ảnh hưởng, điều kiện gỡ chặn, trạng thái. Blocker được gỡ phải ghi ngày + bằng chứng, không xóa lặng lẽ.

## BLK-01 — Chưa có API key AI free nào được cấu hình
- **Ảnh hưởng:** Tầng B (AI multimodal + tutor qua provider ngoài) ở trạng thái **BLOCKED**. Assessment vẫn thiết kế để chạy bằng engine hình học/CV cục bộ (tầng A) không cần key; tutor còn đích cuối rule-based cục bộ và Pollinations (text, không cần key).
- **Gỡ chặn:** Người dùng tạo key free (không cần thẻ) cho ít nhất một nhà trong chuỗi — ưu tiên Gemini AI Studio — và đặt vào `.env` của server theo DEPLOYMENT.md mục 2. Key chỉ do người dùng tự tạo từ tài khoản của mình; không dùng key lậu/rò rỉ.
- **Trạng thái:** OPEN (tại thời điểm viết, 2026-11-24).

## BLK-02 — Chưa có cấu hình gửi email (SMTP)
- **Ảnh hưởng:** Luồng quên/đặt lại mật khẩu qua email và email xác thực/thông báo chưa hoàn chỉnh; hệ thống phải thông báo trung thực thay vì giả vờ đã gửi.
- **Gỡ chặn:** Cung cấp cấu hình SMTP (hoặc dịch vụ gửi email free tier) qua biến môi trường.
- **Trạng thái:** OPEN.

## BLK-03 — Chưa có chuyên gia mỹ thuật rà soát nội dung
- **Ảnh hưởng:** Nội dung chương trình và tiêu chí "agreement with expert feedback" trong AI evaluation chưa thể xác nhận; mọi bài học mang trạng thái "chưa có chuyên gia xác nhận".
- **Gỡ chặn:** Có người có chuyên môn mỹ thuật rà soát theo checklist CURRICULUM.md mục 6 và ghi nhận kết quả.
- **Trạng thái:** OPEN.

## BLK-04 — Chưa có thiết bị stylus để kiểm thử pressure/tilt
- **Ảnh hưởng:** Ca kiểm thử TC-CAN-16 (stylus) ở trạng thái BLOCKED; không kết luận được hành vi lực bút trên thiết bị thật.
- **Gỡ chặn:** Kiểm thử trên thiết bị có bút (tablet/máy có pen) hoặc môi trường mô phỏng phù hợp, ghi rõ thiết bị khi chạy.
- **Trạng thái:** OPEN.

## BLK-05 — Chưa có đợt kiểm thử nào được thực thi
- **Ảnh hưởng:** Toàn bộ TEST_RESULTS.md là NOT RUN; không tính năng nào đạt VERIFIED; Gate A–F chưa gate nào PASS; mức sẵn sàng phát hành là NOT_READY cho production (RELEASE_ACCEPTANCE.md).
- **Gỡ chặn:** Triển khai code theo phase rồi chạy kiểm thử theo TEST_PLAN.md, điền kết quả thật.
- **Trạng thái:** OPEN — đây là hệ quả của giai đoạn hiện tại (mới có tài liệu), không phải sự cố.

## Điều không bị chặn

- Thiết kế kiến trúc, dữ liệu, API, curriculum, design system: đã chốt trong `docs/`, làm tiếp được ngay.
- Engine chấm hình học/CV cục bộ: thiết kế không phụ thuộc key hay dịch vụ ngoài.
- Mọi công việc Phase 1–5 không cần chờ BLK-01/02/03/04.

## Quy trình theo dõi blocker

- Rà soát blocker ở đầu mỗi phiên làm việc và trước mỗi quality gate (Gate A–F).
- Blocker chỉ chặn đúng phạm vi ghi ở mục "Ảnh hưởng"; công việc ngoài phạm vi đó vẫn tiến hành bình thường — không dùng một blocker làm lý do dừng toàn bộ dự án.
- Khi điều kiện gỡ chặn thỏa mãn, người gỡ phải: (1) ghi ngày + bằng chứng vào mục blocker tương ứng, (2) đổi trạng thái sang RESOLVED, (3) cập nhật IMPLEMENTATION_STATUS.md và RELEASE_ACCEPTANCE.md nếu trạng thái tính năng thay đổi theo.
- Blocker mới phát hiện trong quá trình làm (provider free ngừng dịch vụ, thiếu quyền truy cập, thiếu dữ liệu kiểm thử...) phải thêm ngay vào file này với ID tiếp theo (BLK-06, BLK-07...), không để nằm rải rác trong ghi chú phiên.

## Lịch sử thay đổi blocker

| Ngày | Blocker | Sự kiện |
|---|---|---|
| 2026-11-24 | BLK-01..BLK-05 | Khởi tạo danh sách ở giai đoạn lập tài liệu Phase 1; cả 5 đều OPEN |

## BLK-06 — Chưa đẩy được GitHub Actions workflow lên repo (mở 2026-11-24)
- Cả hai đường ghi hiện có (token classic scope `public_repo` và GitHub App) đều bị GitHub từ chối khi cây file chứa `.github/workflows/*` (cần scope `workflow`).
- Nội dung workflow đã để sẵn tại `docs/ci-workflow.yml`. Cách gỡ: user tải file đó lên đúng đường dẫn `.github/workflows/ci.yml` bằng tài khoản GitHub của mình trên web (hoặc cấp thêm scope `workflow` cho token), CI sẽ chạy ngay (syntax + unit + E2E).
- Ảnh hưởng: không chặn chạy/test local; chỉ thiếu CI tự động trên GitHub.
