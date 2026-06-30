import { render as renderAdmin } from './admin.js';
import { render as renderTeacher } from './teacher.js';
import { render as renderStudent } from './student.js';

export const render = () => {
  const user = JSON.parse(localStorage.getItem('school_portal_user'));
  
  if (user.role === 'admin') return renderAdmin();
  if (user.role === 'teacher') return renderTeacher();
  return renderStudent();
};
