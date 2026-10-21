import { api, empty, esc, guard, loading, qs} from './api.js';
import { updateNav } from './navigation.js';

updateNav();

const params = new URLSearchParams(location.search);
const id = params.get('id');
const isShared = params.get('shared') === 'true';
const detail = qs('#article-detail');

if (!isShared) {
  guard();
}

const load = async () => {
  loading(detail);
  if (!id) {
    return empty(detail, 'Article introuvable');
  }

  try {
    const article = isShared
      ? await api(`/api/articles/shared/${id}`)
      : await api(`/api/articles/${id}`, {
          auth: true
        });

    detail.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-12 col-lg-9">
          <a class="btn btn-outline-secondary btn-sm mb-3" href="${isShared ? '/shared-articles.html' : '/my-articles.html'}">Retour</a>
          <article class="card shadow-sm border-0 overflow-hidden">
            <img class="article-detail-image" src="${esc(article.imageUrl)}" alt="${esc(article.title)}">
            <div class="card-body p-4">
              <div class="small text-danger fw-semibold mb-2">${new Date(article.createdAt).toLocaleDateString('fr-FR')}</div>
              <div class="small text-secondary mb-3">Par ${esc(article.authorName)}</div>
              <h1 class="h2">${esc(article.title)}</h1>
              <p class="lead text-secondary">${esc(article.description)}</p>
              <div class="pre-line">${esc(article.content || 'Aucun contenu ajoute.')}</div>
            </div>
          </article>
        </div>
      </div>
    `;
  } catch (error) {
    empty(detail, error.message);
  }
};

load();