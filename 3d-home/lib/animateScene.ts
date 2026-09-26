// lib/animateScene.ts
// Drives all scroll-based animation — called once per scroll progress update
import * as THREE from 'three';
import type { SceneObjects } from './buildScene';
import {
  SCENE_CONFIG,
  inverseLerp,
  lerp,
  easeOut,
  getSlatInstallProgress,
  getSlatFinalY,
} from './sceneConfig';

const { timeline: TL, camera: CAM, ceiling } = SCENE_CONFIG;

// Small overshoot helper — slat snaps past then settles back
function overshootEase(t: number): number {
  if (t >= 1) return 1;
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

const _camTarget = new THREE.Vector3();
const _camPos = new THREE.Vector3();
const _lookAt = new THREE.Vector3();

export function animateByProgress(obj: SceneObjects, progress: number) {
  const { slats, rods, channels, secondary, edges, lights, lightMeshes } = obj;
  const finalSlatY = getSlatFinalY();
  const totalSlats = slats.length;

  // ── Suspension Rods ────────────────────────────────────────────
  {
    const t = inverseLerp(TL.rodsStart, TL.rodsEnd, progress);
    const tEased = easeOut(t, 3);
    rods.forEach((rod) => {
      rod.visible = t > 0.01;
      rod.position.y = lerp(rod.userData.startY, rod.userData.finalY, tEased);
    });
  }

  // ── Main Channels ──────────────────────────────────────────────
  {
    const t = inverseLerp(TL.frameStart, TL.frameEnd, progress);
    channels.forEach((ch, i) => {
      const delay = i / channels.length;
      const localT = easeOut(Math.max(0, (t - delay * 0.3) / (1 - delay * 0.3)), 3);
      ch.visible = localT > 0.01;
      ch.position.x = lerp(ch.userData.startX, ch.userData.finalX, localT);
    });
  }

  // ── Secondary Channels ─────────────────────────────────────────
  {
    const t = inverseLerp(TL.secondaryStart, TL.secondaryEnd, progress);
    secondary.forEach((sec, i) => {
      const delay = i / secondary.length;
      const localT = easeOut(Math.max(0, (t - delay * 0.25) / (1 - delay * 0.25)), 3);
      sec.visible = localT > 0.01;
      sec.position.y = lerp(sec.userData.startY, sec.userData.finalY, localT);
    });
  }

  // ── Ceiling Slats — install one by one ─────────────────────────
  slats.forEach((slat, i) => {
    const installAt = getSlatInstallProgress(i, totalSlats);
    const installEnd = installAt + (TL.slatsEnd - TL.slatsStart) / totalSlats;
    const t = inverseLerp(installAt, installEnd, progress);
    const tEased = overshootEase(easeOut(t, 2.5));

    slat.visible = t > 0.01;
    slat.position.y = lerp(slat.userData.startY, finalSlatY, Math.max(0, Math.min(1, tEased)));
  });

  // ── Edge Trims ─────────────────────────────────────────────────
  {
    const t = inverseLerp(TL.edgesStart, TL.edgesEnd, progress);
    edges.forEach((edge, i) => {
      const delay = (i / edges.length) * 0.5;
      edge.visible = t > delay;
      const localT = easeOut(Math.max(0, (t - delay) / (1 - delay)), 2);
      // Scale in from 0
      const s = localT;
      edge.scale.x = s;
      edge.scale.z = s;
    });
  }

  // ── Ceiling Lights ─────────────────────────────────────────────
  {
    const t = inverseLerp(TL.lightsStart, TL.lightsEnd, progress);
    lights.forEach((light, i) => {
      const delay = (i / lights.length) * 0.6;
      const localT = easeOut(Math.max(0, (t - delay) / (1 - delay)), 2);
      light.intensity = lerp(0, 2.2, localT);

      const lm = lightMeshes[i];
      if (lm) {
        lm.visible = localT > 0.05;
        const mat = lm.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = lerp(0, 3.5, localT);
      }
    });
  }

  // ── Camera Movement ────────────────────────────────────────────
  {
    // Camera smoothly moves through 3 keyframes
    const c0 = CAM.initial;
    const c1 = CAM.mid;
    const c2 = CAM.final;

    let camX, camY, camZ, lx, ly, lz;

    if (progress < 0.5) {
      const t = easeOut(progress / 0.5, 2);
      camX = lerp(c0.x, c1.x, t);
      camY = lerp(c0.y, c1.y, t);
      camZ = lerp(c0.z, c1.z, t);
      lx = lerp(c0.lx, c1.lx, t);
      ly = lerp(c0.ly, c1.ly, t);
      lz = lerp(c0.lz, c1.lz, t);
    } else {
      const t = easeOut((progress - 0.5) / 0.5, 2);
      camX = lerp(c1.x, c2.x, t);
      camY = lerp(c1.y, c2.y, t);
      camZ = lerp(c1.z, c2.z, t);
      lx = lerp(c1.lx, c2.lx, t);
      ly = lerp(c1.ly, c2.ly, t);
      lz = lerp(c1.lz, c2.lz, t);
    }

    // Mobile adjustments
    const isMobile = window.innerWidth < 768;
    const zOffset = isMobile ? 1.5 : 0;

    _camPos.set(camX, camY, camZ + zOffset);
    _lookAt.set(lx, ly, lz);

    // Smooth camera (lerp toward target each frame)
    obj.camera.position.lerp(_camPos, 0.06);
    obj.camera.lookAt(obj.camera.position.x * 0.2 + lx * 0.8, ly, lz);
  }
}

// Initialize all objects to their start state
export function initAnimState(obj: SceneObjects) {
  const { slats, rods, channels, secondary, edges, lights, lightMeshes } = obj;
  slats.forEach((s) => { s.visible = false; s.position.y = s.userData.startY; });
  rods.forEach((r) => { r.visible = false; r.position.y = r.userData.startY; });
  channels.forEach((c) => { c.visible = false; c.position.x = c.userData.startX; });
  secondary.forEach((s) => { s.visible = false; s.position.y = s.userData.startY; });
  edges.forEach((e) => { e.visible = false; e.scale.set(0.001, 1, 0.001); });
  lights.forEach((l) => { l.intensity = 0; });
  lightMeshes.forEach((lm) => { lm.visible = false; });
}
