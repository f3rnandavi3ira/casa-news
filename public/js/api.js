export const token = () => localStorage.getItem('token');
export const user = () => {
  try { return JSON.parse(localStorage.getItem('user') || 'null'); }
  catch { localStorage.removeItem('user'); return null; }
};
export const qs = (selector) => document.querySelector(selector);
export const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&#039;');

export const guard = () => {
  if (!token()) window.location.href = '/login.html';
};

export const api = async (url, { method = 'GET', body, auth = false } = {}) => {
  const res = await fetch(url, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(auth ? { 'Authorization': `Bearer ${token()}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Une erreur est survenue');
  return data;
};

export const loading = (el, text = 'Chargement...') => {
  el.innerHTML = `<div class="text-center text-secondary py-5"><div class="spinner-border spinner-border-sm me-2"></div>${esc(text)}</div>`;
};

export const empty = (el, title, text = '') => {
  el.innerHTML = `<div class="text-center text-secondary py-5"><h2 class="h5 text-dark">${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ''}</div>`;
};
