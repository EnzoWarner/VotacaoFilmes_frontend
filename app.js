const API = (() => {
  if (location.protocol === 'file:') {
    alert('Para funcionar corretamente, abra este arquivo através de um servidor web (ex: Live Server do VSCode)');
    return 'http://localhost:3000/api';
  }
  return (location.hostname === 'localhost' || location.hostname === '127.0.0.1') 
    ? 'http://localhost:3000/api' 
    : window.location.origin + '/api';
})();

async function fetchItems() {
  try {
    const res = await fetch(API + '/items');
    return await res.json();
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    document.getElementById('cards').innerHTML = `
      <div style="text-align:center;padding:20px;color:var(--muted)">
        Erro ao carregar dados. Verifique se:
        <br>1. Você está acessando via servidor web (ex: Live Server)
        <br>2. O backend está rodando em http://localhost:3000
      </div>`;
    return [];
  }
}

async function addItem(payload) {
  const res = await fetch(API + '/items', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  return res.json();
}

async function voteItem(id, action) {
  const res = await fetch(API + `/items/${id}/vote`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({action})});
  return res.json();
}

async function resetSeed() {
  const res = await fetch(API + '/reset', {method:'POST'});
  return res.json();
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function render(items) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${escapeHtml(item.imagem)}" alt="Imagem de ${escapeHtml(item.titulo)}" onerror="this.src='https://via.placeholder.com/600x340?text=Sem+Imagem'">
      <div class="meta">
        <div class="genre">${escapeHtml(item.genero)}</div>
        <h3>${escapeHtml(item.titulo)}</h3>
        <p>${escapeHtml(item.descricao || '')}</p>
      </div>
      <div class="votes">
        <button class="btn btn-like" data-action="like" data-id="${item.id}">Gostei</button>
        <span class="count" id="like-${item.id}">${item.gostei ?? 0}</span>
        <button class="btn btn-dislike" data-action="dislike" data-id="${item.id}">Não Gostei</button>
        <span class="count" id="dislike-${item.id}">${item.naoGostei ?? 0}</span>
      </div>
    `;
    container.appendChild(card);
  });

  const totals = items.reduce((acc, it) => { acc.like += Number(it.gostei || 0); acc.dislike += Number(it.naoGostei || 0); return acc; }, { like:0, dislike:0});
  document.getElementById('total-like').textContent = totals.like;
  document.getElementById('total-dislike').textContent = totals.dislike;

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      await voteItem(id, action);
      loadAndRender();
    });
  });
}

async function loadAndRender() {
  const items = await fetchItems();
  render(items);
}

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const genre = document.getElementById('genre').value.trim();
  const image = document.getElementById('image').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!title || !genre || !image) { alert('Por favor preencha Título, Gênero e Imagem (URL).'); return; }
  await addItem({titulo:title, genero:genre, imagem:image, descricao:description});
  e.target.reset();
  loadAndRender();
});

document.getElementById('resetSeed').addEventListener('click', async () => {
  if (!confirm('Deseja restaurar os 5 itens iniciais e apagar os dados atuais?')) return;
  await resetSeed();
  loadAndRender();
});

// initial load
loadAndRender();
// initial load
loadAndRender();
// initial load
loadAndRender();
// initial load
loadAndRender();
