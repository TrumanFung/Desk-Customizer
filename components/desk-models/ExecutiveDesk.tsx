import { DRAWER_FRONT, PEDESTAL, type DeskModelProps } from "./shared";

export function ExecutiveDesk({
  widthM,
  depthM,
  heightM,
  color,
  drawersLeft,
  drawersRight
}: DeskModelProps) {
  const topThickM = 0.05;
  const topOverhangM = 0.03;
  const topY = heightM + topThickM / 2;

  const pedestalHeightM = heightM;
  const pedestalY = pedestalHeightM / 2;
  const pedestalWidthM = Math.min(0.56, Math.max(0.34, widthM * 0.25));
  const pedestalDepthM = Math.max(0.45, depthM * 0.9);
  const pedestalInsetM = 0.03;
  const pedestalX = widthM / 2 - pedestalWidthM / 2 - pedestalInsetM;

  const apronHeightM = 0.08;
  const apronY = heightM - apronHeightM / 2 - 0.035;
  const apronWidthM = Math.max(0.3, widthM - pedestalWidthM * 2 - pedestalInsetM * 2);
  const drawerFaceHeightM = 0.13;
  const drawerFaceDepthM = 0.035;
  const drawerFaceY = heightM - drawerFaceHeightM / 2 - 0.18;
  const drawerFaceZ = pedestalDepthM / 2 - drawerFaceDepthM / 2 + 0.002;

  return (
    <group>
      <mesh position={[0, topY, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[widthM + topOverhangM * 2, topThickM, depthM + topOverhangM * 1.2]}
        />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>

      <mesh position={[-pedestalX, pedestalY, 0]} castShadow receiveShadow>
        <boxGeometry args={[pedestalWidthM, pedestalHeightM, pedestalDepthM]} />
        <meshStandardMaterial color={PEDESTAL} roughness={0.72} />
      </mesh>

      <mesh position={[pedestalX, pedestalY, 0]} castShadow receiveShadow>
        <boxGeometry args={[pedestalWidthM, pedestalHeightM, pedestalDepthM]} />
        <meshStandardMaterial color={PEDESTAL} roughness={0.72} />
      </mesh>

      <mesh position={[0, apronY, 0]} castShadow receiveShadow>
        <boxGeometry args={[apronWidthM, apronHeightM, depthM * 0.16]} />
        <meshStandardMaterial color={PEDESTAL} roughness={0.68} />
      </mesh>

      {drawersLeft ? (
        <mesh position={[-pedestalX, drawerFaceY, drawerFaceZ]} castShadow>
          <boxGeometry
            args={[pedestalWidthM * 0.78, drawerFaceHeightM, drawerFaceDepthM]}
          />
          <meshStandardMaterial color={DRAWER_FRONT} roughness={0.55} />
        </mesh>
      ) : null}

      {drawersRight ? (
        <mesh position={[pedestalX, drawerFaceY, drawerFaceZ]} castShadow>
          <boxGeometry
            args={[pedestalWidthM * 0.78, drawerFaceHeightM, drawerFaceDepthM]}
          />
          <meshStandardMaterial color={DRAWER_FRONT} roughness={0.55} />
        </mesh>
      ) : null}
    </group>
  );
}
