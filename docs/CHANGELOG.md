# CHANGELOG.md — Nhật ký thay đổi

> Ghi theo ngày, mới nhất ở trên. Mỗi mục: loại thay đổi (Added/Changed/Fixed/Removed/Docs), mô tả ngắn, liên kết task/commit khi có. Không ghi "hoàn thành" cho việc chưa có bằng chứng — trạng thái thật ở IMPLEMENTATION_STATUS.md.

## 2026-11-24 (bản bàn giao đầu tiên)

### Added
- Toàn bộ ứng dụng DrawPath AI: server Node thuần (`server/`), frontend SPA + Drawing Engine (`public/`), curriculum 75 bài (`curriculum/curriculum.mjs`), bộ test (`test/`: 13 unit + 28 E2E + 14 AI-eval, tất cả PASS), Dockerfile + docker-compose + CI GitHub Actions.
- Chuỗi fallback AI free 9 tầng + gia sư cục bộ (xem AI_ASSESSMENT.md).

### Fixed
- BUG-001 lệch định dạng target curriculum ↔ engine chấm; BUG-002 tràn ngang mobile; BUG-003 panel Layers + guide mặc định (BUG_REPORT.md).

### Known state at this entry
- Live AI: BLOCKED (chưa có API key trong môi trường) — engine hình học vẫn chấm đầy đủ.
- Trạng thái phát hành: READY_FOR_LOCAL_TESTING (RELEASE_ACCEPTANCE.md).

## 2026-11-24

### Added
- Tạo repo Public `shin-96/Art-Class-Forthing` với README khởi tạo (commit main đã verify `cb1c831`).
- Ghi nhận yêu cầu nền của người dùng: mọi API dùng trong dự án phải là nguồn **free** tự tìm trên mạng, cắm sẵn nhiều API dự phòng theo chuỗi fallback để không ngắt quãng khi sử dụng.

### Docs
- Lập bộ tài liệu Phase 1 trong `docs/`: REQUIREMENTS, ARCHITECTURE, DATABASE, API, CURRICULUM, DESIGN_SYSTEM, ART_DIRECTION, DRAWING_ENGINE, AI_ASSESSMENT, AI_EVALUATION_PLAN, AI_EVALUATION_REPORT, SECURITY, DEPLOYMENT, TEST_PLAN, TEST_CASES, TEST_RESULTS, PERFORMANCE_REPORT, SECURITY_REVIEW, BUG_REPORT, KNOWN_LIMITATIONS, USER_GUIDE, ADMIN_GUIDE, TASKS, IMPLEMENTATION_STATUS, DECISIONS, CHANGELOG, BLOCKERS, RELEASE_ACCEPTANCE.
- Chốt các quyết định kiến trúc ADR-001..010 trong DECISIONS.md (stack Node thuần, SQLite, scrypt auth, canvas 0..1000, chuỗi fallback AI free, loại GitHub Models và Cerebras kèm lý do).
- AI_EVALUATION_REPORT, TEST_RESULTS, PERFORMANCE_REPORT, SECURITY_REVIEW khởi tạo ở trạng thái **NOT RUN / BLOCKED** trung thực — chưa có kiểm thử nào đã chạy tại thời điểm này.

### Known state at this entry
- Chưa có mã nguồn ứng dụng (server/frontend/seed) trong repo ngoài README và bộ tài liệu.
- Chưa cấu hình API key AI nào; live AI ở trạng thái BLOCKED theo BLOCKERS.md.
- Chưa có bug nào được ghi nhận (BUG_REPORT.md) vì chưa chạy kiểm thử.

## Quy ước duy trì file này

- Mỗi phiên làm việc có thay đổi đáng kể phải thêm một mục vào đầu file, ghi ngày theo giờ Asia/Saigon.
- Phân loại thay đổi dùng đúng các nhãn: `Added` (tính năng mới), `Changed` (thay đổi hành vi), `Fixed` (sửa lỗi — kèm Bug ID), `Removed` (gỡ bỏ), `Docs` (tài liệu), `Security` (thay đổi liên quan bảo mật).
- Mục `Fixed` phải liên kết tới BUG_REPORT.md; mục thay đổi trạng thái tính năng phải đồng bộ với IMPLEMENTATION_STATUS.md trong cùng phiên.
- Thay đổi về provider AI (thêm/bớt khỏi chuỗi fallback, đổi model mặc định) luôn ghi ở đây kèm lý do và ADR mới trong DECISIONS.md nếu đổi quyết định cũ.
- Thay đổi schema DB phải ghi rõ migration tương ứng và ảnh hưởng tới dữ liệu cũ.
- Không viết lại lịch sử: mục đã ghi sai thì thêm mục đính chính ở ngày mới, không sửa lặng lẽ mục cũ.

## Mẫu mục cho các phiên tiếp theo

```markdown
## YYYY-MM-DD

### Added
- <tính năng> (Task T<x.y>, commit <hash ngắn>)

### Fixed
- BUG-<số>: <mô tả ngắn> — regression test <TC-ID>

### Docs
- <tài liệu thay đổi và lý do>
```

## Kế hoạch ghi nhận sắp tới (chưa xảy ra — không phải thay đổi đã thực hiện)

- Phase 2: mục `Added` cho CSS nền tảng và component cốt lõi khi code thực sự được tạo.
- Phase 3: mục `Added` cho vertical slice đầu tiên khi luồng Register → Progress chạy được và có test đi kèm.
- Mỗi lần chạy kiểm thử: cập nhật TEST_RESULTS.md là chính; CHANGELOG chỉ ghi mốc tổng (ví dụ "Phase 9 QA đợt 1 hoàn tất, xem TEST_RESULTS.md").
