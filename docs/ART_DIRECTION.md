# ART_DIRECTION.md — Định hướng nghệ thuật DrawPath AI

## 1. Brand Concept

**Modern Creative Atelier — Digital Sketchbook Meets Art Academy**: một xưởng học vẽ hiện đại nơi sổ phác thảo cao cấp, phòng studio sáng tạo và học viện mỹ thuật gặp nhau trong một sản phẩm số có gia sư AI.

Tên sản phẩm tạm thời: **DrawPath AI**. Tên này được quản lý tập trung (cấu hình brand + design tokens), không hardcode rải rác, để đổi tên chính thức mà không sửa hàng loạt.

## 2. Brand Personality

- Thân thiện với người mới tuyệt đối: không thuật ngữ dọa người, không khí "phòng thi".
- Nghiêm túc về kỹ thuật: dựng hình, trục, điểm tụ, thang giá trị hiện diện như ngôn ngữ thị giác thật, không phải trang trí rỗng.
- Khích lệ tiến bộ: ăn mừng việc sửa được lỗi cụ thể, không chỉ ăn mừng điểm số.
- Trung thực: AI là gia sư hỗ trợ; giao diện không thần thánh hóa AI, hiển thị độ tin cậy khi cần.

## 3. Ngôn ngữ thị giác

- **Nét phác thảo (sketch strokes):** đường kẻ tay, nét dựng hình còn "mở" — dùng cho divider, lộ trình, minh họa bài học.
- **Hình khối dựng (construction forms):** cube/sphere/cylinder với trục và đường gióng — ngôn ngữ chung của các bài nền tảng.
- **Đường kẻ kỹ thuật:** horizon line, vanishing point, đường tỷ lệ — xuất hiện trong minh họa phối cảnh và lớp correction.
- **Texture giấy nhẹ:** chỉ làm nền không gian học, cường độ rất thấp.
- **Mảng màu giống tranh vẽ:** terracotta/coral/sage/lavender dạng mảng phẳng có cạnh hơi "cọ", dùng tiết chế cho điểm nhấn và phân loại nội dung.
- **Artboards:** khung trình bày bài học/bài nộp như tờ giấy đặt trên bàn vẽ.

Mọi yếu tố đồ họa phải có chức năng dẫn hướng hoặc truyền tải kiến thức; trang trí thuần túy bị cắt.

## 4. Bảng màu (tóm tắt — chi tiết token ở DESIGN_SYSTEM.md)

Warm Paper `#F7F3EA` · Natural Ivory `#FFFCF7` · Graphite Black `#242424` · Charcoal `#41403E` · Terracotta `#D56B46` · Coral `#EF8B73` · Sage `#8C9B85` · Lavender `#A59ACB`.

Cấm: gradient neon, glow phát sáng, kính mờ (glassmorphism) diện rộng, bảng màu "dashboard doanh nghiệp" xám–xanh lạnh làm chủ đạo.

## 5. Ba trải nghiệm, một nhận diện

| Trải nghiệm | Cảm xúc mục tiêu | Đặc điểm |
|---|---|---|
| Marketing (landing) | Truyền cảm hứng, "mình cũng học được" | Hero có minh họa quá trình vẽ, nét tự vẽ, ví dụ feedback thật của hệ thống (không review/số liệu giả) |
| Learning (dashboard, roadmap, lesson) | Rõ đường đi, thấy tiến bộ | Phân cấp thông tin mạnh, tiến độ dạng hành trình vẽ, thẻ bài học như trang sketchbook |
| Drawing (workspace, feedback) | Tập trung, ít xao nhãng | Canvas trung tâm lớn, UI rút gọn, annotation/correction là "lớp giấy can" phủ lên bài |

## 6. Illustration Style

- Minh họa tự tạo: nét graphite + mảng màu phẳng trong bảng màu brand; nhân vật (nếu có) đa dạng, đang *thực hiện hành động học* (cầm bút, đo tỷ lệ, dựng khối).
- Ví dụ đúng/sai trong bài học phải vẽ cùng một đối tượng ở hai mức chất lượng để so sánh công bằng.
- Không dùng ảnh stock/ai-generated không ghi nhãn cho phần "kết quả AI" — ảnh minh họa AI phải ghi nhãn AI-generated khi trình bày như kết quả.

## 7. Motion (tóm tắt)

Nét vẽ tự hoàn thiện, reveal từng lớp khi sửa bài, chuyển cảnh nhẹ giữa các bước học. Chi tiết và giới hạn (reduced motion, không chặn thao tác) ở DESIGN_SYSTEM.md mục 6.

## 8. Content Voice

- Tiếng Việt, xưng hô thân thiện, gọi người học là "bạn".
- Nhận xét lỗi theo mẫu: *hiện tượng → nguyên nhân → cách sửa → bài luyện tiếp theo*. Không chê bai, không khen sáo rỗng.
- Thuật ngữ chuyên môn luôn kèm giải thích ngắn ở lần xuất hiện đầu trong bài.

## 9. Điều không làm

- Không biến giao diện thành dashboard doanh nghiệp thông thường.
- Không hy sinh khả năng sử dụng để thêm hiệu ứng.
- Không tạo số liệu/review/thành tích giả để "làm đẹp" landing.
- Không sao chép phong cách nhận diện của Drawabox/Proko/NMA hay nguồn tham khảo nào khác.

## 10. Trạng thái

Định hướng đã chốt trước khi xây giao diện đầy đủ. Kiểm chứng thị giác thực tế (screenshot audit 10 trang) thuộc Phase 9 — trạng thái ghi ở TEST_RESULTS.md, chưa chạy thì là NOT RUN.
