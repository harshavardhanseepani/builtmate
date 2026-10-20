import * as THREE from 'three';
import { HouseSpec } from './layoutGenerator';

/**
 * Exports the Three.js 3D House scene directly as a binary .GLB file
 * and triggers immediate browser download to the user's device.
 */
export async function exportSceneToGLB(scene: THREE.Scene, fileName = 'buildmate-house-model.glb') {
  try {
    const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');
    const exporter = new GLTFExporter();

    exporter.parse(
      scene,
      (gltf) => {
        try {
          const blob = new Blob([gltf as ArrayBuffer], { type: 'model/gltf-binary' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileName.endsWith('.glb') ? fileName : `${fileName}.glb`;
          document.body.appendChild(a);
          a.click();
          // Delay revoking URL so browser has time to finish downloading!
          setTimeout(() => {
            if (document.body.contains(a)) document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 30000);
        } catch (downloadErr) {
          console.error('Error triggering GLB download:', downloadErr);
        }
      },
      (error) => {
        console.warn('Binary GLB export warning, attempting JSON glTF export:', error);
        try {
          exporter.parse(
            scene,
            (gltfJson) => {
              const jsonString = JSON.stringify(gltfJson, null, 2);
              const blob = new Blob([jsonString], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = fileName.replace('.glb', '.gltf');
              document.body.appendChild(a);
              a.click();
              setTimeout(() => {
                if (document.body.contains(a)) document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }, 30000);
            },
            (err2) => {
              console.error('Fallback export error:', err2);
            },
            { binary: false, onlyVisible: true }
          );
        } catch (e2) {
          console.error('Fallback error:', e2);
        }
      },
      { binary: true, onlyVisible: true }
    );
  } catch (err) {
    console.error('Failed to load GLTFExporter:', err);
  }
}

/**
 * Generates and downloads a comprehensive Architectural Blueprint & Cost Specification Dossier.
 * 1. Downloads the formatted document directly to the device.
 * 2. Invokes the native browser Print-to-PDF dialog via an invisible iframe without popup blockers.
 */
export function downloadArchitecturalPDF(specs: any, houseSpec: HouseSpec, estimatedCost: any) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const roomsList = houseSpec.rooms
    .map(
      (r, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0; font-size: 13px;">
        <td style="padding: 10px 14px; font-weight: 600; color: #1e293b;">${idx + 1}. ${r.name}</td>
        <td style="padding: 10px 14px; color: #475569;">${r.level === 0 ? 'Ground Floor' : `Floor ${r.level + 1}`}</td>
        <td style="padding: 10px 14px; color: #475569;">${r.type}</td>
        <td style="padding: 10px 14px; font-weight: 700; color: #0f172a; text-align: right;">${Math.round(r.w * r.l)} sq.ft</td>
      </tr>
    `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>BuildMate AI — Architectural Blueprint & Specification Dossier</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 20px; background: #ffffff; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 25px; }
        .logo-title { font-size: 26px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
        .logo-title span { color: #b45309; }
        .badge { background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; border: 1px solid #fde68a; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .card { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 18px; }
        .card-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #78716c; margin-bottom: 8px; letter-spacing: 0.5px; }
        .card-value { font-size: 20px; font-weight: 900; color: #0f172a; }
        .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e7e5e4; font-size: 13px; }
        .spec-label { color: #57534e; }
        .spec-val { font-weight: 700; color: #1c1917; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #f5f5f4; color: #44403c; font-size: 11px; text-transform: uppercase; font-weight: 800; padding: 10px 14px; text-align: left; }
        .stamp { display: inline-block; border: 2px solid #b45309; color: #b45309; font-weight: 900; font-size: 12px; text-transform: uppercase; padding: 6px 14px; border-radius: 6px; transform: rotate(-3deg); margin-top: 20px; }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo-title">Build<span>Mate</span> AI Design Studio</div>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Official Architectural Blueprint & Structural Cost Dossier</p>
        </div>
        <div style="text-align: right;">
          <span class="badge">Verified AI Blueprint</span>
          <p style="margin: 6px 0 0 0; font-size: 12px; color: #64748b;">Date: ${currentDate}</p>
        </div>
      </div>

      <!-- Overview Cards -->
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Total Estimated Construction Cost</div>
          <div class="card-value" style="color: #b45309;">₹${estimatedCost.lakhs} Lakhs</div>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #78716c;">Estimated at ₹${estimatedCost.rate}/sqft (${specs.budgetTier} Tier)</p>
          <div style="margin-top: 14px;">
            <div class="spec-row">
              <span class="spec-label">Civil Structure (48%)</span>
              <span class="spec-val">₹${estimatedCost.civilCost} Lakhs</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Finishing & Interiors (32%)</span>
              <span class="spec-val">₹${estimatedCost.finishCost} Lakhs</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Plumbing & Electrical MEP (20%)</span>
              <span class="spec-val">₹${estimatedCost.mepCost} Lakhs</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Architectural Specifications</div>
          <div class="spec-row">
            <span class="spec-label">Plot Dimensions</span>
            <span class="spec-val">${specs.plotSize} ft (${houseSpec.plotW * houseSpec.plotL} sq.ft)</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Total Built-Up Area</span>
            <span class="spec-val">${estimatedCost.builtUpSqft} sq.ft</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Number of Floors</span>
            <span class="spec-val">${specs.floors} Storey (${specs.floors} Levels)</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Architectural Style</span>
            <span class="spec-val">${specs.exteriorStyle}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Bedrooms / Bathrooms</span>
            <span class="spec-val">${specs.bedrooms} BHK / ${specs.bathrooms} Baths</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Parking / Garden / Terrace</span>
            <span class="spec-val">${specs.parking} / ${specs.garden} / ${specs.terrace}</span>
          </div>
        </div>
      </div>

      <!-- Room Breakdown Table -->
      <div style="margin-bottom: 25px;">
        <h3 style="font-size: 15px; font-weight: 800; text-transform: uppercase; color: #1e293b; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          Room Layout & Square Footage Schedule
        </h3>
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Floor Level</th>
              <th>Design Category</th>
              <th style="text-align: right;">Area (Approx)</th>
            </tr>
          </thead>
          <tbody>
            ${roomsList}
          </tbody>
        </table>
      </div>

      <!-- Certified Materials Manifest -->
      <div class="card" style="margin-bottom: 25px;">
        <div class="card-title">Approved Materials Manifest</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 10px; font-size: 12px;">
          <div>
            <strong style="display: block; color: #1e293b;">Cement Specification</strong>
            <span style="color: #64748b;">UltraTech OPC 53 Grade High Performance</span>
          </div>
          <div>
            <strong style="display: block; color: #1e293b;">Structural Rebars</strong>
            <span style="color: #64748b;">Fe550D Corrosion Resistant TMT Steel</span>
          </div>
          <div>
            <strong style="display: block; color: #1e293b;">Masonry & Walls</strong>
            <span style="color: #64748b;">AAC Blocks / High-Density Red Bricks</span>
          </div>
          <div>
            <strong style="display: block; color: #1e293b;">Flooring Planks</strong>
            <span style="color: #64748b;">Teak Parquet / Terrazzo Stone Tiles</span>
          </div>
          <div>
            <strong style="display: block; color: #1e293b;">Fenestration & Glazing</strong>
            <span style="color: #64748b;">6mm Toughened Solar Reflective Glass</span>
          </div>
          <div>
            <strong style="display: block; color: #1e293b;">Electrical & Plumbing</strong>
            <span style="color: #64748b;">Finolex FR Wires / CPVC Astral Pipes</span>
          </div>
        </div>
      </div>

      <!-- Verification Seal -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <div>
          <div class="stamp">BuildMate Certified 3D Model</div>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8;">Document Generated by BuildMate AI Architecture Engine • All Rights Reserved</p>
        </div>
        <div style="text-align: right;">
          <button onclick="window.print()" class="no-print" style="background: #b45309; color: white; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">
            Save / Print PDF
          </button>
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Direct device file download (Always downloads into user's Downloads folder without popup issues)
  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `BuildMate-Architectural-Blueprint-${(specs.exteriorStyle || 'villa').toLowerCase()}-${specs.plotSize || '30x40'}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 30000);
  } catch (downloadErr) {
    console.error('Error downloading architectural document file:', downloadErr);
  }

  // 2. Also open native Print / Save-as-PDF dialog via hidden iframe (bypasses popup blockers)
  try {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.warn('Iframe print error:', e);
        }
        setTimeout(() => {
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        }, 5000);
      }, 500);
    }
  } catch (iframeErr) {
    console.warn('Could not open print iframe:', iframeErr);
  }
}
