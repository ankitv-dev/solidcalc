import type { LengthUnit } from "../units/conversion";
import { toMillimeters } from "../units/conversion";
import { calculateMaterials } from "./slab";

export interface WallInput {
  length: number;
  height: number;
  thickness: number;
  unit: LengthUnit;
  wastage: number;
  region: "india" | "usa" | "uk" | "canada" | "australia";
}

export function calculateWall(input: WallInput) {
  const lMm = toMillimeters(input.length, input.unit);
  const hMm = toMillimeters(input.height, input.unit);
  const tMm = toMillimeters(input.thickness, input.unit);

  let volumeM3 = (lMm * hMm * tMm) / 1e9;
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
