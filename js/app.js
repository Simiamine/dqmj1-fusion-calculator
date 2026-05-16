// ============================================================
// app.js — Initialisation, état global, tabs, orchestration
// ============================================================

// ---- ÉTAT GLOBAL ------------------------------------------------------------
let MONSTERS = [];
let RECIPES = [];
let selectedA = null;
let selectedB = null;
let selectedTarget = null;
let listFamilyFilter = null;

const byId = {};
const byName = {};

// ---- CHARGEMENT DES DONNÉES -------------------------------------------------
async function loadData() {
  const [monstersRes, recipesRes] = await Promise.all([
    fetch('data/monsters.json'),
    fetch('data/recipes.json'),
  ]);
  MONSTERS = await monstersRes.json();
  RECIPES = await recipesRes.json();

  MONSTERS.forEach(m => {
    byId[m.id] = m;
    byName[m.name.toLowerCase()] = m;
  });

  initList();
  initDropdowns();
}

// ---- TABS -------------------------------------------------------------------
function switchTab(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  const idx = ['fusion', 'reverse', 'list'].indexOf(name);
  document.querySelectorAll('.tab')[idx]?.classList.add('active');
}

// ---- DROPDOWNS --------------------------------------------------------------
function initDropdowns() {
  ['A', 'B', 'T'].forEach(side => {
    const input = document.getElementById(`search${side}`);
    input.addEventListener('input', () => openDropdown(side, MONSTERS, m => onMonsterSelect(side, m)));
    input.addEventListener('focus', () => openDropdown(side, MONSTERS, m => onMonsterSelect(side, m)));
    input.addEventListener('blur', () => closeDropdown(side));
  });
}

function onMonsterSelect(side, monster) {
  if (side === 'A') {
    selectedA = monster;
    renderPreview('previewA', monster);
    updateFuseBtn();
  } else if (side === 'B') {
    selectedB = monster;
    renderPreview('previewB', monster);
    updateFuseBtn();
  } else if (side === 'T') {
    selectedTarget = monster;
    renderReverseResult();
    renderTree('treeContainer', monster, MONSTERS, RECIPES);
  }
}

// Appelé depuis ui.js via le HTML inline du dropdown
function onComboPartClick(id) {
  const m = byId[id];
  if (!m) return;
  selectedTarget = m;
  document.getElementById('searchT').value = m.nameFr || m.name;
  switchTab('reverse');
  renderReverseResult();
  renderTree('treeContainer', m, MONSTERS, RECIPES);
}

// ---- FUSION CALCULATOR ------------------------------------------------------
function updateFuseBtn() {
  const btn = document.getElementById('fuseBtn');
  btn.disabled = !(selectedA && selectedB);
  if (selectedA && selectedB) runFusion();
}

function runFusion() {
  const { specials, generics } = computeFusion(selectedA, selectedB, MONSTERS, RECIPES);
  const section = document.getElementById('fusionResult');

  if (specials.length === 0 && generics.length === 0) {
    section.innerHTML = `
      <p class="result-title">Résultats possibles</p>
      <div class="empty-state">Aucun résultat trouvé.<br>Essaie d'autres combinaisons.</div>`;
    return;
  }

  let html = '';

  if (specials.length > 0) {
    html += `<p class="result-title">✨ Résultats spéciaux / quadrilinéaux</p>
    <div class="result-cards">`;
    specials.forEach(({ monster: m, recipe, typeLabel }) => {
      const note = recipe?.note ? `<span style="font-size:0.72rem;color:var(--text2)">${recipe.note}</span>` : '';
      html += `<div class="result-card" onclick="onComboPartClick(${m.id})">
        <div class="sprite-box" style="width:60px;height:60px">${spriteImg(m, 54)}</div>
        <span class="monster-name" style="font-size:0.9rem">${m.nameFr || m.name}</span>
        ${m.nameFr ? `<span class="monster-name-en">${m.name}</span>` : ''}
        <div class="badge-row">
          ${familyBadge(m.family, m.familyFr)}
          ${rankBadge(m.rank)}
        </div>
        <span class="type-label">${typeLabel}</span>
        ${note}
      </div>`;
    });
    html += '</div>';
  }

  if (generics.length > 0) {
    html += `<p class="result-title" style="margin-top:24px">🎲 Résultats génériques possibles</p>
    <div class="result-cards">`;
    generics.forEach(({ monster: m, label }) => {
      html += `<div class="result-card generic" onclick="onComboPartClick(${m.id})">
        <div class="sprite-box" style="width:60px;height:60px">${spriteImg(m, 54)}</div>
        <span class="monster-name" style="font-size:0.9rem">${m.nameFr || m.name}</span>
        ${m.nameFr ? `<span class="monster-name-en">${m.name}</span>` : ''}
        <div class="badge-row">
          ${familyBadge(m.family, m.familyFr)}
          ${rankBadge(m.rank)}
        </div>
        <span class="type-label">${label}</span>
      </div>`;
    });
    html += '</div>';
    html += `<p style="color:var(--text2);font-size:0.78rem;margin-top:10px">
      ⚠️ Résultats génériques estimés. D'autres résultats sont possibles selon les IDs exacts.</p>`;
  }

  section.innerHTML = html;
}

// ---- REVERSE LOOKUP ---------------------------------------------------------
function renderReverseResult() {
  const target = selectedTarget;
  const section = document.getElementById('reverseResult');
  if (!target) { section.innerHTML = ''; return; }

  const targetRecipes = getRecipesForTarget(target, RECIPES);
  const isGeneric = isGenericMonster(target);

  let html = `<div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
    <div class="sprite-box" style="width:80px;height:80px">${spriteImg(target, 72)}</div>
    <div>
      <div style="font-size:1.2rem;font-weight:700">#${target.id} ${target.nameFr || target.name}</div>
      ${target.nameFr ? `<div style="font-size:0.85rem;color:var(--text2)">${target.name}</div>` : ''}
      <div class="badge-row" style="margin-top:8px">
        ${familyBadge(target.family, target.familyFr)} ${rankBadge(target.rank)}
      </div>
    </div>
  </div>`;

  if (target.wild && targetRecipes.length === 0) {
    html += `<div class="combo-row"><span class="combo-type">Sauvage</span>
      <span>Ce monstre se trouve dans la nature, pas de recette de synthèse nécessaire.</span></div>`;
    section.innerHTML = html;
    return;
  }

  if (!isGeneric && targetRecipes.length === 0) {
    html += `<div class="empty-state">Ce monstre ne peut pas être obtenu par synthèse.<br>
      Il est obtenu via un événement ou est unobtainable.</div>`;
    section.innerHTML = html;
    return;
  }

  if (targetRecipes.length > 0) {
    html += `<p class="result-title" style="margin-bottom:12px">Recettes connues</p>
    <div class="combos-list">`;
    targetRecipes.forEach(recipe => {
      const typeLabel = recipe.type === 'quad' ? 'Quadrilinéal' : 'Spécial';
      const [pA, pB] = recipe.parents;
      const partA = renderComboParent(pA, MONSTERS, onComboPartClick);
      const partB = renderComboParent(pB, MONSTERS, onComboPartClick);

      let gpHtml = '';
      if (recipe.grandparents) {
        const [gA, gB] = recipe.grandparents;
        const gpA = renderComboParent(gA, MONSTERS, onComboPartClick);
        const gpB = renderComboParent(gB, MONSTERS, onComboPartClick);
        gpHtml = `<span style="color:var(--text2)">&&</span> ${gpA} <span class="combo-plus">+</span> ${gpB}`;
      }
      const noteHtml = recipe.note ? `<span style="color:var(--text2);font-size:0.78rem">(${recipe.note})</span>` : '';

      html += `<div class="combo-row">
        <span class="combo-type">${typeLabel}</span>
        ${partA} <span class="combo-plus">+</span> ${partB}
        ${gpHtml} ${noteHtml}
      </div>`;
    });
    html += '</div>';
  }

  if (isGeneric) {
    html += `<div style="margin-top:${targetRecipes.length ? '20px' : '0'}">
      <p class="result-title" style="margin-bottom:8px">Synthèse générique</p>
      <div class="combo-row">
        <span class="combo-type">Générique</span>
        <span>Utilise deux monstres avec un ID maximum inférieur à <strong>#${target.id}</strong>
          dont au moins un appartient à la famille <strong>${target.familyFr || target.family}</strong>.</span>
      </div>
    </div>`;
  }

  section.innerHTML = html;
}

// ---- MONSTER LIST -----------------------------------------------------------
const FAMILIES = ['Slime','Dragon','Nature','Beast','Material','Demon','Undead','Incarni'];

function initList() {
  const bar = document.getElementById('familyFilters');
  bar.innerHTML = `<button class="filter-btn active" onclick="setFamilyFilter(null,this)">Tous</button>` +
    FAMILIES.map(f => `<button class="filter-btn" onclick="setFamilyFilter('${f}',this)">${f}</button>`).join('');
  renderList();
}

function setFamilyFilter(fam, btn) {
  listFamilyFilter = fam;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderList();
}

function renderList() {
  const q = document.getElementById('listSearch').value.toLowerCase().trim();
  let filtered = MONSTERS;
  if (listFamilyFilter) filtered = filtered.filter(m => m.family === listFamilyFilter);
  if (q) filtered = filtered.filter(m =>
    m.name.toLowerCase().includes(q) ||
    (m.nameFr && m.nameFr.toLowerCase().includes(q))
  );

  document.getElementById('monsterGrid').innerHTML = filtered.map(m => `
    <div class="monster-tile" onclick="goToMonster(${m.id})">
      <div class="sprite-box" style="width:54px;height:54px">${spriteImg(m, 48)}</div>
      <span class="id">#${m.id}</span>
      <span class="name">${m.nameFr || m.name}</span>
      ${m.nameFr ? `<span class="name-en">${m.name}</span>` : ''}
      <div class="badge-row">
        ${familyBadge(m.family, m.familyFr)}
        ${rankBadge(m.rank)}
      </div>
    </div>`).join('');
}

function goToMonster(id) {
  const m = byId[id];
  if (!m) return;
  selectedTarget = m;
  document.getElementById('searchT').value = m.nameFr || m.name;
  switchTab('reverse');
  renderReverseResult();
  renderTree('treeContainer', m, MONSTERS, RECIPES);
}

// ---- INIT -------------------------------------------------------------------
loadData();
