// ============================================================
// fusion.js — Logique de calcul des fusions (spéciale + générique)
// ============================================================

// Table synthèse générique : famille A × famille B → famille du 3e résultat
const GENERIC_THIRD = {
  Slime:    { Dragon:"Material", Nature:"Nature",   Beast:"Undead",   Material:"Demon",    Demon:"Undead",   Undead:"Beast" },
  Dragon:   { Slime:"Material",  Nature:"Beast",    Beast:"Material", Material:"Demon",    Demon:"Undead",   Undead:"Slime" },
  Nature:   { Slime:"Nature",    Dragon:"Beast",    Beast:"Dragon",   Material:"Beast",    Demon:"Slime",    Undead:"Demon" },
  Beast:    { Slime:"Undead",    Dragon:"Material", Nature:"Dragon",  Material:"Nature",   Demon:"Dragon",   Undead:"Material" },
  Material: { Slime:"Demon",     Dragon:"Demon",    Nature:"Beast",   Beast:"Nature",      Demon:"Nature",   Undead:"Slime" },
  Demon:    { Slime:"Undead",    Dragon:"Undead",   Nature:"Slime",   Beast:"Dragon",      Material:"Nature",Undead:"Nature" },
  Undead:   { Slime:"Beast",     Dragon:"Slime",    Nature:"Demon",   Beast:"Material",    Material:"Slime", Demon:"Nature" },
};

/**
 * Vérifie si un monstre correspond à une spécification parent.
 * @param {object} monster
 * @param {string} spec - "MonsterName" ou "family:FamilyName"
 * @returns {boolean}
 */
function matchesParent(monster, spec) {
  if (spec.startsWith('family:')) {
    return monster.family === spec.replace('family:', '');
  }
  return monster.name === spec;
}

/**
 * Vérifie si une recette est satisfaite par (a, b) dans n'importe quel ordre.
 * @param {object} a
 * @param {object} b
 * @param {object} recipe
 * @returns {boolean}
 */
function recipeMatches(a, b, recipe) {
  const [pA, pB] = recipe.parents;
  return (matchesParent(a, pA) && matchesParent(b, pB)) ||
         (matchesParent(a, pB) && matchesParent(b, pA));
}

/**
 * Synthèse générique — même famille.
 * Retourne jusqu'à 2 résultats (les génériques avec ID > max(a.id, b.id)).
 * @param {object} a
 * @param {object} b
 * @param {object[]} monsters
 * @returns {object[]}
 */
function genericSameFamily(a, b, monsters) {
  const highId = Math.max(a.id, b.id);
  const generics = monsters
    .filter(m => m.family === a.family)
    .sort((x, y) => x.id - y.id);

  const results = [];
  for (const m of generics) {
    if (m.id > highId && results.length < 2) {
      results.push(m);
    }
  }
  return results;
}

/**
 * Synthèse générique — familles différentes.
 * Retourne [résultat famille A, résultat famille B, 3e résultat] avec ID > max.
 * @param {object} a
 * @param {object} b
 * @param {object[]} monsters
 * @returns {{ monster: object, label: string }[]}
 */
function genericDifferentFamilies(a, b, monsters) {
  const highId = Math.max(a.id, b.id);
  const results = [];

  const famANext = monsters
    .filter(m => m.family === a.family)
    .sort((x, y) => x.id - y.id)
    .find(m => m.id > highId);
  if (famANext) results.push({ monster: famANext, label: `Résultat ${a.family}` });

  const famBNext = monsters
    .filter(m => m.family === b.family)
    .sort((x, y) => x.id - y.id)
    .find(m => m.id > highId);
  if (famBNext && famBNext.id !== famANext?.id) {
    results.push({ monster: famBNext, label: `Résultat ${b.family}` });
  }

  const thirdFam = GENERIC_THIRD[a.family]?.[b.family];
  if (thirdFam) {
    const thirdNext = monsters
      .filter(m => m.family === thirdFam)
      .sort((x, y) => x.id - y.id)
      .find(m => m.id > highId);
    if (thirdNext) {
      results.push({ monster: thirdNext, label: `3e résultat (${thirdFam})` });
    }
  }

  return results;
}

/**
 * Point d'entrée principal : calcule tous les résultats de fusion entre a et b.
 * @param {object} a
 * @param {object} b
 * @param {object[]} monsters
 * @param {object[]} recipes
 * @returns {{ specials: object[], generics: object[] }}
 */
function computeFusion(a, b, monsters, recipes) {
  const specials = [];
  const seen = new Set();

  // Chercher toutes les recettes spéciales/quad qui matchent
  for (const recipe of recipes) {
    if (!recipeMatches(a, b, recipe)) continue;
    const result = monsters.find(m => m.name === recipe.result);
    if (!result || seen.has(result.id)) continue;
    seen.add(result.id);
    specials.push({ monster: result, recipe, typeLabel: recipe.type === 'quad' ? 'Quadrilinéal' : 'Spécial' });
  }

  const generics = [];

  if (a.family === 'Incarni' || b.family === 'Incarni') {
    return { specials, generics };
  }

  if (a.family === b.family) {
    const results = genericSameFamily(a, b, monsters);
    for (const m of results) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        generics.push({ monster: m, label: 'Générique (même famille)' });
      }
    }
  } else {
    const results = genericDifferentFamilies(a, b, monsters);
    for (const { monster: m, label } of results) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        generics.push({ monster: m, label });
      }
    }
  }

  return { specials, generics };
}

/**
 * Retourne toutes les recettes pour obtenir un monstre cible.
 * @param {object} target
 * @param {object[]} recipes
 * @returns {object[]}
 */
function getRecipesForTarget(target, recipes) {
  return recipes.filter(r => r.result === target.name);
}

/**
 * Vérifie si un monstre est obtenu par synthèse générique (rang F-A + famille standard).
 * @param {object} monster
 * @returns {boolean}
 */
function isGenericMonster(monster) {
  const genericFamilies = new Set(['Slime','Dragon','Nature','Beast','Material','Demon','Undead']);
  return genericFamilies.has(monster.family) && ['F','E','D','C','B','A'].includes(monster.rank);
}
