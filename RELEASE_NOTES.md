# Blue Sky Realm: tester build release notes

Version: beta 2 (30 October 2026). Single offline game; saves live in the browser or on the PC under your account.

## Update: 9 November 2026 (gear)

**Everything you equip now shows on your hero**
- All 22,320 equippable items have a 3D model, built from each item's type, material colour, grade and rarity: 21 weapon families (swords, katanas, rapiers, daggers, axes, hammers, maces, flails, clubs, spears, halberds, tridents, scythes, staffs, wands, bows, crossbows, claws, picks and more), 8 shield shapes, helmets, great helms, coifs, hoods, hats, caps, crowns, circlets and masks, armour, robes and cloaks, gloves and gauntlets, boots and greaves, and every kind of charm.
- Equipping changes the hero at once: the weapon goes in your hand, shields on your arm, head gear replaces the knight's helmet (or the Adventurer's hat), armour recolours the knight's plate, gloves and boots recolour and reshape the hands and feet, and charms hang at the neck, sit on a finger or wrist, wrap the waist or back, or float around you.
- Effects: fire, frost, storm, holy, shadow, nature, arcane, necrotic, infernal and fae gear sheds matching particles; rare and enchanted pieces glow; legendary gear and two or more pieces of a set draw a ring of light at your feet; talismans, idols and ego companions orbit you; your swing trail and hit sparks take your weapon's colour; every potion, food and buff shows an aura while it lasts (a shield bubble for defence, rising lights for healing, gold sparkles for luck, and so on); equipping and using items bursts with light.

## Update: 9 November 2026

**The whole world goes chibi**
- Every villager, guard, merchant, noble, race (orcs, elves, dwarves, goblins and more), undead and boss now has the big-head, short-leg chibi look of the knight hero. Hair, hats, helmets and beards grow with the head.
- Horses, deer, boars and the other wild animals have bigger heads and big shiny eyes; wolves, spiders, bats and scorpions have bigger heads too, and dragons a larger head on the same neck.
- All 274 Blender models were re-exported in a softer toy style: rounder bevelled edges, puffy tree crowns and bushes, rounded pine tiers, cleaner and brighter colours and lighter shadows. Buildings keep their exact size, so doors, rooms and collisions are unchanged.
- The Adventurer outfit is chibi too.

## Update: 7 November 2026

**A new hero: the chibi knight**
- Your character is now a small armoured knight with a big plumed helmet, a red cape and a round shield. It was modelled in Blender and uses the hero's normal walk, jump, roll and attack animations.
- The knight carries its own sword until you craft or buy a weapon; after that it holds your best weapon or tool.
- The knight's face takes the skin colour you pick, so every species can wear the armour.
- Your shirt colour dyes the knight's tabard, sleeves and shield (the default keeps the classic blue).
- Online, other travellers now appear as knights too, in their own colours.
- Prefer the old look? Open the character menu and set **Outfit** to *Adventurer*. Hair, hats and glasses only show with the Adventurer outfit.
- Indoors, where the camera sits close, the knight fades out so it never blocks your view.

## What is new since the first beta

**A new way to choose a class**
- At character level 10 an instructor points you to a nearby training ground and runs a six-step *Initiation* quest.
- 633 classes in 35 families are taught by masters at 117 training grounds across the world. The rarer the class, the farther from the capital.
- Masters give a starter weapon and sell stronger grades. They offer three tasks a day (rapport lowers prices) and a daily skill drill.
- Skills sharpen with use (+1.2% damage, -0.7% cooldown per level, max 50); training golems teach three times faster.
- Mastery trials at class levels 10, 20 and 30 unlock signature skills.
- **Class codex** (whisper `classes`): browse every class, its skills, mechanic, requirements and where to learn it.

**A mechanic for every class family**
Soul necromancer (capture souls, spirits, soul's eye), blood, beast (bond, growth, riding), divine (faith, oaths), demon (pacts, corruption), nine martial styles, magic families, shadow, tactics, dragonblood, wayfaring and the five peoples (elf, dwarf, halfling, goblin, ogre).

**Species and evolution** (whisper `species`): choose an ancestry at level 10 and evolve by devouring the essence of what you defeat (40 forms).

**Eight legendary hidden classes** (whisper `legends`): one of each per world, hidden at far monuments behind a guardian.

**Progression and gear**
Hero sheet and a 127-node talent tree (`[`), Ascension: Paragon levels, Bestiary and daily Trials (`;`), the Forge (`]`), ego gear that levels as you use it (`'`), the Hollow Reach endgame zone (whisper `reach`).

**Navigation and menus**
Navigator with arrow and beam to quests, places, creatures and items (`,`), map filters, a smarter menu with search (`\`).

**Feel**
Class skill effects by family, themed training grounds and master looks.

## Known issues and limits
- Balance numbers were tuned by simulation, not by people. Expect rough edges: some classes (spear, archer, beast alone) may feel weak, and occult, infernal and lords may clear groups too fast.
- Legendary classes are one per save. Online multiplayer does not enforce one per server.
- Training ground positions changed during development: grounds found in earlier test builds may move; if something looks wrong, start a fresh account.
- Masters, training dummies and legendary monuments use simple models.
- Boss and skill sounds are procedural and were never heard by the developer.
- Menus need mouse or keyboard; a controller covers gameplay only.
- Low-end phones may run slowly; try whisper `quality low`.
- Screenshots in the in-app preview lag behind; this does not affect the game.

## Checks run before release
Self-test 20/20 (signed in), 0 integrity failures across 633 classes and 117 grounds, a damage-balance simulation (median 59 DPS, range 30-94 per family), a survival simulation (about 89% average win rate), and a real sign-up/save/reload round trip. See `AUTOTEST.md` and `BALANCE_REPORT.md`.

## Update: Systems II
- Difficulty: whisper `easy` / `normal` / `hard` (also in the menu).
- "Take me to a master": whisper `firstclass` or menu item, after level 10 with no class.
- 18 named class synergies (shown on the Hero sheet).
- Racial classes (band 3+) need the matching species.
- Legend Hunters roam from level 40 while legends are unfound (whisper `hunter` to test).
- Per-family skill sounds; skippable intro for new accounts.
- Legends have story scenes and unique monuments; masters wear family gear.
- Codex: "Report this class" prefills the F2 form. F2 reports now include classes and progress.
- `tools/report_dashboard.html`: paste reports to see totals and export CSV.

## Update: Systems III
- Mythic Rift (whisper `mythic`): Endless Rift tier 10+ has two modifiers and a weekly affix; clears give Mythic Shards, fastest-clear records, and 25 ranks of Mythic Power.
- Change of path (`respec`): set a class aside for a fee (progress kept) plus synergy advice.
- Master bonds (`bond`): three story chapters per master from rapport; the last gives +1% damage.
- Photo mode (F8 or `photo`): hides the HUD and saves a share card.
- Daily world events and a featured class family (`today`).
- Accessibility (`access`): interface size, colour-blind filters, reduced motion, key remapping, hints toggle.
- Initiation hint bubbles.
- Legends are unique per world: the world server keeps a registry (`server/legends.json`); first claim wins.
- Balance gate (`__lumen.atGate(trials)`): 3 tiers of harder fights; use 5+ trials, 2 is noisy. Small damage tuning for weak/strong families.
