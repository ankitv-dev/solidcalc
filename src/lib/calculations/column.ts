import type { LengthUnit } from "../units/conversion";
import { toMillimeters } from "../units/conversion";
import { calculateMaterials } from "./slab";

export type ColumnType = "square" | "circular";

export interface ColumnInput {
  type: ColumnType;
  side: number;
  diameter: number;
  height: number;
  count: number;
  unit: LengthUnit;
  wastage: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export function calculateColumn(input: ColumnInput) {
  let volumeM3 = 0;
  const hMm = toMillimeters(input.height, input.unit);

  if (input.type === "square") {
    const sMm = toMillimeters(input.side, input.unit);
    volumeM3 = (sMm * sMm * hMm) / 1e9;
  } else {
    const dMm = toMillimeters(input.diameter, input.unit);
    const radius = dMm / 2;
    volumeM3 = (Math.PI * radius * radius * hMm) / 1e9;
  }

  volumeM3 *= input.count;
  const wastageFactor = 1 + input.wastage / 100;
  volumeM3 *= wastageFactor;

  const materials = calculateMaterials(volumeM3);

  return {
    volumeM3,
    materials,
    display: {
      volumeM3: volumeM3.toFixed(2),
      ...materials.display,
    },
  };
}
