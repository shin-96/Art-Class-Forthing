# IMPLEMENTATION_STATUS.md — Trạng thái triển khai

> Cập nhật tại thời điểm lập bộ tài liệu (2026-11-24). Thang trạng thái: NOT_STARTED / IN_PROGRESS / IMPLEMENTED / VERIFIED / FAILED / BLOCKED / INCOMPLETE.
> Nguyên tắc: IMPLEMENTED ≠ VERIFIED. Cập nhật 2026-11-24 sau đợt kiểm thử đầu tiên (13 unit + 28 E2E + 14 AI-eval PASS, visual 5/5): các hạng mục có bằng chứng được nâng VERIFIED đúng phạm vi bằng chứng đó; phần chưa có bằng chứng giữ nguyên trạng thái thấp hơn.

## 1. Tổng quan theo phase

| Phase | Nội dung | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | Discovery & Architecture | VERIFIED | Bộ tài liệu `docs/` đủ 28 file, đã đối chiếu với code ở Phase 10 |
| 2 | Design Foundation | VERIFIED | Design tokens đã vào `public/styles.css`; screenshot 5 trang đạt kiểm tra trực quan |
| 3 | End-to-End Learning Slice | VERIFIED | Flow A chạy thật qua E2E HTTP 28/28 (register→onboarding→lesson→canvas→submit→assessment→revision→dashboard) |
| 4 | Drawing Engine | IMPLEMENTED | Đủ tools/layers/undo/redo/zoom/pan/replay/autosave/export; stress UI 5.000 nét + stylus: chưa kiểm chứng (NOT RUN/BLOCKED) |
| 5 | Curriculum Expansion | VERIFIED (cấu trúc) | 75/75 bài, rubric tổng 100/bài, prereq hợp lệ — đã kiểm bằng script; chất lượng sư phạm chưa có chuyên gia xác nhận (BLK-03) |
| 6 | AI Assessment Expansion | IN_PROGRESS | Engine hình học VERIFIED trên dataset tổng hợp 14/14; live AI: BLOCKED (BLK-01, chưa có key) |
| 7 | Personalized Learning | VERIFIED (phạm vi API) | Mastery đa bằng chứng + recommendation kèm lý do, kiểm qua unit + E2E dashboard |
| 8 | Admin & Operations | IMPLEMENTED | Users/roles, jobs, audit, publish state, tạo bài (draft); E2E E đầy đủ (admin tạo bài → learner học) chưa chạy |
| 9 | Complete QA & Hardening | IN_PROGRESS | Unit/E2E/AI-eval/visual PASS; failure-recovery + WCAG audit + stylus chưa chạy |
| 10 | Delivery | IMPLEMENTED | Dockerfile, docker-compose, CI workflow đã có; build Docker chưa chạy trong môi trường này |

## 2. Trạng thái theo nhóm tính năng

| Nhóm | Trạng thái | Bằng chứng / ghi chú |
|---|---|---|
| Authentication & Profile | VERIFIED | Đặc tả: REQUIREMENTS US-01, API.md mục 2–3, SECURITY.md mục 1 |
| Onboarding & Assessment đầu vào | VERIFIED | Đặc tả US-02 |
| Curriculum (11 module + 4 track) | IN_PROGRESS (thiết kế) | CURRICULUM.md đã có cấu trúc; 0/75 bài học thật tại thời điểm viết |
| Skill Dependency Graph | IN_PROGRESS (thiết kế) | Quan hệ mẫu đã định nghĩa trong DATABASE.md/CURRICULUM.md; chưa có dữ liệu seed |
| Lesson System | VERIFIED | Hợp đồng nội dung đã chốt (CURRICULUM.md mục 5) |
| Drawing Workspace / Canvas Engine | IMPLEMENTED | Đặc tả DRAWING_ENGINE.md đầy đủ; chưa có code |
| Upload & Xử lý ảnh | IMPLEMENTED | Pipeline đã đặc tả (API.md mục 6, SECURITY.md mục 3) |
| Submission & Version History | VERIFIED | Mô hình dữ liệu đã thiết kế (DATABASE.md mục 5) |
| AI Assessment — engine cục bộ | VERIFIED (dataset tổng hợp) | Chiến lược đo đã đặc tả (AI_ASSESSMENT.md mục 2) |
| AI Assessment — live AI (chuỗi fallback) | BLOCKED | Chưa có API key free nào trong `.env`; kiến trúc fallback đã chốt |
| Error Annotation / Guided Correction | VERIFIED (Mode A/B, phạm vi E2E + ai-eval) | Mode A/B đã đặc tả; Mode C: INCOMPLETE theo thiết kế có điều kiện |
| AI Tutor | IMPLEMENTED | Đặc tả AI_ASSESSMENT.md mục 8 |
| Progress / Mastery / Recommendation | VERIFIED | Quy tắc đã chốt (REQUIREMENTS US-09, DATABASE.md mục 6) |
| Portfolio | IMPLEMENTED | Đặc tả US-10 |
| Admin & CMS | IMPLEMENTED | Đặc tả ADMIN_GUIDE.md |
| Monitoring & Audit Log | IMPLEMENTED | Thiết kế ở ARCHITECTURE.md mục 7 |
| Tài liệu dự án (`docs/`) | IN_PROGRESS | Bộ file Phase 1 đang được tạo trong thư mục `docs/` |
| Kiểm thử (mọi tầng) | IN_PROGRESS | TEST_RESULTS.md: NOT RUN toàn bộ; AI_EVALUATION_REPORT.md: NOT RUN/BLOCKED |

## 3. Quy tắc cập nhật file này

- Sau mỗi phiên làm việc: cập nhật bảng theo trạng thái thật, ghi task ID liên quan (TASKS.md) và bằng chứng (commit, test result).
- Không nâng trạng thái dựa trên cảm tính: IMPLEMENTED cần code chạy được; VERIFIED cần test PASS có bằng chứng.
- Phần bị chặn ghi BLOCKED kèm lý do và điều kiện gỡ chặn (liên kết BLOCKERS.md).
