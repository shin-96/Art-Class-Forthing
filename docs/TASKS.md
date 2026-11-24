# TASKS.md — Danh sách công việc theo 10 phase

> Mỗi task: ID, mô tả, ưu tiên, tiêu chí nghiệm thu (Acceptance), phụ thuộc (Dependencies). Trạng thái thực hiện cập nhật ở IMPLEMENTATION_STATUS.md — file này là kế hoạch đã chốt.
> Thang trạng thái: NOT_STARTED / IN_PROGRESS / IMPLEMENTED / VERIFIED / FAILED / BLOCKED / INCOMPLETE.

## Phase 1 — Discovery & Architecture

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T1.1 | Audit repo + môi trường | P0 | Ghi nhận repo rỗng (chỉ README), Node 24 khả dụng | — |
| T1.2 | REQUIREMENTS.md + traceability matrix | P0 | Đủ user stories, AC, bảng REQ → module → test | T1.1 |
| T1.3 | ARCHITECTURE.md + DATABASE.md + API.md | P0 | Đủ 27 entity, endpoint theo nhóm, quy ước lỗi/phân trang | T1.2 |
| T1.4 | CURRICULUM.md (cấu trúc 11+4) | P0 | Cấu trúc + quyết định sư phạm + giới hạn chuyên gia | T1.2 |
| T1.5 | AI_EVALUATION_PLAN.md với ngưỡng đặt trước | P0 | Dataset 20 ca + metrics + ngưỡng, viết trước khi có kết quả | T1.3 |
| T1.6 | Test strategy + risk analysis | P1 | TEST_PLAN.md phản ánh đủ tầng kiểm thử | T1.3 |

## Phase 2 — Design Foundation

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T2.1 | Brand + ART_DIRECTION.md | P0 | Modern Creative Atelier, tên tạm quản lý tập trung | T1.2 |
| T2.2 | DESIGN_SYSTEM.md: tokens, typography tiếng Việt, motion, a11y | P0 | Đủ 8 màu đã chốt, thang type/spacing, quy tắc WCAG 2.2 AA | T2.1 |
| T2.3 | CSS nền tảng + component cốt lõi trong `public/` | P0 | Button/Input/Card/Modal đủ trạng thái, focus-visible rõ | T2.2 |
| T2.4 | Kiểm tra màn hình đại diện (landing, lesson, workspace) | P1 | Không vỡ layout ở 375/768/1280/1440 | T2.3 |

## Phase 3 — First End-to-End Learning Slice

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T3.1 | Auth: register/login/logout/session/CSRF, scrypt | P0 | TC-AUTH + E2E A bước 1–4 đạt | T1.3 |
| T3.2 | Onboarding + gợi ý điểm bắt đầu | P0 | Lưu hồ sơ, gợi ý kèm lý do | T3.1 |
| T3.3 | Roadmap + lesson detail (1 module mẫu đầy đủ) | P0 | Hiển thị trạng thái, cảnh báo tiên quyết, stroke demo chạy | T3.2 |
| T3.4 | Canvas cơ bản trong luồng học (vẽ, lưu, nộp) | P0 | Vẽ + save + reload khôi phục đúng | Phase 4 một phần |
| T3.5 | Assessment bằng engine cục bộ + feedback UI | P0 | Nộp → có điểm tiêu chí + annotation; thiếu dữ liệu không bịa điểm | T3.4 |
| T3.6 | Revision + progress cập nhật | P0 | E2E A trọn luồng đạt | T3.5 |

## Phase 4 — Drawing Engine Completion

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T4.1 | Đủ công cụ: pencil/brush/eraser/màu/cỡ nét/opacity | P0 | TC-CAN-01..04 | T3.4 |
| T4.2 | Layers đầy đủ + undo/redo nhất quán | P0 | TC-CAN-05, 09 | T4.1 |
| T4.3 | Zoom/pan/fit + tọa độ chuẩn hóa 0..1000 | P0 | TC-CAN-06/07/08, TC-CAN-U01 | T4.1 |
| T4.4 | Reference image + guideline toggle | P1 | TC-CAN-10 | T4.2 |
| T4.5 | Autosave debounce + conflict 409 + restore draft | P0 | TC-CAN-11/12/14, TC-REC-01/06 | T4.2 |
| T4.6 | Export PNG + stroke replay đầy đủ | P0 | TC-CAN-13/17 | T4.2 |
| T4.7 | Stress test 100/1.000/5.000 nét | P1 | Số đo ghi PERFORMANCE_REPORT.md | T4.6 |

## Phase 5 — Curriculum Expansion

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T5.1 | Seed skills + prerequisite graph | P0 | Graph không chu trình; quan hệ required/recommended đúng | T1.4 |
| T5.2 | 11 module × ≥5 bài đạt hợp đồng nội dung | P0 | Đếm được ≥55 bài nền tảng đạt chuẩn, không bài rỗng/trùng | T5.1 |
| T5.3 | 4 track × ≥5 bài + rubric theo phong cách | P0 | Tổng ≥75 bài; mỗi track có dự án cuối | T5.1 |
| T5.4 | Stroke demo data cho bài có demo | P1 | Không player rỗng; demo phát từ dữ liệu thật | T5.2 |
| T5.5 | Rà soát nội dung nội bộ theo checklist | P1 | Ghi rõ "chưa chuyên gia xác nhận" ở nơi cần | T5.2, T5.3 |

## Phase 6 — AI Assessment Expansion

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T6.1 | Geometry/CV evaluators theo từng eval_strategy | P0 | TC-GEO-01..06 đạt trên dữ liệu tổng hợp | T3.5 |
| T6.2 | AI Provider abstraction + chuỗi fallback free | P0 | Đúng thứ tự AI_ASSESSMENT.md mục 3; lỗi nhà này tự chuyển nhà sau | T3.5 |
| T6.3 | Schema validation + rubric scoring ở server | P0 | TC-AI-U01, TC-RUB-01/02 | T6.2 |
| T6.4 | Annotation + guided correction (Mode A/B) | P0 | Tọa độ khớp sau crop/zoom/pan; toggle/opacity hoạt động | T6.1 |
| T6.5 | Job management: trạng thái, retry giới hạn, chống trùng | P0 | E2E G đạt ở mức mô phỏng | T6.2 |
| T6.6 | AI evaluation 20 ca + báo cáo | P0 | AI_EVALUATION_REPORT.md có số thật; không đạt ngưỡng thì ghi INCOMPLETE | T6.1–T6.5 |
| T6.7 | AI Tutor theo ngữ cảnh + chống prompt injection | P1 | TC-SEC-14; tutor chỉ dùng dữ liệu của chủ sở hữu | T6.2 |

## Phase 7 — Personalized Learning

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T7.1 | Skill profile + mastery engine | P0 | TC-MAS-01; completion tách mastery | T3.6 |
| T7.2 | Adaptive recommendation có giải thích | P1 | TC-REC-01; mọi đề xuất có reason | T7.1 |
| T7.3 | Mastery replay / bài ôn theo lỗi cũ | P1 | Đề xuất ôn đúng kỹ năng yếu, không bắt học lại toàn bộ | T7.2 |
| T7.4 | Dashboard đầy đủ | P1 | Không số liệu giả; mọi khối lấy dữ liệu thật của user | T7.2 |

## Phase 8 — Admin and Operations

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T8.1 | Admin CMS: module/lesson/exercise/rubric + publishing workflow | P1 | E2E E đạt | T5.2 |
| T8.2 | User/role management + audit log | P1 | Đổi role ghi audit; learner gọi API admin bị 403 | T3.1 |
| T8.3 | AI job monitoring + quality review (flag) | P1 | Xem được job lỗi/provider; gắn cờ assessment được | T6.5 |
| T8.4 | Portfolio + Settings đầy đủ | P1 | Riêng tư mặc định; xuất/xóa dữ liệu hoạt động | T3.6 |
| T8.5 | Analytics tổng hợp | P2 | Không lộ dữ liệu cá nhân | T8.2 |

## Phase 9 — Complete QA and Hardening

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T9.1 | Chạy toàn bộ TEST_CASES.md, ghi TEST_RESULTS.md | P0 | Mọi nhóm có kết quả thật PASS/FAIL/BLOCKED/NOT RUN rõ ràng | Phase 3–8 |
| T9.2 | Security QA (TC-SEC + E2E F) | P0 | SECURITY_REVIEW.md có kết quả thật | T9.1 |
| T9.3 | Visual + accessibility audit 10 trang × 4 viewport | P0 | Không overflow/chồng lấp; TC-ACC đạt hoặc có bug ghi nhận | T9.1 |
| T9.4 | Performance đo + tối ưu + đo lại | P1 | PERFORMANCE_REPORT.md có số thật hai vòng nếu vòng 1 trượt | T9.1 |
| T9.5 | Failure/recovery QA (TC-REC + E2E G thật) | P0 | Không success giả, không hỏng dữ liệu ở mọi kịch bản | T9.1 |
| T9.6 | Sửa bug + regression toàn bộ ca quan trọng | P0 | Không còn Blocker/Critical mở trong BUG_REPORT.md | T9.1–T9.5 |

## Phase 10 — Delivery

| ID | Task | Priority | Acceptance | Dependencies |
|---|---|---|---|---|
| T10.1 | Dockerfile + Compose + healthcheck + CI | P0 | `docker compose up` chạy được, /api/health trả OK | T9.6 |
| T10.2 | Documentation audit: 29 tài liệu khớp code thật | P0 | Không tài liệu rỗng; lệnh trong README/DEPLOYMENT chạy được | T9.6 |
| T10.3 | RELEASE_ACCEPTANCE.md điền kết quả thật | P0 | Mọi P0 có trạng thái + bằng chứng; readiness chọn đúng một mức | T10.2 |
| T10.4 | Báo cáo bàn giao cuối (mục A–L) | P0 | Đủ 12 mục, số liệu lấy từ TEST_RESULTS/AI_EVALUATION_REPORT thật | T10.3 |
