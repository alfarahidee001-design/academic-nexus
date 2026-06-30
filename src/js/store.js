const STORAGE_KEY = 'school_portal_data';

const INITIAL_DATA = {
  announcements: [
    {
      id: '1',
      title: 'Welcome to the New Semester',
      content: 'We are excited to welcome all students and staff back for a productive semester.',
      date: '2024-03-01',
      author: 'Principal Smith'
    }
  ],
  users: [
    {
      id: 'admin-1',
      name: 'Sarah Johnson',
      email: 'admin@school.edu',
      role: 'admin',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee92249f-f8b3-4ded-80dd-1b0f213c859f/admin-avatar-e9a6483b-1782693934494.webp'
    },
    {
      id: 'teacher-1',
      name: 'Dr. Robert Miller',
      email: 'miller@school.edu',
      role: 'teacher',
      subjects: ['Physics', 'Mathematics'],
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee92249f-f8b3-4ded-80dd-1b0f213c859f/teacher-avatar-f8bdddef-1782693934702.webp'
    },
    {
      id: 'student-1',
      name: 'Alex Rivera',
      email: 'alex@school.edu',
      role: 'student',
      grade: '10th Grade',
      classes: ['Physics', 'Literature', 'History'],
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ee92249f-f8b3-4ded-80dd-1b0f213c859f/student-avatar-568fccfe-1782693934759.webp'
    }
  ],
  grades: {
    'student-1': [
      { subject: 'Physics', score: 88, total: 100, date: '2024-02-15' }
    ]
  }
};

export const store = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
  },
  getData: () => JSON.parse(localStorage.getItem(STORAGE_KEY)),
  saveData: (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)),
  getUser: (role) => store.getData().users.find(u => u.role === role),
  getAnnouncements: () => store.getData().announcements,
  getGrades: (id) => store.getData().grades[id] || []
};
