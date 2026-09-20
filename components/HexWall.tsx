"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type TileData = {
  position: [number, number, number];
  phase: number;
  speed: number;
  amplitude: number;
};

function buildGrid(): TileData[] {
  const tiles: TileData[] = [];

  const cols = 15;
  const rows = 10;

  const spacingX = 2.0;
  const spacingY = 1.72;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

      const offset = row % 2 === 0 ? 0 : spacingX / 2;

      const x =
        (col - cols / 2) * spacingX +
        offset;

      const y =
        (row - rows / 2) * spacingY;

      tiles.push({
        position: [x, y, 0],

        phase:
          (row * cols + col) * 0.4,

        speed:
          0.12 +
          Math.random() * 0.05,

        amplitude:
          0.18 +
          Math.random() * 0.08,
      });
    }
  }

  return tiles;
}

function Tile({
  data,
}: {
  data: TileData;
}) {

  const mesh =
    useRef<THREE.Mesh>(null!);

  const geometry = useMemo(
    () =>
      new THREE.CylinderGeometry(
        0.82,
        0.82,
        0.12,
        6
      ),
    []
  );

  useFrame((state) => {

    if (!mesh.current) return;

    mesh.current.position.z =
      Math.sin(
        state.clock.elapsedTime *
          data.speed +
          data.phase
      ) *
      data.amplitude;

    mesh.current.rotation.x =
      Math.PI / 2;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={data.position}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial
        color="#FCFCFC"
        roughness={0.88}
        metalness={0}
      />
    </mesh>
  );
}

export default function HexWall() {

  const tiles =
    useMemo(
      () => buildGrid(),
      []
    );

  return (
    <>
      {tiles.map((tile, i) => (
        <Tile
          key={i}
          data={tile}
        />
      ))}
    </>
  );
}