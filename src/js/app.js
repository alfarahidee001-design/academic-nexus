import { store } from './store.js';
import { router } from './router.js';

export const initApp = (root) => {
  store.init();
  router.init(root);
  
  // Load Lucide icons dynamically
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest';
  script.onload = () => {
    window.lucide.createIcons();
  };
  document.head.appendChild(script);
};
