import { api, empty, guard, qs } from './api.js';
import { updateNav } from './navigation.js';

updateNav();
guard();

const form = qs('#article-form');
const message = qs('#form-message');
const id = new URLSearchParams(location.search).get('id');

const showError = (text) => {
  message.className = 'alert alert-danger';
  message.textContent = text;
};

const load = async () => {
  if (!id) {
    form.classList.add('d-none');
    return showError('Article introuvable');
  }

  try {
    const article = await api(`/api/articles/${id}`, { auth: true });
    qs('#title').value = article.title || '';
    qs('#imageUrl').value = article.imageUrl || '';
    qs('#description').value = article.description || '';
    qs('#content').value = article.content || '';
  } catch (error) {
    form.classList.add('d-none');
    empty(form.parentElement, error.message);
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await api(`/api/articles/${id}`, {
      method: 'PUT',
      auth: true,
      body: Object.fromEntries(new FormData(event.target))
    });
    window.location.href = '/my-articles.html';
  } catch (error) {
    showError(error.message);
  }
});

load();
