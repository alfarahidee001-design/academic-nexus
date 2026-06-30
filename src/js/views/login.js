import { store } from '../store.js';
import { router } from '../router.js';

export const render = () => {
  return `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <i data-lucide="graduation-cap"></i>
          </div>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">School Portal</h2>
          <p class="mt-2 text-sm text-gray-600">Select your role to continue</p>
        </div>
        <div class="mt-8 space-y-4">
          <button onclick="window.login('admin')" class="w-full flex flex-col items-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <i data-lucide="shield-check" class="text-blue-500 mb-2"></i>
            <span class="font-semibold text-gray-700">Administrator</span>
          </button>
          <button onclick="window.login('teacher')" class="w-full flex flex-col items-center p-4 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
            <i data-lucide="users" class="text-green-500 mb-2"></i>
            <span class="font-semibold text-gray-700">Teacher</span>
          </button>
          <button onclick="window.login('student')" class="w-full flex flex-col items-center p-4 border-2 border-gray-100 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <i data-lucide="book-open" class="text-orange-500 mb-2"></i>
            <span class="font-semibold text-gray-700">Student</span>
          </button>
        </div>
      </div>
    </div>
  `;
};

window.login = (role) => {
  const user = store.getUser(role);
  if (user) {
    localStorage.setItem('school_portal_user', JSON.stringify(user));
    router.navigate('#dashboard');
  }
};
