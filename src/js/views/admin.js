import { store } from '../store.js';
import { withLayout } from './layout.js';

export const render = (view = 'dashboard') => {
  const user = JSON.parse(localStorage.getItem('school_portal_user'));
  const announcements = store.getAnnouncements();
  
  if (view === 'students') return withLayout(renderStudents(), user);
  if (view === 'teachers') return withLayout(renderTeachers(), user);
  
  return withLayout(`
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        ${renderStatCard('Total Students', '1,234', 'users', 'text-blue-600', 'bg-blue-100')}
        ${renderStatCard('Teachers', '84', 'shield-check', 'text-green-600', 'bg-green-100')}
        ${renderStatCard('Attendance', '94%', 'trending-up', 'text-orange-600', 'bg-orange-100')}
        ${renderStatCard('New Alerts', '3', 'bell', 'text-red-600', 'bg-red-100')}
      </div>
      
      <div class="bg-white p-6 rounded-xl border shadow-sm">
        <h3 class="text-xl font-bold mb-4">Announcements</h3>
        <div class="space-y-4">
          ${announcements.map(a => `
            <div class="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h4 class="font-semibold">${a.title}</h4>
              <p class="text-gray-600 text-sm mt-1">${a.content}</p>
              <div class="flex gap-2 mt-2 text-xs text-gray-400">
                <span>${a.author}</span> • <span>${a.date}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `, user);
};

function renderStatCard(title, value, icon, color, bg) {
  return `
    <div class="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
      <div class="${bg} ${color} p-3 rounded-lg">
        <i data-lucide="${icon}"></i>
      </div>
      <div>
        <p class="text-sm text-gray-500 font-medium">${title}</p>
        <p class="text-2xl font-bold">${value}</p>
      </div>
    </div>
  `;
}

function renderStudents() {
  const students = store.getData().users.filter(u => u.role === 'student');
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-bold">Students List</h3>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Add Student</button>
      </div>
      <div class="bg-white rounded-xl border overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 font-semibold text-gray-600">Name</th>
              <th class="px-6 py-4 font-semibold text-gray-600">Email</th>
              <th class="px-6 py-4 font-semibold text-gray-600">Grade</th>
              <th class="px-6 py-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            ${students.map(s => `
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 flex items-center gap-3">
                  <img src="${s.avatar}" class="w-8 h-8 rounded-full">
                  <span class="font-medium">${s.name}</span>
                </td>
                <td class="px-6 py-4 text-gray-600">${s.email}</td>
                <td class="px-6 py-4 text-gray-600">${s.grade}</td>
                <td class="px-6 py-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTeachers() {
  const teachers = store.getData().users.filter(u => u.role === 'teacher');
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-bold">Faculty</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${teachers.map(t => `
          <div class="bg-white p-6 rounded-xl border flex items-center gap-4">
            <img src="${t.avatar}" class="w-16 h-16 rounded-full">
            <div>
              <h4 class="font-bold text-lg">${t.name}</h4>
              <p class="text-gray-500">${t.subjects.join(', ')}</p>
              <p class="text-sm text-blue-600 mt-1">${t.email}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
