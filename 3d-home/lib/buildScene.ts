// lib/buildScene.ts
// Core Three.js scene builder — runs only on client side
import * as THREE from 'three';
import { SCENE_CONFIG, getSlatPositions, getSlatFinalY } from './sceneConfig';
import { createWoodTexture, createConcreteTexture } from './woodTexture';

export interface SceneObjects {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  slats: THREE.Mesh[];
  rods: THREE.Mesh[];
  channels: THREE.Mesh[];
  secondary: THREE.Mesh[];
  edges: THREE.Mesh[];
  lights: THREE.PointLight[];
  lightMeshes: THREE.Mesh[];
  frameGroup: THREE.Group;
  animState: {
    finalSlatY: number;
  };
}

export function buildScene(canvas: HTMLCanvasElement): SceneObjects {
  const cfg = SCENE_CONFIG;
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024;

  // ─── Renderer ────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2.0));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // ─── Scene ───────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xc8dce8);
  scene.fog = new THREE.Fog(0xc8dce8, 20, 45);

  // ─── Camera ──────────────────────────────────────────────────
  const fov = isMobile ? 60 : isTablet ? 52 : 46;
  const camera = new THREE.PerspectiveCamera(fov, canvas.offsetWidth / canvas.offsetHeight, 0.1, 80);
  const ic = cfg.camera.initial;
  camera.position.set(ic.x, ic.y, ic.z + (isMobile ? 2 : isTablet ? 1 : 0));
  camera.lookAt(ic.lx, ic.ly, ic.lz);

  // ─── Textures ────────────────────────────────────────────────
  const woodCanvas = createWoodTexture(512, 512);
  const woodTex = new THREE.CanvasTexture(woodCanvas);
  woodTex.wrapS = THREE.RepeatWrapping;
  woodTex.wrapT = THREE.RepeatWrapping;
  woodTex.repeat.set(1, 20);
  woodTex.colorSpace = THREE.SRGBColorSpace;

  const concreteCanvas = createConcreteTexture(256, 256);
  const concreteTex = new THREE.CanvasTexture(concreteCanvas);
  concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping;
  concreteTex.repeat.set(4, 4);

  // ─── Shared Materials ─────────────────────────────────────────
  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTex,
    roughness: 0.52,
    metalness: 0.28,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cfg.colors.metal),
    roughness: 0.38,
    metalness: 0.82,
  });
  const metalDarkMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cfg.colors.metalDark),
    roughness: 0.28,
    metalness: 0.90,
  });
  const concreteMat = new THREE.MeshStandardMaterial({
    map: concreteTex,
    color: new THREE.Color(0xc5c0b8),
    roughness: 0.94,
    metalness: 0.0,
  });
  const slabMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd2cec8),
    roughness: 0.96,
    metalness: 0.0,
  });
  const floorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xb8b0a5),
    roughness: 0.88,
    metalness: 0.04,
  });

  // ─── Architecture ─────────────────────────────────────────────
  const archGroup = new THREE.Group();

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  archGroup.add(floor);

  // Ceiling concrete slab
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(cfg.ceiling.width + 1.5, 0.35, cfg.ceiling.depth + 1.2),
    slabMat
  );
  slab.position.set(0, cfg.ceiling.height + 0.175, 0);
  slab.receiveShadow = true;
  archGroup.add(slab);

  // Back wall
  const backW = new THREE.Mesh(
    new THREE.BoxGeometry(cfg.ceiling.width + 2.5, 6, 0.35),
    concreteMat
  );
  backW.position.set(0, 3, -(cfg.ceiling.depth / 2) - 0.175);
  backW.receiveShadow = true;
  archGroup.add(backW);

  // Side walls
  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 6, cfg.ceiling.depth + 2),
      concreteMat
    );
    wall.position.set(side * (cfg.ceiling.width / 2 + 0.175), 3, 0);
    wall.receiveShadow = true;
    archGroup.add(wall);
  }

  // Architectural columns
  const colPositions: [number, number, number][] = [
    [-3.0, 0, 2.2], [3.0, 0, 2.2],
    [-3.0, 0, -1.5], [3.0, 0, -1.5],
  ];
  const colMat = new THREE.MeshStandardMaterial({ color: 0xdddad4, roughness: 0.88, metalness: 0.03 });
  for (const [cx, , cz] of colPositions) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, cfg.ceiling.height, 14), colMat);
    col.position.set(cx, cfg.ceiling.height / 2, cz);
    col.castShadow = true;
    col.receiveShadow = true;
    archGroup.add(col);
  }

  scene.add(archGroup);

  // ─── Frame Group ─────────────────────────────────────────────
  const frameGroup = new THREE.Group();
  scene.add(frameGroup);

  // Suspension rods
  const rods: THREE.Mesh[] = [];
  const rodGeo = new THREE.CylinderGeometry(cfg.frame.rodRadius, cfg.frame.rodRadius, cfg.frame.rodLength, 8);
  for (let ci = 0; ci < cfg.frame.channelCount; ci++) {
    const cz = -cfg.ceiling.depth / 2 + 0.6 + ci * ((cfg.ceiling.depth - 1.2) / (cfg.frame.channelCount - 1));
    for (let ri = 0; ri < cfg.frame.rodCount; ri++) {
      const rx = -cfg.ceiling.width / 2 + 0.6 + ri * ((cfg.ceiling.width - 1.2) / (cfg.frame.rodCount - 1));
      const rod = new THREE.Mesh(rodGeo, metalDarkMat.clone());
      rod.position.set(rx, cfg.ceiling.height - cfg.frame.rodLength / 2, cz);
      rod.castShadow = false;
      rod.visible = false;
      // Animate from above
      rod.userData.finalY = cfg.ceiling.height - cfg.frame.rodLength / 2;
      rod.userData.startY = cfg.ceiling.height + 1.8;
      rod.position.y = rod.userData.startY;
      frameGroup.add(rod);
      rods.push(rod);
    }
  }

  // Main channels (run X axis, one per Z channel row)
  const channels: THREE.Mesh[] = [];
  const chGeo = new THREE.BoxGeometry(
    cfg.ceiling.width - 0.3,
    cfg.frame.channelHeight,
    cfg.frame.channelWidth
  );
  for (let ci = 0; ci < cfg.frame.channelCount; ci++) {
    const cz = -cfg.ceiling.depth / 2 + 0.6 + ci * ((cfg.ceiling.depth - 1.2) / (cfg.frame.channelCount - 1));
    const ch = new THREE.Mesh(chGeo, metalMat.clone());
    const finalY = cfg.ceiling.height - cfg.frame.rodLength - cfg.frame.channelHeight / 2;
    ch.position.set(0, finalY, cz);
    ch.castShadow = !isMobile;
    ch.visible = false;
    ch.userData.finalX = 0;
    ch.userData.startX = -(cfg.ceiling.width + 2);
    ch.position.x = ch.userData.startX;
    frameGroup.add(ch);
    channels.push(ch);
  }

  // Secondary cross-channels (run Z axis)
  const secondary: THREE.Mesh[] = [];
  const secCount = 7;
  const secGeo = new THREE.BoxGeometry(
    cfg.frame.channelWidth,
    cfg.frame.channelHeight * 0.75,
    cfg.ceiling.depth - 0.5
  );
  for (let si = 0; si < secCount; si++) {
    const sx = -cfg.ceiling.width / 2 + 0.5 + si * ((cfg.ceiling.width - 1) / (secCount - 1));
    const sec = new THREE.Mesh(secGeo, metalDarkMat.clone());
    const finalY = cfg.ceiling.height - cfg.frame.rodLength - cfg.frame.channelHeight - 0.02;
    sec.position.set(sx, finalY, 0);
    sec.castShadow = false;
    sec.visible = false;
    sec.userData.finalY = finalY;
    sec.userData.startY = finalY + 2.0;
    sec.position.y = sec.userData.startY;
    frameGroup.add(sec);
    secondary.push(sec);
  }

  // ─── Ceiling Slats ────────────────────────────────────────────
  const slats: THREE.Mesh[] = [];
  const finalSlatY = getSlatFinalY();
  const slatPositions = getSlatPositions();
  const slatGeo = new THREE.BoxGeometry(
    cfg.ceiling.slatLength - 0.08,
    cfg.ceiling.slatHeight,
    cfg.ceiling.slatWidth
  );

  slatPositions.forEach(({ x, z, index }) => {
    const variant = index % 7;
    const slatMat = woodMat.clone();
    // Slight per-slat color variation for realism
    const hueShift = (variant - 3) * 0.008;
    const lightnessShift = (variant % 3 - 1) * 0.04;
    slatMat.color = new THREE.Color(cfg.colors.wood1).offsetHSL(hueShift, 0, lightnessShift);

    const slat = new THREE.Mesh(slatGeo, slatMat);
    slat.position.set(x, finalSlatY, z);
    slat.castShadow = !isMobile;
    slat.receiveShadow = true;
    slat.visible = false;
    // Start above slab
    slat.userData.finalY = finalSlatY;
    slat.userData.startY = cfg.ceiling.height + 2.2;
    slat.userData.index = index;
    slat.position.y = slat.userData.startY;
    scene.add(slat);
    slats.push(slat);
  });

  // ─── Edge Trims ───────────────────────────────────────────────
  const edges: THREE.Mesh[] = [];
  const edgeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cfg.colors.edgeTrim),
    roughness: 0.32,
    metalness: 0.88,
  });
  const totalSlatSpan = cfg.ceiling.slatCount * (cfg.ceiling.slatWidth + cfg.ceiling.slatGap) - cfg.ceiling.slatGap;

  // Front/back perimeter
  for (const side of [1, -1]) {
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(cfg.ceiling.slatLength - 0.08, 0.07, 0.03),
      edgeMat
    );
    edge.position.set(0, finalSlatY, side * (totalSlatSpan / 2 + 0.015));
    edge.visible = false;
    scene.add(edge);
    edges.push(edge);
  }
  // Left/right perimeter
  for (const side of [1, -1]) {
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.07, totalSlatSpan + 0.06),
      edgeMat
    );
    edge.position.set(side * ((cfg.ceiling.slatLength - 0.08) / 2), finalSlatY, 0);
    edge.visible = false;
    scene.add(edge);
    edges.push(edge);
  }

  // ─── Point Lights ─────────────────────────────────────────────
  const lights: THREE.PointLight[] = [];
  const lightMeshes: THREE.Mesh[] = [];
  const lPositions: [number, number, number][] = [
    [-2.5, finalSlatY - 0.02, -1.5],
    [2.5, finalSlatY - 0.02, -1.5],
    [-2.5, finalSlatY - 0.02, 1.5],
    [2.5, finalSlatY - 0.02, 1.5],
    [0, finalSlatY - 0.02, 0],
  ];
  const lFixtureMat = new THREE.MeshStandardMaterial({
    color: 0xfff8ee,
    emissive: new THREE.Color(0xffeebb),
    emissiveIntensity: 0,
    roughness: 0.4,
  });
  for (const [lx, ly, lz] of lPositions) {
    const pl = new THREE.PointLight(0xffe8a0, 0, 7, 2.2);
    pl.position.set(lx, ly, lz);
    scene.add(pl);
    lights.push(pl);

    const lm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.055, 0.018, 12),
      lFixtureMat.clone()
    );
    lm.position.set(lx, ly, lz);
    lm.visible = false;
    scene.add(lm);
    lightMeshes.push(lm);
  }

  // ─── Ambient & Sun Lighting ───────────────────────────────────
  scene.add(new THREE.AmbientLight(0xd0e4f0, 0.65));

  const sun = new THREE.DirectionalLight(0xfff8e8, 1.35);
  sun.position.set(9, 14, 8);
  sun.castShadow = !isMobile;
  if (!isMobile) {
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    sun.shadow.camera.far = 30;
    sun.shadow.bias = -0.001;
  }
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xc8d8f0, 0.30);
  fill.position.set(-6, 5, -4);
  scene.add(fill);

  return {
    renderer, scene, camera,
    slats, rods, channels, secondary,
    edges, lights, lightMeshes,
    frameGroup,
    animState: { finalSlatY },
  };
}

export function resizeScene(obj: SceneObjects, canvas: HTMLCanvasElement) {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  obj.renderer.setSize(w, h);
  obj.camera.aspect = w / h;
  obj.camera.updateProjectionMatrix();
}
