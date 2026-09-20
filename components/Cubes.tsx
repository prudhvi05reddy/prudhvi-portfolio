"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HEX_GEO = new THREE.CylinderGeometry(1.45, 1.45, 0.14, 6);

function Tile({
  position,
  opacity,
  phase,
  speed,
}: {
  position: [number, number, number];
  opacity: number;
  phase: number;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    // Small amplitude = no left/right drift from perspective
    mesh.current.position.z =
      position[2] + Math.sin(clock.elapsedTime * speed + phase) * 0.22;
  });

  return (
    <mesh
      ref={mesh}
      geometry={HEX_GEO}
      position={position}
      rotation={[Math.PI / 2, 0, Math.PI / 6]}
    >
      <meshStandardMaterial
        color="#FFFFFF"
        roughness={0.55}
        metalness={0.0}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

export default function Cubes() {
  const tiles = useMemo(() => {
    const list = [];

    const r = 1.45;
    const dx = Math.sqrt(3) * r + 0.12; // horizontal col spacing
    const dy = r * 1.5 + 0.1;           // vertical row spacing

    let colIdx = 0;
    for (let x = -12; x <= 15; x += dx) {
      const isOdd = colIdx % 2 !== 0;
      for (let y = -9; y <= 10; y += dy) {
        const ay = y + (isOdd ? dy / 2 : 0);

        // Keep center clear for profile card
        const dist = Math.sqrt(x * x + ay * ay);
        if (dist < 4.0) continue;

        // Diagonal fade: top-right = opaque, bottom-left = invisible
        const raw = x + ay; // ranges roughly -21 to +25
        const t = Math.max(0, (raw + 5) / 25);
        const opacity = Math.min(0.88, Math.pow(t, 1.8) * 0.9);

        if (opacity < 0.015) continue;

        const seed = Math.abs(Math.round(x * 7 + ay * 11));

        list.push({
          position: [x, ay, -1.5 - (seed % 7) * 0.22] as [
            number,
            number,
            number,
          ],
          opacity,
          phase: x * 0.65 + ay * 0.52,
          speed: 0.18 + (seed % 10) * 0.012,
        });
      }
      colIdx++;
    }

    return list;
  }, []);

  return (
    <>
      {tiles.map((tile, i) => (
        <Tile
          key={i}
          position={tile.position}
          opacity={tile.opacity}
          phase={tile.phase}
          speed={tile.speed}
        />
      ))}
    </>
  );
}