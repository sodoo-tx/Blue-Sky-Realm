# Automated checks

Run in the browser console of a fresh page (after pressing Play), or open the game with `?autotest` to run on load:

```js
__lumen.autoRun()        // everything (about 30 s); __lumen.autoRun({quick:true}) skips the fights
__lumen.atIntegrity()    // data checks only
__lumen.balRun(60, 15)   // damage-per-second simulation per class family (see BALANCE_REPORT.md)
__lumen.atSurvival(4, 25, 80)  // 4 tough wolves, level 25, 80 s per fight, 4 trials per family
__lumen.atProgress()     // kills and casts needed to reach class level 10, per family
```

What `autoRun()` covers

1. The game's own self-test (19/20 expected when not signed in; the one failure is the account-storage test).
2. Integrity: 633 classes have unique ids and at least four skills, every skill exists, has an effect handler,
   sane numbers and a painted icon; skills do not unlock past the class cap; every family has grounds; all 117
   grounds have finite positions inside the world on land and are at least 250 units apart (spacing fixed in this
   round: they used to pile up near the capital); rarer bands are on average farther from the capital; weapon items
   are within the 58 weapon-power ceiling; species lines have parents and known essences; menu entries are unique and
   callable; module state is JSON-serialisable.
3. Balance, survival and progression simulations (numbers, not pass/fail, except obvious breakage).

Survival simulation (rewritten)
- Mobs never attack inside villages (`safePlayer`), which is why the first version showed everyone winning. Fights are now
  staged at a training ground outside every safe zone, the character is put back afterwards, and the bot walks up to its
  target (melee) or stands and casts (ranged families).
- Scenario: 3 wolves, level 15, 1.5x health, against a fresh level-15 tier-1 class with a grade II weapon, no armour, 6 trials
  per family, 60 s limit. It reports win rate, health left and time to clear.
- After tuning: average win rate about 86%, median health left about 67%. Remaining flags (see `autoRun().verdict`): ranged
  and caster families (archer, arcane, mind, shadow) are the most fragile because the bot never kites, and occult/lords/
  infernal clear the pack in about 2 s with an area burst.
- It is still noisy (6 trials): read it as "which families are far from the pack", not exact numbers. Companions (beast,
  summoner) are not simulated.

Known limits
- Progression: level 10 takes about 77 kills for fighter paths and about 130 for the rest (class XP from kills was
  added for every non-fighter school class), or about 850 skill casts.
- The simulations move the character and change class state; run them on a throwaway page, not on a real save, and run
  the damage simulation (`balRun`) first on a fresh page because kills raise skill levels.
