# TEST_PLAN.md — Kế hoạch kiểm thử

> Nguyên tắc: IMPLEMENTED ≠ VERIFIED. Chỉ ghi PASS khi test đã chạy thật và có bằng chứng. Kết quả thực tế nằm ở TEST_RESULTS.md — tại thời điểm viết kế hoạch này, toàn bộ là **NOT RUN**.
> Trạng thái dùng đúng thang: NOT_STARTED / IN_PROGRESS / IMPLEMENTED / VERIFIED / FAILED / BLOCKED / INCOMPLETE.

## 1. Chiến lược — Testing Pyramid

| Tầng | Nội dung | Công cụ định hướng |
|---|---|---|
| Static analysis | Cú pháp, lint, kiểm tra secret lộ trong repo | Node `--check`, quét thủ công/CI |
| Unit tests | Geometry, biến đổi tọa độ, stroke ops, serialize, rubric, mastery, recommendation, ownership, upload validation, schema, job state | Test runner tích hợp Node (`node:test`) — không thêm dependency |
| Integration tests | Auth+DB, lesson+progress, canvas+storage, submission+assessment, admin+publishing, queue+AIJob | `node:test` + DB test riêng |
| E2E tests | Flow A–H (TEST_CASES.md) trên trình duyệt thật | Kịch bản trình duyệt thủ công/tự động theo môi trường cho phép |
| Visual regression | Screenshot 10 trang chính ở 4 viewport | So sánh ảnh chụp, kiểm tra overflow/overlap |
| AI evaluation | Dataset 20 ca, metrics và ngưỡng đặt trước | AI_EVALUATION_PLAN.md |
| Security tests | IDOR, BAC, XSS, injection, upload độc hại, rate limit, prompt injection | Gọi API trực tiếp |
| Accessibility | Contrast, keyboard, label, focus, reduced motion, touch target | Kiểm tra thủ công + công cụ hỗ trợ |
| Performance | Page load, canvas 100/1.000/5.000 nét, autosave, export, AI job | Đo trên môi trường khai báo rõ (PERFORMANCE_REPORT.md) |
| Failure/Recovery | Mất mạng, AI timeout, DB lỗi, refresh, nộp trùng, file hỏng | Kịch bản mô phỏng có kiểm soát |
| Manual exploratory | Luồng học viên thật trọn phiên | Checklist phiên khám phá |

## 2. Môi trường kiểm thử

- DB test độc lập với DB dev/production; dữ liệu test tạo bằng seed/fixture riêng, xóa được toàn bộ sau test.
- Tài khoản test cho 4 vai trò: guest (không đăng nhập), learner A, learner B (cho test IDOR), instructor, admin.
- Trình duyệt kiểm tra: Chrome, Edge, Firefox, Safari (phiên bản phổ biến còn hỗ trợ) — ghi rõ phiên bản thực tế khi chạy.
- Viewport: 375 / 768 / 1280 / 1440 px + hướng dọc/ngang trên mobile/tablet.
- Thiết bị stylus: chỉ kết luận khi có thiết bị thật; không có thì ghi BLOCKED cho ca tương ứng, không suy đoán.

## 3. Dữ liệu kiểm thử

- Bộ bài vẽ tổng hợp có ground truth: đường thẳng đúng/lệch, ellipse đúng/méo, khối đúng/sai tỷ lệ, phối cảnh đúng/sai (dùng cho unit geometry + AI evaluation).
- Ảnh upload mẫu: rõ nét, mờ, quá tối, quá sáng, xoay, bị cắt, chụp nghiêng, ảnh không liên quan.
- Project canvas mẫu: 100 / 1.000 / 5.000 nét cho stress test.

## 4. Tiêu chí vào/ra (Entry/Exit)

- Vào: tính năng ở trạng thái IMPLEMENTED, có acceptance criteria, môi trường test dựng được.
- Ra (VERIFIED): mọi test case bắt buộc của tính năng PASS, không còn bug Blocker/Critical mở, bằng chứng (log/ảnh chụp/kết quả) đính kèm trong TEST_RESULTS.md.
- Test FAIL → tạo bug trong BUG_REPORT.md theo quy trình Detect → Reproduce → Investigate → Fix → Test → Regression → Close. Không xóa test, không nới validation để test xanh.

## 5. Quality Gates liên quan

Gate A (Architecture), B (Vertical Slice), C (Canvas), D (Curriculum), E (AI), F (Release) — định nghĩa ở RELEASE_ACCEPTANCE.md. Test plan này cung cấp bằng chứng cho các gate; không tự chuyển gate sang PASS khi thiếu bằng chứng.

## 6. Lịch trình theo phase

- Phase 1–2: unit cho geometry/rubric/mastery + kiểm tra design tokens/contrast.
- Phase 3: E2E A (luồng học viên mới) + integration submission/assessment bằng engine cục bộ.
- Phase 4: bộ TC-CAN đầy đủ + stress 5.000 nét.
- Phase 5: kiểm tra nội dung (số bài, hợp đồng bài học, prerequisite hợp lệ).
- Phase 6: AI evaluation 20 ca + E2E G (AI failure).
- Phase 7: unit/integration mastery + recommendation.
- Phase 8: E2E E (admin publishing) + F (authorization).
- Phase 9: toàn bộ — security, accessibility, visual, performance, recovery, regression cuối.

## 7. Báo cáo

Mỗi đợt chạy ghi vào TEST_RESULTS.md: ngày, môi trường, phiên bản code (commit), số ca PASS/FAIL/BLOCKED/NOT RUN theo nhóm, link/log bằng chứng, bug phát sinh. Số liệu không chạy thì không điền.
