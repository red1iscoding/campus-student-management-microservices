export const mockStudents = [
  {
    id: 1,
    firstName: "Emma",
    lastName: "Johnson",
    email: "emma.j@university.edu",
    university: "MIT",
    enrolledCourses: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  {
    id: 2,
    firstName: "Liam",
    lastName: "Williams",
    email: "liam.w@university.edu",
    university: "Stanford",
    enrolledCourses: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam"
  },
  {
    id: 3,
    firstName: "Olivia",
    lastName: "Brown",
    email: "olivia.b@university.edu",
    university: "Harvard",
    enrolledCourses: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
  },
  {
    id: 4,
    firstName: "Noah",
    lastName: "Davis",
    email: "noah.d@university.edu",
    university: "MIT",
    enrolledCourses: 3,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah"
  },
  {
    id: 5,
    firstName: "Ava",
    lastName: "Miller",
    email: "ava.m@university.edu",
    university: "Yale",
    enrolledCourses: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava"
  },
  {
    id: 6,
    firstName: "Ethan",
    lastName: "Wilson",
    email: "ethan.w@university.edu",
    university: "Stanford",
    enrolledCourses: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan"
  },
  {
    id: 7,
    firstName: "Sophia",
    lastName: "Moore",
    email: "sophia.m@university.edu",
    university: "Harvard",
    enrolledCourses: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia"
  },
  {
    id: 8,
    firstName: "Mason",
    lastName: "Taylor",
    email: "mason.t@university.edu",
    university: "MIT",
    enrolledCourses: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mason"
  }
];

export const mockCourses = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Sarah Chen",
    category: "Engineering",
    schedule: "Mon, Wed 9:00 AM",
    enrolledStudents: 45
  },
  {
    id: "ART201",
    name: "Modern Art History",
    instructor: "Prof. James Wilson",
    category: "Arts",
    schedule: "Tue, Thu 2:00 PM",
    enrolledStudents: 32
  },
  {
    id: "MED301",
    name: "Human Anatomy",
    instructor: "Dr. Emily Roberts",
    category: "Medicine",
    schedule: "Mon, Wed, Fri 10:00 AM",
    enrolledStudents: 28
  },
  {
    id: "ENG102",
    name: "Advanced Engineering Mathematics",
    instructor: "Prof. Michael Brown",
    category: "Engineering",
    schedule: "Tue, Thu 11:00 AM",
    enrolledStudents: 38
  },
  {
    id: "BUS205",
    name: "Business Analytics",
    instructor: "Dr. Lisa Anderson",
    category: "Business",
    schedule: "Wed, Fri 1:00 PM",
    enrolledStudents: 41
  },
  {
    id: "SCI150",
    name: "Quantum Physics",
    instructor: "Prof. David Lee",
    category: "Science",
    schedule: "Mon, Thu 3:00 PM",
    enrolledStudents: 25
  }
];

export const mockUniversities = [
  {
    id: 1,
    name: "Massachusetts Institute of Technology",
    shortName: "MIT",
    location: "Cambridge, MA",
    students: 156,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Stanford University",
    shortName: "Stanford",
    location: "Stanford, CA",
    students: 142,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Harvard University",
    shortName: "Harvard",
    location: "Cambridge, MA",
    students: 178,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Yale University",
    shortName: "Yale",
    location: "New Haven, CT",
    students: 134,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop"
  }
];

export const mockEnrollmentData = [
  { category: "Engineering", enrollments: 120 },
  { category: "Arts", enrollments: 85 },
  { category: "Medicine", enrollments: 95 },
  { category: "Business", enrollments: 110 },
  { category: "Science", enrollments: 75 }
];

export const mockCourseEnrollments = [
  {
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    students: [
      { id: 1, firstName: "Emma", lastName: "Johnson" },
      { id: 2, firstName: "Liam", lastName: "Williams" },
      { id: 4, firstName: "Noah", lastName: "Davis" }
    ]
  },
  {
    courseId: "ART201",
    courseName: "Modern Art History",
    students: [
      { id: 3, firstName: "Olivia", lastName: "Brown" },
      { id: 5, firstName: "Ava", lastName: "Miller" }
    ]
  },
  {
    courseId: "MED301",
    courseName: "Human Anatomy",
    students: [
      { id: 7, firstName: "Sophia", lastName: "Moore" },
      { id: 8, firstName: "Mason", lastName: "Taylor" }
    ]
  },
  {
    courseId: "ENG102",
    courseName: "Advanced Engineering Mathematics",
    students: [
      { id: 1, firstName: "Emma", lastName: "Johnson" },
      { id: 6, firstName: "Ethan", lastName: "Wilson" }
    ]
  }
];

export const recentUpdates = {
  newStudents: [
    { name: "Emma Johnson", university: "MIT", date: "2 hours ago" },
    { name: "Liam Williams", university: "Stanford", date: "5 hours ago" }
  ],
  newCourses: [
    { name: "Introduction to Computer Science", instructor: "Dr. Sarah Chen", date: "1 day ago" },
    { name: "Modern Art History", instructor: "Prof. James Wilson", date: "2 days ago" }
  ]
};
