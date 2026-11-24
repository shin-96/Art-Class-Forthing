# REQUIREMENTS.md — Đặc tả yêu cầu DrawPath AI

> Sản phẩm: **DrawPath AI** (tên tạm, quản lý tập trung trong cấu hình brand) — Nền tảng học vẽ từ cơ bản đến nâng cao tích hợp gia sư AI.
> Repo: `Art-Class-Forthing`. Ngôn ngữ mặc định: tiếng Việt. Kiến trúc hỗ trợ mở rộng đa ngôn ngữ.
> Triết lý: **Learn → Observe → Practice → Analyze → Correct → Improve → Master.**

## 1. Đối tượng người dùng

- Người chưa từng học vẽ, người tự học, người học vẽ trên giấy.
- Người học digital painting, anime/manga, chân dung, phong cảnh, minh họa.
- Người có trình độ không đồng đều giữa các kỹ năng (mạnh nét, yếu phối cảnh...).
- Vai trò hệ thống: `guest` (khách), `learner` (học viên), `instructor` (biên tập/giảng viên), `admin`.

## 2. Nguyên tắc nghiệp vụ bắt buộc

- Có lộ trình chuẩn VÀ chế độ học tự do; không khóa toàn bộ nội dung theo trình tự cứng.
- Học vượt được phép, nhưng phải hiển thị cảnh báo kỹ năng tiên quyết còn thiếu.
- Đánh giá kỹ thuật và đánh giá sáng tạo dùng rubric khác nhau.
- Điểm tổng không đại diện cho mọi khía cạnh; tiêu chí không đánh giá được thì ghi rõ, không tự cho điểm.
- Hoàn thành bài học (completion) và thành thạo kỹ năng (mastery) là hai hệ thống riêng.
- Bài gốc của học viên không bao giờ bị AI ghi đè.
- Không dùng số liệu giả (số học viên, review...) trên giao diện.

## 3. User Stories và Acceptance Criteria

### US-01 Đăng ký / đăng nhập (P0)
- Là khách, tôi muốn đăng ký bằng email + mật khẩu để có tài khoản học tập riêng.
- AC: mật khẩu băm scrypt + salt; email trùng bị từ chối kèm thông báo rõ; đăng nhập sai không tiết lộ email có tồn tại hay không; session cookie HttpOnly; có đăng xuất, quên/đặt lại mật khẩu (đặt lại chỉ hoạt động đầy đủ khi có cấu hình gửi email, xem BLOCKERS.md).

### US-02 Onboarding và gợi ý điểm bắt đầu (P0)
- Là học viên mới, tôi muốn chọn mục tiêu, trình độ tự đánh giá, phương thức vẽ (giấy/số), thời gian luyện mỗi ngày, và làm bài kiểm tra đầu vào tùy chọn.
- AC: onboarding lưu vào hồ sơ; hệ thống gợi ý module bắt đầu kèm lý do; bài kiểm tra đầu vào KHÔNG được trình bày là đo chính xác toàn bộ năng lực.

### US-03 Xem lộ trình (Roadmap) (P0)
- Là học viên, tôi muốn xem bản đồ module/kỹ năng, trạng thái từng bài, bài được gợi ý và cảnh báo tiên quyết.
- AC: roadmap hiển thị 11 module nền tảng + 4 track chuyên ngành; mỗi node có trạng thái; lọc được theo module/trạng thái.

### US-04 Học bài học (P0)
- Là học viên, tôi muốn học lý thuyết, xem ví dụ đúng/sai, hướng dẫn từng bước và stroke demonstration (phát lại nét mẫu từ dữ liệu stroke thật).
- AC: bài học đủ hợp đồng nội dung mục 4 của CURRICULUM.md; không có video player rỗng; có rubric, lỗi thường gặp và điều kiện đạt.

### US-05 Thực hành trên canvas (P0)
- Là học viên, tôi muốn vẽ bằng pencil/brush/eraser, nhiều layer, undo/redo, zoom/pan, lưu tự động, xuất PNG và xem replay nét của mình.
- AC: xem DRAWING_ENGINE.md và test TC-CAN-*; tọa độ chuẩn hóa 0..1000, không mất dữ liệu khi reload.

### US-06 Nộp bài và nhận đánh giá (P0)
- Là học viên, tôi muốn nộp bài từ canvas hoặc upload ảnh giấy (JPG/PNG/WebP), xem trạng thái chấm, điểm theo tiêu chí, điểm mạnh/yếu, annotation vị trí lỗi và hướng sửa.
- AC: engine hình học/CV cục bộ luôn chạy không cần API key; AI multimodal (nếu có key) phải qua validate schema mới lưu; thiếu dữ liệu thì trả "không đủ dữ liệu", không bịa điểm.

### US-07 Sửa bài và nộp lại (P0)
- Là học viên, tôi muốn tạo bản sửa (revision) từ bài cũ, nộp lại nhiều lần và so sánh các phiên bản.
- AC: bản gốc giữ nguyên; mỗi lần nộp là một SubmissionVersion riêng, gắn đúng rubric version.

### US-08 Gia sư AI theo ngữ cảnh (P1)
- Là học viên, tôi muốn hỏi gia sư về bài học hoặc lỗi cụ thể trong bài vừa nộp và nhận giải thích theo trình độ của mình.
- AC: gia sư chỉ dùng ngữ cảnh được phép (bài học, assessment của chính học viên); không bịa chi tiết không có trong hình; chống prompt injection từ nội dung người dùng.

### US-09 Theo dõi tiến bộ và mastery (P0)
- Là học viên, tôi muốn xem tiến độ học, hồ sơ kỹ năng, kỹ năng yếu, bài ôn được đề xuất kèm lý do.
- AC: mastery tính từ nhiều bằng chứng (độ khó, số lần luyện, kết quả gần đây, độ ổn định, mức hỗ trợ, độ tin cậy đánh giá); một lần đạt 80/100 KHÔNG tự động thành Mastered.

### US-10 Portfolio (P1)
- Là học viên, tôi muốn lưu tác phẩm, xem thumbnail, tải xuống, xóa, đặt quyền riêng tư. Bài vẽ mặc định riêng tư.

### US-11 Quản trị nội dung (P1)
- Là instructor/admin, tôi muốn tạo/sửa module, lesson, exercise, rubric; quản lý trạng thái Draft → In Review → Published → Archived; xem AI jobs, audit log, analytics.
- AC: phân quyền kiểm tra ở backend (không chỉ ẩn nút); bài AI-generated chưa rà soát không tự động xuất bản.

### US-12 Guest mode (P2)
- Là khách, tôi muốn xem landing, xem thử bài giới thiệu và thử canvas mà không bị nhầm là dữ liệu đã được lưu lâu dài.

## 4. Phạm vi ngoài bắt buộc (không ưu tiên khi Core chưa xong)

Marketplace, thanh toán, mạng xã hội, livestream, video call, multiplayer drawing, AI text-to-image, NFT, app mobile native. Chỉ thiết kế khả năng mở rộng, không triển khai.

## 5. Requirement Traceability Matrix

| Req ID | Tính năng | Module / thành phần | Test liên quan | Ưu tiên |
|---|---|---|---|---|
| REQ-AUTH-01 | Đăng ký/đăng nhập/session | `server/auth` | TC-AUTH-*, E2E A/F | P0 |
| REQ-AUTH-02 | Phân quyền 4 vai trò, object-level authorization | `server/auth`, mọi route | TC-SEC-*, E2E F | P0 |
| REQ-ONB-01 | Onboarding + gợi ý điểm bắt đầu | Onboarding, Recommendation | E2E A | P0 |
| REQ-CUR-01 | 11 module + 4 track, ≥75 bài học | Curriculum seed data | TC-CUR-* | P0 |
| REQ-CUR-02 | Skill dependency graph + cảnh báo tiên quyết | Skills, Roadmap | TC-REC-*, E2E B | P0 |
| REQ-LES-01 | Hợp đồng nội dung bài học đầy đủ | Lesson domain | TC-CUR-* | P0 |
| REQ-CAN-01 | Canvas: tools, layers, undo/redo, zoom/pan | Drawing Engine | TC-CAN-*, E2E D | P0 |
| REQ-CAN-02 | Stroke model 0..1000, replay, autosave, export PNG | Drawing Engine | TC-CAN-*, E2E D | P0 |
| REQ-SUB-01 | Nộp bài từ canvas + upload ảnh, validation ảnh | Submission, Upload | TC-UPL-*, E2E C | P0 |
| REQ-SUB-02 | Version history, giữ nguyên bản gốc | Submission | E2E H | P0 |
| REQ-AI-01 | Engine hình học/CV cục bộ chấm theo loại bài | Assessment local engine | TC-GEO-*, AI Eval | P0 |
| REQ-AI-02 | Chuỗi fallback AI free (OpenAI-compatible) | AI Provider | TC-AI-*, E2E G | P0 |
| REQ-AI-03 | Validate schema kết quả AI trước khi lưu | Assessment | TC-AI-* | P0 |
| REQ-AI-04 | Annotation + guided correction (lớp phủ sửa) | Assessment, Feedback UI | TC-GEO-*, E2E A/C | P0 |
| REQ-AI-05 | AI Tutor theo ngữ cảnh | Tutor | TC-AI-* | P1 |
| REQ-PROG-01 | LearningProgress tách khỏi SkillMastery | Progress, Mastery | TC-MAS-* | P0 |
| REQ-PROG-02 | Adaptive recommendation có giải thích | Recommendation | TC-REC-* | P1 |
| REQ-PORT-01 | Portfolio + quyền riêng tư | Portfolio | E2E F | P1 |
| REQ-ADM-01 | Admin CMS + publishing workflow | Admin | E2E E | P1 |
| REQ-ADM-02 | AI job monitoring + audit log | Admin, AIJob, AuditLog | E2E E/G | P1 |
| REQ-SEC-01 | Upload an toàn, rate limit, security headers | Toàn hệ thống | TC-SEC-* | P0 |
| REQ-PERF-01 | Canvas mượt với 100/1.000/5.000 nét | Drawing Engine | TC-PERF-* | P1 |

## 6. Trạng thái

Tài liệu này là đặc tả (kế hoạch đã chốt). Trạng thái triển khai từng REQ xem IMPLEMENTATION_STATUS.md và RELEASE_ACCEPTANCE.md — không suy diễn "đã xong" từ tài liệu này.
