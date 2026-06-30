import { store } from '../store.js';
import { withLayout } from './layout.js';

export const render = () => {
  const user = JSON.parse(localStorage.getItem('school_portal_user'));
  
  return withLayout(`
    <div class="space-y-6">
      <h3 class="text-2xl font-bold">Teacher Dashboard</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-xl border shadow-sm">
          <h4 class="font-bold mb-4 flex items-center gap-2">
            <i data-lucide="book" class="text-blue-500"></i> Active Classes
          </h4>
          <div class="space-y-3">
            <div class="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p class="font-bold">Physics 101</p>
                <p class="text-sm text-gray-500">28 Students • Lab A</p>
              </div>
              <button class="text-blue-600 font-medium">Manage</button>
            </div>
            <div class="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p class="font-bold">Calculus II</p>
                <p class="text-sm text-gray-500">22 Students • Room 302</p>
              </div>
              <button class="text-blue-600 font-medium">Manage</button>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-xl border shadow-sm">
          <h4 class="font-bold mb-4 flex items-center gap-2">
            <i data-lucide="award" class="text-orange-500"></i> Pending Grading
          </h4>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span>Physics Lab Report - Alex Rivera</span>
              <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs">Grade</button>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span>Math Quiz 3 - Emma Watson</span>
              <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs">Grade</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, user);
};
