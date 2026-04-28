import { DRAWER_FRONT, LEG_METAL, type DeskModelProps } from "./shared";

export function LShapedDesk({
  widthM,
  depthM,
  heightM,
  color,
  drawersLeft,
  drawersRight,
  returnSide
}: DeskModelProps) {
  const topThickM = 0.04;
  const legThickM = 0.06;
  const legInsetM = 0.04;
  const returnLengthM = Math.max(0.6, Math.min(widthM * 0.58, 1.15));
  const topY = heightM + topThickM / 2;
  const legY = heightM / 2;
  const sign = returnSide === "left" ? -1 : 1;

  const mainLegX = widthM / 2 - legThickM / 2 - legInsetM;
  const mainLegZ = depthM / 2 - legThickM / 2 - legInsetM;
  const returnCenterX = sign * (widthM / 2 - depthM / 2);
  // const returnCenterZ = -depthM / 2 - returnLengthM / 2 + depthM / 2;

  // const outerLegX = sign * (widthM / 2 + depthM / 2 - legThickM / 2 - legInsetM);
  // const returnOuterLegZ = returnCenterZ - returnLengthM / 2 + legThickM / 2 + legInsetM;
  // const returnInnerLegZ = returnCenterZ + returnLengthM / 2 - legThickM / 2 - legInsetM;
  // 1. Maintain the return's center position
  const returnCenterZ = -depthM / 2 - returnLengthM / 2;

  // 2. Move the legs from the center (X) to the outer edges of the return width
  // This uses the depth of the main desk as the width of the return piece
  const returnLegXOffset = (depthM / 2) - (legThickM / 2) - legInsetM;
  const outerLegXRight = returnCenterX + (sign * returnLegXOffset);
  const outerLegXLeft = returnCenterX - (sign * returnLegXOffset);

  // 3. Snap the legs to the far front and far back of the return segment (Z)
  const returnFarEndEdgeZ = returnCenterZ - (returnLengthM / 2) + (legThickM / 2) + legInsetM;
  const returnConnectionEdgeZ = returnCenterZ + (returnLengthM / 2) - (legThickM / 2) - legInsetM;

  const drawerHeightM = 0.16;
  const drawerDepthM = Math.max(0.24, depthM * 0.5);
  const drawerWidthM = Math.max(0.32, widthM * 0.28);
  const drawerY = heightM - drawerHeightM / 2 - 0.02;
  const drawerXLeft = -widthM / 2 + drawerWidthM / 2 + 0.02;
  const drawerXRight = widthM / 2 - drawerWidthM / 2 - 0.02;

  return (
    <group>
      <mesh position={[0, topY, 0]} castShadow receiveShadow>
        <boxGeometry args={[widthM, topThickM, depthM]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>

      <mesh position={[returnCenterX, topY, returnCenterZ]} castShadow receiveShadow>
        <boxGeometry args={[depthM, topThickM, returnLengthM]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>

      {/* {[
        [mainLegX, legY, mainLegZ],
        [-mainLegX, legY, mainLegZ],
        [mainLegX, legY, -mainLegZ],
        [-mainLegX, legY, -mainLegZ],
        [outerLegX, legY, returnOuterLegZ],
        [outerLegX, legY, returnInnerLegZ]
      ].map((p, idx) => (
        <mesh key={idx} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[legThickM, heightM, legThickM]} />
          <meshStandardMaterial color={LEG_METAL} metalness={0.35} roughness={0.45} />
        </mesh>
      ))} */}

      {[
        [mainLegX, legY, mainLegZ],
        [-mainLegX, legY, mainLegZ],
        [mainLegX, legY, -mainLegZ],
        [-mainLegX, legY, -mainLegZ],
        // New Return Legs snapped to the corners you indicated
        [outerLegXLeft, legY, returnFarEndEdgeZ],
        [outerLegXRight, legY, returnFarEndEdgeZ]
      ].map((p, idx) => (
        <mesh key={idx} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[legThickM, heightM, legThickM]} />
          <meshStandardMaterial color={LEG_METAL} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}

      {drawersLeft ? (
        <mesh position={[drawerXLeft, drawerY, 0]} castShadow>
          <boxGeometry args={[drawerWidthM, drawerHeightM, drawerDepthM]} />
          <meshStandardMaterial color={DRAWER_FRONT} roughness={0.65} />
        </mesh>
      ) : null}

      {drawersRight ? (
        <mesh position={[drawerXRight, drawerY, 0]} castShadow>
          <boxGeometry args={[drawerWidthM, drawerHeightM, drawerDepthM]} />
          <meshStandardMaterial color={DRAWER_FRONT} roughness={0.65} />
        </mesh>
      ) : null}
    </group>
  );
}
