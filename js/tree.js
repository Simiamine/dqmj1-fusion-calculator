// ============================================================
// tree.js — Construction et rendu de l'arbre de fusion complet
// ============================================================

/**
 * Construit récursivement un nœud d'arbre pour un monstre.
 * @param {object} monster
 * @param {object[]} monsters
 * @param {object[]} recipes
 * @param {Set<number>} ancestors - IDs des ancêtres dans cette branche (détection cycles)
 * @param {number} depth - Profondeur actuelle (protection anti-infini)
 * @returns {object} Nœud d'arbre
 */
function buildTreeNode(monster, monsters, recipes, ancestors = new Set(), depth = 0) {
  if (depth > 20) {
    return { monster, cycle: true, branches: [] };
  }

  if (ancestors.has(monster.id)) {
    return { monster, cycle: true, branches: [] };
  }

  // Monstre sauvage (feuille) : pas de descendants
  if (monster.wild) {
    return { monster, wild: true, branches: [] };
  }

  // Recettes connues pour ce monstre
  const knownRecipes = recipes.filter(r => r.result === monster.name);

  if (knownRecipes.length === 0) {
    // Pas de recette connue mais pas wild → obtenu autrement (événement, etc.)
    return { monster, unobtainable: true, branches: [] };
  }

  const newAncestors = new Set(ancestors);
  newAncestors.add(monster.id);

  const branches = knownRecipes.map(recipe => {
    const parentNodes = recipe.parents.map(spec => {
      if (spec.startsWith('family:')) {
        const fam = spec.replace('family:', '');
        return { familySpec: fam };
      }
      const parent = monsters.find(m => m.name === spec);
      if (!parent) return { unknownSpec: spec };
      return buildTreeNode(parent, monsters, recipes, newAncestors, depth + 1);
    });

    const grandparentNodes = recipe.grandparents
      ? recipe.grandparents.map(spec => {
          if (spec.startsWith('family:')) return { familySpec: spec.replace('family:', '') };
          const gp = monsters.find(m => m.name === spec);
          if (!gp) return { unknownSpec: spec };
          return buildTreeNode(gp, monsters, recipes, newAncestors, depth + 1);
        })
      : null;

    return {
      type: recipe.type,
      note: recipe.note,
      parents: parentNodes,
      grandparents: grandparentNodes,
    };
  });

  return { monster, branches };
}

// ---- RENDU HTML --------------------------------------------------------------

/**
 * Render d'un nœud (monstre spécifique ou spec famille).
 * @param {object} node
 * @param {boolean} isRoot
 * @returns {string}
 */
function renderTreeNode(node, isRoot = false) {
  // Spec famille (parent générique)
  if (node.familySpec) {
    return `<div class="tree-summary" style="cursor:default;opacity:0.7">
      <span class="tree-toggle" style="visibility:hidden">▶</span>
      <div class="tree-sprite"><span style="font-size:1.1rem">👾</span></div>
      <div class="tree-monster-info">
        <span class="tree-monster-name">N'importe quel ${node.familySpec}</span>
      </div>
    </div>`;
  }

  // Spec inconnue
  if (node.unknownSpec) {
    return `<div class="tree-summary" style="cursor:default;opacity:0.5">
      <span class="tree-toggle" style="visibility:hidden">▶</span>
      <div class="tree-sprite"><span style="font-size:1.1rem">❓</span></div>
      <div class="tree-monster-info">
        <span class="tree-monster-name">${node.unknownSpec}</span>
      </div>
    </div>`;
  }

  const m = node.monster;
  const nameFr = m.nameFr || m.name;
  const isLeaf = node.wild || node.cycle || node.unobtainable || node.branches.length === 0;

  const statusTag = node.wild
    ? `<span class="tree-wild-label">🌿 Sauvage</span>`
    : node.cycle
    ? `<span class="tree-cycle-label">↩ Cycle</span>`
    : node.unobtainable
    ? `<span class="tree-cycle-label">🔒 Événement</span>`
    : '';

  const summary = `
    <summary class="tree-summary">
      ${!isLeaf ? `<span class="tree-toggle">▶</span>` : `<span class="tree-toggle" style="visibility:hidden">▶</span>`}
      <div class="tree-sprite">${spriteImg(m, 30)}</div>
      <div class="tree-monster-info">
        <span class="tree-monster-name">${nameFr}</span>
        ${m.nameFr ? `<span class="tree-monster-en">${m.name}</span>` : ''}
      </div>
      <span class="badge fam-${m.family}" style="font-size:0.65rem;padding:1px 6px;margin-left:4px">${m.family}</span>
      <span class="badge rank-${m.rank}" style="font-size:0.65rem;padding:1px 6px">${m.rank}</span>
      ${statusTag}
    </summary>`;

  if (isLeaf) {
    return `<details open><div class="tree-node">${summary}</div></details>`;
  }

  const openAttr = isRoot ? 'open' : '';

  // Plusieurs branches : afficher avec séparateur "OU"
  const branchesHtml = node.branches.map((branch, i) => {
    const typeLabel = branch.type === 'quad' ? 'Quadrilinéal' : 'Spécial';
    const noteHtml = branch.note ? ` — ${branch.note}` : '';
    const labelHtml = `<div class="tree-recipe-label">${typeLabel}${noteHtml}</div>`;

    const parentsHtml = branch.parents.map(p => renderTreeNode(p)).join('');

    let gpHtml = '';
    if (branch.grandparents) {
      gpHtml = `<div class="tree-recipe-label" style="color:var(--accent2)">Grands-parents requis</div>`;
      gpHtml += branch.grandparents.map(p => renderTreeNode(p)).join('');
    }

    const divider = i > 0 ? `<div class="tree-or-divider">OU</div>` : '';
    return `${divider}${labelHtml}${parentsHtml}${gpHtml}`;
  }).join('');

  return `<details class="tree-node" ${openAttr}>
    ${summary}
    ${branchesHtml}
  </details>`;
}

/**
 * Point d'entrée : rend l'arbre complet dans un conteneur DOM.
 * @param {string} containerId
 * @param {object} monster - Monstre racine
 * @param {object[]} monsters
 * @param {object[]} recipes
 */
function renderTree(containerId, monster, monsters, recipes) {
  const container = document.getElementById(containerId);
  const root = buildTreeNode(monster, monsters, recipes);
  container.innerHTML = renderTreeNode(root, true);
}
