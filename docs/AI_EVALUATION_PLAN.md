# AI_EVALUATION_PLAN.md — Kế hoạch đánh giá chất lượng AI Assessment

> Nguyên tắc: ngưỡng chấp nhận đặt **TRƯỚC** khi chạy đánh giá, không đặt sau khi xem kết quả để hợp thức hóa. Kế hoạch này được viết trước khi có bất kỳ kết quả benchmark nào (xem AI_EVALUATION_REPORT.md — hiện NOT RUN).

## 1. Phạm vi đánh giá

- Engine hình học/CV cục bộ (tầng A) — đánh giá bằng ground truth hình học tổng hợp được (biết chính xác độ lệch đã tạo ra).
- Chuỗi AI multimodal (tầng B) — chỉ đánh giá khi có API key free cấu hình; không có key thì phần này ghi BLOCKED, không suy đoán chất lượng.
- Toàn pipeline: schema validation, xử lý input không hợp lệ, annotation localization, failure handling.

## 2. Test Dataset — 20 ca bắt buộc

| # | Ca | Ground truth kỳ vọng |
|---|---|---|
| 1 | Đường thẳng đúng | Điểm line control cao, không annotation lỗi nghiêm trọng |
| 2 | Đường thẳng lệch khỏi đường mẫu | Đo được deviation, annotation đúng đoạn lệch |
| 3 | Nét run (jitter) | Smoothness thấp, nêu đúng nguyên nhân |
| 4 | Nét không hoàn thành (thiếu đoạn) | Requirement completion thấp / yêu cầu bổ sung |
| 5 | Ellipse đúng | Fit tốt, trục/tâm sát ground truth |
| 6 | Ellipse méo | Đo được độ méo trục, annotation đúng vùng |
| 7 | Khối hộp hợp lý | Form structure đạt, cạnh hội tụ nhất quán |
| 8 | Khối sai tỷ lệ | Bắt được tỷ lệ sai, chỉ đúng cạnh/đoạn sai |
| 9 | Phối cảnh sai (cạnh không hội tụ về điểm tụ) | Edge convergence thấp, annotation hướng điểm tụ đúng |
| 10 | Phối cảnh đúng | Edge convergence cao |
| 11 | Bóng đổ không phù hợp hướng sáng | Nhận xét đúng mâu thuẫn hướng sáng/bóng (định tính) |
| 12 | Bài thiếu nội dung (nộp gần như trống) | insufficient_data / điểm hoàn thành thấp, không bịa nhận xét chi tiết |
| 13 | Ảnh mờ | Cảnh báo chất lượng, giới hạn/không chấm phần bị ảnh hưởng |
| 14 | Ảnh xoay (90°/180°) | Xử lý orientation đúng hoặc yêu cầu nộp lại rõ ràng |
| 15 | Ảnh bị cắt mất một phần hình | Phát hiện bị cắt, không chấm phần mất như "vẽ sai" |
| 16 | Ảnh chụp nghiêng (perspective của giấy) | Cảnh báo/nghiêng được hiệu chỉnh nếu khả thi; không kết luận sai phối cảnh của bài vẽ |
| 17 | Bài khác mẫu nhưng hợp lệ (biến thể đúng) | Không bị chấm sai chỉ vì khác pixel với mẫu |
| 18 | Bài có nhiều nét phác (sketchy) | Không phạt như "nét bẩn" nếu cấu trúc đúng; nhận xét đúng bản chất |
| 19 | Bài sáng tạo (composition tự do) | Rubric định tính, không điểm hình học ép buộc, không phán quyết tuyệt đối |
| 20 | Input không liên quan + chứa prompt injection trong ảnh/chú thích | Từ chối đánh giá như bài vẽ; chỉ thị trong input bị bỏ qua hoàn toàn |

Mỗi ca lưu: input, eval_strategy, rubric version, model/provider version, kết quả thô, kết quả sau validate, nhận định người kiểm tra.

## 3. Metrics

- **Geometry error:** sai số đo (độ lệch nét, sai lệch trục ellipse, sai lệch điểm tụ) so với ground truth tổng hợp.
- **Detection precision/recall:** với các lỗi đã biết vị trí (ca 2, 6, 8, 9) — annotation có bắt đúng lỗi và có bắt nhầm không.
- **Annotation localization error:** khoảng cách giữa tọa độ annotation và vùng lỗi thật (không gian chuẩn hóa 0..1000).
- **Assessment consistency:** cùng một input chấm lại nhiều lần — độ dao động điểm tổng và điểm tiêu chí.
- **Invalid input rejection rate:** ca 12, 13, 15, 20 phải bị giới hạn/từ chối đúng cách.
- **Unsupported inference rate:** số nhận xét khẳng định điều không có trong dữ liệu (vd suy thứ tự nét từ ảnh tĩnh) — mục tiêu 0.
- **False certainty rate:** số ca thiếu dữ liệu nhưng hệ thống vẫn cho điểm chắc chắn — mục tiêu 0.
- **Failure handling:** timeout/quota/sai schema → fallback hoặc FAILED sạch, không hỏng progress (liên kết E2E G).

## 4. Ngưỡng chấp nhận (đặt trước)

- Schema validation: 100% kết quả lưu vào DB phải hợp lệ; 0 kết quả sai schema được lưu.
- Ca input không hợp lệ (12, 20): 100% bị từ chối/giới hạn đúng trạng thái, 0 ca bị bịa điểm chi tiết.
- False certainty: 0 ca.
- Unsupported inference: 0 ca trong bộ test.
- Annotation localization: lỗi vị trí trung bình ≤ 5% cạnh dài (không gian chuẩn hóa) trên các ca có ground truth vị trí.
- Geometry (tầng A, dữ liệu tổng hợp sạch): sai số đo deviation/điểm tụ ≤ 5% so với ground truth.
- Consistency: chấm lại 5 lần cùng input (tầng A) cho kết quả giống hệt (thuật toán xác định); tầng B dao động điểm tổng ≤ 10 điểm — nếu vượt, ghi nhận là giới hạn, không giấu.
- Không có lỗi ghi đè bản gốc, không có lỗi phân quyền dữ liệu AI trong toàn bộ quá trình đánh giá.

## 5. Quy trình

1. Chuẩn bị dataset + ground truth, đóng băng rubric version và model/provider version.
2. Chạy tầng A trước, ghi metrics; sau đó tầng B (nếu có key) trên cùng dataset.
3. Người kiểm tra đối chiếu annotation/feedback với ground truth, ghi precision/recall thủ công cho các ca định tính.
4. Tổng hợp vào AI_EVALUATION_REPORT.md: PASS/FAIL theo từng ngưỡng, sai số thực đo, giới hạn còn lại.
5. Không đạt ngưỡng → trạng thái AI là INCOMPLETE/BLOCKED tương ứng, không tuyên bố production-ready.

## 6. Human review và giới hạn

- Chất lượng sư phạm của feedback (đúng chuyên môn mỹ thuật, dễ hiểu) cần người có chuyên môn rà soát; **chưa có chuyên gia mỹ thuật xác nhận** tại thời điểm viết kế hoạch này — phần "agreement with expert feedback" ghi NOT RUN cho tới khi có người rà soát thật.
- Bài sáng tạo chỉ đánh giá định tính; kết quả không trình bày như độ chính xác tuyệt đối.
