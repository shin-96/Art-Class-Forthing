# TEST_RESULTS.md — Kết quả kiểm thử

> Cập nhật 2026-11-24 sau đợt chạy kiểm thử thật đầu tiên. Quy tắc giữ nguyên: không điền PASS khi chưa chạy; không dùng kết quả mock làm bằng chứng live.

## 1. Thông tin đợt chạy

| Trường | Giá trị |
|---|---|
| Đợt chạy gần nhất | 2026-11-24 (trước commit bàn giao) |
| Môi trường | Linux VM, Node 24.22.1, Chromium headless shell (Playwright) cho visual |
| Người thực hiện | Agent phát triển + bộ test tự động trong `test/` |

## 2. Tổng hợp theo nhóm

| Nhóm | Tổng ca | PASS | FAIL | BLOCKED | NOT RUN |
|---|---|---|---|---|---|
| Unit (`npm test` — hình học, rubric, mastery, auth, sniff ảnh, AI fallback) | 13 | **13** | 0 | 0 | 0 |
| E2E HTTP (`npm run test:e2e` — Flow A/C/D/F + revision + CSRF) | 28 | **28** | 0 | 0 | 0 |
| AI/Geometry evaluation (`node test/ai-eval.mjs` — dataset tổng hợp theo AI_EVALUATION_PLAN) | 14 | **14** | 0 | 0 | 0 |
| Performance (`node test/perf.mjs`) | 3 nhóm đo | Đạt baseline nội bộ (xem PERFORMANCE_REPORT.md) | 0 | 0 | Lighthouse: NOT RUN |
| Visual (screenshot 5 trang/viewport + kiểm tra overflow/token lỗi) | 5 | **5** (sau khi sửa BUG-002, BUG-003) | 0 | 0 | Kiểm thử với người dùng thật: NOT RUN |
| Security — các ca đã chạy qua E2E (IDOR submission/project, admin 403, unauth 401, CSRF 403, upload giả 415, trùng email 409) | 7 | **7** | 0 | 0 | XSS/injection/rate-limit chuyên sâu: NOT RUN |
| Canvas — kiểm chứng qua unit (serialization qua project save/load ở E2E) + screenshot studio | Một phần | — | — | Stylus thật: BLOCKED (không có thiết bị) | Stress 100/1.000/5.000 nét trên UI thật: NOT RUN (đã đo ở tầng engine chấm: xem perf) |
| Failure/Recovery (server restart, DB unavailable, queue restart) | 7 | — | — | — | Toàn bộ NOT RUN |
| Accessibility (kiểm tra thủ công: labels, focus outline, reduced-motion trong CSS) | Một phần | — | — | — | Audit WCAG đầy đủ: NOT RUN |
| AI live (tầng B — provider free thật) | — | — | — | **BLOCKED: chưa có API key nào trong môi trường** | — |

## 3. Chi tiết theo ca

- Unit: `node --test test/unit.test.mjs` → 13/13 pass (gồm ca mastery "1 lần 80đ không phải Mastered", AI fallback chuyển provider khi lỗi 429, rubric <50% trọng số chấm được → không cho điểm).
- E2E: 28/28 pass — đăng ký/đăng nhập/onboarding, curriculum 75 bài, demo strokes, project save/load + conflict 409, nộp bài nét tốt điểm cao hơn nét lệch, revision giữ nguyên bản gốc, tutor trả lời ở chế độ local (ghi rõ mode), IDOR đều 403.
- AI-Eval: 14/14 pass trên dataset tổng hợp (đường thẳng/ellipse/phối cảnh đúng–sai, bài trống, ảnh trống). Đây là bằng chứng tầng thuật toán, KHÔNG thay thế benchmark với chuyên gia (xem AI_EVALUATION_REPORT.md).

## 4. Bug phát sinh từ kiểm thử

3 bug đã phát hiện và sửa trong đợt này — chi tiết ở BUG_REPORT.md (BUG-001 target format, BUG-002 mobile overflow, BUG-003 layer name + guide mặc định). Cả 3 đã chạy regression PASS.

## 5. Kết luận hiện tại

- Luồng học end-to-end (Flow A) + các luồng C/D/F ở mức API: **VERIFIED**.
- Trạng thái sẵn sàng phát hành: **READY_FOR_LOCAL_TESTING** (xem RELEASE_ACCEPTANCE.md) — chưa production vì: AI live BLOCKED (chưa key), chưa benchmark chuyên gia, chưa test stylus/người dùng thật, chưa chạy failure/recovery.
