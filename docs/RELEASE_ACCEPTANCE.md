# RELEASE_ACCEPTANCE.md — Ma trận nghiệm thu phát hành

> Quy tắc: P0 phải VERIFIED/PASS mới phát hành; không còn bug Blocker/Critical đã biết; E2E bắt buộc phải chạy thành công thật; không dùng mock làm bằng chứng duy nhất; không khai PASS khi test chưa chạy.
> Cột "Trạng thái ban đầu" là tình trạng tại thời điểm lập tài liệu (2026-11-24): chưa có code ứng dụng và chưa có kiểm thử nào chạy, nên mọi mục là NOT_STARTED/NOT RUN — đây là điểm xuất phát trung thực, không phải kết quả nghiệm thu.

## 1. Bảng nghiệm thu

| Req ID | Tính năng | Priority | Expected Behavior | Actual Behavior | Implementation | Verification | Test IDs | Evidence | Known Issues | Blocking |
|---|---|---|---|---|---|---|---|---|---|---|
| REQ-AUTH-01 | Đăng ký/đăng nhập/session | P0 | scrypt + cookie HttpOnly + CSRF hoạt động | Hoạt động thật | IMPLEMENTED | PASS (E2E: register/login/401/409/CSRF 403) | TC-AUTH, E2E A | test/e2e.mjs 28/28 | — | Không |
| REQ-AUTH-02 | Phân quyền + ownership | P0 | User khác/admin route bị chặn đúng ở API | Chặn đúng ở API | IMPLEMENTED | PASS (IDOR submission/project 403, admin 403, unauth 401) | TC-SEC-02/03, E2E F | test/e2e.mjs | — | Không |
| REQ-ONB-01 | Onboarding + gợi ý bắt đầu | P0 | Lưu hồ sơ, gợi ý kèm lý do | Lưu hồ sơ + recommendation kèm reason | IMPLEMENTED | PASS (E2E onboarding + dashboard) | E2E A | test/e2e.mjs | — | Không |
| REQ-CUR-01 | 11 module + 4 track, ≥75 bài | P0 | Đủ số bài đạt hợp đồng nội dung | Đủ 75 bài, mỗi bài đủ trường hợp đồng, rubric = 100 | IMPLEMENTED | PASS (script kiểm cấu trúc + E2E curriculum) | TC-CUR | curriculum/curriculum.mjs | Chưa có chuyên gia xác nhận (BLK-03) | Không (cấu trúc) / Có (sư phạm) |
| REQ-CUR-02 | Skill graph + cảnh báo tiên quyết | P0 | Học vượt có cảnh báo đúng kỹ năng thiếu | Chưa triển khai | NOT_STARTED | NOT RUN | TC-REC, E2E B | — | — | Có |
| REQ-LES-01 | Nội dung bài học đầy đủ | P0 | Mỗi bài đủ 18 thành phần hợp đồng | Chưa có bài thật | NOT_STARTED | NOT RUN | TC-CUR | — | — | Có |
| REQ-CAN-01 | Canvas tools/layers/undo/zoom | P0 | Mọi công cụ hiển thị đều hoạt động | Chưa triển khai | NOT_STARTED | NOT RUN | TC-CAN-01..18, E2E D | — | Stylus BLOCKED (BLK-04) | Có |
| REQ-CAN-02 | Stroke model/replay/autosave/export | P0 | Dữ liệu 0..1000 bền qua reload, export đúng | Chưa triển khai | NOT_STARTED | NOT RUN | TC-CAN-U01/02, E2E D | — | — | Có |
| REQ-SUB-01 | Nộp bài + upload + validation ảnh | P0 | Ảnh sai định dạng/mờ được xử lý đúng | Chưa triển khai | NOT_STARTED | NOT RUN | TC-UPL, E2E C | — | — | Có |
| REQ-SUB-02 | Version history, giữ bản gốc | P0 | Bản gốc không bị ghi đè qua mọi lần nộp | Revision tạo v2, bản gốc giữ nguyên v1 | IMPLEMENTED | PASS (E2E H) | E2E H | test/e2e.mjs | — | Không |
| REQ-AI-01 | Engine hình học/CV cục bộ | P0 | Đo đúng trên dữ liệu tổng hợp có ground truth | Đo đúng hướng + ngưỡng trên dataset tổng hợp | IMPLEMENTED | PASS (AI-eval 14/14, unit hình học) | TC-GEO, AI Eval tầng A | test/ai-eval.mjs | Chưa có dataset ảnh thật + chuyên gia | Không |
| REQ-AI-02 | Chuỗi fallback AI free | P0 | Lỗi nhà này tự chuyển nhà sau, ghi đúng provider | Chưa triển khai; chưa có key | BLOCKED | NOT RUN | TC-AI, E2E G | — | BLK-01 | Có |
| REQ-AI-03 | Validate schema kết quả AI | P0 | Kết quả sai schema bị từ chối lưu 100% | Chưa triển khai | NOT_STARTED | NOT RUN | TC-AI-U01 | — | — | Có |
| REQ-AI-04 | Annotation + guided correction | P0 | Tọa độ đúng sau crop/zoom/pan | Chưa triển khai | NOT_STARTED | NOT RUN | TC-GEO, E2E A/C | — | Mode C: INCOMPLETE theo thiết kế | Có |
| REQ-AI-05 | AI Tutor theo ngữ cảnh | P1 | Chỉ dùng dữ liệu của chủ sở hữu, chống injection | Chưa triển khai | NOT_STARTED | NOT RUN | TC-SEC-14 | — | Phụ thuộc BLK-01 cho bản live đầy đủ | Không (P1) |
| REQ-PROG-01 | Progress tách Mastery | P0 | Hoàn thành ≠ thành thạo; mastery đa bằng chứng | Hai hệ thống tách riêng trong code + API | IMPLEMENTED | PASS (unit mastery + E2E dashboard) | TC-MAS-01 | test/unit.test.mjs | — | Không |
| REQ-PROG-02 | Recommendation có giải thích | P1 | Mọi đề xuất kèm reason | Chưa triển khai | NOT_STARTED | NOT RUN | TC-REC-01 | — | — | Không (P1) |
| REQ-PORT-01 | Portfolio + riêng tư | P1 | Mặc định riêng tư, tải qua route có quyền | Chưa triển khai | NOT_STARTED | NOT RUN | E2E F | — | — | Không (P1) |
| REQ-ADM-01 | Admin CMS + publishing | P1 | Draft→Review→Published; rubric tổng = 100 | Chưa triển khai | NOT_STARTED | NOT RUN | E2E E | — | — | Không (P1) |
| REQ-ADM-02 | AI job monitoring + audit log | P1 | Xem được job/lỗi; hành động nhạy cảm có audit | Chưa triển khai | NOT_STARTED | NOT RUN | E2E E/G | — | — | Không (P1) |
| REQ-SEC-01 | Upload an toàn, rate limit, headers | P0 | Đạt checklist SECURITY_REVIEW bằng kiểm thử thật | Chưa triển khai | NOT_STARTED | NOT RUN | TC-SEC-01..15 | — | — | Có |
| REQ-PERF-01 | Canvas 100/1.000/5.000 nét | P1 | Có số đo thật, đạt mục tiêu PERFORMANCE_REPORT | Chưa đo | NOT_STARTED | NOT RUN | TC-PERF | — | — | Không (P1) |
| REQ-DOC-01 | Bộ tài liệu `docs/` | P1 | Tài liệu có nội dung thật, khớp thiết kế đã chốt | Đang lập trong Phase 1 | IN_PROGRESS | Chưa đối chiếu với code (chưa có code) | Documentation Audit Phase 10 | Bộ file `docs/` | Sẽ đối chiếu lại ở T10.2 | Không (P1) |

## 2. Quality Gates

| Gate | Nội dung | Trạng thái ban đầu |
|---|---|---|
| Gate A — Architecture | Mô hình dữ liệu, ranh giới module, API contract, security model, test strategy đã xác định | IN_PROGRESS — tài liệu đã lập, chưa đối chiếu với code |
| Gate B — Vertical Slice | Luồng học end-to-end chạy thật, dữ liệu bền, mock được ghi nhãn | NOT_STARTED |
| Gate C — Canvas | Save/load, undo/redo, layer, biến đổi tọa độ đạt test | NOT_STARTED |
| Gate D — Curriculum | Bài học đạt cấu trúc, rubric hợp lệ, prerequisite hợp lệ | NOT_STARTED |
| Gate E — AI | Live integration xác minh khi có key; schema/annotation/benchmark đạt ngưỡng đặt trước | BLOCKED (BLK-01) + NOT_STARTED |
| Gate F — Release | Luồng P0 PASS, không Blocker/Critical, security PASS, build/migration PASS, tài liệu khớp | NOT_STARTED |

Không gate nào được tự chuyển sang PASS khi thiếu bằng chứng.

## 3. Quyết định sẵn sàng hiện tại

**READY_FOR_LOCAL_TESTING** (cập nhật 2026-11-24 sau đợt kiểm thử đầu tiên).

Căn cứ: luồng P0 cốt lõi VERIFIED bằng bằng chứng thật — 13 unit + 28 E2E HTTP + 14 AI-eval đều PASS, visual 5/5 trang sau khi sửa 3 bug (đã đóng). Chưa READY_FOR_PILOT/PRODUCTION vì: live AI BLOCKED (BLK-01, chưa có key để kiểm chứng provider thật), nội dung chưa có chuyên gia mỹ thuật xác nhận (BLK-03), chưa kiểm thử stylus (BLK-04), chưa chạy failure/recovery và audit WCAG đầy đủ, chưa có kiểm thử với người dùng thật.
