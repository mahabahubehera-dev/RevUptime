// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initPlant3D(
  container: HTMLElement,
  canvas: HTMLCanvasElement
): () => void {
  const tooltip = document.getElementById('asset-tooltip');
    if (!container || !canvas || typeof THREE === 'undefined') return () => {};

    let isDisposed = false;
    let animId = 0;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f9fd);
    scene.fog = new THREE.FogExp2(0xf6f9fd, 0.005);

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Exact isometric angle matching Tractian plant view
    camera.position.set(-68, 55, 68);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // --- OrbitControls (Smooth, Movable) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 20;
    controls.maxDistance = 220;
    controls.target.set(0, 0, 0);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(40, 75, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 0.45);
    blueRimLight.position.set(-50, 40, -50);
    scene.add(blueRimLight);

    // --- Blueprint Grid Floor ---
    const gridMajor = new THREE.GridHelper(140, 28, 0x93c5fd, 0xdbeafe);
    gridMajor.position.y = 0.02;
    scene.add(gridMajor);

    const gridMinor = new THREE.GridHelper(140, 70, 0xe0e7ff, 0xf1f5f9);
    gridMinor.position.y = 0.01;
    scene.add(gridMinor);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 95),
      new THREE.MeshStandardMaterial({ color: 0xfcfdfe, roughness: 0.9, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // --- Blueprint Styles & Materials ---
    const bpLightMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.95,
      roughness: 0.35,
      metalness: 0.2
    });

    const bpMidMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      transparent: false,
      opacity: 1.0,
      roughness: 0.3,
      metalness: 0.3
    });

    const bpDarkMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.4,
      metalness: 0.4
    });

    const edgeLineBlue = new THREE.LineBasicMaterial({ color: 0x2563eb });
    const edgeLineDark = new THREE.LineBasicMaterial({ color: 0x1d4ed8 });
    const edgeLineSubtle = new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.85 });

    // Standard shared industrial materials
    const matPlinth = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.9 }); // Concrete pad
    const matChromeSteel = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.15, metalness: 0.85 }); // Polished shaft & machined faces
    const matCastIron = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.4 }); // Dark iron & valve bodies
    const matGaugeWhite = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Pressure gauge face
    const matBlowerYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3, metalness: 0.1 });
    const matWireDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.6 });

    // --- RevUpTime Industrial Sensor Shared Assets & Constructor (Matching Reference Photos) ---
    function createRevUpTimeTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d');

      // Brushed stainless steel base gradient
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#e2e8f0');
      grad.addColorStop(0.18, '#ffffff');
      grad.addColorStop(0.48, '#cbd5e1');
      grad.addColorStop(0.78, '#f1f5f9');
      grad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Fine brushed stainless steel micro-grooves
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let y = 4; y < 256; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      for (let y = 6; y < 256; y += 6) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Draw RevUpTime brand block on both halves (0..256 and 256..512) for 360-degree cylinder visibility
      for (let offset of [0, 256]) {
        // Dark navy circular emblem for ECG pulse wave
        const badgeX = offset + 36;
        const badgeY = 128;
        const badgeR = 24;
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
        ctx.fillStyle = '#0a192f';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#1e3a8a';
        ctx.stroke();

        // Sharp white pulse ECG waveform
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(badgeX - 16, badgeY);
        ctx.lineTo(badgeX - 7, badgeY);
        ctx.lineTo(badgeX - 3, badgeY - 12);
        ctx.lineTo(badgeX + 2, badgeY + 12);
        ctx.lineTo(badgeX + 6, badgeY - 5);
        ctx.lineTo(badgeX + 9, badgeY);
        ctx.lineTo(badgeX + 16, badgeY);
        ctx.stroke();

        // "RevUpTime" Typography
        ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        // "Rev" in dark navy
        ctx.fillStyle = '#0a192f';
        ctx.fillText('Rev', offset + 68, 128);

        // "UpTime" in bright industrial blue
        ctx.fillStyle = '#0284c7';
        ctx.fillText('UpTime', offset + 130, 128);

        // Cyan status ring indicator
        ctx.beginPath();
        ctx.arc(offset + 238, 128, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(offset + 238, 128, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    }

    const texRevUpTime = createRevUpTimeTexture();
    const matRevUpTimeBody = new THREE.MeshStandardMaterial({
      map: texRevUpTime,
      roughness: 0.25,
      metalness: 0.85
    });
    const matKnurledSteel = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.75,
      metalness: 0.65
    });
    const matLedCyan = new THREE.MeshBasicMaterial({
      color: 0x00f0ff
    });
    const matCableBlack = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.85,
      metalness: 0.2
    });
    const matBolt = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.8
    });

    const interactiveObjects = [];
    const movingParts = {
      dgSet: null,
      boosterShaft: null,
      boosterCoupling: null,
      duplexCouplings: [],
      duplexGaugeNeedles: [],
      m1Shaft: null,
      m1BlowerFan: null,
      m2Shaft: null,
      m3Shaft: null,
      m4Coupling: null,
      m4GaugeNeedle: null,
      skidCouplings: [],
      wirelessWaves: [],
      centrifugalImpeller: null,
      centrifugalShaft: null,
      drumFanPropeller: null,
      gearbox1Shafts: [],
      bullGear: null,
      pinionGear: null,
      portableGen: null,
      fieldEngine: null,
      fieldEngineFlywheel: null,
      revUpTimeLEDs: []
    };

    let sensorKnurlMotorRef = null;
    let sensorFlangeBoxRef = null;
    let sensorDgSetRef = null;
    let sensorGearboxRef = null;

    function createRevUpTimeSensor(options) {
      const {
        parent = scene,
        pos = [0, 0, 0],
        rot = [0, 0, 0],
        scale = 1.0,
        withFlange = false,
        cableDir = [0, 1, 0],
        cableLength = 1.2,
        machineName = 'Industrial Machine',
        channel = 'Radial Bearing DE',
        vibValue = '1.1 mm/s RMS',
        tempValue = '48.2°C'
      } = options;

      const group = new THREE.Group();
      group.position.set(pos[0], pos[1], pos[2]);
      group.rotation.set(rot[0], rot[1], rot[2]);
      group.scale.set(scale, scale, scale);

      // Optional 4-bolt square mounting flange plate (Photo 2)
      if (withFlange) {
        const flangePlate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.10), matChromeSteel);
        flangePlate.position.y = 0.05;
        group.add(flangePlate);
        addEdges(flangePlate, edgeLineSubtle);

        // 4 corner Allen socket bolts
        const boltGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 12);
        for (let bx of [-0.27, 0.27]) {
          for (let bz of [-0.27, 0.27]) {
            const bolt = new THREE.Mesh(boltGeo, matBolt);
            bolt.position.set(bx, 0.11, bz);
            group.add(bolt);
          }
        }
      }

      // Knurled Collar Base (Photo 1)
      const knurlCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24), matKnurledSteel);
      knurlCollar.position.y = withFlange ? 0.14 : 0.09;
      group.add(knurlCollar);

      // Hex Nut Section (Photo 1 & 2) for wrench tightening
      const hexNut = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 6), matChromeSteel);
      hexNut.position.y = knurlCollar.position.y + 0.17;
      group.add(hexNut);
      addEdges(hexNut, edgeLineDark);

      // Main Stainless Steel Cylindrical Housing with RevUpTime Branding
      const bodyGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.90, 32);
      const mainBody = new THREE.Mesh(bodyGeo, matRevUpTimeBody);
      mainBody.position.y = hexNut.position.y + 0.53;
      group.add(mainBody);
      addEdges(mainBody, edgeLineSubtle);

      // Glowing Cyan LED Status Indicator (Active Condition Monitoring Pulse)
      const ledDot = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16), matLedCyan);
      ledDot.rotation.x = Math.PI / 2;
      ledDot.position.set(0, mainBody.position.y, 0.232);
      group.add(ledDot);
      movingParts.revUpTimeLEDs.push(ledDot);

      // Stepped Cable Gland on Top
      const glandBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.12, 6), matChromeSteel);
      glandBase.position.y = mainBody.position.y + 0.51;
      group.add(glandBase);

      const glandCap = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.10, 16), matChromeSteel);
      glandCap.position.y = glandBase.position.y + 0.10;
      group.add(glandCap);

      // Black Industrial Flexible Cable
      const cableSegCount = 5;
      let cx = 0, cy = glandCap.position.y + 0.05, cz = 0;
      for (let s = 0; s < cableSegCount; s++) {
        const segLen = cableLength / cableSegCount;
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, segLen, 10), matCableBlack);
        seg.position.set(cx + cableDir[0] * (s * 0.3 * segLen), cy + (segLen * 0.5), cz + cableDir[2] * (s * 0.3 * segLen));
        seg.rotation.x = cableDir[2] * 0.25 * (s + 1);
        seg.rotation.z = -cableDir[0] * 0.25 * (s + 1);
        group.add(seg);
        cy += segLen * 0.85;
      }

      // Telemetry Data for Interactive Clicking & Inspecting
      const sensorData = {
        name: `RevUpTime Sensor • ${machineName}`,
        status: 'ACTIVE • 10 kHz SAMPLING',
        vibration: vibValue,
        temperature: tempValue,
        prediction: `RevUpTime Physical AI: High-Frequency Demodulation Optimal • Bearing Healthy (${channel})`
      };

      mainBody.userData = sensorData;
      hexNut.userData = sensorData;
      knurlCollar.userData = sensorData;
      interactiveObjects.push(mainBody);
      interactiveObjects.push(hexNut);

      group.sensorBody = mainBody;
      parent.add(group);
      return group;
    }

    function addEdges(mesh, lineMat) {
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), lineMat || edgeLineBlue);
      mesh.add(edges);
      return mesh;
    }

    // --- Helper: Zone Floor Markings ---
    function addFloorZone(x, z, w, d) {
      const pts = [
        new THREE.Vector3(-w/2, 0.03, -d/2),
        new THREE.Vector3(w/2, 0.03, -d/2),
        new THREE.Vector3(w/2, 0.03, d/2),
        new THREE.Vector3(-w/2, 0.03, d/2),
        new THREE.Vector3(-w/2, 0.03, -d/2)
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x93c5fd, linewidth: 1 }));
      line.position.set(x, 0, z);
      scene.add(line);
    }

    addFloorZone(-22, -20, 24, 18);  // Power bay
    addFloorZone(-25, -2, 28, 12);   // Compressor bay
    addFloorZone(-24, 18, 30, 16);   // Pump/MCC bay
    addFloorZone(6, -8, 28, 16);     // CNC Machining zone
    addFloorZone(30, -22, 30, 14);   // Utilities zone
    addFloorZone(30, -2, 28, 18);    // Machine matrix zone
    addFloorZone(6, 22, 22, 12);     // Vertical pump zone
    addFloorZone(32, 20, 24, 14);    // Bottom right bay

    // Main factory corridor pathway lines
    function addPathwayLine(x1, z1, x2, z2) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, 0.03, z1),
        new THREE.Vector3(x2, 0.03, z2)
      ]);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xbfdbfe }));
      scene.add(line);
    }
    addPathwayLine(-48, 8, 48, 8);
    addPathwayLine(-48, 14, 48, 14);
    addPathwayLine(-10, -32, -10, 32);

    // --- Perimeter Boundary Walls with Openings ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.22,
      roughness: 0.5
    });

    function createWall(w, h, d, x, y, z) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, y, z);
      addEdges(mesh, edgeLineSubtle);
      scene.add(mesh);
    }

    // Outer walls with entrances
    createWall(48, 3.5, 1, -28, 1.75, -34); // Back-left
    createWall(48, 3.5, 1, 28, 1.75, -34);  // Back-right
    createWall(42, 3.5, 1, -30, 1.75, 34);  // Front-left
    createWall(42, 3.5, 1, 30, 1.75, 34);   // Front-right (door in center)
    createWall(1, 3.5, 68, -52, 1.75, 0);   // Left
    createWall(1, 3.5, 68, 52, 1.75, 0);    // Right

    // --- 1. Perimeter Machinery Buffer Ring (Dozens of cabinets lining walls) ---
    function createPerimeterBlock(x, z, w, h, d) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bpLightMat);
      mesh.position.set(x, h/2, z);
      mesh.castShadow = true;
      addEdges(mesh, edgeLineSubtle);
      scene.add(mesh);
    }

    // Top perimeter wall cabinets
    for (let x = -48; x <= 48; x += 3.8) {
      if (Math.abs(x) < 2) continue; // opening
      const h = 2 + (Math.abs(x) % 3) * 0.5;
      createPerimeterBlock(x, -32, 2.8, h, 2.2);
    }
    // Bottom perimeter wall cabinets
    for (let x = -48; x <= 48; x += 3.8) {
      if (Math.abs(x) < 8) continue; // center main door
      const h = 1.8 + (Math.abs(x) % 2) * 0.7;
      createPerimeterBlock(x, 32, 2.8, h, 2.2);
    }
    // Left perimeter wall cabinets
    for (let z = -30; z <= 30; z += 4) {
      const h = 2 + (Math.abs(z) % 3) * 0.6;
      createPerimeterBlock(-50, z, 2.2, h, 2.8);
    }
    // Right perimeter wall cabinets
    for (let z = -30; z <= 30; z += 4) {
      const h = 2 + (Math.abs(z) % 2) * 0.8;
      createPerimeterBlock(50, z, 2.2, h, 2.8);
    }

    // --- 2. CRITICAL RISK ASSET: DG SET (Silent Diesel Generator Set - KOEL Green) ---
    const riskGroup = new THREE.Group();
    riskGroup.position.set(-27, 0, -22);
    movingParts.dgSet = riskGroup;

    // Materials specific to DG SET (Photo Reference)
    const matDgWhite = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.1 });
    const matDgBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4, metalness: 0.3 });
    const matDgGreen = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3 });
    const matDgBlack = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.5 });
    const matDgChrome = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.8 });
    const matDgYellow = new THREE.MeshBasicMaterial({ color: 0xeab308 });
    const matDgRed = new THREE.MeshBasicMaterial({ color: 0xdc2626 });

    // 1. Heavy Base Skid Frame (Deep Blue Channel Frame)
    const dgSkid = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.9, 5.4), matDgBlue);
    dgSkid.position.y = 0.45;
    dgSkid.castShadow = true;
    addEdges(dgSkid, edgeLineDark);
    riskGroup.add(dgSkid);

    // Forklift pockets in base skid
    for (let fz of [-1.5, 1.5]) {
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(11, 0.35, 0.8), matDgBlack);
      pocket.position.set(0, 0.4, fz);
      riskGroup.add(pocket);
    }

    // 2. White Acoustic Soundproof Canopy Body
    const riskBody = new THREE.Mesh(new THREE.BoxGeometry(10.4, 5.6, 5.0), matDgWhite);
    riskBody.position.y = 3.7;
    riskBody.castShadow = true;
    addEdges(riskBody, edgeLineDark);
    riskGroup.add(riskBody);

    // 3. Deep Blue Roof Cap Frame
    const dgRoof = new THREE.Mesh(new THREE.BoxGeometry(10.7, 0.4, 5.3), matDgBlue);
    dgRoof.position.y = 6.6;
    addEdges(dgRoof, edgeLineDark);
    riskGroup.add(dgRoof);

    // 4. Roof Lifting Eye Lugs (4 corner brackets)
    for (let lx of [-4.8, 4.8]) {
      for (let lz of [-2.2, 2.2]) {
        const lug = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.6, 0.6), matDgBlue);
        lug.position.set(lx, 7.0, lz);
        riskGroup.add(lug);
      }
    }

    // 5. Signature Horizontal Green Identification Stripe ("KOEL GREEN")
    const dgStripeFront = new THREE.Mesh(new THREE.BoxGeometry(10.45, 0.45, 0.05), matDgGreen);
    dgStripeFront.position.set(0, 3.6, 2.52);
    riskGroup.add(dgStripeFront);

    const dgStripeBack = new THREE.Mesh(new THREE.BoxGeometry(10.45, 0.45, 0.05), matDgGreen);
    dgStripeBack.position.set(0, 3.6, -2.52);
    riskGroup.add(dgStripeBack);

    // 6. Front Ventilation Louver Grille (Left Face)
    const dgLouverBox = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 4.0), matDgBlack);
    dgLouverBox.position.set(-5.15, 3.7, 0);
    riskGroup.add(dgLouverBox);

    for (let i = 0; i < 9; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.12, 3.8), matDgWhite);
      slat.position.set(-5.2, 1.9 + i * 0.45, 0);
      slat.rotation.z = 0.35;
      riskGroup.add(slat);
    }

    // 7. Top-Mounted Exhaust Silencer / Muffler & Tailpipe
    const dgMuffler = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 3.8, 20), matDgBlack);
    dgMuffler.rotation.z = Math.PI / 2;
    dgMuffler.position.set(1.5, 7.8, 0);
    riskGroup.add(dgMuffler);

    for (let mx of [0.4, 2.6]) {
      const brk = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 1.8), matDgBlue);
      brk.position.set(mx, 7.1, 0);
      riskGroup.add(brk);
    }

    const dgPipeV = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16), matDgBlack);
    dgPipeV.position.set(-0.2, 8.8, 0);
    riskGroup.add(dgPipeV);

    const dgPipeElbow = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), matDgBlack);
    dgPipeElbow.position.set(-0.2, 9.55, 0);
    riskGroup.add(dgPipeElbow);

    const dgPipeH = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16), matDgBlack);
    dgPipeH.rotation.z = Math.PI / 2;
    dgPipeH.position.set(-0.6, 9.55, 0);
    riskGroup.add(dgPipeH);

    // 8. Side Access Doors & Recessed Handles
    for (let dx of [-1.8, 2.5]) {
      const doorBorder = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.4, 0.04), matDgWhite);
      doorBorder.position.set(dx, 3.7, 2.52);
      addEdges(doorBorder, edgeLineDark);
      riskGroup.add(doorBorder);

      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.08), matDgChrome);
      handle.position.set(dx + 1.4, 3.6, 2.54);
      riskGroup.add(handle);
    }

    // 9. Digital Generator Controller Window & Readout
    const ctrlFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 0.08), matDgBlack);
    ctrlFrame.position.set(-1.8, 4.5, 2.54);
    riskGroup.add(ctrlFrame);

    const ctrlScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.7), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    ctrlScreen.position.set(-1.8, 4.75, 2.59);
    riskGroup.add(ctrlScreen);

    const ctrlDial = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    ctrlDial.position.set(-2.1, 4.15, 2.59);
    riskGroup.add(ctrlDial);

    const ledRed = new THREE.Mesh(new THREE.CircleGeometry(0.06, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    ledRed.position.set(-1.6, 4.18, 2.59);
    riskGroup.add(ledRed);
    const ledGreen = new THREE.Mesh(new THREE.CircleGeometry(0.06, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    ledGreen.position.set(-1.4, 4.18, 2.59);
    riskGroup.add(ledGreen);

    // 10. Emergency Stop Push Button with Yellow Backing
    const eStopBacking = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), matDgYellow);
    eStopBacking.rotation.x = Math.PI / 2;
    eStopBacking.position.set(4.5, 5.4, 2.54);
    riskGroup.add(eStopBacking);

    const eStopBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), matDgRed);
    eStopBtn.rotation.x = Math.PI / 2;
    eStopBtn.position.set(4.5, 5.4, 2.6);
    riskGroup.add(eStopBtn);

    // 11. Decal Plates ("KOEL" & "DG SET")
    const koelPlate = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.05), new THREE.MeshBasicMaterial({ color: 0x1d4ed8 }));
    koelPlate.position.set(-3.8, 5.9, 2.53);
    riskGroup.add(koelPlate);

    const greenPlate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.05), new THREE.MeshBasicMaterial({ color: 0x16a34a }));
    greenPlate.position.set(2.4, 4.2, 2.53);
    riskGroup.add(greenPlate);

    // 12. Smart Trac Vibration Sensor with Alert Glow
    const dgSensor = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.45, 16), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
    dgSensor.position.set(3.2, 4.0, 2.6);
    dgSensor.rotation.x = Math.PI / 2;
    riskGroup.add(dgSensor);

    // 13. Critical Risk Warning Beacon & Floor Radar Rings
    const riskLight = new THREE.PointLight(0xef4444, 3.2, 40);
    riskLight.position.set(0, 9.5, 0);
    riskGroup.add(riskLight);

    const radarGeo = new THREE.RingGeometry(6.5, 7.5, 48);
    const radarMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    const radarRing = new THREE.Mesh(radarGeo, radarMat);
    radarRing.rotation.x = -Math.PI / 2;
    radarRing.position.y = 0.05;
    riskGroup.add(radarRing);

    const radarRing2 = radarRing.clone();
    riskGroup.add(radarRing2);

    const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(1.2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    beacon.position.y = 11.0;
    riskGroup.add(beacon);

    // 14. Telemetry - Named exactly "DG SET"
    riskBody.userData = {
      pqId: 'dgset',
      name: 'DG SET (KOEL Green Emergency Gen)',
      status: 'CRITICAL RISK',
      health: '18 / 100',
      vibration: '9.8 mm/s (Peak Alert)',
      temperature: '96.4°C',
      prediction: 'RevUpTime AI: Alternator Bearing Cage Wear — Severe vibration spikes. Imminent trip in 36h'
    };

    riskGroup.userData = riskBody.userData;
    riskGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = riskBody.userData;
        interactiveObjects.push(child);
      }
    });

    // --- RevUpTime Sensors on DG SET (Photo 1 & Photo 2 match) ---
    // Sensor 1: Alternator End-Shield (Flange-mounted matching Photo 2)
    sensorDgSetRef = createRevUpTimeSensor({
      parent: riskGroup,
      pos: [5.22, 3.4, 0.4],
      rot: [0, 0, -Math.PI / 2],
      scale: 1.15,
      withFlange: true,
      cableDir: [0, -1, 0],
      machineName: 'DG SET (Alternator Drive End)',
      channel: 'Triaxial Velocity • Bearing 6314-C3',
      vibValue: '3.4 mm/s RMS (High Risk)',
      tempValue: '78.5°C'
    });

    // Sensor 2: Diesel Engine Block DE (Direct Knurled mount matching Photo 1)
    createRevUpTimeSensor({
      parent: riskGroup,
      pos: [-5.22, 2.6, 0.8],
      rot: [0, 0, Math.PI / 2],
      scale: 1.1,
      withFlange: false,
      cableDir: [0, -1, 0],
      machineName: 'DG SET (Diesel Engine Block)',
      channel: 'Main Crankshaft Journal Vibration',
      vibValue: '4.2 mm/s RMS (Combustion Alert)',
      tempValue: '84.2°C'
    });

    scene.add(riskGroup);

    // Twin Blue Unit right behind it
    const twinGroup = new THREE.Group();
    twinGroup.position.set(-25, 0, -28);
    const twinBody = new THREE.Mesh(new THREE.BoxGeometry(8, 7, 6), bpMidMat);
    twinBody.position.y = 3.5;
    addEdges(twinBody, edgeLineBlue);
    twinGroup.add(twinBody);
    twinBody.userData = {
      name: 'Backup Generator 02',
      status: 'STANDBY',
      vibration: '0.8 mm/s',
      temperature: '28°C',
      prediction: 'Healthy • Auto-switchover ready'
    };
    interactiveObjects.push(twinBody);
    scene.add(twinGroup);

    // Two Vertical Cyclone Silos next to power bay
    function createSilo(x, z) {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 6, 20), bpMidMat);
      cyl.position.y = 4.5;
      addEdges(cyl, edgeLineBlue);
      g.add(cyl);

      const cone = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.5, 20), bpDarkMat);
      cone.position.y = 8.25;
      g.add(cone);

      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 2.5, 8), bpDarkMat);
        const ang = (i * Math.PI) / 2;
        leg.position.set(Math.cos(ang) * 1.1, 1.25, Math.sin(ang) * 1.1);
        g.add(leg);
      }

      cyl.userData = {
        name: 'Cyclone Filter Silo',
        status: 'NORMAL',
        vibration: '0.6 mm/s',
        temperature: '32°C',
        prediction: 'Nominal airflow differential'
      };
      interactiveObjects.push(cyl);
      scene.add(g);
    }
    createSilo(-16, -26);
    createSilo(-12, -26);

    // Transformer bank cluster around power bay
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 2.2), bpLightMat);
        box.position.set(-17 + c * 3.2, 1.2, -19 + r * 3.5);
        addEdges(box, edgeLineSubtle);
        scene.add(box);
      }
    }

    // =========================================================================
    // TASK 2: CORRIDOR GENERATORS (BETWEEN CYCLONE SILO AND COOLING TOWER)
    // User requested: "put these 2 machines between the blank space betewwn cyclone filter silo and evaporative cooling tower"
    // Photo 1: Portable Roll-Cage Diesel Generator DG-05 at (-4.0, 0, -23.5)
    // Photo 2: Mobile Industrial Field Diesel Engine on 4 Wheels MD-102 at (+4.5, 0, -23.5)
    // =========================================================================
    let portGenMesh = null;
    let fieldEngineMesh = null;

    // Materials for Corridor Power Units
    const matGenYellow = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.35, metalness: 0.2 });
    const matGenFrame = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.4, metalness: 0.3 });
    const matEngineSilver = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.5 });
    const matSocketBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 });
    const matEngineTeal = new THREE.MeshStandardMaterial({ color: 0x0e7490, roughness: 0.4, metalness: 0.3 });
    const matRubberTire = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, metalness: 0.1 });

    // -------------------------------------------------------------------------
    // MACHINE 2A: PORTABLE ROLL-CAGE DIESEL GENERATOR DG-05 (PHOTO 1)
    // Position: (-4.0, 0, -23.5)
    // -------------------------------------------------------------------------
    addFloorZone(-4.0, -23.5, 5.2, 4.4);

    const portGenGroup = new THREE.Group();
    portGenGroup.position.set(-4.0, 0, -23.5);

    const portGenPlinth = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.25, 4.0), matPlinth);
    portGenPlinth.position.y = 0.125;
    portGenGroup.add(portGenPlinth);

    // Roll-Cage Tubular Yellow Steel Frame
    const frameWidth = 2.4, frameHeight = 2.0, frameDepth = 1.8;
    for (let fz of [-frameDepth/2, frameDepth/2]) {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, frameWidth, 12), matGenFrame);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, 0.35, fz);
      portGenGroup.add(rail);

      const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, frameWidth, 12), matGenFrame);
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(0, 0.35 + frameHeight, fz);
      portGenGroup.add(topRail);
    }
    for (let fx of [-frameWidth/2, frameWidth/2]) {
      for (let fz of [-frameDepth/2, frameDepth/2]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, frameHeight, 12), matGenFrame);
        post.position.set(fx, 0.35 + frameHeight/2, fz);
        portGenGroup.add(post);
      }
      for (let fy of [0.35, 0.35 + frameHeight]) {
        const cross = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, frameDepth, 12), matGenFrame);
        cross.rotation.x = Math.PI / 2;
        cross.position.set(fx, fy, 0);
        portGenGroup.add(cross);
      }
    }

    // Top Yellow Fuel Tank
    const genFuelTank = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.55, 1.5), matGenYellow);
    genFuelTank.position.set(0, 2.05, 0);
    addEdges(genFuelTank, edgeLineDark);
    portGenGroup.add(genFuelTank);

    const genCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16), matChromeSteel);
    genCap.position.set(-0.4, 2.38, 0);
    portGenGroup.add(genCap);

    // Front Control Panel (Matte Black with Dual Industrial Blue Sockets)
    const genPanel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.12), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 }));
    genPanel.position.set(0, 1.35, 0.82);
    portGenGroup.add(genPanel);

    const brandPlate = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.22, 0.04), matGenYellow);
    brandPlate.position.set(0, 1.75, 0.89);
    portGenGroup.add(brandPlate);

    // Dual 230V Industrial Blue Sockets (Photo 1 Feature)
    for (let sx of [-0.4, 0.1]) {
      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16), matSocketBlue);
      socket.rotation.x = Math.PI / 2;
      socket.position.set(sx, 1.25, 0.9);
      portGenGroup.add(socket);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.04, 16), matSocketBlue);
      cap.rotation.x = Math.PI / 2;
      cap.position.set(sx, 1.25, 0.96);
      portGenGroup.add(cap);
    }

    const vmGauge = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.04), matGaugeWhite);
    vmGauge.position.set(0.5, 1.45, 0.89);
    portGenGroup.add(vmGauge);

    // Engine Block & Alternator Core
    const engBlock = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.1, 1.0), matEngineSilver);
    engBlock.position.set(0.3, 0.95, 0);
    addEdges(engBlock, edgeLineDark);
    portGenGroup.add(engBlock);

    for (let f = 0; f < 6; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 1.1), matEngineSilver);
      fin.position.set(0.3, 0.75 + f * 0.12, 0);
      portGenGroup.add(fin);
    }

    const altHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.1, 20), matGenYellow);
    altHousing.rotation.z = Math.PI / 2;
    altHousing.position.set(-0.6, 0.95, 0);
    addEdges(altHousing, edgeLineDark);
    portGenGroup.add(altHousing);

    const starterDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.35, 20), matGenYellow);
    starterDrum.rotation.z = Math.PI / 2;
    starterDrum.position.set(0.95, 0.95, 0);
    portGenGroup.add(starterDrum);

    for (let mx of [-0.6, 0.6]) {
      for (let mz of [-0.4, 0.4]) {
        const rubber = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 12), matRubberTire);
        rubber.position.set(mx, 0.42, mz);
        portGenGroup.add(rubber);
      }
    }

    portGenMesh = genFuelTank;
    movingParts.portableGen = portGenGroup;

    const genData = {
      name: 'Portable Diesel Generator DG-05 (Photo 1)',
      status: 'STANDBY / RUN • 230V 50Hz',
      vibration: '2.4 mm/s RMS (Engine Running)',
      temperature: '62.0°C',
      prediction: 'Output Voltage: 232V Stable • Fuel Level: 85%'
    };
    portGenGroup.userData = genData;
    portGenGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = genData;
        interactiveObjects.push(child);
      }
    });

    createRevUpTimeSensor({
      parent: portGenGroup,
      pos: [-0.6, 1.55, 0],
      rot: [0, 0, 0],
      scale: 0.85,
      withFlange: false,
      cableDir: [0, 1, 0.4],
      machineName: 'Portable Generator DG-05',
      channel: 'Alternator NDE Bearing',
      vibValue: '2.4 mm/s RMS',
      tempValue: '62.0°C'
    });
    scene.add(portGenGroup);

    // -------------------------------------------------------------------------
    // MACHINE 2B: MOBILE FIELD DIESEL ENGINE GENSET ON 4 WHEELS MD-102 (PHOTO 2)
    // Position: (+4.5, 0, -23.5)
    // -------------------------------------------------------------------------
    addFloorZone(4.5, -23.5, 5.6, 5.2);

    const fieldEngineGroup = new THREE.Group();
    fieldEngineGroup.position.set(4.5, 0, -23.5);

    const fieldPlinth = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.25, 4.6), matPlinth);
    fieldPlinth.position.y = 0.125;
    fieldEngineGroup.add(fieldPlinth);

    // Mobile Chassis Frame on 4 Wheels
    const chassisBed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.28, 3.2), matEngineTeal);
    chassisBed.position.set(0, 0.52, 0);
    addEdges(chassisBed, edgeLineDark);
    fieldEngineGroup.add(chassisBed);

    // 4 Solid Rubber Field Wheels (Photo 2 Match)
    const wheelPositions = [
      [-1.35, -1.2],
      [1.35, -1.2],
      [-1.35, 1.2],
      [1.35, 1.2]
    ];
    wheelPositions.forEach(([wx, wz]) => {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.22, 20), matRubberTire);
      tire.rotation.z = Math.PI / 2;
      tire.position.set(wx, 0.38, wz);
      fieldEngineGroup.add(tire);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.24, 16), matCastIron);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(wx, 0.38, wz);
      fieldEngineGroup.add(hub);
    });

    const feCrankcase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.8), matEngineTeal);
    feCrankcase.position.set(0, 1.45, 0.2);
    addEdges(feCrankcase, edgeLineDark);
    fieldEngineGroup.add(feCrankcase);

    const feCylinder = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, 1.3), matEngineTeal);
    feCylinder.position.set(0, 2.7, 0.2);
    addEdges(feCylinder, edgeLineDark);
    fieldEngineGroup.add(feCylinder);

    const feFuelTank = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.65, 1.5), matEngineTeal);
    feFuelTank.position.set(0, 3.55, 0.2);
    addEdges(feFuelTank, edgeLineDark);
    fieldEngineGroup.add(feFuelTank);

    const feTankCap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16), matChromeSteel);
    feTankCap.position.set(0, 3.92, 0.2);
    fieldEngineGroup.add(feTankCap);

    const feAirPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 12), matCastIron);
    feAirPipe.position.set(-0.8, 3.6, 0.6);
    fieldEngineGroup.add(feAirPipe);

    const feAirCanister = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.35, 16), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    feAirCanister.position.set(-0.8, 4.05, 0.6);
    fieldEngineGroup.add(feAirCanister);

    // Front Flywheel & Yellow Hand-Crank Dog (Photo 2 Signature Feature!)
    const flywheelGroup = new THREE.Group();
    flywheelGroup.position.set(0, 1.45, 1.25);

    const feFlywheel = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.32, 32), matEngineTeal);
    feFlywheel.rotation.x = Math.PI / 2;
    flywheelGroup.add(feFlywheel);

    const feFlywheelRim = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.06, 8, 32), matChromeSteel);
    flywheelGroup.add(feFlywheelRim);

    const feCrankHub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.45, 16), matBlowerYellow);
    feCrankHub.rotation.x = Math.PI / 2;
    feCrankHub.position.set(0, 0, 0.2);
    flywheelGroup.add(feCrankHub);

    fieldEngineGroup.add(flywheelGroup);
    movingParts.fieldEngineFlywheel = flywheelGroup;

    // Rear Radiator Shroud & Alternator
    const feRadiator = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 0.45), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 }));
    feRadiator.position.set(0, 2.1, -1.15);
    addEdges(feRadiator, edgeLineDark);
    fieldEngineGroup.add(feRadiator);

    const feRadCore = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.05), matWireDark);
    feRadCore.position.set(0, 2.1, -0.9);
    fieldEngineGroup.add(feRadCore);

    const feHose = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 12), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));
    feHose.rotation.x = 0.55;
    feHose.position.set(0, 3.2, -0.6);
    fieldEngineGroup.add(feHose);

    const feAlt = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 20), matEngineTeal);
    feAlt.rotation.x = Math.PI / 2;
    feAlt.position.set(0, 1.3, -1.0);
    fieldEngineGroup.add(feAlt);

    fieldEngineMesh = feCrankcase;
    movingParts.fieldEngine = fieldEngineGroup;

    const feData = {
      name: 'Mobile Field Diesel Power Unit MD-102 (Photo 2)',
      status: 'OPERATIONAL • 1,500 RPM',
      vibration: '2.1 mm/s RMS (Rhythmic)',
      temperature: '68.5°C',
      prediction: 'Coolant Flow: Normal • Flywheel Inertia Steady'
    };
    fieldEngineGroup.userData = feData;
    fieldEngineGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = feData;
        interactiveObjects.push(child);
      }
    });

    createRevUpTimeSensor({
      parent: fieldEngineGroup,
      pos: [0.8, 2.2, 0.3],
      rot: [0, 0, -Math.PI / 2],
      scale: 0.9,
      withFlange: false,
      cableDir: [0, 1, -0.3],
      machineName: 'Field Diesel Engine MD-102',
      channel: 'Flywheel Crankshaft Journal',
      vibValue: '2.1 mm/s RMS',
      tempValue: '68.5°C'
    });
    scene.add(fieldEngineGroup);

    // --- 3. COMPRESSOR ROW (Middle-Left) ---
    function createCompressorUnit(x, z, id) {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      const skid = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 5), bpDarkMat);
      skid.position.y = 0.6;
      addEdges(skid);
      g.add(skid);

      const main = new THREE.Mesh(new THREE.BoxGeometry(5, 4.5, 4.2), bpMidMat);
      main.position.y = 3.45;
      addEdges(main, edgeLineBlue);
      g.add(main);

      // Top circular fan vent
      const fanTop = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.5, 16), bpDarkMat);
      fanTop.position.set(0, 5.9, 0);
      g.add(fanTop);

      if (id === 1) {
        main.userData = {
          pqId: 'bearing',
          name: 'Screw Compressor 01',
          status: 'DANGER • HEALTH 24',
          health: '24 / 100',
          vibration: '7.6 mm/s RMS (High Peak Alert)',
          temperature: '82.4°C (Elevated)',
          prediction: 'RevUpTime AI: Bearing Wear · Stage 3 — High-frequency inner raceway defect. Overhaul DE bearing'
        };
      } else {
        main.userData = {
          name: 'Screw Compressor 02',
          status: 'OPTIMAL',
          health: '98 / 100',
          vibration: '2.0 mm/s RMS (Nominal)',
          temperature: '54°C',
          prediction: 'RevUpTime AI: Twin-Screw Rotor Mesh Nominal • Bearings Healthy'
        };
      }
      g.traverse(child => {
        if (child.isMesh) {
          child.userData = main.userData;
          interactiveObjects.push(child);
        }
      });

      // RevUpTime Sensor (Flange-Mounted on Compressor Casing, Photo 2 style)
      createRevUpTimeSensor({
        parent: g,
        pos: [2.2, 4.0, 1.8],
        rot: [0, 0, 0],
        scale: 0.95,
        withFlange: true,
        cableDir: [0.3, 1, 0],
        machineName: `Screw Compressor 0${id}`,
        channel: 'Discharge Airend Bearing',
        vibValue: `${(1.8 + id * 0.2).toFixed(1)} mm/s RMS`,
        tempValue: `${(52 + id * 2)}°C`
      });

      scene.add(g);
    }
    createCompressorUnit(-32, -3, 1);
    createCompressorUnit(-24, -3, 2);

    // =========================================================================
    // MACHINE 1A: BEVEL-HELICAL SPEED REDUCER GEARBOX GB-103 (PHOTO 1)
    // In place of Screw Compressor 03 at Position: (-16, 0, -3)
    // =========================================================================
    let gb1MainMesh = null;
    const gb1Group = new THREE.Group();
    gb1Group.position.set(-16, 0, -3);

    addFloorZone(-16, -3, 6.6, 5.8);

    const gb1Plinth = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.35, 5.2), matPlinth);
    gb1Plinth.position.y = 0.175;
    gb1Group.add(gb1Plinth);

    const matGearboxBlue = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35, metalness: 0.35 });

    // Lower Sump & Base Casing
    gb1MainMesh = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.0, 3.0), matGearboxBlue);
    gb1MainMesh.position.y = 1.25;
    addEdges(gb1MainMesh, edgeLineDark);
    gb1Group.add(gb1MainMesh);

    // Foundation bolt feet along bottom perimeter
    for (let bx of [-2.3, 2.3]) {
      for (let bz of [-1.5, 1.5]) {
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 0.7), matGearboxBlue);
        foot.position.set(bx, 0.35, bz);
        addEdges(foot, edgeLineDark);
        gb1Group.add(foot);

        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), matChromeSteel);
        bolt.position.set(bx, 0.45, bz);
        gb1Group.add(bolt);
      }
    }

    // Upper Casing & Bevel Gear Head Cover
    const gb1UpperCover = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.1, 2.6), matGearboxBlue);
    gb1UpperCover.position.set(0, 2.7, 0);
    addEdges(gb1UpperCover, edgeLineDark);
    gb1Group.add(gb1UpperCover);

    // Bolted Top Inspection Lid
    const gb1Lid = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, 1.8), matGearboxBlue);
    gb1Lid.position.set(0, 3.3, 0);
    addEdges(gb1Lid, edgeLineDark);
    gb1Group.add(gb1Lid);

    // Cast Lifting Eye Lugs (on top corners)
    for (let lx of [-1.5, 1.5]) {
      const lug = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.06, 8, 16), matGearboxBlue);
      lug.position.set(lx, 3.35, 0);
      gb1Group.add(lug);
    }

    // Side Output Hollow Shaft Hub (Left side: X = -2.3)
    const gb1OutputBoss = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.4, 24), matGearboxBlue);
    gb1OutputBoss.rotation.z = Math.PI / 2;
    gb1OutputBoss.position.set(-2.3, 1.5, 0.3);
    addEdges(gb1OutputBoss, edgeLineDark);
    gb1Group.add(gb1OutputBoss);

    const gb1OutputRing = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.78, 24), matChromeSteel);
    gb1OutputRing.rotation.y = -Math.PI / 2;
    gb1OutputRing.position.set(-2.51, 1.5, 0.3);
    gb1Group.add(gb1OutputRing);

    const gb1HollowSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.5, 20), matChromeSteel);
    gb1HollowSleeve.rotation.z = Math.PI / 2;
    gb1HollowSleeve.position.set(-2.4, 1.5, 0.3);
    gb1Group.add(gb1HollowSleeve);
    movingParts.gearbox1Shafts.push(gb1HollowSleeve);

    const keywayGroove = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.12), new THREE.MeshBasicMaterial({ color: 0x020617 }));
    keywayGroove.position.set(0, 0.4, 0);
    gb1HollowSleeve.add(keywayGroove);

    // Front High-Speed Input Shaft Extension (Facing +Z)
    const gb1InputSnout = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.9, 20), matGearboxBlue);
    gb1InputSnout.rotation.x = Math.PI / 2;
    gb1InputSnout.position.set(0.9, 1.3, 1.8);
    addEdges(gb1InputSnout, edgeLineDark);
    gb1Group.add(gb1InputSnout);

    const gb1InputShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.2, 16), matChromeSteel);
    gb1InputShaft.rotation.x = Math.PI / 2;
    gb1InputShaft.position.set(0.9, 1.3, 2.5);
    gb1Group.add(gb1InputShaft);
    movingParts.gearbox1Shafts.push(gb1InputShaft);

    const inKey = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.6), new THREE.MeshBasicMaterial({ color: 0x334155 }));
    inKey.position.set(0, 0.22, 0);
    gb1InputShaft.add(inKey);

    // Right-Side Cast Cooling Fins (Direct Photo 1 Match!)
    for (let f = 0; f < 8; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 2.4), matGearboxBlue);
      fin.position.set(2.26, 0.7 + f * 0.26, 0);
      gb1Group.add(fin);
    }

    // Oil Sight Level Plug & Chrome Bezel
    const sightPlug = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16), matChromeSteel);
    sightPlug.rotation.x = Math.PI / 2;
    sightPlug.position.set(-0.8, 2.4, 1.52);
    gb1Group.add(sightPlug);

    const sightGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.09, 16), new THREE.MeshBasicMaterial({ color: 0x1e293b }));
    sightGlass.rotation.x = Math.PI / 2;
    sightGlass.position.set(-0.8, 2.4, 1.53);
    gb1Group.add(sightGlass);

    const gb1Data = {
      name: 'Bevel-Helical Speed Reducer GB-103 (Photo 1)',
      status: 'NOMINAL • RATIO 14.5:1',
      vibration: '1.2 mm/s RMS (Smooth)',
      temperature: '51.8°C',
      prediction: 'Gear Mesh Backlash: 0.12 mm • Oil Viscosity OK'
    };
    gb1Group.userData = gb1Data;
    gb1Group.traverse(child => {
      if (child.isMesh) {
        child.userData = gb1Data;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensors on Gearbox GB-103 (Photo 1 match)
    sensorGearboxRef = createRevUpTimeSensor({
      parent: gb1Group,
      pos: [-1.8, 2.6, 0.9],
      rot: [0.2, 0, -0.35],
      scale: 1.0,
      withFlange: false,
      cableDir: [0, 1, -0.4],
      machineName: 'Bevel-Helical Gearbox GB-103',
      channel: 'High-Speed Input Pinion Bearing',
      vibValue: '1.2 mm/s RMS',
      tempValue: '51.8°C'
    });

    createRevUpTimeSensor({
      parent: gb1Group,
      pos: [1.7, 2.5, 0],
      rot: [0, 0, -Math.PI / 2],
      scale: 0.95,
      withFlange: true,
      cableDir: [0, 1, 0.3],
      machineName: 'Bevel-Helical Gearbox GB-103',
      channel: 'Low-Speed Hollow Shaft Sleeve',
      vibValue: '1.0 mm/s RMS',
      tempValue: '49.5°C'
    });

    scene.add(gb1Group);

    // Vertical inspection column
    const colMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 7, 16), bpMidMat);
    colMesh.position.set(-10, 3.5, -3);
    addEdges(colMesh, edgeLineBlue);
    scene.add(colMesh);

    // Extra electrical cabinets near compressors
    createPerimeterBlock(-28, 3, 3.2, 2.5, 2);
    createPerimeterBlock(-22, 3, 3.2, 2.5, 2);

    // --- 4. LOWER-LEFT PUMPING BAY: 2 CUSTOM INDUSTRIAL PUMP STATIONS ---
    // (Replacing generic high pressure feed pump with the 2 machines from photos)

    // Common shared materials for the 2 pump machines
    const matPumpBlue = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35, metalness: 0.3 }); // Industrial deep blue
    const matSkyBlue = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4, metalness: 0.25 }); // Light industrial blue
    const matYellowGuard = matBlowerYellow; // OSHA Safety Yellow Guard
    const matRedBreather = new THREE.MeshBasicMaterial({ color: 0xdc2626 }); // Oil breather cap & dial needles

    // =========================================================================
    // MACHINE A: PROCESS BOOSTER PUMP SKID WITH OSHA YELLOW GUARD (PHOTO 1)
    // Position: (-31, 0, 10.5)
    // =========================================================================
    const p1Group = new THREE.Group();
    p1Group.position.set(-31, 0, 10.5);

    // 1. Heavy C-Channel Structural Steel Bedplate
    const p1Bed = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.6, 3.8), matPumpBlue);
    p1Bed.position.y = 0.3;
    p1Bed.castShadow = true;
    addEdges(p1Bed, edgeLineDark);
    p1Group.add(p1Bed);

    // Flange lip perimeter
    for (let fz of [-1.8, 1.8]) {
      const lip = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.2, 0.2), matPumpBlue);
      lip.position.set(0, 0.7, fz);
      p1Group.add(lip);
    }

    // 2. Drive Induction Motor (Right side, X = +2.4)
    const p1MotorGroup = new THREE.Group();
    p1MotorGroup.position.set(2.5, 0, 0);

    // Motor feet
    const p1MFoot1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 2.6), matPumpBlue);
    p1MFoot1.position.set(-1.0, 0.5, 0);
    p1MotorGroup.add(p1MFoot1);
    const p1MFoot2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 2.6), matPumpBlue);
    p1MFoot2.position.set(1.0, 0.5, 0);
    p1MotorGroup.add(p1MFoot2);

    // Motor Stator with cooling fins
    const p1Stator = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 3.2, 24), matPumpBlue);
    p1Stator.rotation.z = Math.PI / 2;
    p1Stator.position.set(0, 1.9, 0);
    p1Stator.castShadow = true;
    p1MotorGroup.add(p1Stator);

    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2;
      if (ang > 1.2 && ang < 1.9) continue; // Skip top junction box
      const fin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.16, 0.08), matPumpBlue);
      fin.position.set(0, 1.9 + Math.sin(ang) * 1.38, Math.cos(ang) * 1.38);
      fin.rotation.x = ang;
      p1MotorGroup.add(fin);
    }

    // Motor Rear Fan Cowl (Right end)
    const p1FanCowl = new THREE.Mesh(new THREE.CylinderGeometry(1.34, 1.34, 0.8, 24), matPumpBlue);
    p1FanCowl.rotation.z = Math.PI / 2;
    p1FanCowl.position.set(1.9, 1.9, 0);
    addEdges(p1FanCowl, edgeLineDark);
    p1MotorGroup.add(p1FanCowl);

    // Top Terminal Box
    const p1TBox = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.9), matPumpBlue);
    p1TBox.position.set(0, 3.4, 0);
    addEdges(p1TBox, edgeLineDark);
    p1MotorGroup.add(p1TBox);

    p1Group.add(p1MotorGroup);

    // 3. OSHA Yellow Safety Coupling Guard (Between Motor and Bearing Frame, X = +0.5)
    const p1Guard = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.3, 24), matYellowGuard);
    p1Guard.rotation.z = Math.PI / 2;
    p1Guard.position.set(0.45, 1.9, 0);
    addEdges(p1Guard, edgeLineDark);
    p1Group.add(p1Guard);

    // Internal Rotating Flexible Coupling
    const p1Coupling = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.2, 16), matChromeSteel);
    p1Coupling.rotation.z = Math.PI / 2;
    p1Coupling.position.set(0.45, 1.9, 0);
    p1Group.add(p1Coupling);
    movingParts.boosterCoupling = p1Coupling;

    // 4. Bearing Pedestal with Open Mechanical Seal Chamber (X = -0.8)
    const p1BearingPedestal = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.8), matPumpBlue);
    p1BearingPedestal.position.set(-0.8, 1.3, 0);
    p1Group.add(p1BearingPedestal);

    // Cylindrical bearing frame
    const p1BearingCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.8, 20), matPumpBlue);
    p1BearingCyl.rotation.z = Math.PI / 2;
    p1BearingCyl.position.set(-0.8, 1.9, 0);
    p1Group.add(p1BearingCyl);

    // Red Oil Fill / Breather Cap on bearing housing
    const p1Breather = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.35, 12), matRedBreather);
    p1Breather.position.set(-0.35, 2.8, 0);
    p1Group.add(p1Breather);

    // Mechanical Seal Open Inspection Chamber (Window showing gleaming rotating shaft)
    const p1SealCavity = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 1.4), matCastIron);
    p1SealCavity.position.set(-1.45, 1.9, 0);
    p1Group.add(p1SealCavity);

    // Exposed Rotating Polished Shaft Sleeve inside seal chamber
    const p1Shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.95, 20), matChromeSteel);
    p1Shaft.rotation.z = Math.PI / 2;
    p1Shaft.position.set(-1.45, 1.9, 0);
    p1Group.add(p1Shaft);
    movingParts.boosterShaft = p1Shaft;

    // 5. Centrifugal Pump Volute Casing (Left side, X = -2.8)
    const p1Volute = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 1.5, 24), matPumpBlue);
    p1Volute.rotation.x = Math.PI / 2;
    p1Volute.position.set(-2.8, 1.9, 0);
    addEdges(p1Volute, edgeLineDark);
    p1Group.add(p1Volute);

    // Front Axial Suction Nozzle & Flange (Facing -X)
    const p1SuctionSpool = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.1, 20), matPumpBlue);
    p1SuctionSpool.rotation.z = Math.PI / 2;
    p1SuctionSpool.position.set(-3.9, 1.9, 0);
    p1Group.add(p1SuctionSpool);

    // Bolted Outer Suction Flange
    const p1SuctionFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.25, 24), matPumpBlue);
    p1SuctionFlange.rotation.z = Math.PI / 2;
    p1SuctionFlange.position.set(-4.45, 1.9, 0);
    p1Group.add(p1SuctionFlange);

    // Machined Silver Flange Ring Face
    const p1FlangeFace = new THREE.Mesh(new THREE.RingGeometry(0.55, 1.25, 24), matChromeSteel);
    p1FlangeFace.rotation.y = -Math.PI / 2;
    p1FlangeFace.position.set(-4.58, 1.9, 0);
    p1Group.add(p1FlangeFace);

    // Top Vertical Discharge Nozzle & Flange (Facing +Y)
    const p1DischargeNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, 1.2, 20), matPumpBlue);
    p1DischargeNozzle.position.set(-2.8, 3.1, 0);
    p1Group.add(p1DischargeNozzle);

    const p1DischargeFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.25, 24), matPumpBlue);
    p1DischargeFlange.position.set(-2.8, 3.75, 0);
    p1Group.add(p1DischargeFlange);

    // 6. Stainless Steel Auxiliary Seal Flush Piping (Flexible braided metal tubes)
    for (let fz of [-0.65, 0.65]) {
      const hoseTube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 12), matChromeSteel);
      hoseTube.position.set(-1.1, 2.9, fz);
      hoseTube.rotation.z = 0.35;
      p1Group.add(hoseTube);

      const hoseFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12), matCastIron);
      hoseFlange.position.set(-1.45, 3.8, fz);
      p1Group.add(hoseFlange);
    }

    // Telemetry & Interactivity for Machine 1
    const p1Data = {
      name: 'Process Booster Pump Skid P-101 (Photo 1)',
      status: 'OPTIMAL • 2,950 RPM',
      health: '98 / 100',
      vibration: '1.9 mm/s RMS (Healthy)',
      temperature: '53.2°C',
      prediction: 'RevUpTime AI: Mechanical Seal Zero Leakage • Cavitation Free'
    };
    p1Group.userData = p1Data;
    p1Group.traverse(child => {
      if (child.isMesh) {
        child.userData = p1Data;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensors on Process Booster Pump Skid P-101 (Photo 1)
    createRevUpTimeSensor({
      parent: p1Group,
      pos: [-0.8, 2.7, 0.6],
      rot: [0.25, 0, 0],
      scale: 1.0,
      withFlange: false,
      cableDir: [-0.2, 1, 0],
      machineName: 'Process Booster Pump P-101',
      channel: 'Pump Bearing Housing DE',
      vibValue: '1.9 mm/s RMS',
      tempValue: '53.2°C'
    });

    createRevUpTimeSensor({
      parent: p1Group,
      pos: [2.1, 2.6, 0.5],
      rot: [0, 0, 0],
      scale: 0.95,
      withFlange: false,
      cableDir: [0, 1, 0.3],
      machineName: 'Process Booster Pump Motor',
      channel: 'Motor Drive End Bearing',
      vibValue: '1.6 mm/s RMS',
      tempValue: '55.0°C'
    });

    scene.add(p1Group);

    // =========================================================================
    // MACHINE B: DUPLEX TWIN CENTRIFUGAL PUMPING STATION (PHOTO 2)
    // Position: (-31, 0, 20.0)
    // =========================================================================
    const p2Group = new THREE.Group();
    p2Group.position.set(-31, 0, 20.0);

    // 1. Concrete Base Plinth Foundation
    const p2Plinth = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.4, 6.4), matPlinth);
    p2Plinth.position.y = 0.2;
    p2Group.add(p2Plinth);

    // 2. Twin Steel Channel Skids (Z = -1.6 and Z = +1.6)
    for (let sz of [-1.6, 1.6]) {
      const skidFrame = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.4, 2.6), matSkyBlue);
      skidFrame.position.set(0, 0.6, sz);
      addEdges(skidFrame, edgeLineDark);
      p2Group.add(skidFrame);
    }

    // Deploy Twin Identical Pumping Lines (Line 1 at Z = -1.6, Line 2 at Z = +1.6)
    for (let i = 0; i < 2; i++) {
      const sz = i === 0 ? -1.6 : 1.6;

      // A. Drive Motor (X = -2.6)
      const dMotor = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.8, 20), matSkyBlue);
      dMotor.rotation.z = Math.PI / 2;
      dMotor.position.set(-2.6, 1.8, sz);
      dMotor.castShadow = true;
      p2Group.add(dMotor);

      // Motor fins
      for (let f = 0; f < 12; f++) {
        const ang = (f / 12) * Math.PI * 2;
        if (ang > 1.2 && ang < 1.9) continue;
        const fin = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 0.08), matSkyBlue);
        fin.position.set(-2.6, 1.8 + Math.sin(ang) * 1.26, sz + Math.cos(ang) * 1.26);
        fin.rotation.x = ang;
        p2Group.add(fin);
      }

      // Motor rear cowl & top terminal box
      const dCowl = new THREE.Mesh(new THREE.CylinderGeometry(1.24, 1.24, 0.7, 20), matSkyBlue);
      dCowl.rotation.z = Math.PI / 2;
      dCowl.position.set(-4.2, 1.8, sz);
      p2Group.add(dCowl);

      const dTBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.7), matSkyBlue);
      dTBox.position.set(-2.6, 3.15, sz);
      p2Group.add(dTBox);

      // B. Perforated Coupling Guard (X = -0.5)
      const dGuard = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.3, 16), matCastIron);
      dGuard.rotation.z = Math.PI / 2;
      dGuard.position.set(-0.5, 1.8, sz);
      addEdges(dGuard, edgeLineDark);
      p2Group.add(dGuard);

      const dCoupling = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.1, 12), matChromeSteel);
      dCoupling.rotation.z = Math.PI / 2;
      dCoupling.position.set(-0.5, 1.8, sz);
      p2Group.add(dCoupling);
      movingParts.duplexCouplings.push(dCoupling);

      // C. Centrifugal Pump Volute Casing (X = +1.2)
      const dVolute = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 1.3, 20), matSkyBlue);
      dVolute.rotation.x = Math.PI / 2;
      dVolute.position.set(1.2, 1.8, sz);
      addEdges(dVolute, edgeLineDark);
      p2Group.add(dVolute);

      // Suction Nozzle (Front, X = +2.6)
      const dSuction = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 16), matSkyBlue);
      dSuction.rotation.z = Math.PI / 2;
      dSuction.position.set(2.5, 1.8, sz);
      p2Group.add(dSuction);

      // D. Vertical Discharge Pipe Riser (Rising up to height ~5.6)
      const dRiser = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 3.4, 16), matSkyBlue);
      dRiser.position.set(1.2, 3.9, sz);
      p2Group.add(dRiser);

      // Flanged check valve body
      const dCheckValve = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.6, 16), matSkyBlue);
      dCheckValve.position.set(1.2, 3.6, sz);
      p2Group.add(dCheckValve);

      // Isolation Valve Body with Manual Control Handwheel
      const dIsoValve = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.8, 16), matSkyBlue);
      dIsoValve.position.set(1.2, 4.7, sz);
      p2Group.add(dIsoValve);

      // Circular Valve Handwheel
      const dWheel = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 8, 20), matCastIron);
      dWheel.rotation.y = Math.PI / 2;
      dWheel.position.set(2.1, 4.7, sz);
      p2Group.add(dWheel);

      // E. Analog Pressure Dial Gauge on Riser
      const dGaugeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.15, 16), matCastIron);
      dGaugeBody.rotation.y = Math.PI / 2;
      dGaugeBody.position.set(1.2, 4.2, sz + (i === 0 ? -0.7 : 0.7));
      p2Group.add(dGaugeBody);

      const dGaugeFace = new THREE.Mesh(new THREE.CircleGeometry(0.28, 16), matGaugeWhite);
      dGaugeFace.rotation.y = i === 0 ? -Math.PI / 2 : Math.PI / 2;
      dGaugeFace.position.set(1.2, 4.2, sz + (i === 0 ? -0.78 : 0.78));
      p2Group.add(dGaugeFace);

      const dNeedle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.02), matRedBreather);
      dNeedle.position.set(1.2, 4.24, sz + (i === 0 ? -0.8 : 0.8));
      p2Group.add(dNeedle);
      movingParts.duplexGaugeNeedles.push(dNeedle);
    }

    // 3. Common Interconnecting Manifold Header Pipe (Linking both risers at height 5.6)
    const headerPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 3.8, 16), matSkyBlue);
    headerPipe.position.set(1.2, 5.6, 0);
    addEdges(headerPipe, edgeLineDark);
    p2Group.add(headerPipe);

    // Common Discharge Line extending from center of header
    const mainDischarge = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 2.6, 16), matSkyBlue);
    mainDischarge.rotation.z = Math.PI / 2;
    mainDischarge.position.set(2.8, 5.6, 0);
    p2Group.add(mainDischarge);

    // Bolted end flange on common line
    const mainFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.2, 20), matSkyBlue);
    mainFlange.rotation.z = Math.PI / 2;
    mainFlange.position.set(4.1, 5.6, 0);
    p2Group.add(mainFlange);

    // Telemetry & Interactivity for Machine 2
    const p2Data = {
      pqId: 'discharge',
      name: 'Duplex Centrifugal Pump P-201',
      status: 'DANGER • HEALTH 20',
      health: '20 / 100',
      vibration: '6.4 mm/s RMS (Cavitation Peak)',
      temperature: '68.5°C',
      prediction: 'RevUpTime AI: Discharge Valve Leak — Non-return valve seat leakage & cavitation backflow'
    };
    p2Group.userData = p2Data;
    p2Group.traverse(child => {
      if (child.isMesh) {
        child.userData = p2Data;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensors on Both Duplex Pumps (Photo 2)
    for (let i = 0; i < 2; i++) {
      const sz = i === 0 ? -1.6 : 1.6;
      createRevUpTimeSensor({
        parent: p2Group,
        pos: [0.4, 2.5, sz],
        rot: [0, 0, 0],
        scale: 0.9,
        withFlange: false,
        cableDir: [0, 1, 0.3],
        machineName: i === 0 ? 'Duplex Pump P-201A' : 'Duplex Pump P-201B',
        channel: 'Radial & Thrust Bearing Frame',
        vibValue: '2.1 mm/s RMS',
        tempValue: '48.7°C'
      });
    }

    scene.add(p2Group);

    // Two tall MCC Switchgear Cabinets
    function createMCC(x, z) {
      const mcc = new THREE.Mesh(new THREE.BoxGeometry(3, 6, 2.5), bpMidMat);
      mcc.position.set(x, 3, z);
      addEdges(mcc, edgeLineBlue);
      mcc.userData = {
        name: 'MCC Control Panel',
        status: 'ACTIVE',
        vibration: '0.1 mm/s',
        temperature: '31°C',
        prediction: 'Energy Trac: Normal Power Factor 0.96'
      };
      interactiveObjects.push(mcc);
      scene.add(mcc);
    }
    createMCC(-20, 17);
    createMCC(-15, 17);

    // Auxiliary junction boxes in lower-left
    createPerimeterBlock(-25, 25, 2.5, 2.2, 2.5);
    createPerimeterBlock(-18, 25, 2.5, 2.2, 2.5);

    // =========================================================================
    // --- 4B. INDUSTRIAL VENTILATION FANS (CORNER DEPLOYMENTS) ---
    // User requested: "put one fan in top left cornor and one in bottom left cornor"
    // Reference Photo 1: Fixed Centrifugal Exhaust Blower with Pedestal & Motor
    // Reference Photo 2: Mobile High-Velocity Industrial Drum Fan with 3 Cyan Blades
    // =========================================================================
    let fan1Volute = null;
    let fan2Barrel = null;

    const matBlowerSlate = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.35 });
    const matBlowerMotor = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35, metalness: 0.3 });
    const matDrumBlack = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.45, metalness: 0.4 });
    const matDrumCyan = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.25, metalness: 0.2 });
    const matSwitchGreen = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    // -------------------------------------------------------------------------
    // FAN 1: HEAVY CENTRIFUGAL BLOWER FAN BL-101 (TOP-LEFT CORNER, PHOTO 1)
    // Position: (-42, 0, -24)
    // -------------------------------------------------------------------------
    addFloorZone(-42, -24, 7.2, 7.0);

    const fan1Group = new THREE.Group();
    fan1Group.position.set(-42, 0, -24);
    fan1Group.rotation.y = -Math.PI * 0.15; // Angled for optimal perspective view

    // 1. Concrete & Steel Plinth Base
    const f1Plinth = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.35, 4.8), matPlinth);
    f1Plinth.position.y = 0.175;
    fan1Group.add(f1Plinth);

    // Yellow alignment blocks at corners
    for (let cx of [-2.8, 2.8]) {
      for (let cz of [-2.2, 2.2]) {
        const yellowStop = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.4), matBlowerYellow);
        yellowStop.position.set(cx, 0.25, cz);
        fan1Group.add(yellowStop);
      }
    }

    // 2. Heavy-Duty Trapezoidal Pedestal Support Base with 4 Circular Lightening Holes
    const f1Pedestal = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.8, 4.2), matBlowerSlate);
    f1Pedestal.position.set(0, 1.25, 0);
    addEdges(f1Pedestal, edgeLineDark);
    fan1Group.add(f1Pedestal);

    const f1BottomFlange = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.18, 4.4), matBlowerSlate);
    f1BottomFlange.position.set(0, 0.44, 0);
    fan1Group.add(f1BottomFlange);

    // 4 Circular Lightening Holes along visible side face (X = +1.32, matching Photo 1)
    for (let i = 0; i < 4; i++) {
      const hz = -1.35 + i * 0.9;
      const holeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.1, 20), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
      holeMesh.rotation.z = Math.PI / 2;
      holeMesh.position.set(1.31, 1.25, hz);
      fan1Group.add(holeMesh);

      const holeRim = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.03, 8, 20), matChromeSteel);
      holeRim.rotation.y = Math.PI / 2;
      holeRim.position.set(1.33, 1.25, hz);
      fan1Group.add(holeRim);
    }

    // 3. Centrifugal Volute Scroll Housing (Casing)
    fan1Volute = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 1.3, 32), matBlowerSlate);
    fan1Volute.rotation.x = Math.PI / 2;
    fan1Volute.position.set(0, 2.8, 0.8);
    addEdges(fan1Volute, edgeLineDark);
    fan1Group.add(fan1Volute);

    const voluteFlangeRim = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.07, 8, 32), matBlowerSlate);
    voluteFlangeRim.position.set(0, 2.8, 0.8);
    fan1Group.add(voluteFlangeRim);

    // 4. Front Axial Suction Eye (Inlet Flange facing +Z)
    const f1SuctionSpool = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.45, 24), matBlowerSlate);
    f1SuctionSpool.rotation.x = Math.PI / 2;
    f1SuctionSpool.position.set(0, 2.8, 1.65);
    fan1Group.add(f1SuctionSpool);

    const f1SuctionFlange = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.12, 24), matBlowerSlate);
    f1SuctionFlange.rotation.x = Math.PI / 2;
    f1SuctionFlange.position.set(0, 2.8, 1.9);
    addEdges(f1SuctionFlange, edgeLineDark);
    fan1Group.add(f1SuctionFlange);

    const f1FlangeRing = new THREE.Mesh(new THREE.RingGeometry(0.85, 1.35, 24), matChromeSteel);
    f1FlangeRing.position.set(0, 2.8, 1.97);
    fan1Group.add(f1FlangeRing);

    const f1IntakeTunnel = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.6, 20), new THREE.MeshBasicMaterial({ color: 0x020617 }));
    f1IntakeTunnel.rotation.x = Math.PI / 2;
    f1IntakeTunnel.position.set(0, 2.8, 1.6);
    fan1Group.add(f1IntakeTunnel);

    // 5. Centrifugal Impeller Fan Rotor (Rotating)
    const f1ImpellerGroup = new THREE.Group();
    f1ImpellerGroup.position.set(0, 2.8, 1.45);

    const f1Hub = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.35, 16), matChromeSteel);
    f1Hub.rotation.x = Math.PI / 2;
    f1ImpellerGroup.add(f1Hub);

    for (let b = 0; b < 8; b++) {
      const bAng = (b / 8) * Math.PI * 2;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.62, 0.28), matChromeSteel);
      blade.position.set(Math.cos(bAng) * 0.48, Math.sin(bAng) * 0.48, 0);
      blade.rotation.z = bAng + 0.38;
      f1ImpellerGroup.add(blade);
    }
    fan1Group.add(f1ImpellerGroup);
    movingParts.centrifugalImpeller = f1ImpellerGroup;

    // 6. Vertical Rectangular Discharge Stack (Exhaust Chimney)
    const f1DischargeDuct = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.2, 1.2), matBlowerSlate);
    f1DischargeDuct.position.set(-0.7, 4.4, 0.8);
    addEdges(f1DischargeDuct, edgeLineDark);
    fan1Group.add(f1DischargeDuct);

    const f1TopFlange = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.14, 1.45), matBlowerSlate);
    f1TopFlange.position.set(-0.7, 5.55, 0.8);
    addEdges(f1TopFlange, edgeLineDark);
    fan1Group.add(f1TopFlange);

    const f1ExhaustHole = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 1.0), new THREE.MeshBasicMaterial({ color: 0x020617 }));
    f1ExhaustHole.position.set(-0.7, 5.63, 0.8);
    fan1Group.add(f1ExhaustHole);

    // 7. Direct-Drive Electric Motor (Blue induction motor on rear pedestal)
    const f1Motor = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 1.9, 20), matBlowerMotor);
    f1Motor.rotation.x = Math.PI / 2;
    f1Motor.position.set(0, 2.8, -1.25);
    f1Motor.castShadow = true;
    addEdges(f1Motor, edgeLineDark);
    fan1Group.add(f1Motor);

    for (let f = 0; f < 12; f++) {
      const fAng = (f / 12) * Math.PI * 2;
      if (fAng > 1.1 && fAng < 2.0) continue;
      const mFin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 1.7), matBlowerMotor);
      mFin.position.set(Math.cos(fAng) * 0.7, 2.8 + Math.sin(fAng) * 0.7, -1.25);
      mFin.rotation.z = fAng;
      fan1Group.add(mFin);
    }

    const f1Cowl = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.45, 20), matBlowerMotor);
    f1Cowl.rotation.x = Math.PI / 2;
    f1Cowl.position.set(0, 2.8, -2.3);
    fan1Group.add(f1Cowl);

    const f1TerminalBox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.55), matBlowerMotor);
    f1TerminalBox.position.set(0, 3.65, -1.2);
    fan1Group.add(f1TerminalBox);

    // 8. Drive Shaft & Safety Coupling Guard
    const f1Shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 12), matChromeSteel);
    f1Shaft.rotation.x = Math.PI / 2;
    f1Shaft.position.set(0, 2.8, -0.05);
    fan1Group.add(f1Shaft);
    movingParts.centrifugalShaft = f1Shaft;

    const f1Guard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.6), matBlowerYellow);
    f1Guard.position.set(0, 2.8, -0.05);
    addEdges(f1Guard, edgeLineDark);
    fan1Group.add(f1Guard);

    // Telemetry & Interactivity for Fan 1
    const fan1Data = {
      name: 'Centrifugal Blower Fan BL-101 (Top-Left)',
      status: 'OPERATIONAL • 1,780 RPM',
      vibration: '1.4 mm/s RMS (Optimal)',
      temperature: '46.5°C',
      prediction: 'Impeller Dynamic Balance: 99.4% • Clean Airflow'
    };
    fan1Group.userData = fan1Data;
    fan1Group.traverse(child => {
      if (child.isMesh) {
        child.userData = fan1Data;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on Centrifugal Fan Motor Bearing (Photo 1 style)
    createRevUpTimeSensor({
      parent: fan1Group,
      pos: [0.7, 3.4, 0.3],
      rot: [0.2, 0, -0.3],
      scale: 0.95,
      withFlange: false,
      cableDir: [0, 1, 0],
      machineName: 'Centrifugal Blower Fan BL-101',
      channel: 'Fan Drive Motor DE Bearing',
      vibValue: '1.4 mm/s RMS',
      tempValue: '46.5°C'
    });

    scene.add(fan1Group);

    // -------------------------------------------------------------------------
    // FAN 2: MOBILE INDUSTRIAL DRUM / BARREL AXIAL FAN DF-201 (BOTTOM-LEFT CORNER, PHOTO 2)
    // Position: (-41, 0, 19)
    // -------------------------------------------------------------------------
    addFloorZone(-41, 19, 6.2, 5.5);

    const fan2Group = new THREE.Group();
    fan2Group.position.set(-41, 0, 19);
    fan2Group.rotation.y = Math.PI * 0.38; // Facing diagonally towards center walkway & isometric camera

    // 1. Mobile Wheeled Undercarriage Base Frame
    const f2BaseFrame = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.22, 1.6), matDrumBlack);
    f2BaseFrame.position.set(0, 0.35, 0);
    addEdges(f2BaseFrame, edgeLineDark);
    fan2Group.add(f2BaseFrame);

    // 4 Heavy-Duty Swivel Caster Wheels with Bright Cyan/Blue Wheel Hubs (Direct Photo Match)
    const casterPositions = [
      [-1.15, -0.65],
      [1.15, -0.65],
      [-1.15, 0.65],
      [1.15, 0.65]
    ];
    casterPositions.forEach(([cx, cz]) => {
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.2), matCastIron);
      bracket.position.set(cx, 0.22, cz);
      fan2Group.add(bracket);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.14, 16), matDrumCyan);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(cx, 0.12, cz);
      fan2Group.add(wheel);
    });

    // 2. Vertical Pedestal Support Risers
    for (let rx of [-0.65, 0.65]) {
      const riser = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.5), matDrumBlack);
      riser.position.set(rx, 0.72, 0);
      fan2Group.add(riser);
    }

    // 3. Massive Outer Cylindrical Drum Barrel Shroud (Hoop)
    const f2BarrelRadius = 1.85;
    fan2Barrel = new THREE.Mesh(new THREE.CylinderGeometry(f2BarrelRadius, f2BarrelRadius, 0.9, 36, 1, true), matDrumBlack);
    fan2Barrel.rotation.x = Math.PI / 2;
    fan2Barrel.position.set(0, 2.45, 0);
    addEdges(fan2Barrel, edgeLineDark);
    fan2Group.add(fan2Barrel);

    for (let fz of [-0.45, 0.45]) {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(f2BarrelRadius + 0.04, 0.05, 8, 36), matDrumBlack);
      rim.position.set(0, 2.45, fz);
      fan2Group.add(rim);
    }

    // 4. Protective Safety Wire Mesh Grills (Front & Rear)
    for (let fz of [-0.45, 0.45]) {
      for (let r of [0.55, 1.0, 1.45]) {
        const wireRing = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 6, 32), matWireDark);
        wireRing.position.set(0, 2.45, fz);
        fan2Group.add(wireRing);
      }
      for (let s = 0; s < 4; s++) {
        const sAng = (s / 4) * Math.PI;
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 3.6, 8), matWireDark);
        spoke.position.set(0, 2.45, fz);
        spoke.rotation.z = sAng;
        fan2Group.add(spoke);
      }
    }

    // 5. Electrical Switch Control Box (Mounted on Left Outer Frame)
    const f2SwitchBox = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 0.28), matDrumBlack);
    f2SwitchBox.position.set(-1.95, 2.45, 0);
    fan2Group.add(f2SwitchBox);

    const f2SwitchPanel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.18), matSwitchGreen);
    f2SwitchPanel.position.set(-2.07, 2.45, 0);
    fan2Group.add(f2SwitchPanel);

    const f2Cable = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.8, 8), matCastIron);
    f2Cable.position.set(-1.85, 1.4, 0);
    fan2Group.add(f2Cable);

    // 6. Central Motor Hub & 3 Cyan Aerofoil Fan Blades (Photo 2 Signature Feature!)
    const fan2PropellerGroup = new THREE.Group();
    fan2PropellerGroup.position.set(0, 2.45, 0);

    const f2Hub = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.42, 20), matDrumBlack);
    f2Hub.rotation.x = Math.PI / 2;
    fan2PropellerGroup.add(f2Hub);

    for (let b = 0; b < 3; b++) {
      const bAng = (b / 3) * Math.PI * 2;
      const bladePivot = new THREE.Group();
      bladePivot.rotation.z = bAng;

      const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 12), matDrumBlack);
      shank.position.set(0, 0.45, 0);
      bladePivot.add(shank);

      const paddle = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.15, 0.06), matDrumCyan);
      paddle.position.set(0, 1.18, 0);
      paddle.rotation.x = 0.28;
      paddle.rotation.y = 0.08;
      bladePivot.add(paddle);

      fan2PropellerGroup.add(bladePivot);
    }
    fan2Group.add(fan2PropellerGroup);
    movingParts.drumFanPropeller = fan2PropellerGroup;

    // Telemetry & Interactivity for Fan 2
    const fan2Data = {
      name: 'Mobile Industrial Drum Fan DF-201 (Bottom-Left)',
      status: 'HIGH FLOW • 32,000 CFM',
      vibration: '0.8 mm/s RMS (Healthy)',
      temperature: '38.2°C',
      prediction: 'Aerodynamic Drag: Optimal • 3-Blade Rotor Balanced'
    };
    fan2Group.userData = fan2Data;
    fan2Group.traverse(child => {
      if (child.isMesh) {
        child.userData = fan2Data;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on Center Hub
    createRevUpTimeSensor({
      parent: fan2Group,
      pos: [0, 2.45, 0.28],
      rot: [Math.PI / 2, 0, 0],
      scale: 0.85,
      withFlange: false,
      cableDir: [0, 0, 1],
      machineName: 'Mobile Drum Fan DF-201',
      channel: 'Center Aerofoil Hub Bearing',
      vibValue: '0.8 mm/s RMS',
      tempValue: '38.2°C'
    });

    scene.add(fan2Group);

    // --- 5. TOP-CENTER CNC MACHINING LINE ---
    function createCNC(x, z, id) {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      const base = new THREE.Mesh(new THREE.BoxGeometry(8, 4.5, 4), bpMidMat);
      base.position.y = 2.25;
      addEdges(base, edgeLineBlue);
      g.add(base);

      // Window / door enclosure
      const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 2.5, 0.4), bpDarkMat);
      windowMesh.position.set(0, 2.5, 2.05);
      g.add(windowMesh);

      if (id === 2) {
        base.userData = {
          pqId: 'cnc',
          name: '5-Axis CNC Center 02',
          status: 'DANGER • HEALTH 27',
          health: '27 / 100',
          vibration: '5.1 mm/s RMS (Backlash)',
          temperature: '61.8°C',
          prediction: 'RevUpTime AI: Ball Screw & Spindle Wear — X-axis lead screw backlash exceeds 18µm tolerance'
        };
      } else {
        base.userData = {
          name: `5-Axis CNC Center 0${id}`,
          status: 'OPTIMAL • MILLING',
          health: '97 / 100',
          vibration: '1.9 mm/s',
          temperature: '46°C',
          prediction: 'RevUpTime AI: Spindle runout within 3 micron tolerance • Bearings Healthy'
        };
      }
      g.traverse(child => {
        if (child.isMesh) {
          child.userData = base.userData;
          interactiveObjects.push(child);
        }
      });

      // RevUpTime Sensor on CNC Milling Spindle Head
      createRevUpTimeSensor({
        parent: g,
        pos: [2.5, 3.8, 1.6],
        rot: [0, 0, 0],
        scale: 0.9,
        withFlange: true,
        cableDir: [0, 1, 0],
        machineName: `5-Axis CNC Center 0${id}`,
        channel: 'Milling Spindle Front Bearing',
        vibValue: '1.9 mm/s RMS',
        tempValue: '46.0°C'
      });

      scene.add(g);
    }
    // =========================================================================
    // MACHINE 1B: OPEN-CASING HEAVY HELICAL BULL GEAR DRIVE GD-201 (PHOTO 2)
    // In place of 5-Axis CNC Center 01 at Position: (-6, 0, -8)
    // =========================================================================
    let bullGearMesh = null;
    const bullGearGroupMain = new THREE.Group();
    bullGearGroupMain.position.set(-6, 0, -8);

    addFloorZone(-6, -8, 8.2, 6.8);

    const bgPlinth = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.35, 6.2), matPlinth);
    bgPlinth.position.y = 0.175;
    bullGearGroupMain.add(bgPlinth);

    const matSumpBlue = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.5, metalness: 0.4 });
    const matGearBronze = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 });
    const matBearingBronze = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.8 });

    const sumpBase = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.5, 4.4), matSumpBlue);
    sumpBase.position.y = 1.0;
    addEdges(sumpBase, edgeLineDark);
    bullGearGroupMain.add(sumpBase);

    for (let bx of [-3.0, 3.0]) {
      const bFlange = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 4.2), matSumpBlue);
      bFlange.position.set(bx, 0.35, 0);
      addEdges(bFlange, edgeLineDark);
      bullGearGroupMain.add(bFlange);
    }

    const splitFlange = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.14, 4.6), matChromeSteel);
    splitFlange.position.y = 1.82;
    bullGearGroupMain.add(splitFlange);

    const sumpCavity = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.6, 3.4), new THREE.MeshBasicMaterial({ color: 0x020617 }));
    sumpCavity.position.y = 1.6;
    bullGearGroupMain.add(sumpCavity);

    for (let i = 0; i < 5; i++) {
      const sz = -1.8 + i * 0.9;
      for (let sx of [-2.6, 2.6]) {
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), matChromeSteel);
        stud.position.set(sx, 2.2, sz);
        bullGearGroupMain.add(stud);
      }
    }

    for (let bz of [-1.5, 1.5]) {
      const saddle = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.6, 20), matSumpBlue);
      saddle.rotation.x = Math.PI / 2;
      saddle.position.set(0, 1.85, bz);
      bullGearGroupMain.add(saddle);

      const liner = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.62, 20), matBearingBronze);
      liner.rotation.x = Math.PI / 2;
      liner.position.set(0, 1.85, bz);
      bullGearGroupMain.add(liner);

      const bRim = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.06, 8, 24), matChromeSteel);
      bRim.position.set(0, 1.85, bz);
      bullGearGroupMain.add(bRim);
    }

    // MASSIVE CENTRAL HELICAL BULL GEAR (Photo 2)
    const bullGearRotor = new THREE.Group();
    bullGearRotor.position.set(0, 2.3, 0);

    const mainShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.8, 24), matChromeSteel);
    mainShaft.rotation.x = Math.PI / 2;
    bullGearRotor.add(mainShaft);

    const gearHub = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.1, 24), matSumpBlue);
    gearHub.rotation.x = Math.PI / 2;
    bullGearRotor.add(gearHub);

    const gearWeb = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.4, 32), matSumpBlue);
    gearWeb.rotation.x = Math.PI / 2;
    bullGearRotor.add(gearWeb);

    for (let h = 0; h < 4; h++) {
      const hAng = (h / 4) * Math.PI * 2;
      const webHole = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.45, 16), new THREE.MeshBasicMaterial({ color: 0x020617 }));
      webHole.rotation.x = Math.PI / 2;
      webHole.position.set(Math.cos(hAng) * 1.05, Math.sin(hAng) * 1.05, 0);
      bullGearRotor.add(webHole);
    }

    const gearRim = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.85, 36), matGearBronze);
    gearRim.rotation.x = Math.PI / 2;
    bullGearRotor.add(gearRim);

    for (let t = 0; t < 24; t++) {
      const tAng = (t / 24) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.86), matGearBronze);
      tooth.position.set(Math.cos(tAng) * 1.95, Math.sin(tAng) * 1.95, 0);
      tooth.rotation.z = tAng;
      tooth.rotation.x = 0.28;
      bullGearRotor.add(tooth);
    }

    bullGearGroupMain.add(bullGearRotor);
    movingParts.bullGear = bullGearRotor;

    // MATING PINION GEAR
    const pinionRotor = new THREE.Group();
    pinionRotor.position.set(1.9, 1.6, 0);

    const pShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 3.6, 16), matChromeSteel);
    pShaft.rotation.x = Math.PI / 2;
    pinionRotor.add(pShaft);

    const pinionBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.85, 24), matGearBronze);
    pinionBody.rotation.x = Math.PI / 2;
    pinionRotor.add(pinionBody);

    for (let pt = 0; pt < 14; pt++) {
      const ptAng = (pt / 14) * Math.PI * 2;
      const pTooth = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.18, 0.86), matGearBronze);
      pTooth.position.set(Math.cos(ptAng) * 0.62, Math.sin(ptAng) * 0.62, 0);
      pTooth.rotation.z = ptAng;
      pTooth.rotation.x = -0.28;
      pinionRotor.add(pTooth);
    }

    bullGearGroupMain.add(pinionRotor);
    movingParts.pinionGear = pinionRotor;

    const drainValve = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12), matChromeSteel);
    drainValve.rotation.z = 0.5;
    drainValve.position.set(-2.6, 0.6, 1.8);
    bullGearGroupMain.add(drainValve);

    bullGearMesh = sumpBase;

    const bgData = {
      name: 'Open Helical Bull Gear Drive GD-201 (Photo 2)',
      status: 'INSPECTION • OPEN CASING',
      vibration: '0.9 mm/s RMS (Healthy)',
      temperature: '44.2°C',
      prediction: 'Tooth Contact Pattern: 98% Face Contact • No Pitting'
    };
    bullGearGroupMain.userData = bgData;
    bullGearGroupMain.traverse(child => {
      if (child.isMesh) {
        child.userData = bgData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensors on Bull Gear Drive GD-201 (Photo 2 match)
    createRevUpTimeSensor({
      parent: bullGearGroupMain,
      pos: [0, 2.65, 1.6],
      rot: [0, 0, 0],
      scale: 1.05,
      withFlange: false,
      cableDir: [0, 1, 0.4],
      machineName: 'Helical Bull Gear GD-201',
      channel: 'Bronze Split Bearing Saddle',
      vibValue: '0.9 mm/s RMS',
      tempValue: '44.2°C'
    });

    createRevUpTimeSensor({
      parent: bullGearGroupMain,
      pos: [2.4, 2.3, 0],
      rot: [0, 0, Math.PI / 2],
      scale: 0.95,
      withFlange: true,
      cableDir: [0, 1, -0.3],
      machineName: 'Helical Bull Gear Drive',
      channel: 'High-Speed Pinion Pedestal',
      vibValue: '1.1 mm/s RMS',
      tempValue: '47.0°C'
    });

    scene.add(bullGearGroupMain);
    createCNC(4, -8, 2);
    createCNC(14, -8, 3);

    // Staging and tooling tables behind CNC line
    for (let c = -6; c <= 14; c += 5) {
      const table = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 2.5), bpLightMat);
      table.position.set(c, 1, -15);
      addEdges(table, edgeLineSubtle);
      scene.add(table);
    }

    // --- 6. TOP-RIGHT UTILITY BAY ---
    // A. 4-Fan Cooling Tower
    const chillerGroup = new THREE.Group();
    chillerGroup.position.set(20, 0, -22);

    const chillerBase = new THREE.Mesh(new THREE.BoxGeometry(15, 4.5, 6.5), bpMidMat);
    chillerBase.position.y = 2.25;
    addEdges(chillerBase, edgeLineBlue);
    chillerGroup.add(chillerBase);

    // Truss legs underneath
    for (let lx = -6; lx <= 6; lx += 4) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 6.2), bpDarkMat);
      leg.position.set(lx, 1, 0);
      chillerGroup.add(leg);
    }

    const fanBlades = [];
    for (let f = -5; f <= 5; f += 3.3) {
      const shroud = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1.2, 20), bpDarkMat);
      shroud.position.set(f, 4.8, 0);
      addEdges(shroud);
      chillerGroup.add(shroud);

      const fan = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.1, 0.35), new THREE.MeshBasicMaterial({ color: 0x1e3a8a }));
      fan.position.set(f, 5.4, 0);
      fanBlades.push(fan);
      chillerGroup.add(fan);
    }

    chillerBase.userData = {
      pqId: 'condenser',
      name: 'Evaporative Cooling Tower',
      status: 'DANGER • HEALTH 21',
      health: '21 / 100',
      vibration: '5.8 mm/s RMS (Flow Choke)',
      temperature: '54.2°C (Exchanger Limit)',
      prediction: 'RevUpTime AI: Condenser Blockage — Severe scale accumulation & tube choke in Cell 2'
    };
    chillerGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = chillerBase.userData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on Cooling Tower Deck (Photo 2 flange mount style)
    createRevUpTimeSensor({
      parent: chillerGroup,
      pos: [0, 5.0, 1.8],
      rot: [0, 0, 0],
      scale: 1.0,
      withFlange: true,
      cableDir: [0, 1, 0],
      machineName: 'Evaporative Cooling Tower',
      channel: 'Fan Array Drive Motor Deck',
      vibValue: '1.1 mm/s RMS',
      tempValue: '34.0°C'
    });

    scene.add(chillerGroup);

    // B. Horizontal Boiler / Pressure Vessel
    const boilerGroup = new THREE.Group();
    boilerGroup.position.set(31, 0, -22);

    const boiler = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 6.5, 24), bpMidMat);
    boiler.rotation.x = Math.PI / 2;
    boiler.position.y = 3.2;
    addEdges(boiler, edgeLineBlue);
    boilerGroup.add(boiler);

    // Saddles
    for (let sz = -2; sz <= 2; sz += 4) {
      const sad = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.8, 0.6), bpDarkMat);
      sad.position.set(0, 0.9, sz);
      boilerGroup.add(sad);
    }

    boiler.userData = {
      name: 'Pressure Buffer Vessel V-200',
      status: 'NOMINAL',
      vibration: '0.3 mm/s',
      temperature: '26°C',
      prediction: 'Pressure 8.2 Bar • Stable'
    };
    interactiveObjects.push(boiler);
    scene.add(boilerGroup);

    // C. Electrical Container Enclosure (Far Upper-Right)
    const containerMesh = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 5), bpMidMat);
    containerMesh.position.set(41, 2.5, -22);
    addEdges(containerMesh, edgeLineBlue);
    containerMesh.userData = {
      name: 'Modular Power Enclosure',
      status: 'ONLINE',
      vibration: '0.4 mm/s',
      temperature: '30°C',
      prediction: 'UPS battery health 100%'
    };
    interactiveObjects.push(containerMesh);
    scene.add(containerMesh);

    // --- 7. FOUR HEAVY INDUSTRIAL MACHINES (Replacing generic press cells) ---
    // User requested detailed 3D moving models of the 4 industrial machines:
    // M1: Heavy Blower-Cooled Electric Motor (Photo 1)
    // M2: Heavy-Duty Industrial Enclosure Drive (Photo 2)
    // M3: High-Voltage Modular Box Motor / Generator (Photo 3)
    // M4: Split-Case Centrifugal Pumping Station with Pipeline (Photo 4)

    // Color materials matching the real machines in photos
    const mSteelBlueMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // Vibrant industrial machine blue
      roughness: 0.3,
      metalness: 0.4
    });

    const mHeavyGreyMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Heavy steel grey for Machine 2
      roughness: 0.4,
      metalness: 0.35
    });

    const mSteelShaftMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Polished steel shaft
      roughness: 0.15,
      metalness: 0.85
    });

    const mCouplingYellowMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Safety yellow coupling guard
      roughness: 0.4,
      metalness: 0.2
    });

    const mRedValveMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c, // Industrial primer red pipe spool
      roughness: 0.4,
      metalness: 0.3
    });

    // ========================================================
    // MACHINE 1: HEAVY BLOWER-COOLED ELECTRIC MOTOR (Photo 1)
    // Position: (21, 0, -8)
    // ========================================================
    const m1Group = new THREE.Group();
    m1Group.position.set(21, 0, -8);

    // Stator main frame
    const m1Base = new THREE.Mesh(new THREE.BoxGeometry(6.8, 5.2, 5.2), mSteelBlueMat);
    m1Base.position.y = 2.6;
    m1Base.castShadow = true;
    addEdges(m1Base, edgeLineDark);
    m1Group.add(m1Base);

    // Side terminal box
    const m1TermBox = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.8, 2.2), mSteelBlueMat);
    m1TermBox.position.set(-1.2, 2.2, 3.4);
    addEdges(m1TermBox, edgeLineDark);
    m1Group.add(m1TermBox);

    // Louvered cooling vent on side
    const m1Louver = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.4, 1.2), bpDarkMat);
    m1Louver.position.set(1.6, 2.2, 3);
    addEdges(m1Louver, edgeLineBlue);
    m1Group.add(m1Louver);

    // Rear top blower housing (large centrifugal scroll)
    const m1BlowerShroud = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 1.4, 24), mSteelBlueMat);
    m1BlowerShroud.rotation.x = Math.PI / 2;
    m1BlowerShroud.position.set(-1.8, 5.8, 0);
    addEdges(m1BlowerShroud, edgeLineDark);
    m1Group.add(m1BlowerShroud);

    // Secondary auxiliary blower motor on top of shroud
    const m1AuxMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 2.2, 16), bpDarkMat);
    m1AuxMotor.rotation.x = Math.PI / 2;
    m1AuxMotor.position.set(-1.8, 5.8, 1.6);
    addEdges(m1AuxMotor);
    m1Group.add(m1AuxMotor);

    // Internal spinning blower fan
    const m1BlowerFan = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 0.3), new THREE.MeshBasicMaterial({ color: 0x93c5fd }));
    m1BlowerFan.position.set(-1.8, 5.8, 0.7);
    m1Group.add(m1BlowerFan);
    movingParts.m1BlowerFan = m1BlowerFan;

    // Filter box on top-left of blower
    const m1Filter = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 1.4), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 }));
    m1Filter.position.set(-3.6, 5.8, 0);
    addEdges(m1Filter, edgeLineBlue);
    m1Group.add(m1Filter);

    // Front drive end-shield with large circular flange
    const m1Flange = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 0.8, 24), mSteelBlueMat);
    m1Flange.rotation.z = Math.PI / 2;
    m1Flange.position.set(3.7, 2.6, 0);
    addEdges(m1Flange, edgeLineDark);
    m1Group.add(m1Flange);

    // Rotating output shaft hub (MOVING PART)
    const m1ShaftGroup = new THREE.Group();
    m1ShaftGroup.position.set(4.1, 2.6, 0);

    const m1Shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.8, 20), mSteelShaftMat);
    m1Shaft.rotation.z = Math.PI / 2;
    m1ShaftGroup.add(m1Shaft);

    // Output disc with bolt holes
    const m1FaceDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.3, 16), mSteelShaftMat);
    m1FaceDisc.rotation.z = Math.PI / 2;
    m1FaceDisc.position.x = 0.9;
    m1ShaftGroup.add(m1FaceDisc);

    // Visible keyway notch on shaft for clear rotation visibility
    const m1Key = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 1.2), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    m1Key.position.set(0.4, 0.7, 0);
    m1ShaftGroup.add(m1Key);

    m1Group.add(m1ShaftGroup);
    movingParts.m1Shaft = m1ShaftGroup;

    m1Base.userData = {
      name: 'Blower-Cooled Motor M-101 (Photo 1)',
      status: 'OPTIMAL • 1,780 RPM',
      health: '98 / 100',
      vibration: '2.4 mm/s RMS (Healthy)',
      temperature: '58.3°C',
      prediction: 'RevUpTime AI: Airflow Nominal • Bearing Temperature Steady'
    };
    m1Group.userData = m1Base.userData;
    m1Group.traverse(child => {
      if (child.isMesh) {
        child.userData = m1Base.userData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on DE bearing (Direct Photo 1 match: knurled collar mounted on curved motor bearing housing!)
    sensorKnurlMotorRef = createRevUpTimeSensor({
      parent: m1Group,
      pos: [3.3, 4.3, 1.0],
      rot: [0.35, 0, -0.4],
      scale: 1.15,
      withFlange: false,
      cableDir: [0.4, 1, 0.2],
      machineName: 'Blower-Cooled Motor M-101',
      channel: 'Drive End Bearing DE (Radial)',
      vibValue: '2.4 mm/s RMS',
      tempValue: '58.3°C'
    });

    scene.add(m1Group);

    // ========================================================
    // MACHINE 2: HEAVY-DUTY INDUSTRIAL DRIVE ENCLOSURE (Photo 2)
    // Position: (33, 0, -8)
    // ========================================================
    const m2Group = new THREE.Group();
    m2Group.position.set(33, 0, -8);

    // Heavy structural I-beam skid base
    const m2Skid = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.9, 6.2), bpDarkMat);
    m2Skid.position.y = 0.45;
    addEdges(m2Skid);
    m2Group.add(m2Skid);

    // Monolithic grey machinery housing with recessed bays
    const m2Housing = new THREE.Mesh(new THREE.BoxGeometry(7.6, 6.8, 5.6), mHeavyGreyMat);
    m2Housing.position.y = 4.2;
    m2Housing.castShadow = true;
    addEdges(m2Housing, edgeLineDark);
    m2Group.add(m2Housing);

    // Hinged maintenance access door with two circular portholes
    const m2Door = new THREE.Mesh(new THREE.BoxGeometry(2.6, 5.2, 0.3), new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.5 }));
    m2Door.position.set(-2.2, 4.2, 2.9);
    m2Group.add(m2Door);

    // Circular portholes
    const m2Porthole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.4, 16), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    m2Porthole1.rotation.x = Math.PI / 2;
    m2Porthole1.position.set(-2.2, 5.2, 2.95);
    m2Group.add(m2Porthole1);

    const m2Porthole2 = m2Porthole1.clone();
    m2Porthole2.position.set(-2.2, 3.4, 2.95);
    m2Group.add(m2Porthole2);

    // Protruding chamfered central hood
    const m2CenterHood = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.8, 1.8), mHeavyGreyMat);
    m2CenterHood.position.set(0.6, 4.4, 3.2);
    addEdges(m2CenterHood, edgeLineDark);
    m2Group.add(m2CenterHood);

    // Massive rotating output drive shaft (MOVING PART)
    const m2ShaftGroup = new THREE.Group();
    m2ShaftGroup.position.set(3.8, 4.2, 0);

    // End bearing hub
    const m2Hub = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.8, 24), mHeavyGreyMat);
    m2Hub.rotation.z = Math.PI / 2;
    m2ShaftGroup.add(m2Hub);

    // Giant solid steel drive shaft
    const m2Shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 3.6, 24), mSteelShaftMat);
    m2Shaft.rotation.z = Math.PI / 2;
    m2Shaft.position.x = 1.8;
    m2ShaftGroup.add(m2Shaft);

    // Rotation indicator notch on shaft
    const m2Key = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 2.4), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    m2Key.position.set(1.8, 1.05, 0);
    m2ShaftGroup.add(m2Key);

    m2Group.add(m2ShaftGroup);
    movingParts.m2Shaft = m2ShaftGroup;

    // Adjacent standalone operator terminal cabinet
    const m2ControlCab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.2, 1.8), new THREE.MeshStandardMaterial({ color: 0xd1d5db }));
    m2ControlCab.position.set(-4.8, 2.1, 1.5);
    addEdges(m2ControlCab, edgeLineBlue);

    // Terminal screen
    const m2Screen = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.8), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
    m2Screen.position.set(0, 1.2, 0.92);
    m2ControlCab.add(m2Screen);
    m2Group.add(m2ControlCab);

    m2Housing.userData = {
      name: 'Industrial Drive Rig D-200 (Photo 2)',
      status: 'OPTIMAL • HIGH TORQUE',
      health: '96 / 100',
      vibration: '3.1 mm/s RMS',
      temperature: '67.5°C',
      prediction: 'RevUpTime AI: Gearbox Tooth Mesh Stable • Torque Load Balanced'
    };
    m2Group.userData = m2Housing.userData;
    m2Group.traverse(child => {
      if (child.isMesh) {
        child.userData = m2Housing.userData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on Output Gearbox Bearing Housing
    createRevUpTimeSensor({
      parent: m2Group,
      pos: [3.8, 5.2, 1.5],
      rot: [0.2, 0, 0],
      scale: 1.1,
      withFlange: true,
      cableDir: [0.2, 1, 0],
      machineName: 'Industrial Drive Rig D-200',
      channel: 'Drive Reducer Main Journal',
      vibValue: '3.1 mm/s RMS',
      tempValue: '67.5°C'
    });

    scene.add(m2Group);

    // ========================================================
    // MACHINE 3: HIGH-VOLTAGE MODULAR BOX MOTOR (Photo 3)
    // Position: (21, 0, 4)
    // ========================================================
    const m3Group = new THREE.Group();
    m3Group.position.set(21, 0, 4);

    // Stator main body (deep blue)
    const m3Stator = new THREE.Mesh(new THREE.BoxGeometry(9.2, 6.4, 5.4), mSteelBlueMat);
    m3Stator.position.y = 3.2;
    m3Stator.castShadow = true;
    addEdges(m3Stator, edgeLineDark);
    m3Group.add(m3Stator);

    // Top Air-to-Air Heat Exchanger (TEAAC cooler box)
    const m3Cooler = new THREE.Mesh(new THREE.BoxGeometry(8.4, 2.8, 4.8), bpDarkMat);
    m3Cooler.position.set(0, 7.8, 0);
    addEdges(m3Cooler, edgeLineBlue);
    m3Group.add(m3Cooler);

    // Cooler top manifold pipe with flanges
    const m3HeaderPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 6.8, 16), mSteelShaftMat);
    m3HeaderPipe.rotation.z = Math.PI / 2;
    m3HeaderPipe.position.set(0, 9.4, 0);
    addEdges(m3HeaderPipe);
    m3Group.add(m3HeaderPipe);

    // Stiffener ribs and lifting lugs
    for (let lx = -3.8; lx <= 3.8; lx += 7.6) {
      const lug = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.8, 0.8), bpDarkMat);
      lug.position.set(lx, 9.4, 0);
      m3Group.add(lug);
    }

    // Heavy Drive-End Bearing shield
    const m3EndShield = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.8, 24), mSteelBlueMat);
    m3EndShield.rotation.z = Math.PI / 2;
    m3EndShield.position.set(4.8, 3.2, 0);
    addEdges(m3EndShield, edgeLineDark);
    m3Group.add(m3EndShield);

    // Grooved Output Drive Shaft (MOVING PART)
    const m3ShaftGroup = new THREE.Group();
    m3ShaftGroup.position.set(5.2, 3.2, 0);

    const m3Shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 3.4, 24), mSteelShaftMat);
    m3Shaft.rotation.z = Math.PI / 2;
    m3Shaft.position.x = 1.7;
    m3ShaftGroup.add(m3Shaft);

    // Shaft grooves
    for (let gx = 0.8; gx <= 2.6; gx += 0.6) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.05, 8, 24), new THREE.MeshBasicMaterial({ color: 0x334155 }));
      ring.rotation.y = Math.PI / 2;
      ring.position.x = gx;
      m3ShaftGroup.add(ring);
    }

    // Keyway indicator
    const m3Key = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.45, 2.2), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
    m3Key.position.set(1.7, 0.95, 0);
    m3ShaftGroup.add(m3Key);

    m3Group.add(m3ShaftGroup);
    movingParts.m3Shaft = m3ShaftGroup;

    m3Stator.userData = {
      name: 'High-Voltage Box Motor HV-400 (Photo 3)',
      status: 'OPTIMAL • 4.16 kV',
      health: '99 / 100',
      vibration: '1.6 mm/s RMS',
      temperature: '72.1°C',
      prediction: 'RevUpTime AI: Cooler Delta-T 14°C • Stator Winding Insulation Healthy'
    };
    m3Group.userData = m3Stator.userData;
    m3Group.traverse(child => {
      if (child.isMesh) {
        child.userData = m3Stator.userData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensor on side casing (Direct Photo 2 match: 4-bolt square flange plate mounted horizontally on machine casing!)
    sensorFlangeBoxRef = createRevUpTimeSensor({
      parent: m3Group,
      pos: [4.6, 5.0, 1.5],
      rot: [Math.PI / 2, 0, 0],
      scale: 1.25,
      withFlange: true,
      cableDir: [0, -1, 0.2],
      machineName: 'High-Voltage Box Motor HV-400',
      channel: 'Side Casing Accelerometer / Vel',
      vibValue: '1.6 mm/s RMS',
      tempValue: '72.1°C'
    });

    scene.add(m3Group);

    // ========================================================
    // MACHINE 4: CENTRIFUGAL PUMPING STATION (Photo 4)
    // Position: (33, 0, 4)
    // ========================================================
    const m4Group = new THREE.Group();
    m4Group.position.set(33, 0, 4);

    // Concrete Plinth Skid
    const m4Plinth = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.8, 5.4), new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.9 }));
    m4Plinth.position.y = 0.4;
    m4Group.add(m4Plinth);

    // Drive Motor Stool & Ribbed Motor
    const m4MotorStool = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.6, 3.4), bpDarkMat);
    m4MotorStool.position.set(3.4, 1.6, 0);
    addEdges(m4MotorStool);
    m4Group.add(m4MotorStool);

    const m4Motor = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 4.2, 24), mSteelBlueMat);
    m4Motor.rotation.z = Math.PI / 2;
    m4Motor.position.set(3.4, 3.4, 0);
    addEdges(m4Motor, edgeLineDark);
    m4Group.add(m4Motor);

    // Longitudinal motor cooling ribs
    for (let a = 0; a < 8; a++) {
      const ang = (a * Math.PI) / 4;
      const rib = new THREE.Mesh(new THREE.BoxGeometry(4, 0.15, 0.3), bpDarkMat);
      rib.position.set(3.4, 3.4 + Math.sin(ang) * 1.65, Math.cos(ang) * 1.65);
      m4Group.add(rib);
    }

    // Centrifugal Double-Suction Volute Pump Casing
    const m4PumpCasing = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 2.2, 24), mSteelBlueMat);
    m4PumpCasing.rotation.x = Math.PI / 2;
    m4PumpCasing.position.set(-2.2, 3.4, 0);
    addEdges(m4PumpCasing, edgeLineDark);
    m4Group.add(m4PumpCasing);

    // Horizontally split flange line
    const m4SplitFlange = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 4.8), bpDarkMat);
    m4SplitFlange.position.set(-2.2, 3.4, 0);
    m4Group.add(m4SplitFlange);

    // Rotating Flexible Coupling between Motor & Pump (MOVING PART)
    const m4CouplingGroup = new THREE.Group();
    m4CouplingGroup.position.set(0.6, 3.4, 0);

    const m4Guard = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.4, 16), mCouplingYellowMat);
    m4Guard.rotation.z = Math.PI / 2;
    addEdges(m4Guard);
    m4CouplingGroup.add(m4Guard);

    // Rotating hub visible inside
    const m4HubShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.45, 12), mSteelShaftMat);
    m4HubShaft.rotation.z = Math.PI / 2;
    m4CouplingGroup.add(m4HubShaft);

    m4Group.add(m4CouplingGroup);
    movingParts.m4Coupling = m4CouplingGroup;

    // Piping Assembly (Intake & Discharge with Butterfly Valve)
    // Red reducer spool
    const m4Reducer = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, 1.8, 16), mRedValveMat);
    m4Reducer.rotation.z = Math.PI / 2;
    m4Reducer.position.set(-4.2, 3.4, 0);
    addEdges(m4Reducer);
    m4Group.add(m4Reducer);

    // Large blue pipeline
    const m4Pipe = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 4.5, 20), mSteelBlueMat);
    m4Pipe.rotation.z = Math.PI / 2;
    m4Pipe.position.set(-7.2, 3.4, 0);
    addEdges(m4Pipe, edgeLineDark);
    m4Group.add(m4Pipe);

    // Butterfly valve handwheel
    const m4ValveWheel = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.1, 8, 16), mRedValveMat);
    m4ValveWheel.rotation.y = Math.PI / 2;
    m4ValveWheel.position.set(-5.2, 4.8, 0);
    m4Group.add(m4ValveWheel);

    // Pressure Gauge on pipe with vibrating needle
    const m4GaugeStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 8), mSteelShaftMat);
    m4GaugeStem.position.set(-6.8, 4.8, 0);
    m4Group.add(m4GaugeStem);

    const m4GaugeDial = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    m4GaugeDial.rotation.x = Math.PI / 2;
    m4GaugeDial.position.set(-6.8, 5.4, 0);
    m4Group.add(m4GaugeDial);

    const m4GaugeNeedle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.05), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
    m4GaugeNeedle.position.set(-6.8, 5.4, 0.12);
    m4Group.add(m4GaugeNeedle);
    movingParts.m4GaugeNeedle = m4GaugeNeedle;

    m4PumpCasing.userData = {
      name: 'Split-Case Water Pump Station P-305 (Photo 4)',
      status: 'OPTIMAL • 450 m³/h',
      health: '97 / 100',
      vibration: '2.8 mm/s RMS',
      temperature: '49.0°C',
      prediction: 'RevUpTime AI: Suction Head 4.2 Bar • Zero Cavitation'
    };
    m4Group.userData = m4PumpCasing.userData;
    m4Group.traverse(child => {
      if (child.isMesh) {
        child.userData = m4PumpCasing.userData;
        interactiveObjects.push(child);
      }
    });

    // RevUpTime Sensors on Split-Case Pump P-305 (Photo 2 & Photo 1 mix)
    createRevUpTimeSensor({
      parent: m4Group,
      pos: [-2.2, 4.6, 1.1],
      rot: [0.2, 0, 0],
      scale: 1.1,
      withFlange: true,
      cableDir: [0, 1, 0.3],
      machineName: 'Split-Case Water Pump Station P-305',
      channel: 'Volute Radial Bearing',
      vibValue: '2.8 mm/s RMS',
      tempValue: '49.0°C'
    });

    createRevUpTimeSensor({
      parent: m4Group,
      pos: [2.2, 4.6, 0.8],
      rot: [0, 0, 0],
      scale: 1.05,
      withFlange: false,
      cableDir: [0.2, 1, 0],
      machineName: '450kW Pump Motor M-305',
      channel: 'Motor Drive End DE',
      vibValue: '2.2 mm/s RMS',
      tempValue: '52.4°C'
    });

    scene.add(m4Group);
// --- 8. CENTRAL PACKAGING CONVEYOR & ROBOT ARMS ---
    const convGroup = new THREE.Group();
    convGroup.position.set(20, 0, 11);

    const belt = new THREE.Mesh(new THREE.BoxGeometry(26, 1.4, 3.2), bpDarkMat);
    belt.position.y = 1.4;
    addEdges(belt);
    convGroup.add(belt);

    for (let lx = -11; lx <= 11; lx += 5.5) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.4, 12), bpDarkMat);
      leg.position.set(lx, 0.7, 0);
      convGroup.add(leg);
    }

    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.1, 1.3), new THREE.MeshStandardMaterial({ color: 0x93c5fd }));
      box.position.set(-11 + i * 4.5, 2.65, 0);
      addEdges(box);
      convGroup.add(box);
      boxes.push(box);
    }

    belt.userData = {
      name: 'Final Assembly Conveyor Belt',
      status: 'INSPECTION ACTIVE',
      vibration: '1.7 mm/s',
      temperature: '39°C',
      prediction: 'Speed: 140 parts/min'
    };
    interactiveObjects.push(belt);
    scene.add(convGroup);

    // 2 Articulated Robot Arms alongside conveyor
    function createRobotArm(x, z) {
      const armGroup = new THREE.Group();
      armGroup.position.set(x, 0, z);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 1.2, 16), bpDarkMat);
      base.position.y = 0.6;
      addEdges(base);
      armGroup.add(base);

      const joint1 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), bpMidMat);
      joint1.position.y = 1.7;
      armGroup.add(joint1);

      const lowerArm = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 3.2), bpMidMat);
      lowerArm.position.set(0.5, 3, 0);
      lowerArm.rotation.z = -0.3;
      addEdges(lowerArm);
      armGroup.add(lowerArm);

      const joint2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), bpDarkMat);
      joint2.position.set(1.2, 4.3, 0);
      armGroup.add(joint2);

      const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.7), bpLightMat);
      upperArm.position.set(1.9, 4, 0);
      armGroup.add(upperArm);

      base.userData = {
        name: 'Pick-and-Place Robot Arm',
        status: 'OPERATIONAL',
        vibration: '1.2 mm/s',
        temperature: '45°C',
        prediction: 'Joint 3 backlash: Nominal'
      };
      interactiveObjects.push(base);
      scene.add(armGroup);
      return armGroup;
    }

    const robot1 = createRobotArm(5, 11);
    const robot2 = createRobotArm(35, 11);

    // Extra drive motor near conveyor end
    const convMotor = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2.5, 16), bpMidMat);
    convMotor.rotation.z = Math.PI / 2;
    convMotor.position.set(31, 1.25, 15);
    addEdges(convMotor, edgeLineBlue);
    scene.add(convMotor);

    // --- 9. BOTTOM-CENTER VERTICAL PUMP ARRAY ---
    for (let p = 0; p < 3; p++) {
      const px = 0 + p * 5.5;
      const pumpGroup = new THREE.Group();
      pumpGroup.position.set(px, 0, 22);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 1, 16), bpDarkMat);
      base.position.y = 0.5;
      addEdges(base);
      pumpGroup.add(base);

      const motor = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 3.5, 16), bpMidMat);
      motor.position.y = 2.75;
      addEdges(motor, edgeLineBlue);
      pumpGroup.add(motor);

      // Flange pipe
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.8, 12), bpDarkMat);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(1.4, 1.2, 0);
      pumpGroup.add(pipe);

      motor.userData = {
        name: `Vertical Turbine Pump 0${p + 1}`,
        status: 'CONTINUOUS',
        vibration: `${(1.3 + p * 0.2).toFixed(1)} mm/s`,
        temperature: `${(43 + p * 2)}°C`,
        prediction: 'Impeller balance verified'
      };
      interactiveObjects.push(motor);

      // RevUpTime Sensor on Top Motor Flange (Photo 2 flange mount style)
      createRevUpTimeSensor({
        parent: pumpGroup,
        pos: [0, 4.5, 0],
        rot: [0, 0, 0],
        scale: 0.95,
        withFlange: true,
        cableDir: [0, 1, 0.3],
        machineName: `Vertical Turbine Pump 0${p + 1}`,
        channel: 'Top Thrust Bearing Housing',
        vibValue: `${(1.3 + p * 0.2).toFixed(1)} mm/s RMS`,
        tempValue: `${(43 + p * 2)}°C`
      });

      scene.add(pumpGroup);
    }

    // --- 10. BOTTOM-RIGHT MOTOR-GEARBOX POWERTRAIN BAY (TRACTIAN WIRELESS SOLUTION) ---
    // Replaced generic secondary assembly units with 4 detailed Motor-Gearbox Powertrain Skids
    // with Tractian Wireless Smart Trac vibration sensors and pulsing telemetry signals (Photo Reference)

    function createMotorGearboxSkid(posX, posZ, id) {
      const skidGroup = new THREE.Group();
      skidGroup.position.set(posX, 0, posZ);

      // Materials matching the reference photo (clean technical matte white/grey with purple wireless accents)
      const matSkidBase = new THREE.MeshStandardMaterial({ color: 0xd8dee9, roughness: 0.5, metalness: 0.3 });
      const matMotorBody = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.2 });
      const matGearbox = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.45, metalness: 0.25 });
      const matCoupling = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.6 });
      const matSensorBody = new THREE.MeshStandardMaterial({ color: 0xa1a1aa, roughness: 0.2, metalness: 0.8 });
      const matSensorGlow = new THREE.MeshBasicMaterial({ color: 0xc084fc }); // Purple/violet sensor dome

      // 1. Structural Steel Base Bedplate (I-Beam / Channel Skid)
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.4, 2.6), matSkidBase);
      basePlate.position.y = 0.2;
      basePlate.castShadow = true;
      addEdges(basePlate, edgeLineDark);
      skidGroup.add(basePlate);

      // Flange rails on base
      for (let fz of [-1.2, 1.2]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.2, 0.2), matSkidBase);
        rail.position.set(0, 0.5, fz);
        skidGroup.add(rail);
      }

      // 2. Electric Motor (Left side of skid, X = -2.2)
      const motorGroup = new THREE.Group();
      motorGroup.position.set(-2.2, 0, 0);

      // Motor mounting feet
      const foot1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 2.0), matMotorBody);
      foot1.position.set(-0.8, 0.5, 0);
      motorGroup.add(foot1);
      const foot2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 2.0), matMotorBody);
      foot2.position.set(0.8, 0.5, 0);
      motorGroup.add(foot2);

      // Motor Stator Cylinder
      const stator = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 2.6, 24), matMotorBody);
      stator.rotation.z = Math.PI / 2;
      stator.position.set(0, 1.6, 0);
      stator.castShadow = true;
      motorGroup.add(stator);

      // Longitudinal Cooling Fins around stator
      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2;
        if (angle > 1.2 && angle < 1.9) continue; // Skip top junction box area
        const fin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.08), matMotorBody);
        fin.position.set(
          0,
          1.6 + Math.sin(angle) * 1.18,
          Math.cos(angle) * 1.18
        );
        fin.rotation.x = angle;
        motorGroup.add(fin);
      }

      // Rear Fan Cowl / Shroud (Left end)
      const fanCowl = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.7, 24), matMotorBody);
      fanCowl.rotation.z = Math.PI / 2;
      fanCowl.position.set(-1.6, 1.6, 0);
      addEdges(fanCowl, edgeLineDark);
      motorGroup.add(fanCowl);

      const fanEnd = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.12, 0.08, 24), matGearbox);
      fanEnd.rotation.z = Math.PI / 2;
      fanEnd.position.set(-1.98, 1.6, 0);
      motorGroup.add(fanEnd);

      // Front DE Bearing End Shield (Right end)
      const frontShield = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.35, 24), matMotorBody);
      frontShield.rotation.z = Math.PI / 2;
      frontShield.position.set(1.4, 1.6, 0);
      addEdges(frontShield, edgeLineDark);
      motorGroup.add(frontShield);

      // Top Terminal / Junction Box
      const termBox = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.8), matMotorBody);
      termBox.position.set(0.1, 2.85, 0);
      addEdges(termBox, edgeLineDark);
      motorGroup.add(termBox);

      const termLid = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.9), matGearbox);
      termLid.position.set(0.1, 3.12, 0);
      motorGroup.add(termLid);

      skidGroup.add(motorGroup);

      // 3. Flanged Flexible Shaft Coupling (Between Motor and Gearbox, X = 0.0)
      const couplingGroup = new THREE.Group();
      couplingGroup.position.set(0.0, 1.6, 0);

      const innerShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.4, 16), matCoupling);
      innerShaft.rotation.z = Math.PI / 2;
      couplingGroup.add(innerShaft);

      const flange1 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.35, 16), matCoupling);
      flange1.rotation.z = Math.PI / 2;
      flange1.position.x = -0.35;
      couplingGroup.add(flange1);

      const flange2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.35, 16), matCoupling);
      flange2.rotation.z = Math.PI / 2;
      flange2.position.x = 0.35;
      couplingGroup.add(flange2);

      skidGroup.add(couplingGroup);
      movingParts.skidCouplings.push(couplingGroup);

      // 4. Industrial Gearbox / Speed Reducer (Right side, X = 2.4)
      const gbGroup = new THREE.Group();
      gbGroup.position.set(2.4, 0, 0);

      // Gearbox feet
      const gbFoot = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.2), matGearbox);
      gbFoot.position.set(0, 0.45, 0);
      addEdges(gbFoot, edgeLineDark);
      gbGroup.add(gbFoot);

      // Gearbox lower housing
      const gbLower = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.8), matGearbox);
      gbLower.position.set(0, 1.25, 0);
      addEdges(gbLower, edgeLineDark);
      gbGroup.add(gbLower);

      // Gearbox upper chamfered casing
      const gbUpper = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.2, 1.6), matGearbox);
      gbUpper.position.set(0, 2.3, 0);
      addEdges(gbUpper, edgeLineDark);
      gbGroup.add(gbUpper);

      // Input shaft bearing snout (facing motor)
      const inputSnout = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.6, 16), matGearbox);
      inputSnout.rotation.z = Math.PI / 2;
      inputSnout.position.set(-1.25, 1.6, 0);
      gbGroup.add(inputSnout);

      // Side Output Shaft Bearing Hub & Bore (Facing front, Z = 0.95)
      const outHub = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.25, 20), matGearbox);
      outHub.rotation.x = Math.PI / 2;
      outHub.position.set(0.2, 1.6, 0.95);
      gbGroup.add(outHub);

      const outShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.32, 16), matCoupling);
      outShaft.rotation.x = Math.PI / 2;
      outShaft.position.set(0.2, 1.6, 1.0);
      gbGroup.add(outShaft);

      // Vertical casing reinforcement gussets
      for (let gx of [-0.6, 0.7]) {
        const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 1.9), matGearbox);
        gusset.position.set(gx, 1.4, 0);
        gbGroup.add(gusset);
      }

      skidGroup.add(gbGroup);

      // 5. Machine Telemetry & Interactivity
      const machineData = {
        name: `Wireless Powertrain Skid MT-0${id}`,
        status: 'ONLINE • WIRELESS TELEMETRY',
        vibration: `${(1.2 + id * 0.3).toFixed(1)} mm/s RMS (Optimal)`,
        temperature: `${(42 + id * 2.5).toFixed(1)}°C`,
        prediction: 'Smart Trac: 100% Wireless Link • Vibration Normal'
      };

      skidGroup.userData = machineData;
      skidGroup.traverse(child => {
        if (child.isMesh) {
          child.userData = machineData;
          interactiveObjects.push(child);
        }
      });

      // 6. Three RevUpTime Condition Monitoring Sensors with Wireless Waves
      const sensorPositions = [
        { x: -3.5, y: 2.7, z: 0.0, offset: 0.0, withFlange: false, channel: 'Motor NDE Radial' },
        { x: -0.9, y: 2.7, z: 0.0, offset: 0.35, withFlange: false, channel: 'Motor DE Bearing' },
        { x: 2.4, y: 2.7, z: 0.9, offset: 0.7, withFlange: true, channel: 'Gearbox Reducer Casing' }
      ];

      sensorPositions.forEach((sp) => {
        createRevUpTimeSensor({
          parent: skidGroup,
          pos: [sp.x, sp.y, sp.z],
          rot: [0, 0, 0],
          scale: 0.85,
          withFlange: sp.withFlange,
          cableDir: [0, 1, 0.2],
          machineName: `Powertrain Skid MT-0${id}`,
          channel: sp.channel,
          vibValue: `${(1.2 + id * 0.3).toFixed(1)} mm/s RMS`,
          tempValue: `${(42 + id * 2.5).toFixed(1)}°C`
        });

        // Wireless Signal Waves (concentric wave arcs radiating upward from RevUpTime sensor)
        const waveMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const wave1 = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.32, 16, 1, 0, Math.PI), waveMat1);
        wave1.position.set(sp.x, sp.y + 1.35, sp.z);
        skidGroup.add(wave1);

        const waveMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const wave2 = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.49, 16, 1, 0, Math.PI), waveMat2);
        wave2.position.set(sp.x, sp.y + 1.62, sp.z);
        skidGroup.add(wave2);

        movingParts.wirelessWaves.push({ w1: wave1, w2: wave2, basePosY: sp.y + 0.95, offset: sp.offset });
      });

      scene.add(skidGroup);
      return skidGroup;
    }

    // Deploy 4 Motor-Gearbox Powertrain Skids in 2x2 Grid (replacing secondary assembly units)
    const powertrainUnit1 = createMotorGearboxSkid(24, 18.5, 1);
    createMotorGearboxSkid(35, 18.5, 2);
    createMotorGearboxSkid(24, 25.0, 3);
    createMotorGearboxSkid(35, 25.0, 4);

    // --- 11. HOLOGRAPHIC AI SCANNER BEAM ---
    let scannerActive = true;
    const scanPlaneGeo = new THREE.PlaneGeometry(130, 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const scanBeam = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanBeam.rotation.x = Math.PI / 2;
    scanBeam.position.y = 0.2;
    scene.add(scanBeam);

    // --- Raycaster, Click Selection & Hover Interactivity ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let pinnedObject = null;
    let mouseDownPos = { x: 0, y: 0 };

    const closeBtn = document.getElementById('tt-close-btn');
    const pinBadge = document.getElementById('tt-pin-badge');

    function unpinMachine() {
      pinnedObject = null;
      if (pinBadge) pinBadge.classList.add('hidden');
      if (closeBtn) closeBtn.classList.add('hidden');
      tooltip.classList.add('hidden');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        unpinMachine();
      });
    }

    function updateTooltipPosition(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const pointerX = clientX - rect.left;
      const pointerY = clientY - rect.top;

      let left = pointerX + 16;
      let top = pointerY + 16;

      // Keep card fully inside visible boundaries
      if (left + 320 > rect.width) {
        left = pointerX - 330;
      }
      if (top + 160 > rect.height) {
        top = pointerY - 150;
      }
      if (left < 10) left = 10;
      if (top < 10) top = 10;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    // --- Priority Queue & Health Score Dashboard Controller (Tractian Reference Reproductions) ---
    const pqItems = [
      {
        id: 'bearing',
        fault: 'Bearing Wear · Stage 3',
        category: 'Compressed Air / Screw Compressor 01',
        name: 'Screw Compressor 01',
        dangerScore: 24,
        warningScore: 46,
        dangerVib: '7.6 mm/s RMS (High Peak Alert)',
        warningVib: '4.4 mm/s RMS (Elevated)',
        dangerTemp: '82.4°C (Elevated)',
        warningTemp: '62.0°C',
        dangerPred: 'RevUpTime AI: Bearing Wear · Stage 3 — High-frequency inner raceway defect. Overhaul DE bearing',
        warningPred: 'RevUpTime AI: Bearing Micro-Spalling Signature — Increase lube frequency and monitor BPFO',
        worldPos: new THREE.Vector3(-32, 3.8, -3.0),
        camPos: new THREE.Vector3(-18, 16, 12),
        camLookAt: new THREE.Vector3(-32, 3.8, -3.0),
        boxScale: [6.4, 4.8, 5.2]
      },
      {
        id: 'condenser',
        fault: 'Condenser Blockage',
        category: 'Utilities / Evaporative Cooling Tower',
        name: 'Evaporative Cooling Tower',
        dangerScore: 21,
        warningScore: 41,
        dangerVib: '5.8 mm/s RMS (Flow Choke)',
        warningVib: '3.6 mm/s RMS',
        dangerTemp: '54.2°C (Exchanger Limit)',
        warningTemp: '42.0°C',
        dangerPred: 'RevUpTime AI: Condenser Blockage — Severe scale accumulation & tube choke in Cell 2',
        warningPred: 'RevUpTime AI: Condenser Tube Scale Build-Up — Flow restriction detected in Cell 2',
        worldPos: new THREE.Vector3(20, 3.8, -22.0),
        camPos: new THREE.Vector3(34, 18, -4),
        camLookAt: new THREE.Vector3(20, 3.8, -22.0),
        boxScale: [15.2, 5.4, 6.8]
      },
      {
        id: 'discharge',
        fault: 'Discharge Valve Leak',
        category: 'Pump Room / Centrifugal Pump P-201',
        name: 'Duplex Centrifugal Pump P-201',
        dangerScore: 20,
        warningScore: 45,
        dangerVib: '6.4 mm/s RMS (Cavitation Peak)',
        warningVib: '3.9 mm/s RMS',
        dangerTemp: '68.5°C',
        warningTemp: '52.0°C',
        dangerPred: 'RevUpTime AI: Discharge Valve Leak — Non-return valve seat leakage & cavitation backflow',
        warningPred: 'RevUpTime AI: Valve Seat Degradation — Intermittent pressure drop & cavitation flutter',
        worldPos: new THREE.Vector3(-31, 2.7, 20.0),
        camPos: new THREE.Vector3(-14, 18, 36),
        camLookAt: new THREE.Vector3(-31, 2.7, 20.0),
        boxScale: [5.8, 3.8, 5.2]
      },
      {
        id: 'cnc',
        fault: 'Ball Screw Wear',
        category: 'Machining Bay / 5-Axis CNC Center 02',
        name: '5-Axis CNC Center 02',
        dangerScore: 27,
        warningScore: 52,
        dangerVib: '5.1 mm/s RMS (Backlash)',
        warningVib: '3.2 mm/s RMS',
        dangerTemp: '61.8°C',
        warningTemp: '48.5°C',
        dangerPred: 'RevUpTime AI: Ball Screw & Spindle Wear — X-axis lead screw backlash exceeds 18µm tolerance',
        warningPred: 'RevUpTime AI: Axis Recirculating Ball Play — Preload degradation detected on X-axis ballscrew',
        worldPos: new THREE.Vector3(4, 2.5, -8.0),
        camPos: new THREE.Vector3(12, 14, 6),
        camLookAt: new THREE.Vector3(4, 2.5, -8.0),
        boxScale: [8.4, 4.8, 4.4]
      },
      {
        id: 'dgset',
        fault: 'Alternator Bearing Wear',
        category: 'Power Generation / DG SET',
        name: 'DG SET (KOEL Green Emergency Gen)',
        dangerScore: 18,
        warningScore: 38,
        dangerVib: '9.8 mm/s RMS (Peak Alert)',
        warningVib: '5.2 mm/s RMS',
        dangerTemp: '96.4°C (Critical)',
        warningTemp: '72.0°C',
        dangerPred: 'RevUpTime AI: Alternator Bearing Cage Wear — Severe vibration spikes. Imminent failure in 36h',
        warningPred: 'RevUpTime AI: Alternator Bearing Degradation — Bearing 6314-C3 temperature and vibration elevated',
        worldPos: new THREE.Vector3(-15, 4.0, -26.0),
        camPos: new THREE.Vector3(-5, 14, -12),
        camLookAt: new THREE.Vector3(-15, 4.0, -26.0),
        boxScale: [12.0, 7.5, 6.8]
      }
    ];

    let pqActiveIndex = 4; // Starts with Alternator Bearing Wear (DG SET) to match static picture frame
    let pqAutoCycle = false; // Still / paused by default until 3D is activated
    let isMoving = false; // Still by default until user clicks 'View in 360° 3D'
    let pqCycleElapsed = 0;
    const PQ_CYCLE_DURATION = 4.8; // Seconds per asset

    // 3D Visual Alert Pulsing Bounding Box over Active Machine
    const pqAlertBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const pqAlertBoxMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    });
    const pqAlertBoxMesh = new THREE.Mesh(pqAlertBoxGeo, pqAlertBoxMat);
    const pqAlertEdgesGeo = new THREE.EdgesGeometry(pqAlertBoxGeo);
    const pqAlertEdgesMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    const pqAlertEdges = new THREE.LineSegments(pqAlertEdgesGeo, pqAlertEdgesMat);
    pqAlertBoxMesh.add(pqAlertEdges);
    scene.add(pqAlertBoxMesh);

    function populateCard(userData) {
      if (!userData) return;

      let currentData = Object.assign({}, userData);

      // Dynamically synchronize details if machine is linked to Priority Queue
      if (userData.pqId) {
        const pqItem = pqItems.find(item => item.id === userData.pqId);
        if (pqItem) {
          const isActiveDanger = (pqItems[pqActiveIndex] && pqItems[pqActiveIndex].id === pqItem.id);
          const score = isActiveDanger ? pqItem.dangerScore : pqItem.warningScore;
          currentData.name = pqItem.name;
          currentData.health = `${score} / 100`;
          currentData.status = isActiveDanger ? 'DANGER' : 'WARNING';
          currentData.vibration = isActiveDanger ? pqItem.dangerVib : pqItem.warningVib;
          currentData.temperature = isActiveDanger ? pqItem.dangerTemp : pqItem.warningTemp;
          currentData.prediction = isActiveDanger ? pqItem.dangerPred : pqItem.warningPred;
        }
      } else if (!currentData.health) {
        currentData.health = '98 / 100';
      }

      document.getElementById('tt-name').textContent = currentData.name;

      const healthEl = document.getElementById('tt-health');
      if (healthEl) {
        healthEl.textContent = currentData.health;
        const scoreNum = parseInt(currentData.health);
        if (scoreNum <= 30) {
          healthEl.className = 'tt-val font-bold text-red-600';
        } else if (scoreNum <= 60) {
          healthEl.className = 'tt-val font-bold text-amber-600';
        } else {
          healthEl.className = 'tt-val font-bold text-emerald-600';
        }
      }

      const statusEl = document.getElementById('tt-status');
      statusEl.textContent = currentData.status;
      if (currentData.status.includes('DANGER') || currentData.status.includes('CRITICAL') || currentData.status.includes('FAIL')) {
        statusEl.className = 'tt-status-critical';
      } else if (currentData.status.includes('WARNING') || currentData.status.includes('ALERT')) {
        statusEl.className = 'tt-status-warning';
      } else {
        statusEl.className = 'tt-status-normal';
      }

      document.getElementById('tt-vib').textContent = currentData.vibration;
      document.getElementById('tt-temp').textContent = currentData.temperature;

      const predEl = document.getElementById('tt-pred');
      predEl.textContent = currentData.prediction;
      const predText = (currentData.prediction || '').toLowerCase();
      const isPredCritical = currentData.status.includes('DANGER') || currentData.status.includes('CRITICAL') || predText.includes('failure') || predText.includes('imminent');
      const isPredWarning = currentData.status.includes('WARNING') || predText.includes('wear') || predText.includes('degradation') || predText.includes('leak') || predText.includes('blockage');

      if (isPredCritical) {
        predEl.className = 'tt-pred-critical';
      } else if (isPredWarning) {
        predEl.className = 'tt-pred-warning';
      } else {
        predEl.className = 'tt-pred-healthy';
      }
    }

    function onMouseDown(e) {
      mouseDownPos = { x: e.clientX, y: e.clientY };
    }
    container.addEventListener('mousedown', onMouseDown);

    function onMouseUp(e) {
      // Check if this was a click rather than a camera drag
      const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      if (dist < 6) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0 && intersects[0].object.userData && intersects[0].object.userData.name) {
          pinnedObject = intersects[0].object;
          populateCard(pinnedObject.userData);
          updateTooltipPosition(e.clientX, e.clientY);
          if (pinBadge) pinBadge.classList.remove('hidden');
          if (closeBtn) closeBtn.classList.remove('hidden');
          tooltip.classList.remove('hidden');

          // If the clicked machine belongs to the Priority Queue, select it in the dashboard!
          if (pinnedObject.userData.pqId) {
            window.selectPQItem(pinnedObject.userData.pqId);
          }
        } else {
          // Clicked empty ground: unpin
          unpinMachine();
        }
      }
    }
    container.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (!pinnedObject) {
        updateTooltipPosition(event.clientX, event.clientY);
      }
    }
    container.addEventListener('mousemove', onMouseMove);

    function renderPriorityQueue() {
      const listEl = document.getElementById('pq-items-list');
      if (!listEl) return;

      const activeItem = pqItems[pqActiveIndex];
      // Display activeItem at top as Danger, other items as Warning (exact match to user photos 1-4)
      const orderedItems = [activeItem, ...pqItems.filter((_, idx) => idx !== pqActiveIndex)];

      let html = '';
      orderedItems.forEach((item, pos) => {
        const isDanger = (pos === 0);
        const score = isDanger ? item.dangerScore : item.warningScore;
        const badge = isDanger ? 'Danger' : 'Warning';
        const scoreColor = isDanger ? 'text-red-600' : 'text-amber-600';
        const badgeColor = isDanger ? 'text-red-600' : 'text-amber-600';
        const rowClass = isDanger
          ? 'pq-item pq-item-active flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-red-50/95 via-rose-50/70 to-red-50/40 border border-red-200/90 shadow-sm transition-all duration-300 cursor-pointer'
          : 'pq-item flex items-center justify-between p-2.5 rounded-xl bg-white/40 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 cursor-pointer';

        html += `
          <div class="${rowClass}" data-item-id="${item.id}" onclick="window.selectPQItem('${item.id}')">
            <div class="flex flex-col pr-2 min-w-0">
              <span class="text-[13px] ${isDanger ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'} leading-snug truncate">${item.fault}</span>
              <div class="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500 font-medium">
                <svg class="h-3 w-3 text-slate-400 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" />
                  <path d="M10 10l7-4M10 10v8M10 10L3 6" />
                </svg>
                <span class="truncate">${item.category}</span>
              </div>
            </div>
            <div class="flex flex-col items-end flex-shrink-0 pl-2">
              <span class="text-[22px] font-black tracking-tight ${scoreColor} leading-none">${score}</span>
              <span class="text-[10px] font-bold tracking-wider ${badgeColor} uppercase mt-0.5">${badge}</span>
            </div>
          </div>
        `;
      });

      listEl.innerHTML = html;
    }

    window.selectPQItem = function(id) {
      const idx = pqItems.findIndex(item => item.id === id);
      if (idx !== -1) {
        pqActiveIndex = idx;
        pqCycleElapsed = 0;
        renderPriorityQueue();

        // Update pinned tooltip if open
        if (pinnedObject && pinnedObject.userData) {
          populateCard(pinnedObject.userData);
        }
      }
    };

    renderPriorityQueue();

    const pqPlayPauseBtn = document.getElementById('pq-play-pause-btn');
    const pqPauseIcon = document.getElementById('pq-pause-icon');
    const pqPlayIcon = document.getElementById('pq-play-icon');

    if (pqPauseIcon && pqPlayIcon) {
      pqPauseIcon.classList.add('hidden');
      pqPlayIcon.classList.remove('hidden');
    }

    if (pqPlayPauseBtn) {
      pqPlayPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pqAutoCycle = !pqAutoCycle;
        if (pqAutoCycle && !isMoving) {
          activate3DMovement();
        }
        if (pqPauseIcon && pqPlayIcon) {
          pqPauseIcon.classList.toggle('hidden', !pqAutoCycle);
          pqPlayIcon.classList.toggle('hidden', pqAutoCycle);
        }
      });
    }

    // --- Center 3D / 360 Overlay Activation ---
    const centerOverlay = document.getElementById('center-3d-overlay');
    const btnActivate3D = document.getElementById('btn-activate-3d');

    function activate3DMovement() {
      if (isMoving) return;
      isMoving = true;
      pqAutoCycle = true;
      if (pqPauseIcon && pqPlayIcon) {
        pqPauseIcon.classList.remove('hidden');
        pqPlayIcon.classList.add('hidden');
      }
      if (centerOverlay) {
        centerOverlay.style.opacity = '0';
        centerOverlay.style.pointerEvents = 'none';
        setTimeout(() => {
          centerOverlay.style.display = 'none';
        }, 500);
      }
      targetCamPos = new THREE.Vector3(-60, 50, 64);
      targetLookAt = new THREE.Vector3(0, 0, 0);
    }

    if (btnActivate3D) {
      btnActivate3D.addEventListener('click', (e) => {
        e.stopPropagation();
        activate3DMovement();
      });
    }

    if (centerOverlay) {
      centerOverlay.addEventListener('click', () => {
        activate3DMovement();
      });
    }

    // --- Buttons & HUD Interaction ---
    let targetCamPos = null;
    let targetLookAt = null;

    let revUpTimeFocusIdx = 0;
    const btnFocusRevUpTime = document.getElementById('btn-focus-revuptime');
    if (btnFocusRevUpTime) {
      btnFocusRevUpTime.addEventListener('click', () => {
        activate3DMovement();
        const step = revUpTimeFocusIdx % 4;
        if (step === 0 && sensorKnurlMotorRef && sensorKnurlMotorRef.sensorBody) {
          targetCamPos = new THREE.Vector3(26.2, 5.4, -4.8);
          targetLookAt = new THREE.Vector3(24.3, 4.3, -7.0);
          pinnedObject = sensorKnurlMotorRef.sensorBody;
          btnFocusRevUpTime.innerHTML = `<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg> Flange Mount (Photo 2)`;
        } else if (step === 1 && sensorFlangeBoxRef && sensorFlangeBoxRef.sensorBody) {
          targetCamPos = new THREE.Vector3(28.0, 6.2, 8.2);
          targetLookAt = new THREE.Vector3(25.6, 5.0, 5.5);
          pinnedObject = sensorFlangeBoxRef.sensorBody;
          btnFocusRevUpTime.innerHTML = `<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg> DG Alternator DE`;
        } else if (step === 2 && sensorDgSetRef && sensorDgSetRef.sensorBody) {
          targetCamPos = new THREE.Vector3(-8.5, 5.5, 7.2);
          targetLookAt = new THREE.Vector3(-10.3, 3.4, 4.4);
          pinnedObject = sensorDgSetRef.sensorBody;
          btnFocusRevUpTime.innerHTML = `<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg> Gearbox Pinion`;
        } else if (step === 3 && sensorGearboxRef && sensorGearboxRef.sensorBody) {
          targetCamPos = new THREE.Vector3(-19.5, 4.5, 0.5);
          targetLookAt = new THREE.Vector3(-17.8, 2.6, -2.1);
          pinnedObject = sensorGearboxRef.sensorBody;
          btnFocusRevUpTime.innerHTML = `<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg> Motor DE (Photo 1)`;
        }
        revUpTimeFocusIdx++;
        if (pinnedObject && pinnedObject.userData) {
          populateCard(pinnedObject.userData);
        }
        if (pinBadge) pinBadge.classList.remove('hidden');
        if (closeBtn) closeBtn.classList.remove('hidden');
      });
    }

    const btnReset = document.getElementById('btn-reset-cam');
    const btnScan = document.getElementById('btn-toggle-scan');
    const scanStatus = document.getElementById('scan-status');

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        targetCamPos = new THREE.Vector3(-68, 55, 68);
        targetLookAt = new THREE.Vector3(0, 0, 0);
        if (btnFocusRevUpTime) {
          btnFocusRevUpTime.innerHTML = `<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg> RevUpTime Sensors`;
        }
        unpinMachine();
      });
    }

    if (btnScan) {
      btnScan.addEventListener('click', () => {
        scannerActive = !scannerActive;
        scanBeam.visible = scannerActive;
        if (scanStatus) {
          scanStatus.textContent = scannerActive ? 'ON' : 'OFF';
          scanStatus.style.color = '#000000';
        }
      });
    }

    // --- Responsive Resize ---
    function onWindowResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize);

    // --- Animation Loop ---
    let clock = new THREE.Clock();
    let scanZ = -34;
    let scanDir = 1;

    function animate() {
      if (isDisposed) return; animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Idle Gentle Camera Float
      if (isMoving && !controls.state && !targetCamPos) {
        camera.position.y += Math.sin(elapsed * 0.8) * 0.015;
      }

      // Smooth Camera Animation
      if (targetCamPos && targetLookAt) {
        camera.position.lerp(targetCamPos, 0.06);
        controls.target.lerp(targetLookAt, 0.06);
        if (camera.position.distanceTo(targetCamPos) < 0.2) {
          targetCamPos = null;
          targetLookAt = null;
        }
      }

      if (isMoving) {
        // --- REAL-TIME MOVEMENT FOR DG SET & MACHINERY ---
        // 0. DG SET: Realistic High-Frequency Diesel Engine Running Vibration
        if (movingParts.dgSet) {
          movingParts.dgSet.position.y = Math.sin(elapsed * 45) * 0.035;
        }

      // 1. Machine 1: Blower Motor Shaft & Impeller (Photo 1)
      if (movingParts.m1Shaft) {
        movingParts.m1Shaft.rotation.x += 0.16; // Rapid motor shaft spin
      }
      if (movingParts.m1BlowerFan) {
        movingParts.m1BlowerFan.rotation.z += 0.28; // Blower impeller rotation
      }

      // 2. Machine 2: Heavy Drive Shaft (Photo 2)
      if (movingParts.m2Shaft) {
        movingParts.m2Shaft.rotation.x += 0.09; // Heavy industrial shaft rotation
      }

      // 3. Machine 3: HV Box Motor Shaft (Photo 3)
      if (movingParts.m3Shaft) {
        movingParts.m3Shaft.rotation.x += 0.14; // High-voltage motor shaft spin
      }

      // 4. Machine 4: Pump Coupling & Pressure Gauge (Photo 4)
      if (movingParts.m4Coupling) {
        movingParts.m4Coupling.rotation.x += 0.18; // Flexible coupling rotation
      }
      if (movingParts.m4GaugeNeedle) {
        // Vibrating pressure gauge needle under hydraulic flow
        movingParts.m4GaugeNeedle.rotation.z = Math.sin(elapsed * 10) * 0.12 - 0.2;
      }

      // 5. Powertrain Skids: Motor-Gearbox Coupling Rotation
      movingParts.skidCouplings.forEach(coupling => {
        coupling.rotation.x += 0.16;
      });

      // 6. Wireless Solution: Glowing Telemetry Signal Waves Radiating Upward
      movingParts.wirelessWaves.forEach(item => {
        const t1 = (elapsed * 2.2 + item.offset) % 1.0;
        item.w1.position.y = item.basePosY + 0.35 + t1 * 0.35;
        item.w1.material.opacity = Math.max(0, 0.9 - t1 * 0.9);
        item.w1.scale.set(1 + t1 * 0.5, 1 + t1 * 0.5, 1);

        const t2 = (elapsed * 2.2 + item.offset + 0.5) % 1.0;
        item.w2.position.y = item.basePosY + 0.6 + t2 * 0.35;
        item.w2.material.opacity = Math.max(0, 0.9 - t2 * 0.9);
        item.w2.scale.set(1 + t2 * 0.5, 1 + t2 * 0.5, 1);
      });

      // 7. Booster Process Pump Skid (Photo 1): Rotating Shaft & Coupling
      if (movingParts.boosterShaft) {
        movingParts.boosterShaft.rotation.x += 0.22;
      }
      if (movingParts.boosterCoupling) {
        movingParts.boosterCoupling.rotation.x += 0.22;
      }

      // 8. Duplex Pumping Station (Photo 2): Couplings & Dial Needle Vibrations
      movingParts.duplexCouplings.forEach(c => {
        c.rotation.x += 0.18;
      });
      movingParts.duplexGaugeNeedles.forEach((needle, idx) => {
        needle.rotation.z = Math.sin(elapsed * 12 + idx * 1.5) * 0.12 - 0.25;
      });

      // 9. Centrifugal Blower Fan (Top-Left Corner - Photo 1)
      if (movingParts.centrifugalImpeller) {
        movingParts.centrifugalImpeller.rotation.z += 0.24;
      }
      if (movingParts.centrifugalShaft) {
        movingParts.centrifugalShaft.rotation.x += 0.24;
      }

      // 10. Mobile Industrial Drum Fan 3-Blade Rotor (Bottom-Left Corner - Photo 2)
      if (movingParts.drumFanPropeller) {
        movingParts.drumFanPropeller.rotation.z -= 0.28;
      }

      // 11. Bevel-Helical Speed Reducer Shafts (Photo 1)
      movingParts.gearbox1Shafts.forEach(s => {
        s.rotation.x += 0.16;
      });

      // 12. Open-Casing Helical Bull Gear & Pinion (Photo 2)
      if (movingParts.bullGear) {
        movingParts.bullGear.rotation.z += 0.08;
      }
      if (movingParts.pinionGear) {
        movingParts.pinionGear.rotation.z -= 0.22;
      }

      // 13. Portable Roll-Cage Diesel Generator Engine Vibration (Photo 1)
      if (movingParts.portableGen) {
        movingParts.portableGen.position.y = Math.sin(elapsed * 38) * 0.025;
      }

      // 14. Mobile 4-Wheeled Field Diesel Engine & Flywheel (Photo 2)
      if (movingParts.fieldEngine) {
        movingParts.fieldEngine.position.y = Math.sin(elapsed * 22) * 0.035;
      }
      if (movingParts.fieldEngineFlywheel) {
        movingParts.fieldEngineFlywheel.rotation.z += 0.20;
      }

      // Fan Rotation
      fanBlades.forEach(fan => {
        fan.rotation.y += 0.25;
      });

      // Conveyor Packages
      boxes.forEach((box, i) => {
        box.position.x += delta * 4;
        if (box.position.x > 12) {
          box.position.x = -12.5;
        }
      });

      // Robot Arm Movement
      robot1.rotation.y = Math.sin(elapsed * 1.5) * 0.35;
      robot2.rotation.y = Math.cos(elapsed * 1.3) * 0.35;

      // Critical Risk Alert Pulse
      riskLight.intensity = 2.8 + Math.sin(elapsed * 8) * 1.6;
      beacon.rotation.y += 0.04;
      beacon.position.y = 10.5 + Math.sin(elapsed * 4) * 0.25;

      radarRing.scale.set(
        1 + (elapsed % 1.5) * 0.8,
        1 + (elapsed % 1.5) * 0.8,
        1
      );
      radarMat.opacity = Math.max(0, 0.8 - (elapsed % 1.5) * 0.5);

      radarRing2.scale.set(
        1 + ((elapsed + 0.75) % 1.5) * 0.8,
        1 + ((elapsed + 0.75) % 1.5) * 0.8,
        1
      );

      // 15. RevUpTime Sensor Active Telemetry LED Heartbeat Pulse
      const ledPulse = Math.sin(elapsed * 7) * 0.5 + 0.5;
      matLedCyan.color.setRGB(0.0, 0.55 + ledPulse * 0.45, 0.85 + ledPulse * 0.15);

      // Scanner Beam
      if (scannerActive) {
        scanZ += scanDir * delta * 18;
        if (scanZ > 32) { scanZ = 32; scanDir = -1; }
        if (scanZ < -32) { scanZ = -32; scanDir = 1; }
        scanBeam.position.z = scanZ;
      }
    } // End if (isMoving)

      // 16. Auto-cycle Priority Queue items & update progress bar
      if (isMoving && pqAutoCycle) {
        pqCycleElapsed += delta;
        const progressPct = Math.min(100, (pqCycleElapsed / PQ_CYCLE_DURATION) * 100);
        const progressBar = document.getElementById('pq-cycle-bar');
        if (progressBar) progressBar.style.width = `${progressPct}%`;

        if (pqCycleElapsed >= PQ_CYCLE_DURATION) {
          pqCycleElapsed = 0;
          pqActiveIndex = (pqActiveIndex + 1) % pqItems.length;
          renderPriorityQueue();
          if (pinnedObject && pinnedObject.userData && pinnedObject.userData.pqId) {
            populateCard(pinnedObject.userData);
          }
        }
      }

      // 17. Update 3D Alert Highlight Box & Dynamic SVG Connecting Laser Line (Tractian Reference Photos)
      const activePQ = pqItems[pqActiveIndex];
      if (activePQ) {
        pqAlertBoxMesh.visible = true;
        pqAlertBoxMesh.position.copy(activePQ.worldPos);
        pqAlertBoxMesh.scale.set(activePQ.boxScale[0], activePQ.boxScale[1], activePQ.boxScale[2]);

        const alertPulse = Math.sin(elapsed * 6) * 0.08 + 0.18;
        pqAlertBoxMat.opacity = alertPulse;
        pqAlertEdgesMat.opacity = alertPulse * 3.5;

        const activeRowEl = document.querySelector('.pq-item-active');
        const svgOverlay = document.getElementById('priority-queue-svg');
        const laserLine = document.getElementById('pq-laser-line');
        const cardAnchor = document.getElementById('pq-card-anchor');
        const targetDot = document.getElementById('pq-target-dot');
        const targetRipple = document.getElementById('pq-target-ripple');

        if (activeRowEl && svgOverlay && laserLine && cardAnchor && targetDot && targetRipple) {
          const wrapperRect = container.getBoundingClientRect();
          const rowRect = activeRowEl.getBoundingClientRect();

          const worldPos = activePQ.worldPos.clone();
          worldPos.project(camera);

          if (worldPos.z <= 1.0) {
            const x1 = rowRect.left - wrapperRect.left - 2;
            const y1 = rowRect.top - wrapperRect.top + (rowRect.height / 2);
            const x2 = (worldPos.x * (wrapperRect.width / 2)) + (wrapperRect.width / 2);
            const y2 = -(worldPos.y * (wrapperRect.height / 2)) + (wrapperRect.height / 2);

            laserLine.setAttribute('x1', x1);
            laserLine.setAttribute('y1', y1);
            laserLine.setAttribute('x2', x2);
            laserLine.setAttribute('y2', y2);

            cardAnchor.setAttribute('cx', x1);
            cardAnchor.setAttribute('cy', y1);

            targetDot.setAttribute('cx', x2);
            targetDot.setAttribute('cy', y2);

            targetRipple.setAttribute('cx', x2);
            targetRipple.setAttribute('cy', y2);

            svgOverlay.style.display = 'block';
          } else {
            svgOverlay.style.display = 'none';
          }
        }
      }

      // Raycasting Tooltips & Card Display
      if (pinnedObject && pinnedObject.userData && pinnedObject.userData.name) {
        populateCard(pinnedObject.userData);

        // Project pinned 3D object to 2D canvas screen coordinates
        const worldPos = new THREE.Vector3();
        pinnedObject.getWorldPosition(worldPos);
        worldPos.y += 2.0;
        worldPos.project(camera);

        const hw = container.clientWidth / 2;
        const hh = container.clientHeight / 2;
        let screenX = (worldPos.x * hw) + hw + 16;
        let screenY = -(worldPos.y * hh) + hh - 30;

        if (screenX + 320 > container.clientWidth) screenX = (worldPos.x * hw) + hw - 330;
        if (screenY + 160 > container.clientHeight) screenY = container.clientHeight - 170;
        if (screenX < 10) screenX = 10;
        if (screenY < 10) screenY = 10;

        tooltip.style.left = `${screenX}px`;
        tooltip.style.top = `${screenY}px`;

        if (worldPos.z <= 1.0) {
          tooltip.classList.remove('hidden');
        }
        container.style.cursor = 'default';
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (intersects.length > 0 && intersects[0].object.userData && intersects[0].object.userData.name) {
          populateCard(intersects[0].object.userData);
          if (pinBadge) pinBadge.classList.add('hidden');
          if (closeBtn) closeBtn.classList.add('hidden');
          tooltip.classList.remove('hidden');
          container.style.cursor = 'pointer';
        } else {
          tooltip.classList.add('hidden');
          container.style.cursor = 'grab';
        }
      }

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return function cleanup() {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onWindowResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseup', onMouseUp);
      delete (window as any).selectPQItem;
      try {
        controls.dispose();
        renderer.dispose();
      } catch (e) {
        // ignore
      }
    };
}
