# DECISIONS.md — Nhật ký quyết định kiến trúc (ADR)

> Mỗi quyết định: bối cảnh, quyết định, lý do, hệ quả. Quyết định thay đổi phải thêm ADR mới, không sửa lặng lẽ ADR cũ.

## ADR-001 — Stack: Node.js 24 thuần, không framework, không npm dependency
- **Bối cảnh:** Master Prompt đề xuất Next.js/React/TypeScript/Tailwind + FastAPI/PostgreSQL/Redis/Celery, nhưng cho phép thay đổi stack nếu có lý do kỹ thuật rõ ràng.
- **Quyết định:** Một tiến trình Node.js 24 dùng `node:http` + `node:sqlite`; frontend vanilla JS/CSS trong `public/`; không cài thêm dependency nào.
- **Lý do:** Chạy ngay không cần cài đặt (`node server/main.mjs`), một tiến trình duy nhất dễ vận hành và deploy Docker, DB nhúng không cần server riêng, giảm bề mặt lỗi cài đặt cho người dùng cuối và cho CI. Quy mô dự án hiện tại không cần SSR framework hay hàng đợi ngoài.
- **Hệ quả:** Phải tự viết router/middleware tối thiểu (chấp nhận, phạm vi rõ); không có hệ sinh thái component React (frontend giữ ở mức vanilla có kỷ luật); khi tải lớn cần scale thì đánh giá lại bằng ADR mới.

## ADR-002 — Database: SQLite nhúng (`node:sqlite` DatabaseSync) thay vì PostgreSQL
- **Lý do:** Cùng triết lý ADR-001: không tiến trình phụ, sao lưu = sao lưu thư mục `data/`, đủ cho tải vừa của nền tảng học vẽ giai đoạn này. Truy vấn luôn tham số hóa; lớp repository là điểm thay thế nếu sau này chuyển PostgreSQL.
- **Hệ quả:** Không scale ngang nhiều instance ghi đồng thời; ghi rõ ở KNOWN_LIMITATIONS.md.

## ADR-003 — Auth: scrypt + salt, session cookie HttpOnly + CSRF header
- **Quyết định:** Mật khẩu băm bằng `node:crypto` scrypt với salt riêng; session phía server, cookie HttpOnly; request ghi dữ liệu bắt buộc header `X-CSRF-Token`.
- **Lý do:** Chỉ dùng module tích hợp (khớp ADR-001), thuật toán băm mật khẩu chuẩn, chống CSRF rõ ràng mà không cần thư viện ngoài. Không dùng JWT stateless vì cần hủy session phía server khi logout/đổi quyền.
- **Hệ quả:** Phải quản lý bảng session và dọn session hết hạn.

## ADR-004 — Canvas: stroke data model chuẩn hóa 0..1000, tách khỏi tọa độ hiển thị
- **Quyết định:** Lưu điểm stroke trong không gian logic 0..1000 kèm pressure/tilt/timestamp khi có; zoom/pan chỉ là view transform; project có `format_version`.
- **Lý do:** Không mất chính xác khi resize/zoom; replay và engine chấm hình học dùng chung một hệ tọa độ; export không phụ thuộc trạng thái màn hình.
- **Hệ quả:** Mọi công cụ vẽ/chấm/hiển thị annotation phải đi qua hàm biến đổi tọa độ chung (có unit test TC-CAN-U01).

## ADR-005 — AI: engine cục bộ luôn chạy + chuỗi fallback AI free qua OpenAI-compatible
- **Quyết định:** Thứ tự: (A) engine hình học/CV cục bộ trên stroke data — luôn chạy, không cần key; (B) AI multimodal qua giao thức OpenAI-compatible theo thứ tự key có trong `.env`: **Gemini free (`gemini-2.5-flash`) > OpenRouter `:free` > Groq free > Z.ai GLM-4.6V-Flash free > Mistral free > SambaNova free > NVIDIA NIM > Cloudflare Workers AI free > Pollinations (không key, chỉ text) > rule-based cục bộ**.
- **Lý do:** Theo yêu cầu của người dùng: chỉ dùng nguồn free (không cần thẻ), cắm nhiều dự phòng để không ngắt quãng. Giao thức thống nhất OpenAI-compatible giúp thêm/bớt provider không sửa nghiệp vụ.
- **Loại trừ:** **GitHub Models đã ngừng dịch vụ 30/07/2026 — không dùng.** **Cerebras nay bắt buộc thẻ — loại theo tiêu chí free-không-thẻ.**
- **Hệ quả:** Kết quả AI bắt buộc validate schema trước khi lưu; hết key thì live AI = BLOCKED nhưng hệ thống vẫn chấm bằng tầng A; provider free đổi chính sách thì cập nhật ADR này bằng ADR mới.

## ADR-006 — Chấm điểm ở server, rubric có version, không sửa kết quả cũ
- **Quyết định:** Server tính điểm từ criterion results đã validate; rubric sửa = version mới; chấm lại = assessment mới.
- **Lý do:** Client không đáng tin cho điểm số; cần truy vết "điểm này được chấm bằng rubric/model nào" cho quality review và revision history.

## ADR-007 — Bài gốc không bao giờ bị ghi đè; file lưu trên đĩa, DB giữ metadata
- **Lý do:** Nguyên tắc nghiệp vụ cốt lõi (so sánh revision, tin cậy của học viên) + hiệu năng DB. Tải file qua route có kiểm tra quyền, không URL công khai.

## ADR-008 — Hàng đợi AI job nội bộ trong SQLite, một tiến trình
- **Quyết định:** Bảng AIJob + vòng xử lý trong cùng tiến trình server; trạng thái bền vững qua restart (job PROCESSING khi khởi động lại được đưa về QUEUED/FAILED theo quy tắc khôi phục).
- **Lý do:** Khớp ADR-001/002, tránh thêm Redis/Celery. Hệ quả: giới hạn thông lượng chấm đồng thời — chấp nhận ở giai đoạn này, ghi ở KNOWN_LIMITATIONS.md.

## ADR-009 — Tên sản phẩm tạm "DrawPath AI" quản lý tập trung
- **Quyết định:** Brand name nằm trong cấu hình/design token dùng chung, không hardcode trong từng trang.
- **Lý do:** Tên chưa phải thương hiệu chính thức; đổi tên phải là thao tác một chỗ.

## ADR-010 — Ngôn ngữ và nội dung: tiếng Việt mặc định, tự biên soạn, tham khảo cấu trúc bên ngoài
- **Quyết định:** Nội dung bài học tự viết; Drawabox/Proko/NMA/Ctrl+Paint/Line of Action chỉ là tham khảo cấu trúc (CURRICULUM.md mục 1).
- **Lý do:** Tôn trọng bản quyền và phù hợp người học Việt Nam; kiến trúc dữ liệu chừa sẵn trường locale để đa ngôn ngữ sau này.
