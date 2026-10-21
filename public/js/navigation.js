import { esc, qs, user, token } from './api.js';

export const updateNav = () => {
  const nav = qs('#nav-links');
  const currentUser = user();
  if (!nav) return;

  nav.innerHTML = 
    `
    <a class="nav-link" href="/shared-articles.html">Articles publiés</a>
    ${
      token() && currentUser ? `
      <a class="nav-link" href="/favorites.html">Mes favoris</a>
      <a class="nav-link" href="/add-article.html">Ajouter</a>
      <a class="nav-link" href="/my-articles.html">Mes articles</a>
      <a class="nav-link mobile-user-option" href="/profile.html"><i class="bi bi-person me-2"></i>Mon profil</a>
      <button class="nav-link mobile-user-option mobile-logout-btn" id="mobile-logout-btn"><i class="bi bi-box-arrow-right me-2"></i>Déconnexion</button>
      <div class="dropdown ms-lg-2 desktop-user-menu">
        <button class="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center user-avatar" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="${esc(currentUser.name)}">
          ${esc(currentUser.name.charAt(0).toUpperCase())}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <div class="dropdown-header">
              <strong>${esc(currentUser.name)}</strong><br>
              <small class="text-secondary">${esc(currentUser.email)}</small>
            </div>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="/profile.html"><i class="bi bi-person me-2"></i>Mon profil</a>
          </li>
          <li>
            <button class="dropdown-item" id="logout-btn"><i class="bi bi-box-arrow-right me-2"></i>Déconnexion</button>
          </li>
        </ul>
      </div>
    ` : `
      <a class="btn btn-outline-light btn-sm ms-lg-2" href="/login.html">Connexion</a>
      <a class="btn btn-danger btn-sm ms-lg-2" href="/register.html">S'inscrire</a>
    `
  }
  `;

  qs('#logout-btn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/';
  });

  qs('#mobile-logout-btn')?.addEventListener('click', () => {
  localStorage.clear();
  window.location.href = '/';
  });
};
