export type UnitSystem = "metric" | "imperial";
export type LengthUnit = "mm" | "cm" | "m" | "in" | "ft" | "yd";
export type Region = "india" | "usa" | "uk" | "canada" | "australia";

export interface Measurement {
  value: number;
  unit: LengthUnit;
}

export interface RegionConfig {
  system: UnitSystem;
  defaultUnit: LengthUnit;
  bagSize: number;
  bagUnit: "kg" | "lbs";
  label: string;
}

export const REGION_CONFIGS: Record<Region, RegionConfig> = {
  india: { system: "metric", defaultUnit: "m", bagSize: 50, bagUnit: "kg", label: "India" },
  usa: { system: "imperial", defaultUnit: "ft", bagSize: 60, bagUnit: "lbs", label: "USA" },
  uk: { system: "metric", defaultUnit: "m", bagSize: 25, bagUnit: "kg", label: "UK" },
  canada: { system: "imperial", defaultUnit: "ft", bagSize: 30, bagUnit: "kg", label: "Canada" },
  australia: { system: "metric", defaultUnit: "m", bagSize: 20, bagUnit: "kg", label: "Australia" },
};

const CONVERSION_TO_MM: Record<LengthUnit, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  in: 25.4,
  ft: 304.8,
  yd: 914.4,
};

export function toMillimeters(value: number, unit: LengthUnit): number {
  return value * CONVERSION_TO_MM[unit];
}

export function fromMillimeters(mm: number, unit: LengthUnit): number {
  return mm / CONVERSION_TO_MM[unit];
}

export function normalizeMeasurement(m: Measurement, targetUnit: LengthUnit): number {
  const mm = toMillimeters(m.value, m.unit);
  return fromMillimeters(mm, targetUnit);
}

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  const mm = toMillimeters(value, from);
  return fromMillimeters(mm, to);
}

export type VolumeUnit = "m3" | "ft3" | "yd3" | "L";
export type WeightUnit = "kg" | "tonne" | "lbs" | "ton";

export function volumeToM3(value: number, unit: VolumeUnit): number {
  switch (unit) {
    case "m3": return value;
    case "ft3": return value * 0.0283168;
    case "yd3": return value * 0.764555;
    case "L": return value * 0.001;
  }
}

export function volumeFromM3(m3: number, unit: VolumeUnit): number {
  switch (unit) {
    case "m3": return m3;
    case "ft3": return m3 / 0.0283168;
    case "yd3": return m3 / 0.764555;
    case "L": return m3 / 0.001;
  }
}

export function displayValue(value: number, decimals: number = 2): string {
  return Number(value.toFixed(decimals)).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
