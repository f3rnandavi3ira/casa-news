import { api, empty, esc, loading, qs, token } from './api.js';
import { updateNav } from './navigation.js';

updateNav();

const grid = qs('#articles-grid');
const newsUrl = (category = '', q = '') => {
  const params = new URLSearchParams({ ...(category && { category }), ...(q && { q }) });
  return `/api/news${params.toString() ? `?${params}` : ''}`;
};

const card = (article, index) => `
  <div class="col-12 col-md-6 col-lg-4">
    <article class="card h-100 shadow-sm border-0">
      ${article.urlToImage ? `<img class="card-img-top article-image" src="${esc(article.urlToImage)}" alt="${esc(article.title)}">` : ''}
      <div class="card-body d-flex flex-column">
        <div class="small text-danger fw-semibold mb-2">${esc(article.source)}</div>
        <h2 class="h6">${esc(article.title)}</h2>
        <p class="small text-secondary line-clamp-3">${esc(article.description)}</p>
        <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
          <span class="small text-secondary">${esc(article.publishedAgo)}</span>
          <div class="d-flex gap-2">
            <a class="btn btn-outline-secondary btn-sm" href="${esc(article.url)}" target="_blank">Lire</a>
            ${token() ? `<button class="btn btn-danger btn-sm" data-save="${index}">Favoris</button>` : ''}
          </div>
        </div>
      </div>
    </article>
  </div>`;

const load = async (category = '', q = '') => {
  loading(grid, 'Chargement des actualites...');
  try {
    const articles = await api(newsUrl(category, q));
    grid.innerHTML = articles.length ? articles.map(card).join('') : '';
    if (!articles.length) empty(grid, 'Aucun article trouve');
    grid.onclick = (event) => {
      const index = event.target.dataset.save;
      if (index !== undefined) save(articles[Number(index)]);
    };
  } catch (error) {
    empty(grid, error.message);
  }
};

const save = async (article) => {
  if (!token()) return window.location.href = '/login.html';
  try {
    await api('/api/favorites', { method: 'POST', auth: true, body: article });
    alert('Article sauvegarde !');
  } catch (error) {
    alert(error.message);
  }
};

qs('#search-btn').addEventListener('click', () => load('', qs('#search-input').value.trim()));
qs('#search-input').addEventListener('keydown', (event) => event.key === 'Enter' && qs('#search-btn').click());

load();
