# TEST_CASES.md — Danh mục ca kiểm thử

> Mỗi ca có ID, mô tả và kết quả kỳ vọng (Expected). Trạng thái chạy thực tế ghi ở TEST_RESULTS.md — chưa chạy = NOT RUN.
> Quy ước: A/B là hai learner khác nhau; "gọi API trực tiếp" nghĩa là không qua giao diện.

## 1. E2E Flows (bắt buộc)

### Flow A — New Learner (TC-E2E-A)
1. Mở landing → thấy hero, CTA bắt đầu học. 2. Đăng ký → thành công, mật khẩu không lộ. 3. Đăng nhập. 4. Hoàn thành onboarding (mục tiêu, trình độ, phương thức, thời gian). 5. Xem roadmap — đúng điểm bắt đầu được gợi ý. 6. Chọn bài. 7. Đọc bài giảng. 8. Xem stroke demo chạy từ dữ liệu thật. 9. Mở canvas. 10. Vẽ. 11. Lưu. 12. Nộp bài. 13. Xem trạng thái AI job chuyển QUEUED → PROCESSING → COMPLETED. 14. Xem feedback + điểm tiêu chí. 15. Xem annotation đúng vị trí lỗi. 16. Sửa bài. 17. Nộp lại (version 2). 18. Xem tiến độ + mastery cập nhật đúng.
**Expected:** trọn luồng không lỗi; dữ liệu bền qua reload; bản gốc version 1 còn nguyên.

### Flow B — Free Learning (TC-E2E-B)
Chọn bài ngoài lộ trình → thấy cảnh báo tiên quyết (nếu thiếu) nhưng vẫn vào học được → luyện → nộp → tiến độ cập nhật đúng bài đó, không ép học lại từ đầu.

### Flow C — Paper Upload (TC-E2E-C)
Upload ảnh giấy → preview → crop/rotate → validation (mờ/tối/nghiêng có cảnh báo đúng) → submit → phân tích → feedback + annotation khớp tọa độ sau crop → retry khi ảnh không đạt.

### Flow D — Canvas Persistence (TC-E2E-D)
Vẽ → undo → redo → đổi brush/màu → thêm/ẩn/khóa layer → save → reload trang → restore đúng trạng thái → export PNG đúng thứ tự layer, layer ẩn không xuất.

### Flow E — Admin Publishing (TC-E2E-E)
Admin đăng nhập → tạo module → tạo lesson → tạo exercise → cấu hình rubric (tổng trọng số = 100; nhập sai bị chặn) → publish → learner thấy bài → nộp bài → dữ liệu assessment xuất hiện đúng.

### Flow F — Authorization (TC-E2E-F)
A tạo bài riêng tư → B mở URL trực tiếp: bị từ chối → B gọi API trực tiếp lấy project/submission/assessment của A: 403/404 đúng chuẩn, không lộ dữ liệu → learner gọi API admin: bị từ chối.

### Flow G — AI Failure (TC-E2E-G)
Mô phỏng timeout → mô phỏng quota 429 → mô phỏng model trả sai schema → nhấn Submit liên tục (nộp trùng): **Expected:** fallback chuyển provider hoặc kết thúc bằng engine cục bộ/FAILED sạch; không tạo job trùng; không hỏng progress; thông báo lỗi đúng sự thật (không success giả).

### Flow H — Revision History (TC-E2E-H)
Nộp bản gốc → nhận assessment → tạo revision → nộp revision → so sánh hai version: bản gốc giữ nguyên, assessment của mỗi version gắn đúng rubric version tại thời điểm chấm.

## 2. Unit Tests

| ID | Đối tượng | Expected |
|---|---|---|
| TC-GEO-01 | Deviation nét thẳng so đường mẫu | Sai số ≤ ngưỡng trên dữ liệu tổng hợp sạch; nét đúng cho deviation ~0 |
| TC-GEO-02 | Straightness / smoothness | Nét run cho smoothness thấp hơn nét mượt cùng hình |
| TC-GEO-03 | Endpoint accuracy | Đo đúng khoảng cách điểm cuối tới đích |
| TC-GEO-04 | Ellipse fit | Tâm/trục khôi phục sát ground truth; ellipse méo bị phát hiện |
| TC-GEO-05 | Hội tụ phối cảnh | Cạnh song song trong tranh hội tụ về một điểm tụ ước lượng nhất quán |
| TC-GEO-06 | Phân bố value | Histogram phản ánh đúng ảnh tối/sáng mẫu |
| TC-CAN-U01 | Biến đổi tọa độ logic ↔ hiển thị | Khứ hồi không sai lệch ở mọi mức zoom/pan |
| TC-CAN-U02 | Serialize save/load stroke | Load lại cho dữ liệu bằng hệt (gồm layer, seq, pressure khi có) |
| TC-RUB-01 | Validate tổng trọng số rubric | ≠100 bị từ chối; =100 được chấp nhận |
| TC-RUB-02 | Tính điểm tổng + tiêu chí không đánh giá được | Áp dụng total_rule, ghi rõ lý do, không tự cho điểm |
| TC-MAS-01 | Mastery calculation | Một lần 80/100 không lên Mastered; nhiều bằng chứng ổn định mới lên |
| TC-REC-01 | Recommendation rules | Đề xuất kèm reason đúng nguồn (weak skill/prerequisite/review) |
| TC-OWN-01 | Ownership helpers | Hàm kiểm tra chủ sở hữu trả đúng cho chủ / sai cho người khác / sai cho guest |
| TC-UPL-U01 | Upload validation (unit) | MIME giả, file hỏng, quá kích thước đều bị từ chối đúng mã lỗi |
| TC-AI-U01 | Assessment schema validation | Thiếu trường/điểm ngoài thang/tọa độ ngoài vùng → bị từ chối lưu |
| TC-AI-U02 | Job state transitions | Chuyển trạng thái hợp lệ qua; chuyển nhảy cóc/trùng job bị chặn |

## 3. Canvas (TC-CAN)

TC-CAN-01 vẽ nét liên tục không đứt; 02 đổi brush đổi được tính chất nét; 03 đổi màu; 04 eraser chỉ xóa đúng phạm vi; 05 undo/redo nhiều bước chính xác; 06 zoom quanh điểm neo; 07 pan; 08 resize cửa sổ không méo dữ liệu; 09 layer create/rename/reorder/hide/lock/delete; 10 import reference image; 11 save thủ công; 12 reload khôi phục; 13 export PNG; 14 autosave sau debounce, mất mạng không báo đã lưu; 15 thao tác touch vẽ được; 16 stylus + pressure (**BLOCKED nếu không có thiết bị — không kết luận**); 17 replay đúng thứ tự/tốc độ tương đối; 18 project 100/1.000/5.000 nét vẫn thao tác được (kèm số đo ở PERFORMANCE_REPORT.md).

## 4. Integration (TC-INT)

TC-INT-01 auth + DB (đăng ký → bản ghi + hash đúng định dạng); 02 lesson + progress (hoàn thành → progress cập nhật, mastery không tự nhảy); 03 canvas + storage (lưu → đọc lại khớp); 04 submission + assessment (nộp → assessment + annotations bền); 05 assessment + revision (chấm lại tạo bản mới, không sửa bản cũ); 06 admin + publishing (publish → learner thấy; archive → ẩn); 07 recommendation + mastery (mastery yếu → đề xuất đúng kỹ năng); 08 queue + AIJob persistence (restart server giữa job → trạng thái khôi phục nhất quán); 09 upload + image processing (upload → bản tiền xử lý + cảnh báo chất lượng đúng).

## 5. Security (TC-SEC)

TC-SEC-01 chưa đăng nhập gọi API riêng tư → 401; 02 IDOR đọc dữ liệu người khác → từ chối; 03 learner gọi API admin → 403; 04 XSS qua tên project/chú thích → render escape; 05 SQL injection qua trường tìm kiếm/đăng nhập → không tác dụng, truy vấn tham số hóa; 06 upload file giả mạo MIME/exe đổi đuôi → từ chối; 07 upload quá kích thước → 413; 08 path traversal qua tên file → không thoát thư mục dữ liệu; 09 session hết hạn/bị hủy → không dùng lại được; 10 thiếu CSRF token → từ chối thay đổi dữ liệu; 11 rate limit đăng nhập/AI job → 429; 12 quét repo không có secret thật; 13 log không chứa mật khẩu/token/key; 14 prompt injection trong chú thích/ảnh → chỉ thị bị bỏ qua, tutor/assessment không đổi hành vi hệ thống; 15 nộp trùng → một job duy nhất.

## 6. Performance (TC-PERF)

TC-PERF-01 thời gian tải landing/dashboard trên môi trường khai báo; 02 độ trễ nét khi vẽ ở 100/1.000/5.000 nét; 03 thời gian load project 5.000 nét; 04 autosave không giật giao diện; 05 export PNG project lớn; 06 thời gian xử lý AI job (tách thời gian engine cục bộ và thời gian chờ provider). Ngưỡng và kết quả: PERFORMANCE_REPORT.md.

## 7. Failure / Recovery (TC-REC)

TC-REC-01 mất mạng khi autosave → giữ nháp, lưu lại khi có mạng; 02 server restart giữa AI job → job không kẹt PROCESSING vĩnh viễn; 03 DB tạm không truy cập được → lỗi rõ ràng, không success giả; 04 refresh giữa lúc nộp bài → không tạo submission trùng; 05 file project hỏng → báo lỗi, không ghi đè bản tốt; 06 hai lần lưu đồng thời → version conflict 409 xử lý được; 07 upload gián đoạn → không tạo submission mồ côi ở trạng thái assessed.

## 8. Accessibility & Visual (TC-ACC / TC-VIS)

TC-ACC-01 contrast AA trên các cặp chữ/nền chính; 02 điều hướng bàn phím trọn luồng đăng nhập + học bài; 03 label + thông báo lỗi form; 04 modal quản lý focus; 05 reduced motion tắt animation trang trí; 06 touch target ≥44px.
TC-VIS-01..10: screenshot audit Landing/Auth/Onboarding/Dashboard/Roadmap/Lesson/Workspace/Feedback/Portfolio/Admin ở 375/768/1280/1440 — không overflow, không chồng lấp, không ảnh gãy, canvas không bị che.
