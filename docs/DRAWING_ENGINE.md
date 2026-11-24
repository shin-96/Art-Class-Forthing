# DRAWING_ENGINE.md — Interactive Drawing Engine

> Canvas là thành phần kỹ thuật trọng yếu, không phải demo. Mọi công cụ hiển thị trên UI đều phải hoạt động thật.

## 1. Công cụ bắt buộc

Pencil, Brush, Eraser, Undo, Redo, Clear Canvas (có xác nhận), Color Picker, Brush Size, Opacity, Zoom, Pan, Fit to Screen, Layers, Layer Visibility, Layer Lock, Reference Image (ảnh mẫu phủ/ghim), Guideline Toggle (đường gợi ý của bài), Save, Load, Autosave, Export PNG, Stroke Replay.

## 2. Thiết bị đầu vào

- Chuột, cảm ứng, bút stylus qua **Pointer Events** thống nhất.
- Pressure/tilt: đọc từ sự kiện thật khi thiết bị hỗ trợ (`pointerType: pen`, `event.pressure`, `tiltX/tiltY`).
- **Không giả lập** dữ liệu lực bút: thiết bị không hỗ trợ thì trường pressure để trống/mặc định khai báo rõ, không trình bày như dữ liệu đo thật.
- Kiểm thử stylus chỉ kết luận khi có thiết bị thật hoặc môi trường mô phỏng phù hợp (xem TEST_CASES.md TC-CAN-16).

## 3. Stroke Data Model

Mỗi stroke lưu:

| Trường | Ý nghĩa |
|---|---|
| `id` | Định danh stroke |
| `projectId`, `layerId` | Thuộc project/layer nào |
| `seq` | Thứ tự vẽ trong project (phục vụ replay + undo nhất quán) |
| `tool` | pencil / brush / eraser |
| `color`, `width`, `opacity` | Thuộc tính tại thời điểm vẽ |
| `points[]` | Mảng điểm `{x, y, pressure?, tiltX?, tiltY?, t}` — `t` là mốc thời gian tương đối |
| `startedAt`, `endedAt` | Thời gian bắt đầu/kết thúc nét |

### Chuẩn hóa tọa độ
- Tọa độ điểm lưu trong **không gian logic chuẩn hóa 0..1000** (theo chiều rộng/chiều cao logic của canvas), tách khỏi hệ tọa độ hiển thị.
- Zoom/pan/resize chỉ thay đổi phép biến đổi hiển thị (view transform), không sửa dữ liệu stroke → không mất chính xác.
- Khi render/export: `display = (logical / 1000 * size) ` áp dụng kèm view transform hiện tại (export dùng transform danh định, không kèm pan của người dùng).

### Versioning
Project có `format_version`. Khi format thay đổi phải có hàm migrate đọc được bản cũ; file không đọc được phải báo lỗi rõ ràng, không âm thầm mất dữ liệu.

## 4. Layer System

- Create, Rename, Reorder, Show/Hide, Lock (khóa thì không vẽ/xóa được), Delete (xác nhận khi layer có stroke), chọn layer đang vẽ.
- Export, save/load, undo/redo phải xử lý layer nhất quán: undo một nét không làm đổi thứ tự layer; xóa layer là một thao tác có thể undo (trong phạm vi lịch sử phiên).

## 5. Undo / Redo

- Lịch sử theo thao tác (stroke thêm/xóa, clear, layer op), không chụp toàn bộ canvas mỗi bước.
- Undo/redo sau save/load phải nhất quán với dữ liệu đã lưu (lịch sử phiên có thể reset khi load lại — hành vi này phải hiển thị nhất quán và được test TC-CAN-05).

## 6. Stroke Replay

- Play / Pause / Restart / Seek / Speed Control / Step-by-Step (từng nét theo `seq`).
- Replay phát lại **từ dữ liệu stroke đã ghi** (điểm + thời gian tương đối), hiển thị vị trí con trỏ theo dữ liệu.
- Không tái tạo "thứ tự nét" suy đoán từ ảnh tĩnh rồi trình bày như dữ liệu ghi nhận thật — ảnh upload không có replay.

## 7. Lưu và phục hồi

- Autosave: debounce (gõ/vẽ dừng một khoảng ngắn mới lưu) + throttle tối thiểu giữa hai lần lưu; hiển thị trạng thái lưu (đang lưu / đã lưu / lỗi lưu).
- Mất mạng: giữ bản nháp local, thử lưu lại khi có mạng; không báo "đã lưu" khi server chưa xác nhận.
- Version conflict: server từ chối ghi đè bản mới hơn (kèm mã 409), client đề xuất tải bản mới hoặc lưu thành bản sao.
- Restore Draft: mở lại project thấy đúng trạng thái đã lưu gần nhất (test E2E D).
- Giới hạn dung lượng: kiểm tra kích thước project khi lưu; vượt ngưỡng thì báo rõ, không cắt dữ liệu âm thầm.

## 8. Export PNG

- Render từ stroke data theo thứ tự layer (dưới → trên), tôn trọng visibility (layer ẩn không xuất), nền trong suốt hoặc nền giấy theo lựa chọn.
- Kích thước xuất theo độ phân giải logic đã khai báo của project, không phụ thuộc zoom hiện tại.

## 9. Hiệu năng

- Render tăng dần (incremental): chỉ vẽ lại vùng thay đổi khi đang vẽ nét; render toàn bộ khi zoom/pan/load.
- Bộ test hiệu năng bắt buộc: project 100 / 1.000 / 5.000 nét — đo độ trễ nét, thời gian load, autosave, export. Kết quả ghi ở PERFORMANCE_REPORT.md (chưa đo = NOT RUN).
- Không kết luận "mượt" chỉ từ cảm giác trên máy phát triển.

## 10. Acceptance (tóm tắt — chi tiết ở TEST_CASES.md)

Vẽ nét liên tục; đổi brush/màu; eraser; undo/redo; zoom; pan; resize; layer operations; import reference; save; reload; export; autosave; touch; stylus (có điều kiện thiết bị); replay; dữ liệu nhiều nét. Mỗi mục có test case ID riêng trong TEST_CASES.md nhóm TC-CAN.
