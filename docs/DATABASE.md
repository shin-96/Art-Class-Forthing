# DATABASE.md — Thiết kế cơ sở dữ liệu

> Engine: **SQLite** qua `node:sqlite` (`DatabaseSync`), file DB trong `data/`. Bật khóa ngoại (foreign keys) và WAL mode khi chạy.
> Quy ước: khóa chính `id` (INTEGER hoặc TEXT-UUID tùy bảng), mọi bảng có `created_at`, bảng có sửa đổi có `updated_at` (ISO 8601 UTC). Tên bảng snake_case số nhiều.

## 1. Nhóm người dùng

| Entity | Trường chính / quan hệ |
|---|---|
| Role | `id`, `name` duy nhất ∈ {guest, learner, instructor, admin}, `description` |
| User | `id`, `email` (unique, lowercase), `password_hash` (scrypt), `password_salt`, `role_id` → Role, `status` (active/locked), `email_verified_at` (nullable), `last_login_at` |
| UserProfile | `id`, `user_id` → User (unique, 1-1), `display_name`, `avatar_path`, `goal` (mục tiêu học), `self_level`, `draw_method` (paper/digital/both), `daily_minutes`, `locale` mặc định `vi`, `preferences_json` |

## 2. Nhóm chương trình học

| Entity | Trường chính / quan hệ |
|---|---|
| CourseTrack | `id`, `slug` unique, `name`, `kind` ∈ {foundation, specialty}, `description`, `prerequisite_note`, `sort_order`, `status` (draft/published/archived) |
| Module | `id`, `track_id` → CourseTrack, `code` (vd `M00`..`M10`), `name`, `description`, `sort_order`, `status` |
| Lesson | `id`, `module_id` → Module, `slug`, `title`, `summary`, `difficulty` (1–5), `est_minutes`, `objectives_json`, `content_json` (khối lý thuyết/bước/ví dụ), `common_errors_json`, `pass_criteria_json`, `status`, `version` |
| Skill | `id`, `code` unique, `name`, `description`, `category`, `difficulty`, `mastery_criteria_json` |
| SkillPrerequisite | `skill_id` → Skill, `prerequisite_skill_id` → Skill, `kind` ∈ {required, recommended, parallel}; PK cặp hai cột; cấm tự tham chiếu và chu trình (kiểm tra khi seed/sửa) |
| LessonPrerequisite | `lesson_id` → Lesson, `skill_id` → Skill, `min_state` (trạng thái mastery tối thiểu khuyến nghị) — phục vụ cảnh báo học vượt, không khóa cứng |

## 3. Nhóm bài tập và rubric

| Entity | Trường chính / quan hệ |
|---|---|
| Exercise | `id`, `lesson_id` → Lesson, `title`, `instructions`, `practice_mode` ∈ {guided, assisted, independent}, `eval_strategy` ∈ {line_control, shapes, proportion, form, perspective, light_shadow, gesture_anatomy, color, composition, creative}, `reference_json` (đường mẫu/trục/điểm tụ kỳ vọng nếu có), `status` |
| Rubric | `id`, `exercise_id` → Exercise, `version` (tăng dần, không sửa bản đã dùng để chấm), `name`, `total_rule` (cách xử lý tiêu chí không đánh giá được), `created_by` → User |
| RubricCriterion | `id`, `rubric_id` → Rubric, `code`, `name`, `description`, `weight` (tổng theo rubric phải = 100, validate ở server), `method` ∈ {geometry, cv, ai, hybrid, manual}, `score_min`, `score_max`, `applicability_json`, `confidence_rules_json`, `feedback_guideline` |

## 4. Nhóm bản vẽ (Drawing)

| Entity | Trường chính / quan hệ |
|---|---|
| DrawingProject | `id`, `owner_id` → User, `lesson_id` → Lesson (nullable), `exercise_id` → Exercise (nullable), `title`, `format_version`, `canvas_w`, `canvas_h` (không gian logic; tọa độ stroke chuẩn hóa 0..1000), `is_private` mặc định true, `last_saved_at` |
| DrawingLayer | `id`, `project_id` → DrawingProject, `name`, `sort_order`, `visible`, `locked`, `opacity` |
| DrawingStroke | `id`, `project_id` → DrawingProject, `layer_id` → DrawingLayer, `seq` (thứ tự vẽ, duy nhất trong project), `tool`, `color`, `width`, `opacity`, `points_json` (mảng điểm {x, y, pressure?, tilt?, t}), `started_at`, `ended_at` |

## 5. Nhóm nộp bài và đánh giá

| Entity | Trường chính / quan hệ |
|---|---|
| Submission | `id`, `owner_id` → User, `exercise_id` → Exercise, `source_type` ∈ {canvas, upload}, `status` ∈ {draft, submitted, analyzing, assessed, failed, needs_resubmit}, `note` (ghi chú học viên), `current_version` |
| SubmissionVersion | `id`, `submission_id` → Submission, `version` (1, 2, 3...), `project_id` → DrawingProject (nullable), `original_file_path`, `processed_file_path`, `stroke_snapshot_json` (nullable, khi nộp từ canvas), `parent_version_id` → SubmissionVersion (bản sửa của bản nào), `created_at`. **Bản gốc không bị ghi đè.** |
| Assessment | `id`, `submission_version_id` → SubmissionVersion (unique theo lần chấm), `rubric_id` + `rubric_version`, `status` ∈ {sufficient, uncertain, insufficient_data, not_assessable}, `overall_score` (nullable — null khi không đủ dữ liệu), `engine_local_json` (kết quả hình học/CV), `ai_provider`, `ai_model`, `confidence`, `strengths_json`, `weaknesses_json`, `recommendations_json`, `failure_reason` (nullable), `created_at` |
| AssessmentCriterionResult | `id`, `assessment_id` → Assessment, `criterion_id` → RubricCriterion, `score` (nullable), `not_assessed_reason` (nullable), `evidence_json`, `confidence` |
| AssessmentAnnotation | `id`, `assessment_id` → Assessment, `kind` ∈ {point, line, region}, `coords_json` (không gian chuẩn hóa của ảnh/stroke sau crop), `error_type`, `cause`, `fix_guidance`, `severity`, `correction_json` (đường/trục/điểm tụ đề xuất cho guided correction, nullable) |
| AIJob | `id`, `owner_id` → User, `submission_version_id` → SubmissionVersion, `provider`, `model`, `state` ∈ {QUEUED, PROCESSING, COMPLETED, FAILED, CANCELLED, EXPIRED}, `retry_count`, `error_code`, `usage_json`, `cost_estimate` (free tier: 0 hoặc null), `created_at`, `started_at`, `completed_at`. Ràng buộc: tối đa 1 job active cho một submission version. |

## 6. Nhóm học tập cá nhân hóa

| Entity | Trường chính / quan hệ |
|---|---|
| LearningProgress | `id`, `user_id` → User, `lesson_id` → Lesson, `state` ∈ {not_started, in_progress, completed}, `practice_mode`, `completed_at`, unique (user_id, lesson_id, practice_mode) |
| SkillMastery | `id`, `user_id` → User, `skill_id` → Skill, `state` ∈ {not_started, learning, needs_practice, proficient, mastered}, `score_evidence_json` (tóm tắt bằng chứng: số lần luyện, kết quả gần đây, độ ổn định, độ tin cậy), `updated_at`, unique (user_id, skill_id) |
| Recommendation | `id`, `user_id` → User, `lesson_id` → Lesson (hoặc `skill_id`), `reason` (giải thích vì sao đề xuất), `source` ∈ {weak_skill, prerequisite_gap, goal, review_due, next_in_path}, `created_at`, `dismissed_at` |
| AIConversation | `id`, `user_id` → User, `lesson_id`/`submission_version_id` (ngữ cảnh, nullable), `messages_json` (lượt hỏi/đáp + provider/model từng lượt), `created_at`, `updated_at` |
| PortfolioItem | `id`, `user_id` → User, `project_id`/`submission_version_id` (nullable), `title`, `thumbnail_path`, `is_private` mặc định true, `created_at` |
| Notification | `id`, `user_id` → User, `kind`, `payload_json`, `read_at`, `created_at` |

## 7. Nhóm hệ thống

| Entity | Trường chính / quan hệ |
|---|---|
| AuditLog | `id`, `actor_id` → User (nullable với sự kiện hệ thống), `action`, `entity_type`, `entity_id`, `detail_json` (không chứa mật khẩu/token/ảnh), `ip`, `created_at`. Chỉ ghi thêm, không sửa/xóa qua API thường. |
| Session (bảng phụ trợ auth) | `id` (token đã băm), `user_id` → User, `csrf_token_hash`, `expires_at`, `created_at`, `last_seen_at` |

## 8. Ràng buộc và chỉ mục

- Unique: `users.email`, `course_tracks.slug`, `skills.code`, cặp SkillPrerequisite, (user, lesson, mode) của LearningProgress, (user, skill) của SkillMastery.
- Index: theo `owner_id` (projects, submissions, portfolio), `submission_id`, `assessment_id`, `user_id` (progress/mastery/recommendations/notifications), `state` của AIJob (để worker quét job QUEUED).
- Giao dịch (transaction) cho: tạo submission version + job; lưu assessment + criterion results + annotations; cập nhật progress + mastery sau assessment.
- Rubric đã dùng để chấm thì không sửa tại chỗ — tạo version mới; assessment luôn giữ `rubric_version` tại thời điểm chấm.
- Xóa tài khoản/dữ liệu theo yêu cầu: xóa mềm ở tầng nghiệp vụ trước, xóa cứng file + bản ghi theo chính sách lưu trữ ghi trong SECURITY.md.

## 9. Seed data

Seed tạo: roles, 11 module nền tảng + 4 track chuyên ngành, skills + prerequisite graph, bài học + exercise + rubric theo CURRICULUM.md, tài khoản admin ban đầu từ biến môi trường (không mật khẩu mặc định cứng trong code). Lệnh seed xem DEPLOYMENT.md.

## 10. Trạng thái tài liệu

Đây là thiết kế đã chốt để triển khai. Mức độ khớp giữa schema thật và tài liệu được đối chiếu ở Phase 9 (Documentation Audit) — xem IMPLEMENTATION_STATUS.md.
