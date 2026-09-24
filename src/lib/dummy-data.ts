import type {
  Profile,
  Course,
  Batch,
  Enrollment,
  Subject,
  Chapter,
  Lesson,
  StudyMaterial,
  Test,
  TestAttempt,
  ResultShowcase,
  Lead,
  LeadNote,
  BlogPost,
  Faculty,
  FacultyBatch,
  Notification,
  Doubt,
  DoubtReply,
  Announcement,
  VideoProgress,
  Payment,
  Coupon,
  Center,
} from "@/types";

// ─── Helper ────────────────────────────────────────────

function uuid(seed: number): string {
  const hex = seed.toString(16).padStart(8, "0");
  return `${hex}-${hex.slice(0, 4)}-4${hex.slice(1, 4)}-a${hex.slice(1, 4)}-${hex}${hex.slice(0, 4)}`;
}

// ─── Centers ───────────────────────────────────────────

export const centers: Center[] = [
  {
    id: uuid(900),
    name: "Alphabetz Main Campus",
    address: "123 City Centre, Near Benachity",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713213",
    phone: "9073456789",
    email: "main@alphabetz.in",
    is_active: true,
    capacity: 500,
    google_maps_url: "https://maps.google.com/?q=Durgapur+City+Centre",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: uuid(901),
    name: "Alphabetz Bidhannagar Branch",
    address: "45 Bidhannagar, Near Steel Gate",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713212",
    phone: "9073456790",
    email: "bidhannagar@alphabetz.in",
    is_active: true,
    capacity: 200,
    google_maps_url: "https://maps.google.com/?q=Durgapur+Bidhannagar",
    created_at: "2025-06-01T00:00:00Z",
    updated_at: "2025-06-01T00:00:00Z",
  },
];

// ─── Courses ───────────────────────────────────────────

export const courses: Course[] = [
  {
    id: uuid(1),
    name: "JEE Main & Advanced Preparation",
    slug: "jee-preparation",
    description:
      "Comprehensive 2-year preparation program for JEE Main & Advanced. Covers Physics, Chemistry, and Mathematics with weekly mock tests, doubt sessions, and personalized mentoring. Our experienced faculty of IIT/NIT alumni ensures conceptual clarity and problem-solving mastery.",
    short_description:
      "Complete JEE Main & Advanced coaching with expert faculty and weekly tests.",
    image_url: null,
    duration_months: 24,
    fee: 120000,
    discounted_fee: 99000,
    status: "active",
    category: "Engineering",
    features: [
      "IIT/NIT alumni faculty",
      "Weekly mock tests",
      "Doubt clearing sessions",
      "Study material included",
      "Online test series",
      "Parent-teacher meetings",
    ],
    is_featured: true,
    max_students: 60,
    enrolled_count: 45,
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: uuid(2),
    name: "NEET-UG Preparation",
    slug: "neet-preparation",
    description:
      "Intensive NEET-UG preparation program covering Physics, Chemistry, and Biology. Focus on NCERT-based learning, extensive practice with previous year questions, and regular performance tracking. Expert Biology faculty with AIIMS/medical college backgrounds.",
    short_description:
      "Complete NEET-UG coaching with Biology focus and regular mock tests.",
    image_url: null,
    duration_months: 24,
    fee: 110000,
    discounted_fee: 89000,
    status: "active",
    category: "Medical",
    features: [
      "NCERT-focused teaching",
      "Biology specialists",
      "Weekly mock tests",
      "Previous year analysis",
      "Lab sessions",
      "Performance tracking",
    ],
    is_featured: true,
    max_students: 60,
    enrolled_count: 52,
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2026-01-20T00:00:00Z",
  },
  {
    id: uuid(3),
    name: "WBJEE Coaching",
    slug: "wbjee-coaching",
    description:
      "Focused coaching for WBJEE entrance examination. Tailored curriculum for West Bengal students targeting state engineering colleges. Includes complete syllabus coverage, test series, and counselling guidance.",
    short_description:
      "Targeted WBJEE coaching for West Bengal engineering aspirants.",
    image_url: null,
    duration_months: 12,
    fee: 60000,
    discounted_fee: 49000,
    status: "active",
    category: "Engineering",
    features: [
      "WBJEE-focused curriculum",
      "State topper mentors",
      "Counselling guidance",
      "Fortnightly tests",
      "Study material",
      "Doubt sessions",
    ],
    is_featured: true,
    max_students: 50,
    enrolled_count: 38,
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: uuid(4),
    name: "Board Exam Foundation — Class 10",
    slug: "board-foundation-class-10",
    description:
      "Strong foundation program for Class 10 students preparing for Madhyamik examination. Covers all subjects with special emphasis on Mathematics and Science. Regular unit tests and board-pattern practice papers.",
    short_description:
      "Madhyamik exam preparation with strong Math & Science foundation.",
    image_url: null,
    duration_months: 12,
    fee: 36000,
    discounted_fee: 30000,
    status: "active",
    category: "Board Exam",
    features: [
      "All subjects covered",
      "Board-pattern tests",
      "Madhyamik focus",
      "Weekly assignments",
      "Parent meetings",
      "Extra classes for weak areas",
    ],
    is_featured: false,
    max_students: 40,
    enrolled_count: 35,
    created_at: "2025-05-01T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: uuid(5),
    name: "Board Exam Foundation — Class 12",
    slug: "board-foundation-class-12",
    description:
      "Comprehensive HS exam preparation for Class 12 students. Science stream focus with Physics, Chemistry, Mathematics, and Biology. Aligned with both board exams and competitive exam preparation.",
    short_description:
      "HS exam coaching for Class 12 Science with competitive exam alignment.",
    image_url: null,
    duration_months: 12,
    fee: 42000,
    discounted_fee: 36000,
    status: "active",
    category: "Board Exam",
    features: [
      "Science stream focus",
      "Board + competitive alignment",
      "Monthly tests",
      "Practical lab access",
      "Study material",
      "Career counselling",
    ],
    is_featured: false,
    max_students: 40,
    enrolled_count: 28,
    created_at: "2025-05-01T00:00:00Z",
    updated_at: "2026-02-05T00:00:00Z",
  },
  {
    id: uuid(6),
    name: "WBCS Preparation",
    slug: "wbcs-preparation",
    description:
      "Complete WBCS preliminary and main examination preparation. Covers General Studies, Bengali, English, Mathematics, and optional subjects. Current affairs magazine and mock test series included.",
    short_description:
      "Full WBCS prelims & mains preparation with current affairs and test series.",
    image_url: null,
    duration_months: 18,
    fee: 45000,
    discounted_fee: null,
    status: "upcoming",
    category: "Government Exam",
    features: [
      "Prelims + Mains coverage",
      "Current affairs magazine",
      "Mock interviews",
      "Answer writing practice",
      "Previous year papers",
      "Group discussions",
    ],
    is_featured: false,
    max_students: 30,
    enrolled_count: 0,
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
  },
];

// ─── Batches ───────────────────────────────────────────

export const batches: Batch[] = [
  {
    id: uuid(100),
    course_id: uuid(1),
    name: "Morning JEE — Batch A",
    slug: "morning-jee-a",
    start_date: "2026-01-15T00:00:00Z",
    end_date: "2027-12-31T00:00:00Z",
    timing: "6:30 AM – 9:00 AM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    max_students: 30,
    enrolled_count: 25,
    status: "active",
    center_id: uuid(900),
    created_at: "2025-12-01T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: uuid(101),
    course_id: uuid(2),
    name: "Evening NEET — Batch B",
    slug: "evening-neet-b",
    start_date: "2026-02-01T00:00:00Z",
    end_date: "2027-12-31T00:00:00Z",
    timing: "4:00 PM – 6:30 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    max_students: 30,
    enrolled_count: 28,
    status: "active",
    center_id: uuid(900),
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: uuid(102),
    course_id: uuid(3),
    name: "WBJEE Weekend — Batch C",
    slug: "wbjee-weekend-c",
    start_date: "2026-03-01T00:00:00Z",
    end_date: "2027-03-31T00:00:00Z",
    timing: "10:00 AM – 2:00 PM",
    days: ["Saturday", "Sunday"],
    max_students: 25,
    enrolled_count: 18,
    status: "active",
    center_id: uuid(901),
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
  },
  {
    id: uuid(103),
    course_id: uuid(4),
    name: "Board Exam Regular — Batch D",
    slug: "board-regular-d",
    start_date: "2026-04-01T00:00:00Z",
    end_date: "2027-02-28T00:00:00Z",
    timing: "3:00 PM – 5:00 PM",
    days: ["Monday", "Wednesday", "Friday"],
    max_students: 40,
    enrolled_count: 35,
    status: "active",
    center_id: uuid(900),
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-04-01T00:00:00Z",
  },
];

// ─── Students (Profiles) ───────────────────────────────

export const students: Profile[] = [
  {
    id: uuid(200),
    email: "rahul.sharma@gmail.com",
    full_name: "Rahul Sharma",
    phone: "8910234567",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "42 Benachity, Near City Centre",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713213",
    date_of_birth: "2008-05-14",
    guardian_name: "Suresh Sharma",
    guardian_phone: "9073456001",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: uuid(201),
    email: "priya.mukherjee@gmail.com",
    full_name: "Priya Mukherjee",
    phone: "9007654321",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "15 Bidhannagar, B-Zone",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713212",
    date_of_birth: "2008-08-22",
    guardian_name: "Arun Mukherjee",
    guardian_phone: "9073456002",
    created_at: "2026-01-12T00:00:00Z",
    updated_at: "2026-01-12T00:00:00Z",
  },
  {
    id: uuid(202),
    email: "aniket.das@gmail.com",
    full_name: "Aniket Das",
    phone: "7001234567",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "78 A-Zone, Near DSP Office",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713205",
    date_of_birth: "2009-01-30",
    guardian_name: "Tapan Das",
    guardian_phone: "9073456003",
    created_at: "2026-01-15T00:00:00Z",
    updated_at: "2026-01-15T00:00:00Z",
  },
  {
    id: uuid(203),
    email: "sneha.roy@gmail.com",
    full_name: "Sneha Roy",
    phone: "9134567890",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "22 C-Zone, Sector 2C",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713212",
    date_of_birth: "2008-11-05",
    guardian_name: "Partha Roy",
    guardian_phone: "9073456004",
    created_at: "2026-01-18T00:00:00Z",
    updated_at: "2026-01-18T00:00:00Z",
  },
  {
    id: uuid(204),
    email: "debashis.ghosh@gmail.com",
    full_name: "Debashis Ghosh",
    phone: "8902345678",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "56 Muchipara, Near Railway Station",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713201",
    date_of_birth: "2008-03-17",
    guardian_name: "Kalyan Ghosh",
    guardian_phone: "9073456005",
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: uuid(205),
    email: "moumita.sen@gmail.com",
    full_name: "Moumita Sen",
    phone: "9012345678",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "33 Nachan Road, Near ADDA",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713214",
    date_of_birth: "2009-07-11",
    guardian_name: "Ranjit Sen",
    guardian_phone: "9073456006",
    created_at: "2026-02-05T00:00:00Z",
    updated_at: "2026-02-05T00:00:00Z",
  },
  {
    id: uuid(206),
    email: "arjun.mandal@gmail.com",
    full_name: "Arjun Mandal",
    phone: "7098765432",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "11 Bamunara, GT Road",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713222",
    date_of_birth: "2008-09-25",
    guardian_name: "Pranab Mandal",
    guardian_phone: "9073456007",
    created_at: "2026-02-10T00:00:00Z",
    updated_at: "2026-02-10T00:00:00Z",
  },
  {
    id: uuid(207),
    email: "ria.chatterjee@gmail.com",
    full_name: "Ria Chatterjee",
    phone: "9143210987",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "99 Fuljhore, Near CMERI",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713209",
    date_of_birth: "2009-02-14",
    guardian_name: "Debabrata Chatterjee",
    guardian_phone: "9073456008",
    created_at: "2026-02-15T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
  {
    id: uuid(208),
    email: "sourav.pal@gmail.com",
    full_name: "Sourav Pal",
    phone: "8901239876",
    avatar_url: null,
    role: "student",
    is_active: false,
    address: "67 Andal Road",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713321",
    date_of_birth: "2008-12-01",
    guardian_name: "Nikhil Pal",
    guardian_phone: "9073456009",
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
  },
  {
    id: uuid(209),
    email: "ananya.dey@gmail.com",
    full_name: "Ananya Dey",
    phone: "7003456789",
    avatar_url: null,
    role: "student",
    is_active: true,
    address: "14 Waria, Near Bus Stand",
    city: "Durgapur",
    state: "West Bengal",
    pincode: "713204",
    date_of_birth: "2009-04-08",
    guardian_name: "Sanjay Dey",
    guardian_phone: "9073456010",
    created_at: "2026-03-05T00:00:00Z",
    updated_at: "2026-03-05T00:00:00Z",
  },
];

// ─── Faculty ───────────────────────────────────────────

export const faculty: Faculty[] = [
  {
    id: uuid(300),
    profile_id: uuid(350),
    full_name: "Dr. Subhash Banerjee",
    designation: "Senior Faculty",
    department: "Physics",
    specialization: "Mechanics & Electrodynamics",
    qualification: "Ph.D. IIT Kharagpur, M.Sc. Physics",
    experience_years: 18,
    bio: "Dr. Banerjee has 18 years of experience teaching Physics for JEE and NEET. An IIT Kharagpur alumnus, he specializes in making complex concepts intuitive. Over 500 of his students have cracked JEE and NEET.",
    photo_url: null,
    phone: "9073100001",
    email: "subhash.banerjee@alphabetz.in",
    is_active: true,
    joining_date: "2025-01-01",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: uuid(301),
    profile_id: uuid(351),
    full_name: "Smt. Rupa Chakraborty",
    designation: "Senior Faculty",
    department: "Chemistry",
    specialization: "Organic Chemistry & Physical Chemistry",
    qualification: "M.Sc. Chemistry, Jadavpur University, B.Ed.",
    experience_years: 14,
    bio: "Smt. Chakraborty brings 14 years of Chemistry teaching expertise. Her unique approach to Organic Chemistry through mechanism-based learning has helped hundreds of students excel in competitive exams.",
    photo_url: null,
    phone: "9073100002",
    email: "rupa.chakraborty@alphabetz.in",
    is_active: true,
    joining_date: "2025-02-01",
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-02-01T00:00:00Z",
  },
  {
    id: uuid(302),
    profile_id: uuid(352),
    full_name: "Sri Amal Kumar Saha",
    designation: "HOD Mathematics",
    department: "Mathematics",
    specialization: "Calculus & Algebra",
    qualification: "M.Sc. Mathematics, Burdwan University, NET Qualified",
    experience_years: 20,
    bio: "Sri Saha is our Head of Mathematics with 20 years of teaching experience. NET qualified and a master problem-solver, he has mentored multiple state rank holders in WBJEE and JEE.",
    photo_url: null,
    phone: "9073100003",
    email: "amal.saha@alphabetz.in",
    is_active: true,
    joining_date: "2025-01-01",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: uuid(303),
    profile_id: uuid(353),
    full_name: "Dr. Jayanta Mitra",
    designation: "Senior Faculty",
    department: "Biology",
    specialization: "Human Physiology & Genetics",
    qualification: "Ph.D. Botany, Calcutta University, M.Sc. Zoology",
    experience_years: 12,
    bio: "Dr. Mitra specializes in NEET Biology preparation with a focus on making NCERT concepts crystal clear. His visual-learning approach and mnemonic techniques are popular among students.",
    photo_url: null,
    phone: "9073100004",
    email: "jayanta.mitra@alphabetz.in",
    is_active: true,
    joining_date: "2025-03-01",
    created_at: "2025-03-01T00:00:00Z",
    updated_at: "2025-03-01T00:00:00Z",
  },
  {
    id: uuid(304),
    profile_id: uuid(354),
    full_name: "Smt. Priyanka Das",
    designation: "Faculty",
    department: "English",
    specialization: "English Language & Communication",
    qualification: "M.A. English, Visva-Bharati, CELTA certified",
    experience_years: 8,
    bio: "Smt. Das handles English language preparation for board exams and competitive exams. CELTA certified, she also leads our Spoken English program for professional communication skills.",
    photo_url: null,
    phone: "9073100005",
    email: "priyanka.das@alphabetz.in",
    is_active: true,
    joining_date: "2025-06-01",
    created_at: "2025-06-01T00:00:00Z",
    updated_at: "2025-06-01T00:00:00Z",
  },
];

// ─── Faculty–Batch assignments ─────────────────────────

export const facultyBatches: FacultyBatch[] = [
  { id: uuid(400), faculty_id: uuid(300), batch_id: uuid(100), subject_id: null, role: "primary", created_at: "2026-01-15T00:00:00Z" },
  { id: uuid(401), faculty_id: uuid(302), batch_id: uuid(100), subject_id: null, role: "primary", created_at: "2026-01-15T00:00:00Z" },
  { id: uuid(402), faculty_id: uuid(301), batch_id: uuid(100), subject_id: null, role: "primary", created_at: "2026-01-15T00:00:00Z" },
  { id: uuid(403), faculty_id: uuid(303), batch_id: uuid(101), subject_id: null, role: "primary", created_at: "2026-02-01T00:00:00Z" },
  { id: uuid(404), faculty_id: uuid(300), batch_id: uuid(101), subject_id: null, role: "primary", created_at: "2026-02-01T00:00:00Z" },
  { id: uuid(405), faculty_id: uuid(301), batch_id: uuid(101), subject_id: null, role: "assistant", created_at: "2026-02-01T00:00:00Z" },
  { id: uuid(406), faculty_id: uuid(302), batch_id: uuid(102), subject_id: null, role: "primary", created_at: "2026-03-01T00:00:00Z" },
  { id: uuid(407), faculty_id: uuid(300), batch_id: uuid(102), subject_id: null, role: "primary", created_at: "2026-03-01T00:00:00Z" },
  { id: uuid(408), faculty_id: uuid(304), batch_id: uuid(103), subject_id: null, role: "assistant", created_at: "2026-04-01T00:00:00Z" },
];

// ─── Enrollments ───────────────────────────────────────

export const enrollments: Enrollment[] = [
  { id: uuid(500), student_id: uuid(200), batch_id: uuid(100), course_id: uuid(1), enrollment_date: "2026-01-15", status: "active", payment_status: "paid", fee_paid: 99000, fee_total: 99000, discount_applied: 21000, coupon_id: null, notes: null, created_at: "2026-01-15T00:00:00Z", updated_at: "2026-01-15T00:00:00Z" },
  { id: uuid(501), student_id: uuid(201), batch_id: uuid(101), course_id: uuid(2), enrollment_date: "2026-02-01", status: "active", payment_status: "paid", fee_paid: 89000, fee_total: 89000, discount_applied: 21000, coupon_id: null, notes: null, created_at: "2026-02-01T00:00:00Z", updated_at: "2026-02-01T00:00:00Z" },
  { id: uuid(502), student_id: uuid(202), batch_id: uuid(100), course_id: uuid(1), enrollment_date: "2026-01-20", status: "active", payment_status: "partial", fee_paid: 60000, fee_total: 99000, discount_applied: 21000, coupon_id: null, notes: "EMI scheme — 3 installments", created_at: "2026-01-20T00:00:00Z", updated_at: "2026-01-20T00:00:00Z" },
  { id: uuid(503), student_id: uuid(203), batch_id: uuid(101), course_id: uuid(2), enrollment_date: "2026-02-05", status: "active", payment_status: "paid", fee_paid: 89000, fee_total: 89000, discount_applied: 21000, coupon_id: null, notes: null, created_at: "2026-02-05T00:00:00Z", updated_at: "2026-02-05T00:00:00Z" },
  { id: uuid(504), student_id: uuid(204), batch_id: uuid(102), course_id: uuid(3), enrollment_date: "2026-03-01", status: "active", payment_status: "paid", fee_paid: 49000, fee_total: 49000, discount_applied: 11000, coupon_id: null, notes: null, created_at: "2026-03-01T00:00:00Z", updated_at: "2026-03-01T00:00:00Z" },
  { id: uuid(505), student_id: uuid(205), batch_id: uuid(103), course_id: uuid(4), enrollment_date: "2026-04-01", status: "active", payment_status: "pending", fee_paid: 15000, fee_total: 30000, discount_applied: 6000, coupon_id: null, notes: "Pending second installment", created_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
  { id: uuid(506), student_id: uuid(206), batch_id: uuid(100), course_id: uuid(1), enrollment_date: "2026-02-10", status: "active", payment_status: "paid", fee_paid: 99000, fee_total: 99000, discount_applied: 21000, coupon_id: null, notes: null, created_at: "2026-02-10T00:00:00Z", updated_at: "2026-02-10T00:00:00Z" },
  { id: uuid(507), student_id: uuid(207), batch_id: uuid(101), course_id: uuid(2), enrollment_date: "2026-02-15", status: "active", payment_status: "paid", fee_paid: 89000, fee_total: 89000, discount_applied: 21000, coupon_id: null, notes: null, created_at: "2026-02-15T00:00:00Z", updated_at: "2026-02-15T00:00:00Z" },
  { id: uuid(508), student_id: uuid(208), batch_id: uuid(102), course_id: uuid(3), enrollment_date: "2026-03-05", status: "dropped", payment_status: "paid", fee_paid: 49000, fee_total: 49000, discount_applied: 11000, coupon_id: null, notes: "Dropped out — relocated", created_at: "2026-03-05T00:00:00Z", updated_at: "2026-06-01T00:00:00Z" },
  { id: uuid(509), student_id: uuid(209), batch_id: uuid(103), course_id: uuid(4), enrollment_date: "2026-04-05", status: "active", payment_status: "paid", fee_paid: 30000, fee_total: 30000, discount_applied: 6000, coupon_id: null, notes: null, created_at: "2026-04-05T00:00:00Z", updated_at: "2026-04-05T00:00:00Z" },
];

// ─── Subjects ──────────────────────────────────────────

export const subjects: Subject[] = [
  { id: uuid(600), course_id: uuid(1), name: "Physics", slug: "jee-physics", description: "Complete JEE Physics from Mechanics to Modern Physics", order: 1, icon: "atom", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(601), course_id: uuid(1), name: "Chemistry", slug: "jee-chemistry", description: "JEE Chemistry covering Physical, Organic & Inorganic", order: 2, icon: "flask-conical", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(602), course_id: uuid(1), name: "Mathematics", slug: "jee-mathematics", description: "JEE Mathematics from Algebra to Calculus", order: 3, icon: "sigma", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(603), course_id: uuid(2), name: "Physics", slug: "neet-physics", description: "NEET Physics with NCERT focus", order: 1, icon: "atom", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(604), course_id: uuid(2), name: "Chemistry", slug: "neet-chemistry", description: "NEET Chemistry — Physical, Organic & Inorganic", order: 2, icon: "flask-conical", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(605), course_id: uuid(2), name: "Biology", slug: "neet-biology", description: "NEET Biology — Botany & Zoology", order: 3, icon: "leaf", created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
];

// ─── Chapters ──────────────────────────────────────────

export const chapters: Chapter[] = [
  { id: uuid(650), subject_id: uuid(600), name: "Mechanics", slug: "mechanics", description: "Newton's Laws, Kinematics, Work-Energy, Rotational Motion", order: 1, is_published: true, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(651), subject_id: uuid(600), name: "Electrodynamics", slug: "electrodynamics", description: "Coulomb's Law, Electric Fields, Circuits, Magnetism", order: 2, is_published: true, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(652), subject_id: uuid(601), name: "Organic Chemistry", slug: "organic-chemistry", description: "GOC, Hydrocarbons, Functional Groups, Named Reactions", order: 1, is_published: true, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(653), subject_id: uuid(602), name: "Calculus", slug: "calculus", description: "Limits, Derivatives, Integrals, Differential Equations", order: 1, is_published: true, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
  { id: uuid(654), subject_id: uuid(605), name: "Human Physiology", slug: "human-physiology", description: "Digestion, Circulation, Excretion, Nervous System", order: 1, is_published: true, created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-01T00:00:00Z" },
];

// ─── Lessons ───────────────────────────────────────────

export const lessons: Lesson[] = [
  { id: uuid(670), chapter_id: uuid(650), title: "Newton's Laws of Motion", slug: "newtons-laws", type: "video", content_url: "https://cdn.alphabetz.in/videos/mechanics/newtons-laws.mp4", content_text: null, duration_minutes: 45, order: 1, is_free: true, is_published: true, created_at: "2025-04-01T00:00:00Z", updated_at: "2025-04-01T00:00:00Z" },
  { id: uuid(671), chapter_id: uuid(650), title: "Kinematics — 1D & 2D Motion", slug: "kinematics", type: "video", content_url: "https://cdn.alphabetz.in/videos/mechanics/kinematics.mp4", content_text: null, duration_minutes: 55, order: 2, is_free: false, is_published: true, created_at: "2025-04-02T00:00:00Z", updated_at: "2025-04-02T00:00:00Z" },
  { id: uuid(672), chapter_id: uuid(652), title: "General Organic Chemistry — I", slug: "goc-1", type: "video", content_url: "https://cdn.alphabetz.in/videos/chemistry/goc-1.mp4", content_text: null, duration_minutes: 50, order: 1, is_free: true, is_published: true, created_at: "2025-04-03T00:00:00Z", updated_at: "2025-04-03T00:00:00Z" },
  { id: uuid(673), chapter_id: uuid(653), title: "Limits & Continuity", slug: "limits-continuity", type: "video", content_url: "https://cdn.alphabetz.in/videos/maths/limits.mp4", content_text: null, duration_minutes: 40, order: 1, is_free: false, is_published: true, created_at: "2025-04-04T00:00:00Z", updated_at: "2025-04-04T00:00:00Z" },
  { id: uuid(674), chapter_id: uuid(654), title: "Digestive System", slug: "digestive-system", type: "video", content_url: "https://cdn.alphabetz.in/videos/biology/digestive-system.mp4", content_text: null, duration_minutes: 35, order: 1, is_free: true, is_published: true, created_at: "2025-04-05T00:00:00Z", updated_at: "2025-04-05T00:00:00Z" },
];

// ─── Tests ─────────────────────────────────────────────

export const tests: Test[] = [
  { id: uuid(700), course_id: uuid(1), subject_id: uuid(600), chapter_id: null, title: "JEE Physics Mock Test — 1", slug: "jee-physics-mock-1", type: "mock", description: "Full-length Physics mock covering Mechanics & Electrodynamics", total_marks: 120, total_questions: 30, duration_minutes: 60, passing_marks: 48, is_published: true, start_time: "2026-03-10T09:00:00Z", end_time: "2026-03-10T10:00:00Z", created_by: uuid(300), created_at: "2026-03-01T00:00:00Z", updated_at: "2026-03-01T00:00:00Z" },
  { id: uuid(701), course_id: uuid(1), subject_id: uuid(602), chapter_id: uuid(653), title: "Calculus Chapter Test", slug: "calculus-chapter-test", type: "chapter", description: "Chapter-wise test on Calculus: Limits, Derivatives, Integrals", total_marks: 40, total_questions: 20, duration_minutes: 30, passing_marks: 16, is_published: true, start_time: "2026-03-15T09:00:00Z", end_time: "2026-03-15T09:30:00Z", created_by: uuid(302), created_at: "2026-03-05T00:00:00Z", updated_at: "2026-03-05T00:00:00Z" },
  { id: uuid(702), course_id: uuid(2), subject_id: uuid(605), chapter_id: null, title: "NEET Biology Mock Test — 1", slug: "neet-bio-mock-1", type: "mock", description: "Comprehensive Biology mock — Botany & Zoology", total_marks: 180, total_questions: 45, duration_minutes: 90, passing_marks: 72, is_published: true, start_time: "2026-04-01T10:00:00Z", end_time: "2026-04-01T11:30:00Z", created_by: uuid(303), created_at: "2026-03-15T00:00:00Z", updated_at: "2026-03-15T00:00:00Z" },
  { id: uuid(703), course_id: uuid(1), subject_id: null, chapter_id: null, title: "JEE Full Syllabus Test — 1", slug: "jee-full-syllabus-1", type: "full_syllabus", description: "Complete PCM test simulating JEE Main paper pattern", total_marks: 300, total_questions: 75, duration_minutes: 180, passing_marks: 120, is_published: true, start_time: "2026-05-01T09:00:00Z", end_time: "2026-05-01T12:00:00Z", created_by: uuid(300), created_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
  { id: uuid(704), course_id: uuid(2), subject_id: uuid(604), chapter_id: null, title: "NEET Chemistry Mock Test — 1", slug: "neet-chem-mock-1", type: "mock", description: "Chemistry mock covering Physical, Organic & Inorganic", total_marks: 180, total_questions: 45, duration_minutes: 90, passing_marks: 72, is_published: true, start_time: "2026-04-15T10:00:00Z", end_time: "2026-04-15T11:30:00Z", created_by: uuid(301), created_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
  { id: uuid(705), course_id: uuid(3), subject_id: null, chapter_id: null, title: "WBJEE Full Mock Test — 1", slug: "wbjee-mock-1", type: "mock", description: "Complete WBJEE paper pattern mock test", total_marks: 200, total_questions: 75, duration_minutes: 120, passing_marks: 80, is_published: true, start_time: "2026-05-10T09:00:00Z", end_time: "2026-05-10T11:00:00Z", created_by: uuid(302), created_at: "2026-04-15T00:00:00Z", updated_at: "2026-04-15T00:00:00Z" },
  { id: uuid(706), course_id: uuid(1), subject_id: uuid(601), chapter_id: uuid(652), title: "Organic Chemistry Chapter Test", slug: "organic-chem-chapter", type: "chapter", description: "GOC, Hydrocarbons, and Functional Groups", total_marks: 40, total_questions: 20, duration_minutes: 30, passing_marks: 16, is_published: true, start_time: "2026-04-20T09:00:00Z", end_time: "2026-04-20T09:30:00Z", created_by: uuid(301), created_at: "2026-04-10T00:00:00Z", updated_at: "2026-04-10T00:00:00Z" },
  { id: uuid(707), course_id: uuid(2), subject_id: null, chapter_id: null, title: "NEET Full Syllabus Test — 1", slug: "neet-full-syllabus-1", type: "full_syllabus", description: "Complete NEET paper pattern covering PCB", total_marks: 720, total_questions: 180, duration_minutes: 200, passing_marks: 288, is_published: true, start_time: "2026-06-01T09:00:00Z", end_time: "2026-06-01T12:20:00Z", created_by: uuid(303), created_at: "2026-05-01T00:00:00Z", updated_at: "2026-05-01T00:00:00Z" },
  { id: uuid(708), course_id: uuid(4), subject_id: null, chapter_id: null, title: "Madhyamik Practice Test — 1", slug: "madhyamik-practice-1", type: "practice", description: "Board-pattern practice for Class 10 all subjects", total_marks: 100, total_questions: 50, duration_minutes: 90, passing_marks: 33, is_published: true, start_time: "2026-06-15T10:00:00Z", end_time: "2026-06-15T11:30:00Z", created_by: uuid(304), created_at: "2026-05-15T00:00:00Z", updated_at: "2026-05-15T00:00:00Z" },
  { id: uuid(709), course_id: uuid(1), subject_id: uuid(600), chapter_id: uuid(650), title: "Mechanics Weekly Test", slug: "mechanics-weekly", type: "weekly", description: "Weekly assessment on Mechanics topics", total_marks: 25, total_questions: 10, duration_minutes: 20, passing_marks: 10, is_published: true, start_time: "2026-03-20T09:00:00Z", end_time: "2026-03-20T09:20:00Z", created_by: uuid(300), created_at: "2026-03-18T00:00:00Z", updated_at: "2026-03-18T00:00:00Z" },
];

// ─── Test Attempts ─────────────────────────────────────

export const testAttempts: TestAttempt[] = [
  { id: uuid(750), test_id: uuid(700), student_id: uuid(200), score: 96, total_marks: 120, correct_answers: 24, wrong_answers: 4, unanswered: 2, percentage: 80, time_taken_minutes: 55, rank: 1, started_at: "2026-03-10T09:00:00Z", completed_at: "2026-03-10T09:55:00Z", created_at: "2026-03-10T09:55:00Z" },
  { id: uuid(751), test_id: uuid(700), student_id: uuid(202), score: 84, total_marks: 120, correct_answers: 21, wrong_answers: 6, unanswered: 3, percentage: 70, time_taken_minutes: 58, rank: 2, started_at: "2026-03-10T09:00:00Z", completed_at: "2026-03-10T09:58:00Z", created_at: "2026-03-10T09:58:00Z" },
  { id: uuid(752), test_id: uuid(700), student_id: uuid(206), score: 72, total_marks: 120, correct_answers: 18, wrong_answers: 8, unanswered: 4, percentage: 60, time_taken_minutes: 60, rank: 3, started_at: "2026-03-10T09:00:00Z", completed_at: "2026-03-10T10:00:00Z", created_at: "2026-03-10T10:00:00Z" },
  { id: uuid(753), test_id: uuid(701), student_id: uuid(200), score: 36, total_marks: 40, correct_answers: 18, wrong_answers: 2, unanswered: 0, percentage: 90, time_taken_minutes: 25, rank: 1, started_at: "2026-03-15T09:00:00Z", completed_at: "2026-03-15T09:25:00Z", created_at: "2026-03-15T09:25:00Z" },
  { id: uuid(754), test_id: uuid(702), student_id: uuid(201), score: 162, total_marks: 180, correct_answers: 41, wrong_answers: 3, unanswered: 1, percentage: 90, time_taken_minutes: 80, rank: 1, started_at: "2026-04-01T10:00:00Z", completed_at: "2026-04-01T11:20:00Z", created_at: "2026-04-01T11:20:00Z" },
  { id: uuid(755), test_id: uuid(702), student_id: uuid(203), score: 144, total_marks: 180, correct_answers: 36, wrong_answers: 6, unanswered: 3, percentage: 80, time_taken_minutes: 85, rank: 2, started_at: "2026-04-01T10:00:00Z", completed_at: "2026-04-01T11:25:00Z", created_at: "2026-04-01T11:25:00Z" },
  { id: uuid(756), test_id: uuid(702), student_id: uuid(207), score: 126, total_marks: 180, correct_answers: 32, wrong_answers: 9, unanswered: 4, percentage: 70, time_taken_minutes: 88, rank: 3, started_at: "2026-04-01T10:00:00Z", completed_at: "2026-04-01T11:28:00Z", created_at: "2026-04-01T11:28:00Z" },
  { id: uuid(757), test_id: uuid(705), student_id: uuid(204), score: 156, total_marks: 200, correct_answers: 56, wrong_answers: 12, unanswered: 7, percentage: 78, time_taken_minutes: 115, rank: 1, started_at: "2026-05-10T09:00:00Z", completed_at: "2026-05-10T10:55:00Z", created_at: "2026-05-10T10:55:00Z" },
  { id: uuid(758), test_id: uuid(709), student_id: uuid(200), score: 22, total_marks: 25, correct_answers: 9, wrong_answers: 1, unanswered: 0, percentage: 88, time_taken_minutes: 18, rank: 1, started_at: "2026-03-20T09:00:00Z", completed_at: "2026-03-20T09:18:00Z", created_at: "2026-03-20T09:18:00Z" },
  { id: uuid(759), test_id: uuid(709), student_id: uuid(202), score: 20, total_marks: 25, correct_answers: 8, wrong_answers: 2, unanswered: 0, percentage: 80, time_taken_minutes: 19, rank: 2, started_at: "2026-03-20T09:00:00Z", completed_at: "2026-03-20T09:19:00Z", created_at: "2026-03-20T09:19:00Z" },
];

// ─── Study Materials ───────────────────────────────────

export const studyMaterials: StudyMaterial[] = [
  { id: uuid(800), course_id: uuid(1), subject_id: uuid(600), chapter_id: uuid(650), title: "Mechanics Formula Sheet", description: "Complete formula sheet for Mechanics — Newton's Laws, Kinematics, Work-Energy theorem", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/mechanics-formulas.pdf", file_size_kb: 450, download_count: 128, is_published: true, uploaded_by: uuid(300), created_at: "2026-02-01T00:00:00Z", updated_at: "2026-02-01T00:00:00Z" },
  { id: uuid(801), course_id: uuid(1), subject_id: uuid(600), chapter_id: uuid(651), title: "Electrodynamics Notes", description: "Detailed notes on Coulomb's Law, Electric Fields, and Gauss's Law", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/electrodynamics-notes.pdf", file_size_kb: 1200, download_count: 95, is_published: true, uploaded_by: uuid(300), created_at: "2026-02-05T00:00:00Z", updated_at: "2026-02-05T00:00:00Z" },
  { id: uuid(802), course_id: uuid(1), subject_id: uuid(601), chapter_id: uuid(652), title: "Organic Chemistry — Named Reactions", description: "All important named reactions for JEE with mechanisms", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/named-reactions.pdf", file_size_kb: 800, download_count: 156, is_published: true, uploaded_by: uuid(301), created_at: "2026-02-10T00:00:00Z", updated_at: "2026-02-10T00:00:00Z" },
  { id: uuid(803), course_id: uuid(1), subject_id: uuid(601), chapter_id: null, title: "Periodic Table Quick Reference", description: "Printable periodic table with electronic configurations and trends", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/periodic-table.pdf", file_size_kb: 350, download_count: 210, is_published: true, uploaded_by: uuid(301), created_at: "2026-02-12T00:00:00Z", updated_at: "2026-02-12T00:00:00Z" },
  { id: uuid(804), course_id: uuid(1), subject_id: uuid(602), chapter_id: uuid(653), title: "Calculus Solved Examples", description: "100 solved problems on Limits, Derivatives, and Integrals", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/calculus-solved.pdf", file_size_kb: 2100, download_count: 89, is_published: true, uploaded_by: uuid(302), created_at: "2026-02-15T00:00:00Z", updated_at: "2026-02-15T00:00:00Z" },
  { id: uuid(805), course_id: uuid(1), subject_id: uuid(602), chapter_id: null, title: "Trigonometry Formula Handbook", description: "All trigonometric identities, formulas, and inverse trig properties", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/trig-formulas.pdf", file_size_kb: 500, download_count: 175, is_published: true, uploaded_by: uuid(302), created_at: "2026-02-18T00:00:00Z", updated_at: "2026-02-18T00:00:00Z" },
  { id: uuid(806), course_id: uuid(2), subject_id: uuid(603), chapter_id: null, title: "NEET Physics Formula Book", description: "NCERT-based physics formulas organized chapter-wise for NEET", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/neet-physics-formulas.pdf", file_size_kb: 600, download_count: 134, is_published: true, uploaded_by: uuid(300), created_at: "2026-03-01T00:00:00Z", updated_at: "2026-03-01T00:00:00Z" },
  { id: uuid(807), course_id: uuid(2), subject_id: uuid(604), chapter_id: null, title: "NEET Chemistry — Reaction Mechanisms", description: "Important reaction mechanisms for NEET Organic Chemistry", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/neet-reactions.pdf", file_size_kb: 900, download_count: 112, is_published: true, uploaded_by: uuid(301), created_at: "2026-03-05T00:00:00Z", updated_at: "2026-03-05T00:00:00Z" },
  { id: uuid(808), course_id: uuid(2), subject_id: uuid(605), chapter_id: uuid(654), title: "Human Physiology — Diagrams & Notes", description: "Labeled diagrams and detailed notes on all human body systems", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/physiology-diagrams.pdf", file_size_kb: 3200, download_count: 187, is_published: true, uploaded_by: uuid(303), created_at: "2026-03-10T00:00:00Z", updated_at: "2026-03-10T00:00:00Z" },
  { id: uuid(809), course_id: uuid(2), subject_id: uuid(605), chapter_id: null, title: "Biology NCERT Highlights", description: "Key points from NCERT Biology textbook — Class 11 & 12", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/bio-ncert-highlights.pdf", file_size_kb: 1800, download_count: 201, is_published: true, uploaded_by: uuid(303), created_at: "2026-03-12T00:00:00Z", updated_at: "2026-03-12T00:00:00Z" },
  { id: uuid(810), course_id: uuid(3), subject_id: null, chapter_id: null, title: "WBJEE Previous Year Papers (2020–2025)", description: "Compiled previous year question papers with answer keys", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/wbjee-pyq.pdf", file_size_kb: 5400, download_count: 245, is_published: true, uploaded_by: uuid(302), created_at: "2026-03-15T00:00:00Z", updated_at: "2026-03-15T00:00:00Z" },
  { id: uuid(811), course_id: uuid(3), subject_id: null, chapter_id: null, title: "WBJEE Mathematics Topic-wise Problems", description: "Topic-wise problem sets aligned with WBJEE syllabus", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/wbjee-maths-topics.pdf", file_size_kb: 2800, download_count: 134, is_published: true, uploaded_by: uuid(302), created_at: "2026-03-18T00:00:00Z", updated_at: "2026-03-18T00:00:00Z" },
  { id: uuid(812), course_id: uuid(4), subject_id: null, chapter_id: null, title: "Madhyamik Mathematics — Sample Papers", description: "5 sample papers in Madhyamik exam pattern", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/madhyamik-maths-sample.pdf", file_size_kb: 1500, download_count: 167, is_published: true, uploaded_by: uuid(302), created_at: "2026-04-01T00:00:00Z", updated_at: "2026-04-01T00:00:00Z" },
  { id: uuid(813), course_id: uuid(4), subject_id: null, chapter_id: null, title: "Madhyamik Science — Quick Revision Notes", description: "Last-minute revision notes for Physical Science & Life Science", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/madhyamik-science-revision.pdf", file_size_kb: 980, download_count: 189, is_published: true, uploaded_by: uuid(303), created_at: "2026-04-05T00:00:00Z", updated_at: "2026-04-05T00:00:00Z" },
  { id: uuid(814), course_id: uuid(1), subject_id: uuid(600), chapter_id: null, title: "JEE Physics — Previous Year Analysis", description: "Topic-wise analysis of JEE Main Physics questions (2019–2025)", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/jee-physics-analysis.pdf", file_size_kb: 1100, download_count: 98, is_published: true, uploaded_by: uuid(300), created_at: "2026-04-10T00:00:00Z", updated_at: "2026-04-10T00:00:00Z" },
  { id: uuid(815), course_id: uuid(1), subject_id: uuid(601), chapter_id: null, title: "JEE Chemistry — Inorganic Quick Revision", description: "Inorganic Chemistry short notes for quick revision", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/inorganic-revision.pdf", file_size_kb: 720, download_count: 78, is_published: true, uploaded_by: uuid(301), created_at: "2026-04-12T00:00:00Z", updated_at: "2026-04-12T00:00:00Z" },
  { id: uuid(816), course_id: uuid(2), subject_id: uuid(603), chapter_id: null, title: "NEET Physics — Optics Notes", description: "Ray optics and wave optics for NEET", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/neet-optics.pdf", file_size_kb: 880, download_count: 65, is_published: true, uploaded_by: uuid(300), created_at: "2026-04-15T00:00:00Z", updated_at: "2026-04-15T00:00:00Z" },
  { id: uuid(817), course_id: uuid(5), subject_id: null, chapter_id: null, title: "HS Chemistry — Board Exam Tips", description: "Important tips and frequently asked questions for HS Chemistry", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/hs-chem-tips.pdf", file_size_kb: 540, download_count: 56, is_published: true, uploaded_by: uuid(301), created_at: "2026-04-18T00:00:00Z", updated_at: "2026-04-18T00:00:00Z" },
  { id: uuid(818), course_id: uuid(1), subject_id: uuid(602), chapter_id: null, title: "Coordinate Geometry — Complete Notes", description: "Straight lines, circles, conics for JEE", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/coord-geometry.pdf", file_size_kb: 1350, download_count: 92, is_published: true, uploaded_by: uuid(302), created_at: "2026-04-20T00:00:00Z", updated_at: "2026-04-20T00:00:00Z" },
  { id: uuid(819), course_id: uuid(2), subject_id: uuid(605), chapter_id: null, title: "Genetics & Evolution — Mind Maps", description: "Visual mind maps for Genetics, Evolution, and Biotechnology", type: "pdf", file_url: "https://cdn.alphabetz.in/materials/genetics-mindmaps.pdf", file_size_kb: 2400, download_count: 143, is_published: true, uploaded_by: uuid(303), created_at: "2026-04-22T00:00:00Z", updated_at: "2026-04-22T00:00:00Z" },
];

// ─── Leads ─────────────────────────────────────────────

export const leads: Lead[] = [
  { id: uuid(1000), full_name: "Ritesh Mahato", phone: "8910567890", email: "ritesh.m@gmail.com", guardian_name: "Santosh Mahato", guardian_phone: "9073567001", source: "website", status: "new", interested_course_id: uuid(1), assigned_to: null, last_contacted_at: null, expected_joining_date: "2026-10-01", notes: "Enquired about JEE coaching via website form", created_at: "2026-09-15T10:00:00Z", updated_at: "2026-09-15T10:00:00Z" },
  { id: uuid(1001), full_name: "Tanisha Saha", phone: "9007890123", email: null, guardian_name: "Biswajit Saha", guardian_phone: "9073567002", source: "walk_in", status: "contacted", interested_course_id: uuid(2), assigned_to: uuid(300), last_contacted_at: "2026-09-16T14:00:00Z", expected_joining_date: "2026-10-15", notes: "Visited with father. Interested in NEET batch. Callback scheduled.", created_at: "2026-09-14T09:00:00Z", updated_at: "2026-09-16T14:00:00Z" },
  { id: uuid(1002), full_name: "Dipak Bera", phone: "7001890456", email: "dipak.bera@yahoo.com", guardian_name: null, guardian_phone: null, source: "referral", status: "follow_up", interested_course_id: uuid(3), assigned_to: uuid(302), last_contacted_at: "2026-09-17T11:00:00Z", expected_joining_date: "2026-11-01", notes: "Referred by Aniket Das (current student). Wants WBJEE weekend batch.", created_at: "2026-09-10T08:00:00Z", updated_at: "2026-09-17T11:00:00Z" },
  { id: uuid(1003), full_name: "Shrabanti Mondal", phone: "9134789012", email: "shrabanti.m@gmail.com", guardian_name: "Kartik Mondal", guardian_phone: "9073567003", source: "social_media", status: "enrolled", interested_course_id: uuid(4), assigned_to: uuid(304), last_contacted_at: "2026-09-01T10:00:00Z", expected_joining_date: null, notes: "Enrolled in Board Exam Foundation Class 10", created_at: "2026-08-20T12:00:00Z", updated_at: "2026-09-01T10:00:00Z" },
  { id: uuid(1004), full_name: "Md. Faizan Akhtar", phone: "8902678901", email: null, guardian_name: "Md. Riyaz Akhtar", guardian_phone: "9073567004", source: "newspaper", status: "lost", interested_course_id: uuid(1), assigned_to: uuid(300), last_contacted_at: "2026-08-25T16:00:00Z", expected_joining_date: null, notes: "Joined competitor institute (Aakash)", created_at: "2026-08-10T09:00:00Z", updated_at: "2026-08-25T16:00:00Z" },
  { id: uuid(1005), full_name: "Aditi Sarkar", phone: "9012456789", email: "aditi.sarkar@gmail.com", guardian_name: "Mrinal Sarkar", guardian_phone: "9073567005", source: "website", status: "new", interested_course_id: uuid(2), assigned_to: null, last_contacted_at: null, expected_joining_date: "2026-10-01", notes: "Downloaded NEET brochure from website", created_at: "2026-09-18T15:00:00Z", updated_at: "2026-09-18T15:00:00Z" },
  { id: uuid(1006), full_name: "Bikash Tudu", phone: "7098234567", email: null, guardian_name: "Gopal Tudu", guardian_phone: "9073567006", source: "walk_in", status: "contacted", interested_course_id: uuid(4), assigned_to: uuid(304), last_contacted_at: "2026-09-15T10:30:00Z", expected_joining_date: "2026-10-10", notes: "Class 10 student, needs scholarship info", created_at: "2026-09-12T11:00:00Z", updated_at: "2026-09-15T10:30:00Z" },
  { id: uuid(1007), full_name: "Papiya Ghosh", phone: "9143567890", email: "papiya.g@outlook.com", guardian_name: "Sunil Ghosh", guardian_phone: "9073567007", source: "referral", status: "follow_up", interested_course_id: uuid(5), assigned_to: uuid(301), last_contacted_at: "2026-09-16T09:00:00Z", expected_joining_date: "2026-11-15", notes: "Referred by Priya Mukherjee. Interested in HS coaching.", created_at: "2026-09-08T14:00:00Z", updated_at: "2026-09-16T09:00:00Z" },
  { id: uuid(1008), full_name: "Sayan Halder", phone: "8901678234", email: "sayan.h@gmail.com", guardian_name: null, guardian_phone: null, source: "social_media", status: "new", interested_course_id: uuid(6), assigned_to: null, last_contacted_at: null, expected_joining_date: "2027-01-01", notes: "Interested in WBCS — saw Instagram ad", created_at: "2026-09-17T18:00:00Z", updated_at: "2026-09-17T18:00:00Z" },
  { id: uuid(1009), full_name: "Ruma Biswas", phone: "9007234567", email: null, guardian_name: "Late Sudarshan Biswas", guardian_phone: null, source: "phone", status: "contacted", interested_course_id: uuid(1), assigned_to: uuid(300), last_contacted_at: "2026-09-18T11:00:00Z", expected_joining_date: "2026-10-15", notes: "Called for JEE info. Single mother — may need fee concession.", created_at: "2026-09-16T08:00:00Z", updated_at: "2026-09-18T11:00:00Z" },
  { id: uuid(1010), full_name: "Debjit Kar", phone: "7003456123", email: "debjit.kar@gmail.com", guardian_name: "Pradip Kar", guardian_phone: "9073567008", source: "website", status: "enrolled", interested_course_id: uuid(2), assigned_to: uuid(303), last_contacted_at: "2026-09-05T10:00:00Z", expected_joining_date: null, notes: "Enrolled in NEET Evening batch", created_at: "2026-08-28T07:00:00Z", updated_at: "2026-09-05T10:00:00Z" },
  { id: uuid(1011), full_name: "Pallabi Dutta", phone: "9134890123", email: null, guardian_name: "Dipankar Dutta", guardian_phone: "9073567009", source: "walk_in", status: "follow_up", interested_course_id: uuid(3), assigned_to: uuid(302), last_contacted_at: "2026-09-14T15:00:00Z", expected_joining_date: "2026-10-20", notes: "Wants to compare WBJEE and JEE coaching. Follow up with course comparison.", created_at: "2026-09-05T10:00:00Z", updated_at: "2026-09-14T15:00:00Z" },
  { id: uuid(1012), full_name: "Sudipta Maji", phone: "8902890456", email: "sudipta.maji@gmail.com", guardian_name: "Tapas Maji", guardian_phone: "9073567010", source: "referral", status: "new", interested_course_id: uuid(1), assigned_to: null, last_contacted_at: null, expected_joining_date: "2026-10-01", notes: "Referred by Dr. Banerjee's former student", created_at: "2026-09-19T08:00:00Z", updated_at: "2026-09-19T08:00:00Z" },
  { id: uuid(1013), full_name: "Jaya Khatun", phone: "9012789234", email: null, guardian_name: "Md. Jamal Khatun", guardian_phone: "9073567011", source: "newspaper", status: "lost", interested_course_id: uuid(4), assigned_to: uuid(304), last_contacted_at: "2026-08-30T12:00:00Z", expected_joining_date: null, notes: "Too far from centre. Needs online option.", created_at: "2026-08-15T09:00:00Z", updated_at: "2026-08-30T12:00:00Z" },
  { id: uuid(1014), full_name: "Arijit Bhattacharya", phone: "7098567890", email: "arijit.b@gmail.com", guardian_name: "Amitava Bhattacharya", guardian_phone: "9073567012", source: "other", status: "contacted", interested_course_id: uuid(1), assigned_to: uuid(300), last_contacted_at: "2026-09-19T09:00:00Z", expected_joining_date: "2026-10-05", notes: "Event attendee — came to our seminar at NIT Durgapur", created_at: "2026-09-18T20:00:00Z", updated_at: "2026-09-19T09:00:00Z" },
];

// ─── Lead Notes ────────────────────────────────────────

export const leadNotes: LeadNote[] = [
  { id: uuid(1050), lead_id: uuid(1001), author_id: uuid(300), content: "Spoke with father. Very keen on NEET. Wants to visit lab facilities.", created_at: "2026-09-16T14:00:00Z" },
  { id: uuid(1051), lead_id: uuid(1002), author_id: uuid(302), content: "Called Dipak. He will visit this Saturday with his mother.", created_at: "2026-09-17T11:00:00Z" },
  { id: uuid(1052), lead_id: uuid(1009), author_id: uuid(300), content: "Ruma is a single mother. Discussed scholarship options. She'll decide by month end.", created_at: "2026-09-18T11:00:00Z" },
];

// ─── Announcements ─────────────────────────────────────

export const announcements: Announcement[] = [
  { id: uuid(1100), title: "Durga Puja Holiday Schedule", content: "The institute will remain closed from 29th September to 5th October for Durga Puja holidays. Classes resume on 6th October. All students are advised to complete the revision assignments shared via the student portal. Wishing everyone a joyful Durga Puja!", priority: "high", audience: "all", batch_id: null, course_id: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: true, expires_at: "2026-10-06T00:00:00Z", created_at: "2026-09-20T10:00:00Z", updated_at: "2026-09-20T10:00:00Z" },
  { id: uuid(1101), title: "JEE Mock Test Series — Schedule Released", content: "The complete JEE Mock Test Series schedule for October–December 2026 has been released. Tests will be conducted every alternate Saturday. Students can download the schedule from the portal.", priority: "normal", audience: "students", batch_id: uuid(100), course_id: uuid(1), author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: false, expires_at: null, created_at: "2026-09-18T08:00:00Z", updated_at: "2026-09-18T08:00:00Z" },
  { id: uuid(1102), title: "NEET Biology Special Workshop", content: "A special 3-day workshop on Human Physiology and Genetics will be conducted by Dr. Jayanta Mitra on 10th, 11th, and 12th October. Open to all NEET batch students. Register on the portal.", priority: "normal", audience: "students", batch_id: uuid(101), course_id: uuid(2), author_id: uuid(303), author_name: "Dr. Jayanta Mitra", is_pinned: false, expires_at: "2026-10-12T00:00:00Z", created_at: "2026-09-17T12:00:00Z", updated_at: "2026-09-17T12:00:00Z" },
  { id: uuid(1103), title: "Fee Payment Reminder — October Installment", content: "Students with pending installments are reminded to pay their October dues by 5th October. Late payments will attract a ₹500 fine. Pay via UPI, bank transfer, or cash at the office.", priority: "high", audience: "students", batch_id: null, course_id: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: true, expires_at: "2026-10-10T00:00:00Z", created_at: "2026-09-19T09:00:00Z", updated_at: "2026-09-19T09:00:00Z" },
  { id: uuid(1104), title: "Faculty Meeting — Quarterly Review", content: "All faculty members are requested to attend the quarterly review meeting on 25th September at 4:00 PM in the Main Campus conference room. Please bring your batch performance reports.", priority: "normal", audience: "faculty", batch_id: null, course_id: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: false, expires_at: "2026-09-25T00:00:00Z", created_at: "2026-09-15T10:00:00Z", updated_at: "2026-09-15T10:00:00Z" },
  { id: uuid(1105), title: "New Study Materials Uploaded", content: "New PDF materials for JEE Physics (Optics) and NEET Biology (Genetics) have been uploaded to the student portal. Download and revise before the upcoming tests.", priority: "low", audience: "students", batch_id: null, course_id: null, author_id: uuid(301), author_name: "Smt. Rupa Chakraborty", is_pinned: false, expires_at: null, created_at: "2026-09-16T14:00:00Z", updated_at: "2026-09-16T14:00:00Z" },
  { id: uuid(1106), title: "Parent-Teacher Meeting — October", content: "PTM for all batches will be held on 18th October (Saturday) from 10 AM to 1 PM. Parents are requested to collect their ward's progress report from the front desk.", priority: "normal", audience: "all", batch_id: null, course_id: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: false, expires_at: "2026-10-18T00:00:00Z", created_at: "2026-09-14T08:00:00Z", updated_at: "2026-09-14T08:00:00Z" },
  { id: uuid(1107), title: "WBJEE Weekend Batch — Extra Classes", content: "Due to Puja holidays, two extra classes are scheduled for WBJEE Weekend batch on 7th and 8th October to cover lost hours. Timing: 10 AM – 2 PM.", priority: "normal", audience: "batch_specific", batch_id: uuid(102), course_id: uuid(3), author_id: uuid(302), author_name: "Sri Amal Kumar Saha", is_pinned: false, expires_at: "2026-10-08T00:00:00Z", created_at: "2026-09-19T11:00:00Z", updated_at: "2026-09-19T11:00:00Z" },
  { id: uuid(1108), title: "Congratulations to NEET Toppers!", content: "We congratulate Priya Mukherjee (AIR 342) and Sneha Roy (AIR 1256) for their outstanding performance in NEET 2026 mock series. Keep up the excellent work!", priority: "low", audience: "all", batch_id: null, course_id: null, author_id: uuid(303), author_name: "Dr. Jayanta Mitra", is_pinned: false, expires_at: null, created_at: "2026-09-12T10:00:00Z", updated_at: "2026-09-12T10:00:00Z" },
  { id: uuid(1109), title: "Office Timing Change", content: "From 1st October, the office will operate from 8:00 AM to 8:00 PM (extended hours) to accommodate evening batch parents and walk-in enquiries.", priority: "low", audience: "all", batch_id: null, course_id: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", is_pinned: false, expires_at: null, created_at: "2026-09-10T09:00:00Z", updated_at: "2026-09-10T09:00:00Z" },
];

// ─── Result Showcase ───────────────────────────────────

export const resultShowcases: ResultShowcase[] = [
  { id: uuid(1200), student_name: "Soumya Banerjee", exam_name: "JEE Advanced 2025", rank: 456, score: "285/360", year: 2025, photo_url: null, course_id: uuid(1), testimonial: "Alphabetz's structured approach and dedicated faculty helped me crack JEE Advanced. Dr. Banerjee's Physics classes were game-changing!", is_featured: true, created_at: "2025-07-01T00:00:00Z", updated_at: "2025-07-01T00:00:00Z" },
  { id: uuid(1201), student_name: "Ankita Pramanik", exam_name: "NEET-UG 2025", rank: 342, score: "685/720", year: 2025, photo_url: null, course_id: uuid(2), testimonial: "The NCERT-focused teaching at Alphabetz gave me the confidence to attempt every question. Dr. Mitra's Biology sessions were exceptional.", is_featured: true, created_at: "2025-07-15T00:00:00Z", updated_at: "2025-07-15T00:00:00Z" },
  { id: uuid(1202), student_name: "Rohan Ghosh", exam_name: "WBJEE 2025", rank: 89, score: "178/200", year: 2025, photo_url: null, course_id: uuid(3), testimonial: "Sri Saha's mathematics coaching was incredible. I went from struggling with Calculus to scoring 95% in the WBJEE math section.", is_featured: true, created_at: "2025-08-01T00:00:00Z", updated_at: "2025-08-01T00:00:00Z" },
  { id: uuid(1203), student_name: "Puja Khatun", exam_name: "Madhyamik 2025", rank: null, score: "97.5%", year: 2025, photo_url: null, course_id: uuid(4), testimonial: "I scored highest in our school thanks to Alphabetz. The regular tests and personal attention made all the difference.", is_featured: false, created_at: "2025-06-01T00:00:00Z", updated_at: "2025-06-01T00:00:00Z" },
  { id: uuid(1204), student_name: "Arnab Mitra", exam_name: "JEE Main 2025", rank: 1234, score: "265/300", year: 2025, photo_url: null, course_id: uuid(1), testimonial: "The test series at Alphabetz perfectly simulated JEE Main. I was fully prepared and knew exactly what to expect on exam day.", is_featured: true, created_at: "2025-05-15T00:00:00Z", updated_at: "2025-05-15T00:00:00Z" },
];

// ─── Blog Posts ────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  { id: uuid(1300), title: "How to Prepare for JEE 2027: A Complete Roadmap", slug: "jee-2027-preparation-roadmap", excerpt: "A step-by-step guide for Class 11 students starting their JEE preparation journey with effective strategies and time management tips.", content: "Preparing for JEE requires a well-structured plan that balances school studies with competitive exam preparation. Start with NCERT textbooks for conceptual clarity, then move to reference books like HC Verma for Physics, MS Chauhan for Organic Chemistry, and RD Sharma for Mathematics. Create a timetable that allocates at least 4–5 hours daily for self-study beyond coaching classes. Focus on understanding concepts rather than rote memorization. Regular mock tests from the first year are crucial to build exam temperament.", cover_image_url: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", status: "published", tags: ["JEE", "preparation", "strategy", "students"], views: 1245, published_at: "2026-08-15T10:00:00Z", created_at: "2026-08-14T08:00:00Z", updated_at: "2026-08-15T10:00:00Z" },
  { id: uuid(1301), title: "NEET 2027: Biology Preparation Strategy", slug: "neet-2027-biology-strategy", excerpt: "Master NEET Biology with our proven NCERT-first approach. Learn how to score 340+ in Biology section.", content: "Biology carries 360 marks in NEET and is the most scoring subject if prepared well. The NCERT textbook is your bible — read every line, understand every diagram, and memorize key terms. Start with Human Physiology and Plant Physiology as they carry the most weight. Use mnemonics for classification and nomenclature. Practice previous year questions chapter-wise before attempting full mocks. At Alphabetz, we follow a systematic 3-phase approach: Foundation (NCERT mastery), Building (question practice), and Finishing (mock tests and revision).", cover_image_url: null, author_id: uuid(303), author_name: "Dr. Jayanta Mitra", status: "published", tags: ["NEET", "Biology", "preparation", "NCERT"], views: 987, published_at: "2026-08-20T12:00:00Z", created_at: "2026-08-19T09:00:00Z", updated_at: "2026-08-20T12:00:00Z" },
  { id: uuid(1302), title: "Why WBJEE is the Best Option for Bengal Students", slug: "wbjee-best-option-bengal", excerpt: "WBJEE offers excellent engineering colleges in West Bengal. Here's why you should consider it alongside JEE.", content: "While JEE Main and Advanced are the most sought-after engineering entrances, WBJEE offers fantastic opportunities at colleges like Jadavpur University, IIEST Shibpur, and top private universities in Bengal. The syllabus overlaps significantly with JEE Main, making parallel preparation feasible. WBJEE has a more predictable pattern, and the competition is relatively less intense. Students from Durgapur and surrounding areas can benefit from quality engineering education while staying closer to home. At Alphabetz, our weekend WBJEE batch is designed for students who want focused state-level preparation.", cover_image_url: null, author_id: uuid(302), author_name: "Sri Amal Kumar Saha", status: "published", tags: ["WBJEE", "engineering", "West Bengal", "career"], views: 654, published_at: "2026-09-01T10:00:00Z", created_at: "2026-08-30T08:00:00Z", updated_at: "2026-09-01T10:00:00Z" },
  { id: uuid(1303), title: "Top 5 Study Habits of Successful JEE/NEET Toppers", slug: "study-habits-toppers", excerpt: "Learn the daily routines and study techniques used by students who cracked JEE and NEET with top ranks.", content: "After mentoring hundreds of successful students, we've identified common habits among toppers: 1) Consistent daily study schedule — toppers study at the same time every day. 2) Active recall over passive reading — they test themselves constantly. 3) Error analysis — they maintain error logs and revisit mistakes. 4) Limited but focused resources — they master 2–3 books rather than collecting dozens. 5) Physical activity and sleep — they prioritize 7+ hours of sleep and 30 minutes of exercise. These habits are more important than raw intelligence. At Alphabetz, we coach students on these habits alongside academics.", cover_image_url: null, author_id: uuid(300), author_name: "Dr. Subhash Banerjee", status: "published", tags: ["study tips", "toppers", "habits", "success"], views: 2103, published_at: "2026-09-10T08:00:00Z", created_at: "2026-09-09T07:00:00Z", updated_at: "2026-09-10T08:00:00Z" },
  { id: uuid(1304), title: "Madhyamik 2027: Subject-wise Preparation Guide", slug: "madhyamik-2027-preparation", excerpt: "A complete guide for Class 10 students preparing for the West Bengal Madhyamik examination.", content: "The Madhyamik examination is the first major board exam for West Bengal students. Start preparation early by focusing on NCERT and WBBSE textbooks. For Mathematics, practice at least 20 problems daily from previous year papers. For Physical Science, understand concepts through experiments and diagrams. Life Science requires thorough reading and diagram practice. Bengali and English need regular writing practice — aim for neat handwriting and clear expression. History and Geography benefit from map work and timeline creation. At Alphabetz, our Board Foundation program ensures students build strong basics while preparing for future competitive exams.", cover_image_url: null, author_id: uuid(304), author_name: "Smt. Priyanka Das", status: "draft", tags: ["Madhyamik", "board exam", "Class 10", "preparation"], views: 0, published_at: null, created_at: "2026-09-18T14:00:00Z", updated_at: "2026-09-18T14:00:00Z" },
];

// ─── Notifications ─────────────────────────────────────

export const notifications: Notification[] = [
  { id: uuid(1400), user_id: uuid(200), title: "Test Score Published", message: "Your score for JEE Physics Mock Test — 1 is now available. You scored 96/120 (Rank 1).", type: "result", is_read: true, action_url: "/student/tests/results", created_at: "2026-03-10T10:00:00Z" },
  { id: uuid(1401), user_id: uuid(200), title: "New Study Material", message: "New Mechanics Formula Sheet has been uploaded. Download it from the materials section.", type: "info", is_read: true, action_url: "/student/materials", created_at: "2026-02-01T10:00:00Z" },
  { id: uuid(1402), user_id: uuid(201), title: "Test Reminder", message: "NEET Biology Mock Test — 1 is scheduled for 1st April at 10:00 AM. Be prepared!", type: "test", is_read: false, action_url: "/student/tests", created_at: "2026-03-28T09:00:00Z" },
  { id: uuid(1403), user_id: uuid(202), title: "Payment Reminder", message: "Your second installment of ₹39,000 is due by 20th April. Please clear the dues.", type: "payment", is_read: false, action_url: "/student/payments", created_at: "2026-04-10T08:00:00Z" },
  { id: uuid(1404), user_id: uuid(203), title: "Test Score Published", message: "Your NEET Biology Mock Test — 1 score is ready. You scored 144/180 (Rank 2).", type: "result", is_read: true, action_url: "/student/tests/results", created_at: "2026-04-01T12:00:00Z" },
  { id: uuid(1405), user_id: uuid(204), title: "Batch Schedule Change", message: "WBJEE Weekend batch extra classes on 7th & 8th October (10 AM – 2 PM) to cover Puja holidays.", type: "info", is_read: false, action_url: "/student/schedule", created_at: "2026-09-19T11:00:00Z" },
  { id: uuid(1406), user_id: uuid(205), title: "Payment Overdue", message: "Your second installment of ₹15,000 is overdue. Please pay immediately to avoid late charges.", type: "warning", is_read: false, action_url: "/student/payments", created_at: "2026-09-15T08:00:00Z" },
  { id: uuid(1407), user_id: uuid(200), title: "Weekly Test Tomorrow", message: "Mechanics Weekly Test is scheduled for tomorrow at 9:00 AM. Duration: 20 minutes.", type: "test", is_read: true, action_url: "/student/tests", created_at: "2026-03-19T18:00:00Z" },
  { id: uuid(1408), user_id: uuid(206), title: "Doubt Answered", message: "Your doubt on 'Newton's Third Law — Reaction Force' has been answered by Dr. Banerjee.", type: "info", is_read: false, action_url: "/student/doubts", created_at: "2026-09-18T15:00:00Z" },
  { id: uuid(1409), user_id: uuid(200), title: "Durga Puja Holiday", message: "Institute closed 29 Sep – 5 Oct for Durga Puja. Complete revision assignments. Classes resume 6th Oct.", type: "info", is_read: false, action_url: "/student/announcements", created_at: "2026-09-20T10:00:00Z" },
];

// ─── Doubts ────────────────────────────────────────────

export const doubts: Doubt[] = [
  { id: uuid(1500), student_id: uuid(206), course_id: uuid(1), subject_id: uuid(600), chapter_id: uuid(650), title: "Newton's Third Law — Reaction Force on Different Bodies", description: "If action and reaction are equal and opposite, why don't they cancel each other? I'm confused about why a horse can pull a cart if the cart pulls the horse back with the same force.", image_url: null, status: "answered", created_at: "2026-09-17T14:00:00Z", updated_at: "2026-09-18T15:00:00Z" },
  { id: uuid(1501), student_id: uuid(201), course_id: uuid(2), subject_id: uuid(605), chapter_id: uuid(654), title: "Difference between SA node and AV node", description: "Both SA node and AV node generate impulses. What exactly is the difference in their function? And what happens if the SA node fails?", image_url: null, status: "open", created_at: "2026-09-19T10:00:00Z", updated_at: "2026-09-19T10:00:00Z" },
  { id: uuid(1502), student_id: uuid(200), course_id: uuid(1), subject_id: uuid(602), chapter_id: uuid(653), title: "Integration by Parts — When to Use LIATE Rule", description: "I understand the formula for integration by parts but I'm confused about when to apply LIATE vs ILATE rule. Can you explain with examples?", image_url: null, status: "answered", created_at: "2026-09-15T16:00:00Z", updated_at: "2026-09-16T10:00:00Z" },
];

// ─── Doubt Replies ─────────────────────────────────────

export const doubtReplies: DoubtReply[] = [
  { id: uuid(1550), doubt_id: uuid(1500), author_id: uuid(300), author_name: "Dr. Subhash Banerjee", author_role: "faculty", content: "Great question! Action and reaction DON'T cancel because they act on DIFFERENT bodies. The horse pushes the ground backward (action), the ground pushes the horse forward (reaction). The horse pulls the cart (action on cart), the cart pulls back (reaction on horse). But the net force on the horse = ground's push – cart's pull. Since ground's push > cart's pull (friction), the horse accelerates forward. Think of it as: action-reaction pairs never act on the same body.", image_url: null, created_at: "2026-09-18T15:00:00Z" },
  { id: uuid(1551), doubt_id: uuid(1502), author_id: uuid(302), author_name: "Sri Amal Kumar Saha", author_role: "faculty", content: "LIATE and ILATE are the same concept — just different mnemonics. The idea is to choose u and dv such that du is simpler. Priority: Logarithmic > Inverse Trig > Algebraic > Trigonometric > Exponential. For example, in ∫x·ln(x)dx, choose u = ln(x) because its derivative 1/x simplifies things. In ∫x·eˣdx, choose u = x because its derivative is 1 (simpler). Practice 10 problems and the pattern becomes intuitive.", image_url: null, created_at: "2026-09-16T10:00:00Z" },
];

// ─── Video Progress (sample) ───────────────────────────

export const videoProgress: VideoProgress[] = [
  { id: uuid(1600), student_id: uuid(200), lesson_id: uuid(670), progress_seconds: 2700, total_seconds: 2700, is_completed: true, last_watched_at: "2026-03-05T18:00:00Z", created_at: "2026-03-05T17:15:00Z", updated_at: "2026-03-05T18:00:00Z" },
  { id: uuid(1601), student_id: uuid(200), lesson_id: uuid(671), progress_seconds: 1800, total_seconds: 3300, is_completed: false, last_watched_at: "2026-03-06T19:30:00Z", created_at: "2026-03-06T19:00:00Z", updated_at: "2026-03-06T19:30:00Z" },
  { id: uuid(1602), student_id: uuid(201), lesson_id: uuid(674), progress_seconds: 2100, total_seconds: 2100, is_completed: true, last_watched_at: "2026-03-08T20:00:00Z", created_at: "2026-03-08T19:25:00Z", updated_at: "2026-03-08T20:00:00Z" },
];

// ─── Payments ──────────────────────────────────────────

export const payments: Payment[] = [
  { id: uuid(1700), enrollment_id: uuid(500), student_id: uuid(200), amount: 99000, method: "bank_transfer", transaction_id: "NEFT20260115001", status: "success", receipt_url: null, notes: "Full payment", collected_by: uuid(300), payment_date: "2026-01-15", created_at: "2026-01-15T10:00:00Z" },
  { id: uuid(1701), enrollment_id: uuid(501), student_id: uuid(201), amount: 89000, method: "upi", transaction_id: "UPI20260201002", status: "success", receipt_url: null, notes: "Full payment via PhonePe", collected_by: uuid(300), payment_date: "2026-02-01", created_at: "2026-02-01T11:00:00Z" },
  { id: uuid(1702), enrollment_id: uuid(502), student_id: uuid(202), amount: 35000, method: "cash", transaction_id: null, status: "success", receipt_url: null, notes: "First installment", collected_by: uuid(300), payment_date: "2026-01-20", created_at: "2026-01-20T10:00:00Z" },
  { id: uuid(1703), enrollment_id: uuid(502), student_id: uuid(202), amount: 25000, method: "upi", transaction_id: "UPI20260320003", status: "success", receipt_url: null, notes: "Second installment", collected_by: uuid(300), payment_date: "2026-03-20", created_at: "2026-03-20T12:00:00Z" },
  { id: uuid(1704), enrollment_id: uuid(505), student_id: uuid(205), amount: 15000, method: "cash", transaction_id: null, status: "success", receipt_url: null, notes: "First installment — second pending", collected_by: uuid(304), payment_date: "2026-04-01", created_at: "2026-04-01T10:00:00Z" },
];

// ─── Coupons ───────────────────────────────────────────

export const coupons: Coupon[] = [
  { id: uuid(1800), code: "DURGA2026", description: "Durga Puja special — 15% off on all courses", discount_type: "percentage", discount_value: 15, max_uses: 50, used_count: 12, min_order_amount: 30000, valid_from: "2026-09-25T00:00:00Z", valid_until: "2026-10-10T23:59:59Z", is_active: true, applicable_course_ids: [], created_at: "2026-09-20T00:00:00Z", updated_at: "2026-09-20T00:00:00Z" },
  { id: uuid(1801), code: "REFER5000", description: "Referral bonus — ₹5,000 off for referred students", discount_type: "fixed", discount_value: 5000, max_uses: 100, used_count: 23, min_order_amount: 30000, valid_from: "2026-01-01T00:00:00Z", valid_until: "2026-12-31T23:59:59Z", is_active: true, applicable_course_ids: [], created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: uuid(1802), code: "EARLYBIRD", description: "Early bird — 10% off for enrollments before session start", discount_type: "percentage", discount_value: 10, max_uses: 30, used_count: 30, min_order_amount: null, valid_from: "2025-11-01T00:00:00Z", valid_until: "2026-01-31T23:59:59Z", is_active: false, applicable_course_ids: [uuid(1), uuid(2), uuid(3)], created_at: "2025-11-01T00:00:00Z", updated_at: "2026-02-01T00:00:00Z" },
];

// ─── Admin Profile ─────────────────────────────────────

export const adminProfile: Profile = {
  id: uuid(999),
  email: "admin@alphabetz.in",
  full_name: "Admin — Alphabetz",
  phone: "9073456789",
  avatar_url: null,
  role: "admin",
  is_active: true,
  address: "123 City Centre, Near Benachity",
  city: "Durgapur",
  state: "West Bengal",
  pincode: "713213",
  date_of_birth: null,
  guardian_name: null,
  guardian_phone: null,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: "2025-01-01T00:00:00Z",
};
