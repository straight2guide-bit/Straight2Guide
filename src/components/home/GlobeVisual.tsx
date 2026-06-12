"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, Objects } from "topojson-specification";

// ISO 3166-1 numeric codes for featured regions
const FEATURED_IDS = new Set([76, 404, 834]); // Brazil, Kenya, Tanzania

type WorldTopology = Topology<Objects<{ countries: { type: "GeometryCollection" } }>>;

export function GlobeVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ phi: -20, theta: -10, dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const dpr = window.devicePixelRatio ?? 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Orthographic projection — natural hemisphere clip
    const proj = geoOrthographic()
      .scale(W / 2 - 1)
      .translate([W / 2, W / 2])
      .clipAngle(90);

    const pathGen = geoPath(proj, ctx);
    let worldData: WorldTopology | null = null;
    let raf: number;

    function render() {
      if (!worldData || !ctx) return;
      const { phi, theta } = stateRef.current;
      proj.rotate([phi, theta, 0]);
      ctx.clearRect(0, 0, W, H);

      // Ocean
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathGen({ type: "Sphere" } as any);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const countries = feature(worldData, (worldData as any).objects.countries) as any;

      // All non-featured countries — grey
      for (const f of countries.features) {
        if (FEATURED_IDS.has(Number(f.id))) continue;
        ctx.beginPath();
        pathGen(f);
        ctx.fillStyle = "#e2e8f0";
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // Featured countries — brand orange
      for (const f of countries.features) {
        if (!FEATURED_IDS.has(Number(f.id))) continue;
        ctx.beginPath();
        pathGen(f);
        ctx.fillStyle = "#F28C28";
        ctx.fill();
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Globe outline
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathGen({ type: "Sphere" } as any);
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function loop() {
      if (!stateRef.current.dragging) {
        stateRef.current.phi -= 0.1;
      }
      render();
      raf = requestAnimationFrame(loop);
    }

    fetch("/world-110m.json")
      .then((r) => r.json())
      .then((data) => {
        worldData = data as WorldTopology;
        loop();
      });

    function onPointerDown(e: PointerEvent) {
      if (!canvas) return;
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!stateRef.current.dragging) return;
      const dx = e.clientX - stateRef.current.lastX;
      const dy = e.clientY - stateRef.current.lastY;
      stateRef.current.phi += dx * 0.35;
      stateRef.current.theta = Math.max(-60, Math.min(60, stateRef.current.theta - dy * 0.35));
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
    }
    function onPointerUp() {
      stateRef.current.dragging = false;
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  // Container height ≈ half canvas size → clips to top hemisphere only
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "min(55vw, 560px)" }}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing"
        style={{ width: "min(110vw, 1120px)", height: "min(110vw, 1120px)" }}
      />
    </div>
  );
}
