# Blue Sky Realm: tester build release notes

Version: beta 2 (30 October 2026). Single offline game; saves live in the browser or on the PC under your account.

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
