import { DRAWER_FRONT, LEG_METAL, type DeskModelProps } from "./shared";

export function WritingDesk({
  widthM,
  depthM,
  heightM,
  color,
  drawersLeft,
  drawersRight
}: DeskModelProps) {
  const topThickM = 0.04;
  const legThickM = 0.06;
  const legInsetM = 0.04;

  const topY = heightM + topThickM / 2;
  const legY = heightM / 2;

  const legX = widthM / 2 - legThickM / 2 - legInsetM;
  const legZ = depthM / 2 - legThickM / 2 - legInsetM;

  const drawerHeightM = 0.16;
  const drawerDepthM = Math.max(0.25, depthM * 0.55);
  const drawerWidthM = Math.max(0.35, widthM * 0.35);
  const drawerY = heightM - drawerHeightM / 2 - 0.02;

  const drawerXLeft = -widthM / 2 + drawerWidthM / 2 + 0.02;
  const drawerXRight = widthM / 2 - drawerWidthM / 2 - 0.02;

  return (
    <group>
      <mesh position={[0, topY, 0]} castShadow receiveShadow>
        <boxGeometry args={[widthM, topThickM, depthM]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>

      {[
        [legX, legY, legZ],
        [-legX, legY, legZ],
        [legX, legY, -legZ],
        [-legX, legY, -legZ]
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
