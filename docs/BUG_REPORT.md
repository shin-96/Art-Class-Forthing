# BUG_REPORT.md — Quản lý lỗi

> Trạng thái tại thời điểm viết: **chưa có bug nào được ghi nhận** — vì chưa có đợt kiểm thử/chạy thử nào được thực thi (xem TEST_RESULTS.md: toàn bộ NOT RUN). File này định nghĩa mẫu ghi bug và quy trình xử lý để dùng ngay khi phát hiện lỗi đầu tiên. "Chưa ghi nhận" không đồng nghĩa "không có lỗi".

## 1. Mẫu ghi bug (bắt buộc đủ trường)

```markdown
### BUG-<số> — <tiêu đề ngắn>
- Feature: <tính năng / Requirement ID>
- Severity: Blocker | Critical | Major | Minor | Cosmetic
- Môi trường: <OS, trình duyệt, thiết bị, commit>
- Steps to Reproduce:
  1. ...
  2. ...
- Expected Result: <kết quả đúng>
- Actual Result: <kết quả thực tế>
- Root Cause: <nguyên nhân gốc — điền sau khi điều tra>
- Fix: <cách sửa + file thay đổi>
- Regression Test: <test case ID chạy lại sau sửa>
- Status: Open | Investigating | Fixed | Regression | Closed
```

## 2. Định nghĩa Severity

| Mức | Ý nghĩa | Ví dụ trong dự án này |
|---|---|---|
| Blocker | Không thể tiếp tục luồng chính / mất dữ liệu | Không đăng nhập được; save làm mất stroke; assessment ghi đè bản gốc |
| Critical | Tính năng P0 sai nghiêm trọng hoặc lỗi phân quyền | User B đọc được bài của user A; điểm tính sai hệ thống |
| Major | Tính năng quan trọng sai nhưng có đường vòng | Annotation lệch tọa độ; autosave thỉnh thoảng thất bại |
| Minor | Sai lệch nhỏ, ít ảnh hưởng | Cảnh báo chất lượng ảnh thiếu ở một trường hợp biên |
| Cosmetic | Hình thức, không ảnh hưởng chức năng | Lệch spacing, sai chính tả giao diện |

## 3. Quy trình xử lý

Detect → Reproduce → Investigate → Fix → Test → Regression → Close.

Nguyên tắc bắt buộc:
- Không xóa test để tránh lỗi; không tắt validation để "chạy được".
- Không che lỗi bằng try/catch trả success giả.
- Không bỏ/xóa tính năng bị lỗi thay vì sửa.
- Bug nội dung học liệu (sai kiến thức, rubric sai) cũng ghi ở đây như bug thường, gắn Feature là bài học liên quan.
- Bug Blocker/Critical chưa đóng → Gate F (Release) không thể PASS (RELEASE_ACCEPTANCE.md).

## 4. Danh sách bug

| Bug ID | Tiêu đề | Severity | Status |
|---|---|---|---|
| BUG-001 | Lệch định dạng `exercise.target`: curriculum lưu phẳng `{x1,y1,...}`, engine chấm đọc lồng `{line:{...}}` → guide/correction không khớp | Major | Closed |
| BUG-002 | Mobile 375px tràn ngang 13px do topbar không wrap | Minor | Closed |
| BUG-003 | Tên lớp trong panel Layers bị cắt ("Lơ…"); studio mở từ roadmap không hiện đường mẫu dù bài có target | Minor | Closed |

### BUG-001 — Lệch định dạng target giữa curriculum và assessment engine
- Feature: AI Assessment / Guided Correction
- Severity: Major
- Môi trường: Node 24, commit trước bàn giao
- Steps: mở bài line control → nộp bài → xem corrections; đối chiếu dữ liệu curriculum.
- Expected: corrections chứa đường mẫu đúng target của bài.
- Actual: engine đọc `target.line` trong khi dữ liệu lưu phẳng → target rỗng, dùng đường mặc định.
- Root Cause: hai phía (data và engine) được viết song song với hai quy ước khác nhau, chưa có bước đối chiếu schema.
- Fix: thêm `normalizeTarget()` trong `server/assess.mjs` (phẳng → lồng) + frontend studio xử lý cả hai dạng; kiểm chứng bằng ai-eval + E2E.
- Regression Test: `node test/ai-eval.mjs` (14/14), `npm run test:e2e` (28/28).
- Status: Closed

### BUG-002 — Tràn ngang trên mobile 375px
- Feature: Responsive / Topbar — Severity: Minor
- Steps: mở landing ở viewport 375×800 (Playwright) → đo `scrollWidth > innerWidth`.
- Expected: không tràn ngang. Actual: 388 > 375, nút "Bắt đầu học" bị cắt.
- Root Cause: `#topbar` flex không wrap, nav + userbox chiếm quá bề ngang.
- Fix: media query ≤640px trong `public/styles.css` (wrap topbar, nav xuống hàng riêng, nút nhỏ lại).
- Regression Test: chạy lại bộ screenshot — mobile OK, 5/5 trang không overflow.
- Status: Closed

### BUG-003 — Panel Layers cắt tên lớp + guide không mặc định hiện
- Feature: Drawing Workspace — Severity: Minor
- Steps: mở studio từ roadmap → nhìn panel lớp và canvas.
- Expected: tên "Lớp 1" đọc được; bài có target thì đường mẫu hiện sẵn.
- Actual: input tên lớp bị các nút bóp còn vài ký tự; canvas trống dù bài có target.
- Root Cause: `.layer-row input` width 100% trong flex; `guideOn` mặc định false.
- Fix: CSS `flex:1;min-width:0` cho input tên lớp; `guideOn = !!target` trong `public/app.js`.
- Regression Test: screenshot studio sau sửa — tên lớp đọc rõ, đường mẫu nét đứt hiện trên canvas.
- Status: Closed

## 5. Nhật ký

| Ngày | Nội dung |
|---|---|
| 2026-11-24 | Khởi tạo BUG_REPORT.md với mẫu và quy trình; danh sách trống vì chưa chạy kiểm thử |
| 2026-11-24 | Đợt kiểm thử đầu tiên: ghi nhận + sửa + đóng BUG-001..003, regression PASS toàn bộ |
