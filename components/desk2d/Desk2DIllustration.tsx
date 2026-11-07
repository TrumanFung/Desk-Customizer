import { shadeHex } from "@/lib/color";
import type { Finish } from "@/lib/desk2d/catalog";
import { getFinish, getHardware } from "@/lib/desk2d/config";
import { useDesk2DStore } from "@/store/useDesk2DStore";
import { FinishDefs, grainFor } from "./FinishDefs";
import { HardwareGlyph, hardwareWidth } from "./Hardware";
import { DEPTH, DESK, VIEW, VIEWBOX } from "./shared";

type Point = readonly [number, number];

const toPoints = (points: Point[]) => points.map(([x, y]) => `${x},${y}`).join(" ");

function Face({
  points,
  finish,
  shade = 0,
  stroke
}: {
  points: Point[];
  finish: Finish;
  shade?: number;
  stroke?: string;
}) {
  const grain = grainFor(finish);
  const d = toPoints(points);
  return (
    <>
      <polygon points={d} fill={shadeHex(finish.hex, shade)} stroke={stroke} strokeWidth={stroke ? 1 : 0} />
      {grain ? <polygon points={d} fill="#000" filter={grain.filter} opacity={grain.opacity} /> : null}
    </>
  );
}

const rect = (x0: number, y0: number, x1: number, y1: number): Point[] => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1]
];

export function Desk2DIllustration({ className }: { className?: string }) {
  const config = useDesk2DStore((s) => s.config);
  const top = getFinish(config.topId);
  const base = getFinish(config.baseId);
  const hardware = getHardware(config.hardwareId);

  const { dx, dy } = DEPTH;
  const { left, right, topY, topThickness, floorY, panelInset, panelThickness, pedestalWidth } = DESK;

  const underY = topY + topThickness;
  const panelL = left + panelInset;
  const panelR = panelL + panelThickness;
  const pedR = right - panelInset;
  const pedL = pedR - pedestalWidth;
  const pedCenterX = (pedL + pedR) / 2;

  const drawerInset = 4;
  const boxDrawer = rect(pedL + drawerInset, underY + drawerInset, pedR - drawerInset, underY + 42);
  const fileDrawer = rect(pedL + drawerInset, underY + 46, pedR - drawerInset, floorY - drawerInset);
  const drawerWidth = pedestalWidth - drawerInset * 2;
  const pullWidth = Math.min(hardwareWidth(hardware), drawerWidth - 14);
  const drawerEdge = shadeHex(base.hex, -42);

  const grommet = { x: left + 0.28 * (right - left) + 0.55 * dx, y: topY + 0.55 * dy };

  const mirror = config.pedestalSide === "left";

  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-label={`Desk preview: ${top.name} top, ${base.name} base, ${hardware.name} hardware, pedestal on the ${config.pedestalSide}`}
    >
      <FinishDefs />
      <g transform={mirror ? `translate(${VIEW.width} 0) scale(-1 1)` : undefined}>
        <polygon
          points={toPoints([
            [panelL - 6, floorY + 3],
            [pedR + 6, floorY + 3],
            [pedR + dx + 6, floorY + dy + 3],
            [panelL + dx - 6, floorY + dy + 3]
          ])}
          fill="#000"
          opacity={0.16}
          filter="url(#floor-shadow)"
        />

        <Face
          points={[
            [panelR + dx, underY + dy],
            [pedL + dx, underY + dy],
            [pedL + dx, floorY + dy],
            [panelR + dx, floorY + dy]
          ]}
          finish={base}
          shade={-40}
        />
        <Face
          points={[
            [panelR, underY],
            [panelR + dx, underY + dy],
            [panelR + dx, floorY + dy],
            [panelR, floorY]
          ]}
          finish={base}
          shade={-18}
        />
        <Face points={rect(panelL, underY, panelR, floorY)} finish={base} />

        <Face
          points={[
            [pedR, underY],
            [pedR + dx, underY + dy],
            [pedR + dx, floorY + dy],
            [pedR, floorY]
          ]}
          finish={base}
          shade={-28}
        />
        <Face points={rect(pedL, underY, pedR, floorY)} finish={base} stroke={drawerEdge} />
        <Face points={boxDrawer} finish={base} shade={3} stroke={drawerEdge} />
        <Face points={fileDrawer} finish={base} shade={3} stroke={drawerEdge} />

        <g transform={`translate(${pedCenterX} ${(boxDrawer[0][1] + boxDrawer[2][1]) / 2})`}>
          <HardwareGlyph hardware={hardware} width={pullWidth} />
        </g>
        <g transform={`translate(${pedCenterX} ${fileDrawer[0][1] + 17})`}>
          <HardwareGlyph hardware={hardware} width={pullWidth} />
        </g>

        <Face
          points={[
            [left, topY],
            [right, topY],
            [right + dx, topY + dy],
            [left + dx, topY + dy]
          ]}
          finish={top}
          shade={8}
        />
        <Face points={rect(left, topY, right, underY)} finish={top} shade={-10} />
        <Face
          points={[
            [right, topY],
            [right + dx, topY + dy],
            [right + dx, topY + dy + topThickness],
            [right, underY]
          ]}
          finish={top}
          shade={-28}
        />
        <ellipse cx={grommet.x} cy={grommet.y} rx={9} ry={4.2} fill="#131315" stroke="#3a3a3f" strokeWidth={0.8} />
      </g>
    </svg>
  );
}
