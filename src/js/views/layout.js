export const withLayout = (content, user) => {
  const navItems = getNavItems(user.role);
  const currentHash = window.location.hash || '#dashboard';
  
  const navHTML = navItems.map(item => {
    const isActive = currentHash === item.href;
    const activeClasses = isActive 
      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
    return '<a href="' + item.href + '" class="flex items-center gap-3 px-3 py-2 rounded-md ' + activeClasses + ' transition-colors">' +
      '<i data-lucide="' + item.icon + '" class="w-5 h-5"></i>' +
      '<span class="font-medium">' + item.label + '</span>' +
      '</a>';
  }).join('');
  
  return '<div class="flex h-screen bg-gray-50 overflow-hidden">' +
    '<aside class="w-64 bg-white border-r hidden md:flex flex-col">' +
      '<div class="p-6 flex items-center gap-3">' +
        '<div class="bg-blue-600 p-2 rounded-lg text-white">' +
          '<i data-lucide="graduation-cap"></i>' +
        '</div>' +
        '<span class="font-bold text-xl tracking-tight">EduPortal</span>' +
      '</div>' +
      '<nav class="flex-1 px-4 space-y-1">' +
        navHTML +
      '</nav>' +
      '<div class="p-4 border-t">' +
        '<button onclick="window.logout()" class="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">' +
          '<i data-lucide="log-out" class="w-5 h-5"></i>' +
          '<span class="font-medium">Logout</span>' +
        '</button>' +
      '</div>' +
    '</aside>' +
    '<div class="flex-1 flex flex-col overflow-hidden">' +
      '<header class="h-16 bg-white border-b flex items-center justify-between px-8">' +
        '<div class="flex items-center gap-4">' +
          '<h2 class="text-lg font-semibold text-gray-800">Welcome, ' + user.name + '</h2>' +
        '</div>' +
        '<div class="flex items-center gap-3">' +
          '<div class="text-right hidden sm:block">' +
            '<p class="text-sm font-medium text-gray-900">' + user.name + '</p>' +
            '<p class="text-xs text-gray-500 capitalize">' + user.role + '</p>' +
          '</div>' +
          '<img src="' + user.avatar + '" class="h-9 w-9 rounded-full border shadow-sm">' +
        '</div>' +
      '</header>' +
      '<main class="flex-1 overflow-y-auto p-8">' +
        content +
      '</main>' +
    '</div>' +
  '</div>';
};

window.logout = () => {
  localStorage.removeItem('school_portal_user');
  window.location.hash = '#login';
};

function getNavItems(role) {
  const common = [{ label: 'Dashboard', href: '#dashboard', icon: 'layout-dashboard' }];
  if (role === 'admin') {
    return [
      ...common,
      { label: 'Students', href: '#students', icon: 'users' },
      { label: 'Teachers', href: '#teachers', icon: 'shield-check' }
    ];
  }
  if (role === 'teacher') {
    return [
      ...common,
      { label: 'My Classes', href: '#classes', icon: 'book' },
      { label: 'Grades', href: '#grades', icon: 'award' }
    ];
  }
  return [
    ...common,
    { label: 'My Grades', href: '#grades', icon: 'award' },
    { label: 'Schedule', href: '#schedule', icon: 'calendar' }
  ];
}
