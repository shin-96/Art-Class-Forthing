# AI_ASSESSMENT.md — AI Drawing Assessment Engine

## 1. Pipeline tổng thể

```
Submission Validation
→ Input Classification (loại bài theo eval_strategy của Exercise)
→ Image/Stroke Preprocessing
→ (A) Engine hình học/CV cục bộ trên dữ liệu stroke/ảnh
→ (B) Multimodal Reasoning qua chuỗi fallback AI free (nếu có key)
→ Rubric Scoring (server tính, theo Rubric Version)
→ Structured Feedback + Annotation Generation
→ Schema Validation (bắt buộc trước khi lưu)
→ Persist Results (Assessment + CriterionResults + Annotations)
→ UI Presentation (điểm, tiêu chí, annotation, correction, confidence)
```

Không dùng một prompt chung cho mọi bài: mỗi `eval_strategy` có chiến lược đánh giá, tiêu chí đo và prompt riêng.

## 2. Tầng A — Engine hình học/CV cục bộ (luôn chạy, không cần key)

Chạy trên dữ liệu stroke chuẩn hóa 0..1000 (bài canvas) và/hoặc ảnh tiền xử lý (bài upload, trong giới hạn suy luận cho phép):

| Loại bài | Đo lường cục bộ |
|---|---|
| Line Control | Độ lệch so với đường mẫu (deviation), độ thẳng (sai số fit đường thẳng), độ mượt (biến thiên góc liên tiếp), độ chính xác điểm cuối (endpoint), độ ổn định nét cong, tính nhất quán giữa các nét lặp |
| Shapes / Proportion | Fit hình học (đường tròn/ellipse: tâm, trục, độ méo), tỷ lệ các cạnh, góc, đối xứng qua trục, căn chỉnh, khoảng cách tương đối |
| Form Construction | Trục khối, song song/hội tụ cạnh tương ứng, nhất quán cấu trúc khối |
| Perspective | Ước lượng đường chân trời + điểm tụ từ các cạnh dài, độ hội tụ cạnh (edge convergence), nhất quán form theo điểm tụ |
| Light & Shadow | Phân bố value (histogram vùng sáng/tối), hướng sáng suy từ vùng highlight/shadow chính, nhóm giá trị, tương phản — ở mức định lượng thận trọng |
| Gesture & Anatomy | Tỷ lệ đoạn cơ thể theo landmark ước lượng, line of action (đường cong qua các điểm mốc) — độ tin cậy thấp hơn, luôn kèm confidence |
| Color / Composition | Phân bố màu, điểm nhấn theo tương phản/saturation, cân bằng thị giác theo lưới vùng — định tính hỗ trợ, không chấm như hình học |

Nguyên tắc: ưu tiên thuật toán đo được khi có đủ dữ liệu; không khẳng định chính xác khi ảnh/vật thể thiếu thông tin; **không suy luận thứ tự nét, tốc độ hay lực bút từ ảnh chụp tĩnh**.

## 3. Tầng B — Chuỗi fallback AI free (OpenAI-compatible)

Thứ tự provider theo key có trong `.env` của server (giao thức OpenAI-compatible thống nhất):

1. **Gemini free** — model `gemini-2.5-flash` (free tier AI Studio, không cần thẻ)
2. **OpenRouter :free** — model `:free` có vision
3. **Groq free** — model vision free tier
4. **Z.ai GLM-4.6V-Flash free**
5. **Mistral free**
6. **SambaNova free**
7. **NVIDIA NIM**
8. **Cloudflare Workers AI free**
9. **Pollinations** — không cần key, **chỉ text** (dùng cho tutor/giải thích, không chấm ảnh)
10. **Gia sư rule-based cục bộ** — đích cuối: trả lời mẫu theo rubric/lỗi đã đo được ở tầng A, ghi rõ là phản hồi cục bộ

Loại trừ có lý do (ghi ở DECISIONS.md ADR-005):
- **GitHub Models: đã ngừng dịch vụ 30/07/2026 — không dùng.**
- **Cerebras: nay bắt buộc thẻ — loại theo tiêu chí "free không cần thẻ" của người dùng.**

Hành vi fallback: lỗi timeout/429/5xx/đáp án sai schema ở một provider → chuyển provider kế tiếp, ghi `provider/model` thực tế đã dùng vào Assessment và AIJob. Hết provider có key → chỉ dùng kết quả tầng A + ghi trạng thái live AI là **BLOCKED** (thiếu key), không giả kết quả AI.

## 4. Rubric và tính điểm

- Mỗi Exercise có Rubric có version; mỗi Criterion có: id, tên, mô tả, **weight (tổng = 100, server validate)**, method (geometry/cv/ai/hybrid/manual), khoảng điểm, quy tắc áp dụng, quy tắc confidence, hướng dẫn viết feedback.
- Ví dụ (phối cảnh 1 điểm tụ): Edge Convergence 35% · Form Structure 25% · Proportions 20% · Line Clarity 10% · Requirement Completion 10%.
- Điểm tổng do **server** tính từ điểm tiêu chí đã validate; client không gửi điểm.
- Tiêu chí không đánh giá được: áp dụng `total_rule` của rubric (loại khỏi mẫu số và ghi rõ), **không tự cho điểm**, không làm sai lệch âm thầm điểm tổng.
- Bài sáng tạo dùng rubric định tính riêng; điểm số không được trình bày như phán quyết tuyệt đối về giá trị nghệ thuật.

## 5. Schema phản hồi (validate nghiêm ngặt trước khi lưu)

```json
{
  "assessmentId": "string",
  "submissionId": "string",
  "exerciseId": "string",
  "rubricVersion": 1,
  "analysisStatus": "sufficient | uncertain | insufficient_data | not_assessable",
  "overallScore": "number | null",
  "criterionResults": [{ "criterionId": "string", "score": "number|null", "notAssessedReason": "string|null", "confidence": 0.0, "evidence": "string" }],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "corrections": [{ "annotationRef": "string", "guidance": "string" }],
  "recommendations": [{ "lessonId": "string", "reason": "string" }],
  "annotations": [{ "kind": "point|line|region", "coords": {}, "errorType": "string", "cause": "string", "fixGuidance": "string", "severity": "low|medium|high" }],
  "confidence": 0.0,
  "modelVersion": "string",
  "processing": { "provider": "string", "localEngine": "string", "durationMs": 0 },
  "failureReason": "string | null"
}
```

Kết quả AI không qua validate (thiếu trường, điểm ngoài thang, tọa độ ngoài vùng, tổng trọng số sai) → **từ chối lưu**, job ghi lỗi, thử provider kế tiếp hoặc kết thúc ở tầng A. Không đưa chuỗi trả lời thô của AI thẳng vào logic nghiệp vụ/UI.

## 6. Mức độ tin cậy (confidence)

Bốn trạng thái bắt buộc: đủ tin cậy · chưa chắc chắn · không đủ dữ liệu · không thể đánh giá. UI hiển thị trạng thái này cạnh kết quả. Hệ thống không tạo điểm khi đầu vào không đủ điều kiện (ảnh mờ/cắt mất hình/không liên quan → yêu cầu nộp lại hoặc giới hạn phạm vi nhận xét).

## 7. Annotation và Guided Correction

- **Mode A — Error Annotation (bắt buộc):** điểm/đường/vùng sai + loại lỗi + nguyên nhân + hướng sửa + mức ảnh hưởng, vẽ trên lớp phủ riêng; tọa độ theo không gian chuẩn hóa sau crop/resize để khớp khi zoom/pan.
- **Mode B — Guided Visual Correction (bắt buộc cho bài hình học):** đường thẳng/trục/hướng điểm tụ/đường tỷ lệ/góc đề xuất; có toggle, chỉnh opacity, chọn annotation để xem giải thích.
- **Mode C — Corrected Reference (nâng cao, có điều kiện):** chỉ khi tạo được bản tham khảo đủ tin cậy; giữ nguyên bản gốc, ghi nhãn AI-generated reference, không ghi đè nét học viên. Chưa đạt chuẩn → đánh dấu chưa hoàn thiện (xem KNOWN_LIMITATIONS.md).
- **Revision Comparison:** Original / Annotated / Corrected Reference (nếu có) / User Revised — đối chiếu trước–sau theo version.

## 8. AI Tutor

Hội thoại theo ngữ cảnh (bài học hiện tại, assessment của chính học viên). Trả lời qua cùng chuỗi fallback; Pollinations (text) và rule-based cục bộ là hai đích cuối. Tutor không bịa chi tiết không có trong hình, không truy cập dữ liệu người khác, có phòng vệ prompt injection (nội dung người dùng/upload là dữ liệu, không phải chỉ thị hệ thống).

## 9. Job management

Trạng thái: QUEUED → PROCESSING → COMPLETED / FAILED (CANCELLED, EXPIRED khi áp dụng). Metadata: job id, owner, submission, model/provider, thời gian tạo/bắt đầu/kết thúc, retry count (giới hạn), error code, usage. Chống tạo job trùng khi nhấn Submit liên tục. Xem thêm API.md mục 7 và TEST_CASES.md E2E G.

## 10. Mock mode

Mock provider chỉ dùng cho UI preview local, automated tests và contract tests; phải ghi nhãn **Mock Mode** rõ ràng. Kết quả mock không bao giờ là bằng chứng tích hợp AI thật. Không có API key → live integration = **BLOCKED**, engine cục bộ vẫn có thể đạt VERIFIED nếu test đạt.
