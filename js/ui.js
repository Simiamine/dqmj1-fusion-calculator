// ============================================================
// ui.js — Composants partagés : sprites, badges, dropdown
// ============================================================

/**
 * Génère l'URL du sprite Fandom pour un monstre.
 * Le CDN Wikia (static.wikia.nocookie.net) ne bloque pas les requêtes cross-origin.
 * @param {string} name - Nom EN du monstre
 * @returns {string}
 */
function spriteUrl(name) {
  const slug = name
    .replace(/'/g, '%27')
    .replace(/ /g, '_')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\-/g, '-');
  return `https://dqmj.fandom.com/wiki/Special:FilePath/${slug}.png`;
}

/**
 * HTML d'une image sprite avec fallback emoji.
 * @param {object} monster
 * @param {number} size - Taille max en px
 * @returns {string}
 */
function spriteImg(monster, size = 64) {
  const url = spriteUrl(monster.name);
  return `<img src="${url}" alt="${monster.nameFr || monster.name}"
    style="max-width:${size}px;max-height:${size}px;image-rendering:pixelated;object-fit:contain;"
    onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
    <span style="display:none;font-size:${Math.floor(size * 0.5)}px">🐉</span>`;
}

/**
 * Badge coloré selon la famille.
 * @param {string} family - Famille EN (ex: "Slime")
 * @param {string} [familyFr] - Famille FR optionnelle
 * @returns {string}
 */
function familyBadge(family, familyFr) {
  const label = familyFr || family;
  return `<span class="badge fam-${family}">${label}</span>`;
}

/**
 * Badge coloré selon le rang.
 * @param {string} rank
 * @returns {string}
 */
function rankBadge(rank) {
  const cls = rank ? `rank-${rank}` : 'rank-none';
  return `<span class="badge ${cls}">Rang ${rank || '?'}</span>`;
}

/**
 * Rendu complet de la preview d'un monstre (sprite + nom + badges).
 * @param {string} containerId
 * @param {object|null} monster
 */
function renderPreview(containerId, monster) {
  const el = document.getElementById(containerId);
  if (!monster) {
    el.innerHTML = `
      <div class="sprite-box"><span class="no-sprite">?</span></div>
      <span class="monster-name" style="color:var(--text2)">Aucun monstre sélectionné</span>`;
    return;
  }
  el.innerHTML = `
    <div class="sprite-box">${spriteImg(monster)}</div>
    <span class="monster-name">${monster.nameFr || monster.name}</span>
    ${monster.nameFr ? `<span class="monster-name-en">${monster.name}</span>` : ''}
    <div class="badge-row">
      ${familyBadge(monster.family, monster.familyFr)}
      ${rankBadge(monster.rank)}
    </div>`;
}

// ---- DROPDOWN ----------------------------------------------------------------

/**
 * Ouvre et peuple un dropdown de recherche.
 * @param {string} side - 'A', 'B' ou 'T'
 * @param {object[]} monsters - Liste complète des monstres
 * @param {Function} onSelect - Callback(monster)
 */
function openDropdown(side, monsters, onSelect) {
  const input = document.getElementById(`search${side}`);
  const drop = document.getElementById(`drop${side}`);
  const q = input.value.toLowerCase().trim();

  const filtered = q.length === 0
    ? monsters.slice(0, 30)
    : monsters.filter(m =>
        m.name.toLowerCase().includes(q) ||
        (m.nameFr && m.nameFr.toLowerCase().includes(q))
      ).slice(0, 40);

  drop.innerHTML = filtered.map(m => `
    <div class="dropdown-item" onmousedown="event.preventDefault();dropSelect('${side}',${m.id})">
      <div style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;">
        ${spriteImg(m, 26)}
      </div>
      <div style="display:flex;flex-direction:column;flex:1;min-width:0;">
        <span style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.nameFr || m.name}</span>
        ${m.nameFr ? `<span style="font-size:0.72rem;color:var(--text2)">${m.name}</span>` : ''}
      </div>
      <span class="badge fam-${m.family}" style="font-size:0.65rem;padding:1px 5px;margin-left:4px;flex-shrink:0">${m.family}</span>
      <span class="badge rank-${m.rank}" style="font-size:0.65rem;padding:1px 5px;flex-shrink:0">R${m.rank}</span>
    </div>`).join('');

  drop.classList.add('open');

  // Stocker le callback sur l'élément pour y accéder depuis dropSelect
  drop._onSelect = onSelect;
  drop._monsters = monsters;
}

function closeDropdown(side) {
  setTimeout(() => {
    const drop = document.getElementById(`drop${side}`);
    if (drop) drop.classList.remove('open');
  }, 150);
}

// Appelé depuis le HTML inline du dropdown
function dropSelect(side, id) {
  const drop = document.getElementById(`drop${side}`);
  const monster = (drop._monsters || []).find(m => m.id === id);
  if (!monster) return;
  const input = document.getElementById(`search${side}`);
  input.value = monster.nameFr || monster.name;
  drop.classList.remove('open');
  if (drop._onSelect) drop._onSelect(monster);
}

/**
 * Rendu d'un parent de combo (monstre spécifique ou famille entière).
 * @param {string} spec - Nom EN ou "family:Famille"
 * @param {object[]} monsters
 * @param {Function} onClickMonster - Callback(monster)
 * @returns {string}
 */
function renderComboParent(spec, monsters, onClickMonster) {
  if (spec.startsWith('family:')) {
    const fam = spec.replace('family:', '');
    return `<span class="badge fam-${fam}" style="padding:4px 10px;font-size:0.82rem">N'importe quel ${fam}</span>`;
  }
  const m = monsters.find(x => x.name === spec);
  if (!m) return `<span>${spec}</span>`;
  const nameFr = m.nameFr || m.name;
  return `<div class="combo-part" onclick="onComboPartClick(${m.id})">
    <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;overflow:hidden">${spriteImg(m, 22)}</div>
    <span style="font-weight:600">${nameFr}</span>
    ${m.nameFr ? `<span style="font-size:0.7rem;color:var(--text2)">${m.name}</span>` : ''}
  </div>`;
}
