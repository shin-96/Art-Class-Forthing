# KNOWN_LIMITATIONS.md — Giới hạn đã biết

> File này ghi trung thực các giới hạn tại thời điểm viết. Giới hạn mới phát hiện trong quá trình làm phải bổ sung vào đây, không giấu.

## 1. AI và đánh giá

- **Live AI phụ thuộc API key free của server.** Chưa cấu hình key nào → tầng multimodal ở trạng thái BLOCKED; chỉ engine hình học/CV cục bộ hoạt động. Chất lượng live AI chưa được benchmark (AI_EVALUATION_REPORT.md: NOT RUN).
- Các provider free có thể đổi chính sách bất cứ lúc nào (hết free, giới hạn quota, ngừng dịch vụ — tiền lệ: GitHub Models ngừng 30/07/2026, Cerebras bắt buộc thẻ). Chuỗi fallback giảm rủi ro ngắt quãng nhưng **không đảm bảo** không bao giờ gián đoạn; đích cuối rule-based cục bộ chỉ trả lời theo rubric/lỗi đã đo, không thay thế được AI multimodal.
- Engine cục bộ đo tốt nhất trên dữ liệu stroke (bài canvas). Với ảnh chụp giấy, độ tin cậy thấp hơn (ánh sáng, nghiêng, mờ) và hệ thống phải hạ confidence thay vì khẳng định.
- Không suy luận được thứ tự nét, tốc độ, lực bút từ ảnh tĩnh — mọi nhận xét thuộc loại này đều bị cấm trong pipeline.
- **Mode C — Corrected Reference** (bản tham khảo đã sửa do AI tạo) là khả năng nâng cao có điều kiện: chưa được coi là hoàn thiện cho tới khi có benchmark chứng minh đủ tin cậy; khi chưa đạt, hệ thống chỉ cung cấp Mode A (annotation) + Mode B (guided correction).
- Đánh giá sáng tạo là định tính; AI không phải thẩm phán tuyệt đối về giá trị nghệ thuật.

## 2. Nội dung học

- Chương trình 11 module + 4 track là cấu trúc đã thiết kế; **số bài học đạt chuẩn nội dung thực tế** phải đếm ở IMPLEMENTATION_STATUS.md — mức sàn 75 bài không tự động được coi là đã đạt.
- Nội dung **chưa được chuyên gia mỹ thuật độc lập xác nhận**; có thể còn sai sót chuyên môn dù đã qua quy trình rà soát nội bộ.
- Stroke demonstration cần dữ liệu nét mẫu thật cho từng bài; bài thiếu demo thì phải ghi rõ thay vì hiển thị player rỗng.

## 3. Kỹ thuật / kiến trúc

- Một tiến trình Node + SQLite + queue AI nội bộ: phù hợp giai đoạn hiện tại, **không scale ngang** nhiều instance; tải lớn cần迁移 sang hàng đợi/DB riêng (ngoài phạm vi hiện tại).
- Kiểm thử stylus/pressure phụ thuộc thiết bị thật — không có thiết bị thì ca TC-CAN-16 ở trạng thái BLOCKED, chưa kết luận.
- Safari/Firefox: cần kiểm chứng thực tế theo TEST_PLAN; chưa chạy thì không tuyên bố tương thích đầy đủ.
- Gửi email (xác thực email, quên mật khẩu, thông báo) cần cấu hình SMTP riêng; chưa cấu hình thì các luồng này hạn chế (BLOCKERS.md).
- Chưa có kiểm thử với người dùng thật (usability) — chất lượng trải nghiệm mới ở mức heuristic nội bộ.

## 4. Bảo mật / pháp lý

- Chưa có kết quả kiểm thử bảo mật (SECURITY_REVIEW.md: NOT RUN toàn bộ) — không tuyên bố đã an toàn tuyệt đối.
- Chưa có đánh giá pháp lý về người dùng chưa thành niên, bản quyền tài sản bên thứ ba ngoài các nguồn tự tạo; cần rà soát trước production.

## 5. Trạng thái phát hành

- Tại thời điểm viết: **NOT_READY cho production**. Mức sẵn sàng chi tiết và điều kiện nâng mức: RELEASE_ACCEPTANCE.md.
- Tài liệu trong `docs/` mô tả thiết kế và kế hoạch đã chốt; mức độ triển khai thật luôn lấy IMPLEMENTATION_STATUS.md + TEST_RESULTS.md làm chuẩn, không lấy tài liệu mô tả làm bằng chứng hoàn thành.

## 6. Trải nghiệm và nền tảng

- Frontend vanilla JS/CSS: không có hệ sinh thái component/framework; các tương tác phức tạp (canvas, roadmap đồ thị) phải tự quản lý trạng thái cẩn thận và là vùng rủi ro lỗi cao nhất — được bù bằng bộ test TC-CAN và visual audit, nhưng chưa có kết quả chạy tại thời điểm viết.
- Chưa hỗ trợ làm việc offline đầy đủ: mất mạng chỉ giữ nháp local trong phiên; đồng bộ đa thiết bị cho cùng một project chưa được thiết kế xử lý xung đột ngoài cơ chế version conflict cơ bản (409).
- Đa ngôn ngữ mới ở mức kiến trúc dữ liệu (trường locale) — giao diện hiện chỉ có tiếng Việt; không tuyên bố đã hỗ trợ ngôn ngữ khác.
- Chưa có ứng dụng mobile native (nằm ngoài phạm vi bắt buộc); trải nghiệm di động là web responsive với bố cục workspace riêng.

## 7. Dữ liệu và vận hành

- Sao lưu/khôi phục dựa trên thư mục `data/` do người vận hành tự thực hiện theo DEPLOYMENT.md; chưa có sao lưu tự động hay kiểm thử khôi phục định kỳ tại thời điểm viết.
- Thống kê analytics là tổng hợp cơ bản trong admin; chưa có hệ thống phân tích học tập nâng cao (cohort, A/B test) — ngoài phạm vi hiện tại.
- Giới hạn dung lượng upload/project được cấu hình ở server; người dùng có project rất lớn (nhiều chục nghìn nét) có thể chạm ngưỡng hiệu năng SQLite + render canvas — ngưỡng thực tế chỉ biết sau stress test Phase 4 (T4.7), hiện chưa đo.
