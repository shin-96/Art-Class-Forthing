# PERFORMANCE_REPORT.md — Báo cáo hiệu năng

> Cập nhật 2026-11-24: đã đo baseline bằng `test/perf.mjs` trên VM Linux (Node 24, localhost). Lighthouse/Core Web Vitals vẫn NOT RUN.

## 1. Môi trường đo (điền khi chạy)

| Trường | Giá trị |
|---|---|
| Ngày đo | 2026-11-24 |
| Máy đo (CPU/RAM/OS) | VM Linux, Node 24.22.1 (môi trường phát triển — không đại diện máy người dùng cuối) |
| Trình duyệt + phiên bản | — |
| Commit | — |
| Điều kiện mạng | — |

## 2. Mục tiêu đặt trước

| Hạng mục | Mục tiêu tham khảo |
|---|---|
| Lighthouse trang công khai (landing) | Performance ≥ 90, Accessibility ≥ 90 trong môi trường đo đã khai báo (Lighthouse không phải bằng chứng duy nhất) |
| Độ trễ nét vẽ (stroke latency) | Không nhận thấy giật khi vẽ liên tục ở project 1.000 nét; số ms đo thực tế sẽ ghi ở mục 3 |
| Load project | Project 5.000 nét mở và thao tác được; thời gian load ghi số thật |
| Autosave | Không chặn thao tác vẽ; lưu nền theo debounce |
| Export PNG | Project 5.000 nét xuất thành công; thời gian ghi số thật |
| Core Web Vitals | Đo LCP/INP/CLS trên landing + dashboard, ghi số thật kèm ngữ cảnh |

## 3. Kết quả đo (điền khi chạy)

| ID | Hạng mục | Mục tiêu | Kết quả đo | Trạng thái |
|---|---|---|---|---|
| TC-PERF-01 | Tải landing/dashboard | Xem mục 2 | — | NOT RUN |
| TC-PERF-02 | Độ trễ nét ở 100 / 1.000 / 5.000 nét | Xem mục 2 | — | NOT RUN |
| TC-PERF-03 | Load project 5.000 nét | Xem mục 2 | — | NOT RUN |
| TC-PERF-04 | Autosave khi vẽ liên tục | Không giật | — | NOT RUN |
| TC-PERF-05 | Export PNG project lớn | Thành công | — | NOT RUN |
| TC-PERF-06 | Thời gian chấm engine cục bộ | Ghi nhận | 100 điểm: 1.6ms · 1.000 điểm: 6.4ms · 5.000 điểm: 5.6ms | ĐÃ ĐO |
| — | API latency (median, 10 req, localhost) | Ghi nhận | /api/health 4.5ms · /api/curriculum 7.1ms · / (HTML) 1.3ms | ĐÃ ĐO |
| — | Bundle/kích thước tài nguyên frontend | Ghi nhận baseline | — | NOT RUN |
| — | Memory usage phiên vẽ dài | Ghi nhận | — | NOT RUN |

## 4. Ghi chú phương pháp

- Canvas: đo bằng project mẫu 100 / 1.000 / 5.000 nét sinh từ cùng một kịch bản, đo độ trễ từ pointermove tới khi nét hiện, thời gian render toàn bộ khi load/zoom.
- Mỗi phép đo lặp tối thiểu 3 lần, ghi trung vị và điều kiện đo.
- Kết quả không đạt mục tiêu → tối ưu rồi đo lại, ghi cả hai vòng; không sửa mục tiêu sau khi đo để "đạt".

## 5. Kết luận hiện tại

Kết luận giới hạn: engine chấm và API đều nhanh ở quy mô dữ liệu tổng hợp trên localhost. Chưa đo: độ trễ nét trên UI thật với 5.000 nét, Lighthouse, máy yếu. Không suy rộng kết quả này thành "hiệu năng production".
