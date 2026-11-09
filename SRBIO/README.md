# Tractian Website Clone (https://tractian.com/en)

This repository contains a high-fidelity clone of the official **Tractian** landing page (English version at `https://tractian.com/en`), reverse-engineered and extracted using **REA** (Reverse Engineer Anything) via MCP and Chrome DevTools Protocol.

---

## 🛠 Features Reconstructed

1. **Pixel-Perfect Styling & Layout**:
   - Complete Next.js CSS stylesheet bundles extracted directly from runtime (including Tailwind utility bundle, layout styles, and responsive classes).
   - Modern dark theme typography and color schemes matching Tractian's design system.
   - Inter and Inter Tight variable webfonts (`.woff2`) loaded locally.

2. **Full DOM Tree & Structure**:
   - Navigation bar with brand SVG logo, product dropdown menus, resources, and CTA buttons ("Talk to an Expert", "Client Portal").
   - Hero section with Physical AI badge, headline *"Physical AI for Asset-Heavy Operations"*, subcopy, and video/raster visuals.
   - Proof points & customer trust ticker (Kubota, Bosch, Whirlpool, Ingredion, CSX, Tate & Lyle, Stellantis, Cummins, Unilever, etc.).
   - Multi-Modal Asset Health Monitoring breakdown:
     - Mechanical Vibration & Temperature (Smart Trac)
     - Electrical Asset Monitoring (Energy Trac)
     - AI Predictive Maintenance Platform & Work Orders
   - Comprehensive footer with compliance badges (ISO 27001, ISO 9001, SOC 2, FedRAMP, G2 Spring Leader).

3. **Performance & Cleanups**:
   - Stripped third-party advertising, analytics, and tracking scripts (HubSpot, Google Tag Manager, LinkedIn Insight, Facebook Pixel, Demandbase, Twitter ads).
   - Removed OneTrust cookie consent overlay and dark backdrop to ensure immediate clean viewing.
   - Local asset routing with clean fallbacks.

---

## 🚀 How to Run Locally

### Option 1: Using Node.js (Recommended)

```bash
# Start the local server
npm start
# or
node server.js
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

### Option 2: Using Python

```bash
python3 -m http.server 3000
```

Open your browser at **[http://localhost:3333](http://localhost:3333)**.

---

## 📂 Project Structure

```text
tractian/
├── index.html                   # Clean, standalone 3D digital twin & UI application
├── package.json                 # npm configuration and run scripts
├── server.js                    # Zero-dependency local static server
├── icon.svg                     # Vector brand logo
├── manifest.webmanifest         # PWA web manifest
├── _next/                       # Essential static assets
│   └── static/
│       ├── css/                 # Core stylesheet bundles (Tailwind & Inter fonts)
│       ├── media/               # Web fonts (Inter / Inter Tight)
│       └── chunks/              # 3D libraries (Three.js & OrbitControls)
└── README.md                    # Documentation
```

---

*Extracted via REA browser scenario inspection and controlled Chromium execution.*

