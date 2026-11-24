# DEPLOYMENT.md — Triển khai DrawPath AI

## 1. Yêu cầu môi trường

- Node.js **24** (dùng `node:sqlite`, `node:http` tích hợp — không cần cài dependency).
- Không cần `npm install`: dự án không có npm dependency.
- Docker + Docker Compose (khuyến nghị cho triển khai ổn định).
- Dung lượng đĩa cho `data/` (SQLite + file upload/export) — sao lưu thư mục này là sao lưu toàn bộ dữ liệu.

## 2. Biến môi trường (`.env`)

Tạo `.env` từ `.env.example`. **Không commit `.env`.**

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `PORT` | Không (mặc định theo cấu hình server) | Cổng HTTP |
| `DATA_DIR` | Không | Thư mục dữ liệu (mặc định `data/`) |
| `SESSION_SECRET` | Có | Bí mật ký/kiểm session |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Khi seed lần đầu | Tài khoản admin ban đầu (đổi mật khẩu sau đăng nhập đầu) |
| `GEMINI_API_KEY` | Không | Ưu tiên 1 trong chuỗi AI fallback |
| `OPENROUTER_API_KEY` | Không | Ưu tiên 2 |
| `GROQ_API_KEY` | Không | Ưu tiên 3 |
| `ZAI_API_KEY` | Không | Z.ai GLM-4.6V-Flash free |
| `MISTRAL_API_KEY` | Không | Mistral free |
| `SAMBANOVA_API_KEY` | Không | SambaNova free |
| `NVIDIA_NIM_API_KEY` | Không | NVIDIA NIM |
| `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` | Không | Cloudflare Workers AI free |
| `SMTP_*` / cấu hình email | Không | Cần cho quên mật khẩu + thông báo email; thiếu thì tính năng email ở trạng thái hạn chế (BLOCKERS.md) |

Pollinations (text) không cần key. Không có key AI nào: app vẫn chạy, assessment dùng engine cục bộ; live AI = BLOCKED (ghi rõ trong trạng thái hệ thống, không giả vờ).

Thứ tự fallback đầy đủ: AI_ASSESSMENT.md mục 3. GitHub Models đã ngừng 30/07/2026 — không cấu hình. Cerebras đã loại vì bắt buộc thẻ.

## 3. Chạy local (không Docker)

```bash
# 1. Tạo cấu hình
cp .env.example .env   # rồi điền SESSION_SECRET và (tùy chọn) các API key free

# 2. Khởi tạo DB + seed chương trình học (idempotent — chạy lại không nhân đôi dữ liệu)
# seed tự động: admin được tạo khi server khởi động lần đầu (xem server/main.mjs)

# 3. Chạy server
node server/main.mjs

# 4. Kiểm tra
curl http://localhost:<PORT>/api/health
```

Tên file entrypoint/seed thực tế lấy theo mã nguồn trong repo; README.md là nguồn lệnh chuẩn cuối cùng — nếu lệnh trong file này lệch với README, README thắng và file này phải được sửa ở Phase 10 (Documentation Audit).

## 4. Chạy bằng Docker Compose

```bash
cp .env.example .env
docker compose up -d --build
docker compose ps          # kiểm tra container healthy
curl http://localhost:<PORT>/api/health
```

- Dockerfile: base image Node 24 slim, chạy bằng user không phải root, `HEALTHCHECK` gọi `/api/health`.
- Volume: mount `data/` ra host để bền dữ liệu qua các lần rebuild.
- Không build secret vào image; `.env` truyền qua `env_file`/environment của Compose.

## 5. Database và migrations

- SQLite tự tạo file khi khởi động lần đầu; schema tạo qua script khởi tạo/migration trong `server/` (thứ tự version tăng dần, chạy trong transaction).
- Seed dữ liệu: roles, 11 module + 4 track, skills + prerequisite graph, lessons/exercises/rubrics theo CURRICULUM.md, admin từ env.
- Sao lưu: dừng ghi hoặc dùng cơ chế backup của SQLite, sao chép cả file DB và thư mục file upload trong `data/`.
- Khôi phục: thay lại `data/` từ bản sao lưu, khởi động, kiểm tra `/api/health` + đăng nhập thử.

## 6. CI (định hướng pipeline)

Pipeline kiểm tra: lint/format (nếu cấu hình), kiểm tra cú pháp Node, unit tests, integration tests, E2E smoke, quét secret/dependency. Không tắt test để CI xanh (Master Prompt mục 37). Chi tiết test: TEST_PLAN.md; kết quả thật ghi ở TEST_RESULTS.md.

## 7. Môi trường

- Tách cấu hình development / test / production bằng `.env` riêng; DB test độc lập, không dùng chung DB thật.
- **Không tự triển khai lên hạ tầng trả phí hoặc production khi chưa có quyền của người dùng.** Tài liệu này mô tả cách triển khai, không phải bằng chứng đã triển khai production.

## 8. Vận hành

- Log: structured log ra stdout (Docker thu thập); audit log nghiệp vụ ở bảng AuditLog.
- Giám sát AI jobs: trang Admin → AI Jobs (trạng thái, provider, lỗi, retry).
- Khi provider free đổi chính sách (hết free, bắt thẻ, ngừng dịch vụ): loại khỏi chuỗi fallback, cập nhật AI_ASSESSMENT.md + DECISIONS.md, không để provider chết làm hỏng pipeline (fallback tự chuyển nhà kế tiếp).
