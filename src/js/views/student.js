import { store } from '../store.js';
import { withLayout } from './layout.js';

export const render = () => {
  const user = JSON.parse(localStorage.getItem('school_portal_user'));
  const grades = store.getGrades(user.id);
  
  return withLayout(`
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Schedule -->
        <div class="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h4 class="font-bold mb-4 flex items-center gap-2">
            <i data-lucide="calendar" class="text-blue-500"></i> Today's Schedule
          </h4>
          <div class="space-y-4">
            ${renderScheduleItem('08:00 AM', 'Physics', 'Lab A', 'Dr. Miller')}
            ${renderScheduleItem('10:00 AM', 'Literature', 'Room 102', 'Prof. Evans')}
            ${renderScheduleItem('01:00 PM', 'History', 'Room 205', 'Mr. Davis')}
          </div>
        </div>
        
        <!-- Grades -->
        <div class="bg-white p-6 rounded-xl border shadow-sm">
          <h4 class="font-bold mb-4 flex items-center gap-2">
            <i data-lucide="award" class="text-orange-500"></i> Academic Progress
          </h4>
          <div class="flex flex-col items-center py-4">
            <div class="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center mb-2">
              <span class="text-2xl font-bold">3.8</span>
            </div>
            <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Current GPA</p>
          </div>
          <div class="mt-4 space-y-2">
            ${grades.map(g => `
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">${g.subject}</span>
                <span class="font-bold">${g.score}/${g.total}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `, user);
};

function renderScheduleItem(time, subject, room, teacher) {
  return `
    <div class="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors">
      <div class="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[80px]">
        <p class="text-xs font-bold text-blue-600">${time.split(' ')[1]}</p>
        <p class="text-lg font-black">${time.split(' ')[0]}</p>
      </div>
      <div class="flex-1">
        <p class="font-bold text-lg">${subject}</p>
        <p class="text-sm text-gray-500">${teacher} • ${room}</p>
      </div>
    </div>
  `;
}
