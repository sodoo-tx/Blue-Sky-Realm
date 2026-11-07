/* ============================== CHIBI KNIGHT: the main character, modelled in Blender (tools/chibi_knight.blend, exported to tools/knight_models.json) ============================== */
Object.assign(MODELS, __KNIGHT_MODELS__);
const PKN = { hip: 0.483, sho: 0.966, legX: 0.207, armX: 0.5175, armZ: 0.023, built: false, on: false, mat: VC_MAT.clone(), head: new THREE.Vector3() };
const pknMat = g => { g.traverse(o => { if (o.isMesh) o.material = PKN.mat; }); return g; };
/* the chibi helmet is big: fade the knight when the camera is pushed in close (inside houses and dungeons) so it never blocks the view */
function pknFade() {
  if (!PKN.on) return; torso.updateWorldMatrix(true, false); PKN.head.set(0, 1.59, 0).applyMatrix4(torso.matrixWorld);
  const d = camera.position.distanceTo(PKN.head), op = Math.max(0.22, Math.min(1, (d - 1.5) / 1.6)), tr = op < 0.999;
  if (PKN.mat.transparent !== tr) { PKN.mat.transparent = tr; PKN.mat.needsUpdate = true; } PKN.mat.opacity = op;
}
function pknBuild() {
  if (PKN.built) return; PKN.built = true;
  const tag = (o, mx) => { pknMat(o); o.userData.kn = true; if (mx) o.scale.x = -1; return o; };
  legL.add(tag(mdl('pk_leg'))); legR.add(tag(mdl('pk_leg'), true));
  armL.add(tag(mdl('pk_arm')), tag(mdl('pk_shield'))); armR.add(tag(mdl('pk_arm'), true));
  const h = PKN.hold = tag(new THREE.Group()); h.position.set(0.0575, -0.391, 0.115); h.rotation.x = 0.9; h.add(mdl('pk_sword')); armR.add(h);
}
function pknHolders() {   // the game's own held weapon/tool: shrink it into the knight's small hand
  let held = false;
  for (const o of armR.children) {
    if (o.userData.kn) continue;
    if (!o.userData.knHold && !o.isMesh && Math.abs(o.position.y + 0.76) < 0.01) { o.userData.knHold = true; o.userData.knP = o.position.clone(); }
    if (!o.userData.knHold) continue;
    if (PKN.on) { o.position.set(0.05, -0.39, 0.1); o.scale.setScalar(0.68); } else { o.position.copy(o.userData.knP); o.scale.setScalar(1); }
    if (o.visible && o.children.length) held = true;
  }
  if (PKN.hold) PKN.hold.visible = PKN.on && !held;
}
function pknApply(L) {
  pknBuild();
  const skin = (L && L.skin !== undefined) ? L.skin : CH_DEFAULT.skin;   // the knight's face takes the chosen skin colour
  if (PKN.skin !== skin) { if (PKN.body) torso.remove(PKN.body); PKN.body = pknMat(mdl('pk_torso', { 1: skin })); PKN.body.userData.kn = true; torso.add(PKN.body); PKN.skin = skin; } PKN.on = ((L && L.outfit) || CH_DEFAULT.outfit) === 'knight';
  pknHolders();
  for (const g of [legL, legR, armL, armR, torso]) for (const o of g.children) {
    if (o.userData.kn) { if (o !== PKN.hold) o.visible = PKN.on; continue; }
    if (o.userData.knHold) continue;
    if (PKN.on) { if (o.visible) { o.visible = false; o.userData.knHid = true; } }
    else if (o.userData.knHid) { o.visible = true; o.userData.knHid = false; }
  }
  if (PKN.on) { legL.position.set(-PKN.legX, PKN.hip, 0); legR.position.set(PKN.legX, PKN.hip, 0); armL.position.set(-PKN.armX, PKN.sho, PKN.armZ); armR.position.set(PKN.armX, PKN.sho, PKN.armZ); }
  else { legL.position.set(-0.19, 0.9, 0); legR.position.set(0.19, 0.9, 0); armL.position.set(-0.47, 1.65, 0); armR.position.set(0.47, 1.65, 0); }
  pknHolders();
}
{
  const _al = applyLook; applyLook = function (L) { const r = _al(L); try { pknApply(r || L); } catch (e) { console.error('knight look', e); } return r; };
  const _up = updatePlayer; updatePlayer = function (dt) {
    const r = _up(dt);
    try { if (PKN.on) { armL.position.y = armR.position.y = PKN.sho + torso.position.y; } if ((frameNo & 7) === 0) pknHolders(); pknFade(); } catch (e) { /* cosmetic only */ }
    return r;
  };
}
try { applyLook(CHAR.look || CH_DEFAULT); } catch (e) { console.error('knight look', e); }
