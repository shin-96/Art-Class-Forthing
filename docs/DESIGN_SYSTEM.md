# DESIGN_SYSTEM.md — Hệ thống thiết kế DrawPath AI

> Định hướng: **Modern Creative Atelier** (chi tiết ở ART_DIRECTION.md). File này là đặc tả kỹ thuật: tokens, typography, component, layout, motion, accessibility. Màu sắc và tên sản phẩm quản lý tập trung bằng design tokens (CSS custom properties), không hardcode rải rác.

## 1. Design Tokens — Màu

| Token | Giá trị | Vai trò |
|---|---|---|
| `--color-warm-paper` | `#F7F3EA` | Nền giấy ấm chính |
| `--color-ivory` | `#FFFCF7` | Nền thẻ/bề mặt sáng (Natural Ivory) |
| `--color-graphite` | `#242424` | Chữ chính, nét vẽ (Graphite Black) |
| `--color-charcoal` | `#41403E` | Chữ phụ, đường viền đậm |
| `--color-terracotta` | `#D56B46` | Màu nhấn chính, CTA |
| `--color-coral` | `#EF8B73` | Nhấn phụ, trạng thái thân thiện |
| `--color-sage` | `#8C9B85` | Thành công/hoàn thành, điểm nhấn dịu |
| `--color-lavender` | `#A59ACB` | Nhấn cho AI/tính năng thông minh |

Quy tắc: kiểm tra tương phản từng cặp chữ/nền theo WCAG 2.2 AA (chữ thường ≥ 4.5:1, chữ lớn ≥ 3:1); màu nhấn không dùng một mình để truyền đạt trạng thái (luôn kèm chữ/icon). Tránh gradient neon, glow, glassmorphism lạm dụng.

## 2. Tokens khác

- Spacing: thang 4px (4/8/12/16/24/32/48/64).
- Radius: thẻ 12–16px, nút 10px, chip pill.
- Shadow: mềm, thấp, tông ấm — mô phỏng giấy đặt trên bàn, không đổ bóng "doanh nghiệp".
- Texture: giấy nhẹ (SVG noise rất mờ) chỉ ở nền landing/section lớn, không đặt dưới đoạn văn dài.
- Stroke motif: đường phác thảo SVG dùng cho divider, tiến trình lộ trình, trạng thái rỗng.

## 3. Typography

- Display: font nghệ thuật có **hỗ trợ tiếng Việt đầy đủ** (dấu thanh, ký tự ghép) — chỉ dùng cho tiêu đề lớn/hero.
- Body: sans-serif dễ đọc, hỗ trợ tiếng Việt; không dùng font trang trí cho bài giảng.
- Type scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48; line-height body 1.55–1.7; heading 1.15–1.3.
- Font loading: `font-display: swap`, subset tiếng Việt khi có thể, tránh FOIT chặn đọc.
- Không hardcode tên brand trong từng trang — lấy từ cấu hình/token chung để đổi tên sản phẩm dễ dàng.

## 4. Component cốt lõi

Button (primary/secondary/ghost/danger), Input + Label + Error text, Card bài học, Module node (roadmap), Progress bar dạng nét vẽ, Skill chip, Rubric table, Annotation pin, Layer row (canvas), Toolbar button (có tooltip + phím tắt), Modal (quản lý focus, Esc đóng, trả focus về trigger), Toast/trạng thái lưu, Skeleton/loading mang ngôn ngữ phác thảo, Empty state có minh họa nét vẽ.

Mỗi component có đủ trạng thái: default / hover / focus-visible / active / disabled / loading / error (khi áp dụng).

## 5. Layout

- Ba họ bố cục riêng: Marketing (landing thoáng, minh họa lớn), Learning (dashboard/lesson phân cấp rõ, ưu tiên tiến độ), Drawing (canvas chiếm diện tích lớn, toolbar trái, panel phải thu gọn được).
- Breakpoint kiểm tra: 375 (mobile), 768 (tablet), 1280 (laptop), 1440 (desktop) + kích thước trung gian.
- Workspace trên mobile có bố cục riêng (toolbar dưới/cuộn ngang, panel dạng sheet), không chỉ thu nhỏ desktop.

## 6. Motion Language

- Animated sketch strokes (nét tự vẽ khi vào hero/roadmap), progressive reveal cho demo, layer reveal và correction overlay transition, before/after slider ở feedback, micro-interaction khi hoàn thành bài.
- Animation không chặn thao tác, không tự phát âm thanh, thời lượng ngắn (150–400ms cho UI).
- Tôn trọng `prefers-reduced-motion`: tắt animation trang trí, giữ thay đổi trạng thái tức thì.

## 7. Accessibility (hướng WCAG 2.2 AA)

- Contrast đạt AA; focus ring nhìn rõ trên mọi nền.
- Mọi form có label thật; lỗi gắn với trường (`aria-describedby`) và thông báo bằng chữ.
- Điều hướng bàn phím đầy đủ cho modal, toolbar, roadmap; thứ tự tab hợp lý.
- Ngữ nghĩa screen reader: landmark, heading hierarchy, alt text có nghĩa cho minh họa; canvas có mô tả text thay thế và danh sách thao tác bằng bàn phím khi áp dụng.
- Touch target ≥ 44×44px cho thao tác chính.
- Hỗ trợ phóng to chữ 200% không vỡ layout ở các trang học tập.

## 8. Iconography & minh họa

- Icon đường nét (line icon) thống nhất độ dày nét với motif bút chì; không trộn nhiều bộ icon.
- Minh họa tự tạo theo phong cách phác thảo + mảng màu phẳng (xem ART_DIRECTION.md); mọi minh họa phải phục vụ dẫn hướng hoặc truyền tải kiến thức.

## 9. Trạng thái tài liệu

Đây là đặc tả thiết kế đã chốt. Việc kiểm chứng bằng screenshot/visual regression ghi ở TEST_RESULTS.md và PERFORMANCE_REPORT.md — chưa chạy thì ghi NOT RUN, không tự chấm điểm thẩm mỹ làm bằng chứng duy nhất.
