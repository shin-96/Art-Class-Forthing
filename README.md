# DrawPath AI — Art-Class-Forthing

**AI-Powered Drawing Learning Platform**: nền tảng học vẽ từ cơ bản đến nâng cao tích hợp gia sư AI.
Chu trình học: **Learn → Observe → Practice → Analyze → Correct → Improve → Master.**

Một người chưa từng học vẽ có thể: đăng ký → chọn mục tiêu → nhận lộ trình → học bài có minh họa & phát lại nét mẫu → vẽ trên bảng vẽ thật (layers, undo/redo, replay) hoặc chụp bài giấy nộp lên → nhận chấm theo rubric bằng engine hình học trên dữ liệu nét thật → xem chú thích lỗi + lớp hướng dẫn sửa đè lên bài → sửa và nộp lại → theo dõi bản đồ kỹ năng.

## Chạy ngay (không cần cài dependency)

```bash
cp .env.example .env   # tùy chọn — không có .env vẫn chạy (AI live ở chế độ BLOCKED, chấm hình học vẫn hoạt động)
node server/main.mjs   # http://localhost:4173
```

- Yêu cầu: Node.js ≥ 22 (dùng `node:sqlite` tích hợp). Không `npm install`.
- Tài khoản admin bản local: `admin@drawpath.local` / `Admin123!` — **đổi qua `ADMIN_EMAIL`/`ADMIN_PASSWORD` trong `.env` trước khi dùng thật**.
- Docker: `docker compose up --build` (dữ liệu nằm ở volume `./data`).

## Kiểm thử

```bash
npm test          # unit tests (node:test) — hình học, rubric, mastery, auth, AI fallback
npm run test:e2e  # E2E HTTP thật: đăng ký → onboarding → vẽ → nộp → chấm → IDOR → revision
```

## Kiến trúc tóm tắt

| Lớp | Công nghệ |
|---|---|
| Server | Node.js thuần (`node:http`), 1 tiến trình, 0 dependency |
| Database | SQLite (`node:sqlite`) — users, sessions, projects, submissions, assessments, ai_jobs, progress, audit… |
| Frontend | Vanilla JS/CSS trong `public/` — SPA + Drawing Engine canvas (tọa độ logic 0..1000) |
| Chấm bài | Engine hình học/CV cục bộ trên stroke thật (độ lệch, độ thẳng, ellipse fit, hội tụ phối cảnh, value) + validate schema |
| AI | Chuỗi fallback free qua OpenAI-compatible API — xem `.env.example` và `docs/AI_ASSESSMENT.md` |

**AI free fallback (theo thứ tự):** Gemini free → OpenRouter `:free` → Groq free → Z.ai GLM Flash free → Mistral free → SambaNova free → NVIDIA NIM → Cloudflare Workers AI free → Pollinations (không cần key) → gia sư rule-based cục bộ theo dữ liệu bài chấm thật. Không có key nào thì live AI ghi rõ `BLOCKED`, engine hình học vẫn chấm đầy đủ — hệ thống không dùng kết quả AI giả.

## Tài liệu

Toàn bộ tài liệu bắt buộc nằm trong `docs/`: REQUIREMENTS, ARCHITECTURE, DATABASE, API, CURRICULUM, DESIGN_SYSTEM, ART_DIRECTION, DRAWING_ENGINE, AI_ASSESSMENT, AI_EVALUATION_PLAN/REPORT, SECURITY, DEPLOYMENT, TEST_PLAN/CASES/RESULTS, PERFORMANCE_REPORT, SECURITY_REVIEW, BUG_REPORT, KNOWN_LIMITATIONS, USER_GUIDE, ADMIN_GUIDE, TASKS, IMPLEMENTATION_STATUS, DECISIONS, CHANGELOG, BLOCKERS, RELEASE_ACCEPTANCE.

Trạng thái phát hành hiện tại được tuyên bố trung thực trong `docs/RELEASE_ACCEPTANCE.md` và `docs/IMPLEMENTATION_STATUS.md` — không tuyên bố production-ready khi chưa đủ bằng chứng.
