import { store } from './store.js';

let currentRoute = window.location.hash || '#login';
let rootElement = null;

const routes = {
  '#login': () => import('./views/login.js').then(m => m.render()),
  '#dashboard': () => import('./views/dashboard.js').then(m => m.render()),
  '#students': () => import('./views/admin.js').then(m => m.render('students')),
  '#teachers': () => import('./views/admin.js').then(m => m.render('teachers')),
  '#grades': () => import('./views/student.js').then(m => m.render()),
  '#schedule': () => import('./views/student.js').then(m => m.render()),
  '#classes': () => import('./views/teacher.js').then(m => m.render()),
};

export const router = {
  init: (el) => {
    rootElement = el;
    window.addEventListener('hashchange', () => {
      currentRoute = window.location.hash || '#login';
      router.render();
    });
    router.render();
  },
  navigate: (hash) => {
    window.location.hash = hash;
  },
  render: async () => {
    const user = JSON.parse(localStorage.getItem('school_portal_user'));
    if (!user && currentRoute !== '#login') {
      window.location.hash = '#login';
      return;
    }
    
    const renderFn = routes[currentRoute] || routes['#login'];
    const html = await renderFn();
    rootElement.innerHTML = html;
    
    // Trigger icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
    
    // Dispatch event for interactivity
    document.dispatchEvent(new CustomEvent('viewRendered', { detail: { route: currentRoute } }));
  }
};
