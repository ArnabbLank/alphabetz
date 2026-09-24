// ─── User & Auth ───────────────────────────────────────

export type UserRole = "admin" | "student" | "faculty" | "staff";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  date_of_birth: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Courses ───────────────────────────────────────────

export type CourseStatus = "active" | "upcoming" | "archived";

export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  image_url: string | null;
  duration_months: number;
  fee: number;
  discounted_fee: number | null;
  status: CourseStatus;
  category: string;
  features: string[];
  is_featured: boolean;
  max_students: number;
  enrolled_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Batches ───────────────────────────────────────────

export type BatchStatus = "active" | "upcoming" | "completed";

export interface Batch {
  id: string;
  course_id: string;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  timing: string;
  days: string[];
  max_students: number;
  enrolled_count: number;
  status: BatchStatus;
  center_id: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Enrollments ───────────────────────────────────────

export type EnrollmentStatus = "active" | "completed" | "dropped" | "suspended";
export type PaymentStatus = "paid" | "partial" | "pending" | "overdue";

export interface Enrollment {
  id: string;
  student_id: string;
  batch_id: string;
  course_id: string;
  enrollment_date: string;
  status: EnrollmentStatus;
  payment_status: PaymentStatus;
  fee_paid: number;
  fee_total: number;
  discount_applied: number;
  coupon_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Subjects & Chapters ───────────────────────────────

export interface Subject {
  id: string;
  course_id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Lessons ───────────────────────────────────────────

export type LessonType = "video" | "pdf" | "quiz" | "live" | "text";

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  slug: string;
  type: LessonType;
  content_url: string | null;
  content_text: string | null;
  duration_minutes: number | null;
  order: number;
  is_free: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Study Materials ───────────────────────────────────

export type MaterialType = "pdf" | "video" | "document" | "link" | "image";

export interface StudyMaterial {
  id: string;
  course_id: string;
  subject_id: string | null;
  chapter_id: string | null;
  title: string;
  description: string | null;
  type: MaterialType;
  file_url: string;
  file_size_kb: number | null;
  download_count: number;
  is_published: boolean;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

// ─── Tests & Attempts ──────────────────────────────────

export type TestType = "mock" | "chapter" | "full_syllabus" | "practice" | "weekly";

export interface Test {
  id: string;
  course_id: string;
  subject_id: string | null;
  chapter_id: string | null;
  title: string;
  slug: string;
  type: TestType;
  description: string | null;
  total_marks: number;
  total_questions: number;
  duration_minutes: number;
  passing_marks: number;
  is_published: boolean;
  start_time: string | null;
  end_time: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TestAttempt {
  id: string;
  test_id: string;
  student_id: string;
  score: number;
  total_marks: number;
  correct_answers: number;
  wrong_answers: number;
  unanswered: number;
  percentage: number;
  time_taken_minutes: number;
  rank: number | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

// ─── Result Showcase ───────────────────────────────────

export interface ResultShowcase {
  id: string;
  student_name: string;
  exam_name: string;
  rank: number | null;
  score: string;
  year: number;
  photo_url: string | null;
  course_id: string | null;
  testimonial: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Leads & CRM ──────────────────────────────────────

export type LeadStatus = "new" | "contacted" | "follow_up" | "enrolled" | "lost";
export type LeadSource =
  | "website"
  | "walk_in"
  | "referral"
  | "social_media"
  | "phone"
  | "newspaper"
  | "other";

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  source: LeadSource;
  status: LeadStatus;
  interested_course_id: string | null;
  assigned_to: string | null;
  last_contacted_at: string | null;
  expected_joining_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

// ─── Blog ──────────────────────────────────────────────

export type BlogStatus = "draft" | "published" | "archived";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_id: string;
  author_name: string;
  status: BlogStatus;
  tags: string[];
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Faculty ───────────────────────────────────────────

export interface Faculty {
  id: string;
  profile_id: string;
  full_name: string;
  designation: string;
  department: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  bio: string | null;
  photo_url: string | null;
  phone: string;
  email: string;
  is_active: boolean;
  joining_date: string;
  created_at: string;
  updated_at: string;
}

export interface FacultyBatch {
  id: string;
  faculty_id: string;
  batch_id: string;
  subject_id: string | null;
  role: "primary" | "assistant";
  created_at: string;
}

// ─── Notifications ─────────────────────────────────────

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "assignment"
  | "test"
  | "result"
  | "payment";

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

// ─── Doubts ────────────────────────────────────────────

export type DoubtStatus = "open" | "answered" | "closed";

export interface Doubt {
  id: string;
  student_id: string;
  course_id: string;
  subject_id: string | null;
  chapter_id: string | null;
  title: string;
  description: string;
  image_url: string | null;
  status: DoubtStatus;
  created_at: string;
  updated_at: string;
}

export interface DoubtReply {
  id: string;
  doubt_id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  content: string;
  image_url: string | null;
  created_at: string;
}

// ─── Announcements ─────────────────────────────────────

export type AnnouncementPriority = "low" | "normal" | "high" | "urgent";
export type AnnouncementAudience = "all" | "students" | "faculty" | "staff" | "batch_specific";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience;
  batch_id: string | null;
  course_id: string | null;
  author_id: string;
  author_name: string;
  is_pinned: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Video Progress ────────────────────────────────────

export interface VideoProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  progress_seconds: number;
  total_seconds: number;
  is_completed: boolean;
  last_watched_at: string;
  created_at: string;
  updated_at: string;
}

// ─── Payments ──────────────────────────────────────────

export type PaymentMethod = "cash" | "upi" | "bank_transfer" | "card" | "cheque";
export type PaymentTransactionStatus = "success" | "pending" | "failed" | "refunded";

export interface Payment {
  id: string;
  enrollment_id: string;
  student_id: string;
  amount: number;
  method: PaymentMethod;
  transaction_id: string | null;
  status: PaymentTransactionStatus;
  receipt_url: string | null;
  notes: string | null;
  collected_by: string | null;
  payment_date: string;
  created_at: string;
}

// ─── Coupons ───────────────────────────────────────────

export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: DiscountType;
  discount_value: number;
  max_uses: number;
  used_count: number;
  min_order_amount: number | null;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  applicable_course_ids: string[];
  created_at: string;
  updated_at: string;
}

// ─── Centers ───────────────────────────────────────────

export interface Center {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string | null;
  is_active: boolean;
  capacity: number;
  google_maps_url: string | null;
  created_at: string;
  updated_at: string;
}
