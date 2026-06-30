export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  grade: string;
  classes: string[];
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Grade {
  subject: string;
  score: number;
  total: number;
  date: string;
}

const STORAGE_KEY = 'school_portal_data';

const INITIAL_DATA = {
  announcements: [
    {
      id: '1',
      title: 'Welcome to the New Semester',
      content: 'We are excited to welcome all students and staff back for a productive semester.',
      date: '2024-03-01',
      author: 'Principal Smith'
    },
    {
      id: '2',
      title: 'Spring Break Schedule',
      content: 'Please note that the school will be closed from April 10th to April 17th.',
      date: '2024-03-05',
      author: 'Office Administration'
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
      { subject: 'Physics', score: 88, total: 100, date: '2024-02-15' },
      { subject: 'Literature', score: 92, total: 100, date: '2024-02-20' },
      { subject: 'History', score: 85, total: 100, date: '2024-02-22' }
    ]
  },
  attendance: {
    'student-1': [
      { date: '2024-03-01', status: 'present' },
      { date: '2024-03-02', status: 'present' },
      { date: '2024-03-03', status: 'absent' }
    ]
  }
};

export const schoolService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
  },

  getData: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_DATA;
  },

  saveData: (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getAnnouncements: () => schoolService.getData().announcements,

  getUsers: () => schoolService.getData().users,

  getUserById: (id: string) => schoolService.getUsers().find((u: User) => u.id === id),

  getGrades: (studentId: string) => schoolService.getData().grades[studentId] || [],

  getAttendance: (studentId: string) => schoolService.getData().attendance[studentId] || [],

  addAnnouncement: (announcement: Announcement) => {
    const data = schoolService.getData();
    data.announcements.unshift(announcement);
    schoolService.saveData(data);
  },

  addUser: (user: User) => {
    const data = schoolService.getData();
    data.users.push(user);
    schoolService.saveData(data);
  },

  updateGrade: (studentId: string, grade: Grade) => {
    const data = schoolService.getData();
    if (!data.grades[studentId]) data.grades[studentId] = [];
    data.grades[studentId].push(grade);
    schoolService.saveData(data);
  }
};
