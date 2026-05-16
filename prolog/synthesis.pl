% synthesis.pl — Dragon Quest Monsters: Joker 1
% Auto-généré depuis monsters.json et recipes.json
% Source des données : GameFAQs (zenithian66) / Wiki Dragon Quest

:- discontiguous wild/1.
:- discontiguous can_synthesize/3.
:- discontiguous can_synthesize_quad/5.

% ---- Monstres obtenables dans la nature (feuilles de l'arbre) ----
wild(slime).
wild(komodo).
wild(capsichum).
wild(platypunk).
wild(bag_o_laughs).
wild(dracky).
wild(ghost).
wild(bubble_slime).
wild(frou_fry).
wild(wild_boarfish).
wild(mischievous_mole).
wild(shadow).
wild(lips).
wild(firespirit).
wild(shell_slime).
wild(dragonthorn).
wild(crabid).
wild(satyr).
wild(dancing_flame).
wild(winky).
wild(stump_chump).
wild(healslime).
wild(argon_lizard).
wild(chimaera).
wild(hammerhood).
wild(spitnik).
wild(see_urchin).
wild(funghoul).
wild(she_slime).
wild(spiked_hare).
wild(fencing_fox).
wild(imp).
wild(muddy_hand).
wild(khalamari_kid).
wild(chainine).
wild(king_kelp).
wild(lump_wizard).
wild(mummy_boy).
wild(snail_slime).
wild(jargon).
wild(jailcat).
wild(orc).
wild(wax_murderer).
wild(frogface).
wild(skipper).
wild(wild_slime).
wild(green_dragon).
wild(great_sabrecub).
wild(jumping_jackal).
wild(rockbomb).
wild(dancing_devil).
wild(phantom_fencer).
wild(slime_knight).
wild(dragurn).
wild(metal_slime).
wild(hell_hornet).
wild(night_emperor).
wild(headhunter).
wild(flyguy).
wild(metal_slime_knight).
wild(seasaur).
wild(eveel).
wild(weartiger).
wild(mecha_mynah).
wild(lesser_demon).
wild(skeleton).
wild(angel_slime).
wild(behemoth_slime).
wild(bullfinch).
wild(bodkin_archer).
wild(mud_mannequin).
wild(gryphon).
wild(walking_corpse).
wild(dragon_slime).
wild(hacksaurus).
wild(hades_condor).
wild(merman).
wild(great_dracky).
wild(dingaling).
wild(octavian_sentry).
wild(restless_armour).
wild(hellhound).
wild(cureslime).
wild(tyrantosaurus).
wild(treeface).
wild(notso_macho).
wild(puppeteer).
wild(wrecktor).
wild(skeleton_soldier).
wild(dark_slime).
wild(beetleboy).
wild(cockateer).
wild(jum).
wild(lethal_armour).
wild(soulspawn).
wild(dark_slime_knight).
wild(megalodon).
wild(giant_moth).
wild(silvapithecus).
wild(mimic).
wild(stark_raven).
wild(drakularge).
wild(gorerilla).
wild(gigantes).
wild(golem).
wild(jamirus).
wild(king_bubble_slime).
wild(great_dragon).
wild(yabby).
wild(buffalogre).
wild(living_statue).
wild(demon_at_arms).
wild(tortured_soul).
wild(robbin_hood).
wild(captain_crow).
wild(leopold).
wild(empyrea).
wild(trode).

% ---- Recettes de synthèse spéciales ----
% can_synthesize(Résultat, ParentA, ParentB).
% Pour les parents 'family:X', utiliser any_family(X, M) dans les requêtes.

can_synthesize(abyss_diver, seasaur, hades_condor).
can_synthesize(alabast_dragon, mechan_o_wyrm, drakulard).
can_synthesize(anchorman, dingaling, family(demon)).
can_synthesize(archdemon, dessert_demon, notso_macho).
can_synthesize(atlas, gigantes, moosifer).
can_synthesize(atlas, gigantes, garuda).
can_synthesize(atlas, gigantes, boss_troll).
can_synthesize(beetlebully, beetleboy, metal_king_slime).
can_synthesize(belial, archdemon, gold_golem).
can_synthesize(belial, archdemon, dessert_demon).
can_synthesize(belial, archdemon, great_dragon).
can_synthesize(belial, archdemon, atlas).
can_synthesize(beshemoth_slime, behemoth_slime, she_slime).
can_synthesize(black_dragon, great_dragon, bone_baron).
can_synthesize(boe, boh, family(nature)).
can_synthesize(boe, jum, family(nature)).
can_synthesize(boe, mum, family(nature)).
can_synthesize(boh, boe, family(beast)).
can_synthesize(boh, jum, family(beast)).
can_synthesize(boh, mum, family(beast)).
can_synthesize(bone_baron, grim_rider, mohawker).
can_synthesize(bone_baron, grim_rider, dark_slime_knight).
can_synthesize(boss_troll, gigantes, buffalogre).
can_synthesize(boss_troll, gigantes, diemon).
can_synthesize(boss_troll, buffalogre, diemon).
can_synthesize(brownie, hammerhood, family(nature)).
can_synthesize(cannibox, goodybag, goodybag).
can_synthesize(demonrider, skelegon, skeleton).
can_synthesize(demonrider, skelegon, phantom_fencer).
can_synthesize(demonrider, skelegon, slime_knight).
can_synthesize(dessert_demon, imp, dancing_devil).
can_synthesize(dhoulmagus, alabast_dragon, psaro).
can_synthesize(dhoulmagus, alabast_dragon, estark).
can_synthesize(dhoulmagus, dragonlord, psaro).
can_synthesize(dhoulmagus, dragonlord, estark).
can_synthesize(drake_slime, slime, family(dragon)).
can_synthesize(dragovian_lord, rhapthorne_ii, dragonlord).
can_synthesize(drakulard, drakularge, atlas).
can_synthesize(drakulard, drakularge, pazuzu).
can_synthesize(dullahan, bone_baron, phantom_fencer).
can_synthesize(dullahan, bone_baron, tortured_soul).
can_synthesize(estark, psaro, beetlebully).
can_synthesize(fallen_priest, wrecktor, puppeteer).
can_synthesize(frostburn, dancing_flame, silvapithecus).
can_synthesize(frou_fry, argon_lizard, family(beast)).
can_synthesize(gargoyle, lesser_demon, family(beast)).
can_synthesize(garuda, hades_condor, jamirus).
can_synthesize(gold_golem, golem, drakularge).
can_synthesize(goodybag, bag_o_laughs, bag_o_laughs).
can_synthesize(gracos, merman, archdemon).
can_synthesize(gracos, octavian_sentry, archdemon).
can_synthesize(grim_rider, demonrider, restless_armour).
can_synthesize(heligator, king_squid, gracos).
can_synthesize(hunter_mech, metal_slime_knight, lethal_armour).
can_synthesize(killing_machine, hunter_mech, mechan_o_wyrm).
can_synthesize(killing_machine, hunter_mech, phantom_swordsman).
can_synthesize(king_cureslime, king_slime, king_slime).
can_synthesize(king_slime, behemoth_slime, behemoth_slime).
can_synthesize(king_squid, khalamari_kid, night_clubber).
can_synthesize(king_squid, yabby, gracos).
can_synthesize(liquid_metal_slime, metal_slime, metal_slime).
can_synthesize(malroth, demon_at_arms, living_statue).
can_synthesize(malroth, demon_at_arms, buffalogre).
can_synthesize(mechan_o_wyrm, metal_dragon, great_dragon).
can_synthesize(metal_dragon, metal_slime_knight, red_dragon).
can_synthesize(metal_dragon, hunter_mech, red_dragon).
can_synthesize(mohawker, buffalogre, wild_slime).
can_synthesize(mohawker, buffalogre, great_sabrecat).
can_synthesize(mohawker, buffalogre, bone_baron).
can_synthesize(moosifer, pan_piper, buffalogre).
can_synthesize(moosifer, satyr, buffalogre).
can_synthesize(mortamor, nimzo, estark).
can_synthesize(mum, boe, family(material)).
can_synthesize(mum, boh, family(material)).
can_synthesize(mum, jum, family(material)).
can_synthesize(nardragon, komodo, family(material)).
can_synthesize(night_clubber, boss_troll, frou_frou).
can_synthesize(night_clubber, boss_troll, pazuzu).
can_synthesize(night_clubber, boss_troll, drakularge).
can_synthesize(nimzo, drakulard, malroth).
can_synthesize(orgodemir, alabast_dragon, mortamor).
can_synthesize(orgodemir, dragonlord, mortamor).
can_synthesize(pan_piper, satyr, dingaling).
can_synthesize(pazuzu, silvapithecus, jamirus).
can_synthesize(pazuzu, silvapithecus, gigantes).
can_synthesize(pazuzu, silvapithecus, golem).
can_synthesize(pazuzu, silvapithecus, king_squid).
can_synthesize(phantom_swordsman, skeleton_soldier, skeleton_soldier).
can_synthesize(psaro, roseguardin, ruin).
can_synthesize(red_dragon, green_dragon, family(beast)).
can_synthesize(rhapthorne, dhoulmagus, nimzo).
can_synthesize(rhapthorne_ii, rhapthorne, zoma).
can_synthesize(rhapthorne_ii, rhapthorne, orgodemir).
can_synthesize(riptide, jumping_jackal, heligator).
can_synthesize(roseguardin, lethal_armour, bone_baron).
can_synthesize(roseguardin, lethal_armour, riptide).
can_synthesize(ruin, gold_golem, mumboh_jumboe).
can_synthesize(ruin, living_statue, mumboh_jumboe).
can_synthesize(scorpion, crabid, chimaera).
can_synthesize(scissor_beatle, yabby, scorpion).
can_synthesize(sea_dragon, eveel, seasaur).
can_synthesize(skelegon, green_dragon, family(undead)).
can_synthesize(skelegon, hacksaurus, family(undead)).
can_synthesize(snapdragon, dragonthorn, family(undead)).
can_synthesize(wailin_weed, king_kelp, phantom_swordsman).
can_synthesize(wight_king, tortured_soul, king_slime).
can_synthesize(wight_king, tortured_soul, king_bubble_slime).
can_synthesize(zoma, malroth, wight_king).
can_synthesize(zoma, malroth, dullahan).
can_synthesize(zoma, malroth, bone_baron).
can_synthesize(wulfspade, incarnus, family(nature)).  % Rank B or less
can_synthesize(hawkhart, incarnus, family(demon)).  % Rank B or less
can_synthesize(cluboon, incarnus, family(material)).  % Rank B or less
can_synthesize(diamagon, incarnus, family(beast)).  % Rank B or less
can_synthesize(wulfspade_ace, incarnus, family(nature)).  % Rank A or better
can_synthesize(hawkhart_ace, incarnus, family(demon)).  % Rank A or better
can_synthesize(cluboon_ace, incarnus, family(material)).  % Rank A or better
can_synthesize(diamagon_ace, incarnus, family(beast)).  % Rank A or better
can_synthesize(ace_of_spades, wulfspade_ace, leopold).
can_synthesize(wildcard, wulfspade_ace, empyrea).

% ---- Recettes quadrilinéales ----
% can_synthesize_quad(Résultat, ParentA, ParentB, GrandParentA, GrandParentB).

can_synthesize_quad(darkonium_slime, beshemoth_slime, beshemoth_slime, king_cureslime, metal_king_slime).
can_synthesize_quad(diemon, winky, winky, winky, winky).
can_synthesize_quad(don_mole, mischievous_mole, mischievous_mole, night_clubber, night_clubber).
can_synthesize_quad(dr_snapped, rhapthorne_ii, orgodemir, captain_crow, darkonium_slime).
can_synthesize_quad(dragonlord, alabast_dragon, gem_slime, alabast_dragon, captain_crow).
can_synthesize_quad(frou_frou, frou_fry, frou_fry, frou_fry, great_argon_lizard).
can_synthesize_quad(gem_slime, grandpa_slime, grandpa_slime, gold_golem, gold_golem).
can_synthesize_quad(grandpa_slime, king_slime, metal_king_slime, king_bubble_slime, metal_kaiser_slime).
can_synthesize_quad(great_argon_lizard, argon_lizard, argon_lizard, argon_lizard, argon_lizard).
can_synthesize_quad(great_sabrecat, great_sabrecub, great_sabrecub, great_sabrecub, great_sabrecub).
can_synthesize_quad(khalamari, khalamari_kid, khalamari_kid, king_squid, king_squid).
can_synthesize_quad(king_slime, slime, slime, slime, slime).
can_synthesize_quad(metal_kaiser_slime, metal_slime, metal_slime, liquid_metal_slime, metal_slime_knight).
can_synthesize_quad(metal_kaiser_slime, king_slime, metal_king_slime, liquid_metal_slime, metal_slime_knight).
can_synthesize_quad(metal_king_slime, liquid_metal_slime, liquid_metal_slime, liquid_metal_slime, liquid_metal_slime).
can_synthesize_quad(mumboh_jumboe, mum, boh, jum, boe).
can_synthesize_quad(trap_box, mimic, mimic, cannibox, metal_kaiser_slime).

% ---- Règles de recherche ----

% Vérifie si un monstre appartient à une famille
% (nécessite d'étendre avec les faits de famille si besoin)

% Trouver tous les parents directs possibles d'un monstre
parents_of(Result, A, B) :-
    can_synthesize(Result, A, B).
parents_of(Result, A, B) :-
    can_synthesize(Result, B, A),
    A \= B.

% Un monstre est obtainable s'il est sauvage ou synthétisable
obtainable(M) :- wild(M).
obtainable(M) :- can_synthesize(M, _, _).
obtainable(M) :- can_synthesize_quad(M, _, _, _, _).

% Exemple de requête :
%   ?- parents_of(estark, A, B).
%   ?- obtainable(salmigondis).
%   ?- can_synthesize_quad(salmigondis, P1, P2, GP1, GP2).
