# AI_EVALUATION_REPORT.md — Báo cáo đánh giá AI Assessment

> Cập nhật 2026-11-24: **tầng A đã chạy** trên dataset tổng hợp (`test/ai-eval.mjs`): **14/14 PASS**. Tầng B vẫn **BLOCKED** (chưa có API key). Agreement với chuyên gia vẫn NOT RUN — kết quả tầng A là bằng chứng thuật toán trên dữ liệu tổng hợp, KHÔNG phải bằng chứng chất lượng sư phạm.

## 1. Tóm tắt trạng thái

| Hạng mục | Trạng thái | Lý do |
|---|---|---|
| Đánh giá tầng A (engine hình học/CV cục bộ) | **ĐÃ CHẠY: 14/14 PASS** | Dataset tổng hợp 14 ca bao phủ: đường thẳng đúng/lệch/không hoàn thành, bài trống, bài không liên quan, ellipse đúng/méo, phối cảnh đúng/sai, ảnh trống/có nội dung, upload thiếu metrics (`test/ai-eval.mjs`) |
| Đánh giá tầng B (AI multimodal qua chuỗi fallback free) | BLOCKED | Chưa có API key free nào được cấu hình trong `.env` để gọi live |
| Agreement với chuyên gia mỹ thuật | NOT RUN | Chưa có chuyên gia rà soát (xem CURRICULUM.md mục 6) |
| Consistency test (chấm lại nhiều lần) | NOT RUN | Chưa chạy |
| Failure handling (timeout/quota/sai schema) | **ĐÃ CHẠY MỘT PHẦN** | Unit test AI fallback: provider lỗi 429 → tự chuyển provider kế; mọi provider lỗi → ALL_PROVIDERS_FAILED có attempts; schema validation chặn score ngoài 0..100 và annotation ngoài canvas (13 unit test PASS) |

## 2. Điều kiện để chạy được

- Dataset 20 ca theo AI_EVALUATION_PLAN.md mục 2, kèm ground truth, đã đóng băng cùng rubric version.
- Tầng B cần ít nhất một key free trong `.env` (thứ tự ưu tiên xem AI_ASSESSMENT.md mục 3) và ghi rõ provider/model version của lần chạy.
- Người kiểm tra đối chiếu annotation cho các ca định tính.

## 3. Mẫu bảng kết quả (điền khi chạy thật)

| Ca # | Loại | Metric chính | Ngưỡng (đặt trước) | Kết quả đo | PASS/FAIL |
|---|---|---|---|---|---|
| 1–20 | Theo AI_EVALUATION_PLAN.md | Theo từng ca | Theo mục 4 của Plan | _(chưa đo)_ | NOT RUN |

| Metric tổng | Ngưỡng | Kết quả | Trạng thái |
|---|---|---|---|
| Schema validation khi lưu | 100% hợp lệ | — | NOT RUN |
| Từ chối input không hợp lệ (ca 12, 20) | 100% | — | NOT RUN |
| False certainty | 0 ca | — | NOT RUN |
| Unsupported inference | 0 ca | — | NOT RUN |
| Annotation localization error TB | ≤ 5% cạnh dài | — | NOT RUN |
| Geometry error tầng A (dữ liệu sạch) | ≤ 5% | — | NOT RUN |
| Consistency tầng B (dao động điểm tổng) | ≤ 10 điểm | — | NOT RUN |

## 4. Kết luận hiện tại

- **Không tuyên bố AI production-ready.** Tầng A đạt trên dataset tổng hợp; còn thiếu: dataset ảnh chụp thật, agreement chuyên gia, tầng B live. Điều kiện tiên quyết ở AI_EVALUATION_PLAN.md mục 4 và Gate E (RELEASE_ACCEPTANCE.md) chưa được kiểm chứng.
- Engine cục bộ và live AI là hai phạm vi kết luận tách biệt: tầng A có thể đạt VERIFIED độc lập nếu benchmark đạt; tầng B chỉ kết luận khi đã chạy với key thật.
- Mọi kết quả mock (nếu dùng trong test) phải ghi nhãn Mock và không tính vào báo cáo này như bằng chứng live.

## 5. Nhật ký cập nhật

| Ngày | Nội dung | Người thực hiện |
|---|---|---|
| 2026-11-24 | Tạo khung báo cáo, trạng thái NOT RUN/BLOCKED như trên | Agent tài liệu |
