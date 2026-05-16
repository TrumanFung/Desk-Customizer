// "use client";

// import type { ComponentType } from "react";
// import { Canvas } from "@react-three/fiber";
// import { ContactShadows, OrbitControls } from "@react-three/drei";
// import { ExecutiveDesk } from "@/components/desk-models/ExecutiveDesk";
// import { LShapedDesk } from "@/components/desk-models/LShapedDesk";
// import { type DeskModelProps } from "@/components/desk-models/shared";
// import { WritingDesk } from "@/components/desk-models/WritingDesk";
// import { useDeskStore } from "@/store/useDeskStore";
// import type { DeskKind } from "@/lib/types";

// function cmToM(cm: number) {
//   return cm / 100;
// }

// const DESK_COMPONENTS: Record<DeskKind, ComponentType<DeskModelProps>> = {
//   writing: WritingDesk,
//   executive: ExecutiveDesk,
//   "l-shaped": LShapedDesk
// };

// function DeskModel() {
//   const {
//     width,
//     depth,
//     height,
//     color,
//     deskKind,
//     returnSide,
//     drawersLeft,
//     drawersRight
//   } = useDeskStore();

//   const widthM = cmToM(width);
//   const depthM = cmToM(depth);
//   const heightM = cmToM(height);

//   const SelectedDesk = DESK_COMPONENTS[deskKind] ?? DESK_COMPONENTS.writing;

//   return (
//     <SelectedDesk
//       widthM={widthM}
//       depthM={depthM}
//       heightM={heightM}
//       color={color}
//       drawersLeft={drawersLeft}
//       drawersRight={drawersRight}
//       returnSide={returnSide}
//     />
//   );
// }

// const BG = "#eef1f6";
// const FLOOR = "#c8ced9";

// export function DeskPreview() {
//   return (
//     <Canvas
//       camera={{ position: [1.65, 1.25, 1.65], fov: 45 }}
//       dpr={[1, 2]}
//       shadows
//     >
//       <color attach="background" args={[BG]} />
//       <hemisphereLight args={["#f5f7fa", "#b8c0d0", 0.55]} />
//       <directionalLight
//         castShadow
//         position={[2.8, 4.2, 2.2]}
//         intensity={0.95}
//         shadow-mapSize={[1024, 1024]}
//       />
//       <ambientLight intensity={0.28} />
//       <DeskModel />
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
//         <planeGeometry args={[14, 14]} />
//         <meshStandardMaterial color={FLOOR} roughness={0.85} metalness={0.05} />
//       </mesh>
//       <ContactShadows
//         position={[0, 0.001, 0]}
//         opacity={0.35}
//         scale={12}
//         blur={2.2}
//         far={3.5}
//       />
//       <OrbitControls makeDefault enablePan enableZoom />
//     </Canvas>
//   );
// }

"use client";

import type { ComponentType } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { ExecutiveDesk } from "@/components/desk-models/ExecutiveDesk";
import { LShapedDesk } from "@/components/desk-models/LShapedDesk";
import { type DeskModelProps } from "@/components/desk-models/shared";
import { WritingDesk } from "@/components/desk-models/WritingDesk";
import { useDeskStore } from "@/store/useDeskStore";
import type { DeskKind } from "@/lib/types";

function cmToM(cm: number) {
  return cm / 100;
}

const DESK_COMPONENTS: Record<DeskKind, ComponentType<DeskModelProps>> = {
  writing: WritingDesk,
  executive: ExecutiveDesk,
  "l-shaped": LShapedDesk
};

function DeskModel() {
  const {
    width,
    depth,
    height,
    color,
    deskKind,
    returnSide,
    drawersLeft,
    drawersRight
  } = useDeskStore();

  const widthM = cmToM(width);
  const depthM = cmToM(depth);
  const heightM = cmToM(height);

  const SelectedDesk = DESK_COMPONENTS[deskKind] ?? DESK_COMPONENTS.writing;

  return (
    <>
      <SelectedDesk
        widthM={widthM}
        depthM={depthM}
        heightM={heightM}
        color={color}
        drawersLeft={drawersLeft}
        drawersRight={drawersRight}
        returnSide={returnSide}
      />
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={2.5}
        resolution={1024}
        color="#000000"
      />
    </>
  );
}

const BG = "#fafaf9"; // Matches bg-neutral-50 from layout

export function DeskPreview() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [1.65, 1.25, 1.65], fov: 45 }}
      dpr={[1, 2]}
      shadows
    >
      <color attach="background" args={[BG]} />
      <hemisphereLight args={["#f5f7fa", "#b8c0d0", 0.55]} />
      <directionalLight
        castShadow
        position={[2.8, 4.2, 2.2]}
        intensity={0.95}
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={0.28} />
      <DeskModel />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.85} metalness={0.05} />
      </mesh>
      <OrbitControls makeDefault enablePan enableZoom />
    </Canvas>
  );
}