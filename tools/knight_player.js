/* ============================== CHIBI KNIGHT: the main character, modelled in Blender (tools/chibi_knight.blend, exported to tools/knight_models.json) ============================== */
/* tint slots in the knight models: 1 skin (face), 2 armour plate, 3 cloth (tabard, sleeves, shield face), 4 gauntlets, 5 boots, 6 helmet.
   The cloth keeps its blue unless a shirt colour other than the default is chosen; slots 2/4/5/6 follow equipped armour (gear.js). */
Object.assign(MODELS, __KNIGHT_MODELS__);
const PKN = { hip: 0.483, sho: 0.966, legX: 0.207, armX: 0.5175, armZ: 0.023, on: false, key: '', objs: [], mat: VC_MAT.clone(), head: new THREE.Vector3() };
const pknTint = (skin, shirt) => { const t = { 1: skin }; if (shirt !== undefined && shirt !== CH_DEFAULT.shirt) t[3] = shirt; return t; };
/* dress a humanoid rig (hero or online avatar) in the knight kit; returns the added objects */
function pknKit(R, tint, mat) {
  const out = [], put = (parent, name, mx, t) => { const o = mdl(name, t); if (mat) o.traverse(m => { if (m.isMesh) m.material = mat; }); if (mx) o.scale.x = -1; o.userData.kn = true; parent.add(o); out.push(o); return o; };
  put(R.torso, 'pk_torso', false, tint); out.helm = put(R.torso, 'pk_helm', false, tint);
  put(R.legL, 'pk_leg'); put(R.legR, 'pk_leg', true);
  put(R.armL, 'pk_arm', false, tint); out.shield = put(R.armL, 'pk_shield', false, tint); put(R.armR, 'pk_arm', true, tint);
  const h = new THREE.Group(); h.position.set(0.0575, -0.391, 0.115); h.rotation.x = 0.9; h.userData.kn = true; R.armR.add(h); out.push(h);
  const sw = mdl('pk_sword'); if (mat) sw.traverse(m => { if (m.isMesh) m.material = mat; }); h.add(sw); out.hold = h;
  R.legL.position.set(-PKN.legX, PKN.hip, 0); R.legR.position.set(PKN.legX, PKN.hip, 0); R.armL.position.set(-PKN.armX, PKN.sho, PKN.armZ); R.armR.position.set(PKN.armX, PKN.sho, PKN.armZ);
  return out;
}
/* the chibi helmet is big: fade the hero when the camera is pushed in close (inside houses and dungeons) so it never blocks the view */
function pknFade() {
  if (!PKN.on) return; torso.updateWorldMatrix(true, false); PKN.head.set(0, 1.59, 0).applyMatrix4(torso.matrixWorld);
  const d = camera.position.distanceTo(PKN.head), op = Math.max(0.22, Math.min(1, (d - 1.5) / 1.6)), tr = op < 0.999;
  if (PKN.mat.transparent !== tr) { PKN.mat.transparent = tr; PKN.mat.needsUpdate = true; } PKN.mat.opacity = op;
}
function pknHolders() {   // the game's own held weapon/tool: shrink it into the knight's small hand
  let held = false;
  for (const o of armR.children) {
    if (o.userData.kn || o.userData.gear) continue;
    if (!o.userData.knHold && !o.isMesh && Math.abs(o.position.y + 0.76) < 0.01) { o.userData.knHold = true; o.userData.knP = o.position.clone(); }
    if (!o.userData.knHold) continue;
    if (PKN.on) { o.position.set(0.05, -0.39, 0.1); o.scale.setScalar(0.68); } else { o.position.copy(o.userData.knP); o.scale.setScalar(1); }
    if (o.visible && o.children.length) held = true;
  }
  if (PKN.objs.hold) PKN.objs.hold.visible = PKN.on && !held;
}
function pknApply(L) {
  L = L || CH_DEFAULT; PKN.on = (L.outfit || CH_DEFAULT.outfit) === 'knight';
  const tint = Object.assign(pknTint(L.skin !== undefined ? L.skin : CH_DEFAULT.skin, L.shirt), typeof gearTint === 'function' ? gearTint() : {}), key = JSON.stringify(tint);
  if (PKN.key !== key) { for (const o of PKN.objs) if (o.parent) o.parent.remove(o); PKN.objs = pknKit({ legL, legR, armL, armR, torso }, tint, PKN.mat); PKN.key = key; }
  for (const g of [legL, legR, armL, armR, torso]) for (const o of g.children) {
    if (o.userData.kn) { o.visible = PKN.on; continue; }
    if (o.userData.knHold || o.userData.gear) continue;
    if (PKN.on) { if (o.visible) { o.visible = false; o.userData.knHid = true; } }
    else if (o.userData.knHid) { o.visible = true; o.userData.knHid = false; }
  }
  if (!PKN.on) { legL.position.set(-0.19, 0.9, 0); legR.position.set(0.19, 0.9, 0); armL.position.set(-0.47, 1.65, 0); armR.position.set(0.47, 1.65, 0); }
  else { legL.position.set(-PKN.legX, PKN.hip, 0); legR.position.set(PKN.legX, PKN.hip, 0); armL.position.set(-PKN.armX, PKN.sho, PKN.armZ); armR.position.set(PKN.armX, PKN.sho, PKN.armZ); }
  pknHolders();
}
{
  const _al = applyLook; applyLook = function (L) { const r = _al(L); try { pknApply(r || L); } catch (e) { console.error('knight look', e); } return r; };
  const _up = updatePlayer; updatePlayer = function (dt) {
    const r = _up(dt);
    try { if (PKN.on) { armL.position.y = armR.position.y = PKN.sho + torso.position.y; } if ((frameNo & 7) === 0) pknHolders(); pknFade(); } catch (e) { /* cosmetic only */ }
    return r;
  };
  /* online players: everyone appears as a knight; the colour each player sends (their shirt colour) dyes the cloth, and picks a skin tone as before */
  const _ma = makeAvatar; makeAvatar = function (col, name) {
    const g = _ma(col, name);
    try {
      const U = g.userData, R = { legL: U.legL, legR: U.legR, armL: U.armL, armR: U.armR, torso: U.rig.children[4] };
      for (const k in R) for (const o of R[k].children.slice()) R[k].remove(o);
      const skin = [0xf2cfaa, 0xe8b890, 0xd8a070, 0x9a6a44, 0xf8dcc0][col % 5];
      pknKit(R, pknTint(skin, col));
    } catch (e) { console.error('knight avatar', e); }
    return g;
  };
}
try { applyLook(CHAR.look || CH_DEFAULT); } catch (e) { console.error('knight look', e); }
