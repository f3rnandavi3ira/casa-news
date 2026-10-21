import { api, guard, qs } from './api.js';
import { updateNav } from './navigation.js';

updateNav();
guard();

const msg = qs('#form-message');

qs('#article-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await api('/api/articles', {
      method: 'POST',
      auth: true,
      body: Object.fromEntries(new FormData(event.target))
    });
    window.location.href = '/my-articles.html';
  } catch (error) {
    msg.className = 'alert alert-danger';
    msg.textContent = error.message;
  }
});
