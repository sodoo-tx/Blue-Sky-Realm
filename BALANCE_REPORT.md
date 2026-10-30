# Class balance report (simulation)

Method: `__lumen.balRun(60, 15)` runs, for every class family, a deterministic 60-second fight against a stationary target
with a fresh non-admin character: a level 15 tier-1 class of that family, a grade II weapon of the family, one basic hit
every 0.7 s plus the class skill rotation (cast whenever off cooldown and affordable). Melee families fight at 3 m,
ranged ones at 7 m. Damage per second is the result. It ignores survivability, healing, buffs for allies, companions and
crowd control, so support and tank families are expected to sit below the damage families.

Result after tuning (damage per second): median 56, range 30-101.

| Family | DPS | Family | DPS | Family | DPS |
|---|---|---|---|---|---|
| sword | 79 | necro | 77 | monk | 49 |
| spear | 86 | blood | 58 | bard | 40 |
| hammer | 64 | summon | 69 | tactics | 40 |
| shield | 40 | alchemy | 79 | occult | 74 |
| berserk | 74 | divine | 47 | infernal | 100 |
| smith | 68 | paladin | 48 | lords | 101 |
| rogue | 54 | elemental | 83 | wyrm | 83 |
| shadow | 49 | arcane | 46 | exotic | 47 |
| archer | 60 | runes | 56 | elf | 42 |
| beast | 31 (pets add the rest) | mind | 44 | dwarf | 51 |
| grove | 41 | time | 30 | halfling | 55 |
| goblin | 69 | ogre | 65 | | |

Knobs: `BALK[family]` scales skill damage, `BALG[family]` scales meter gain (both in `balsim.js`).
Known soft spots: infernal and lords run hot but pay in health and defence (not simulated); time, beast, shield and tactics
rely on utility, companions or survivability.
