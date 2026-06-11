interface CalcInputs {
  [key: string]: number;
}

type CalcFn = (inputs: CalcInputs) => Record<string, string>;

const calculators: Record<string, CalcFn> = {};

function register(name: string, fn: CalcFn) {
  calculators[name] = fn;
}

function getWastage(container: HTMLElement): number {
  const checked = container.querySelector<HTMLInputElement>('input[name="wastage"]:checked');
  if (!checked) return 0;
  if (checked.value === "custom") {
    const custom = container.querySelector<HTMLInputElement>("#wastage-custom");
    return custom ? parseFloat(custom.value) || 0 : 0;
  }
  return parseFloat(checked.value);
}

function setupCalculator(element: HTMLElement) {
  const calcName = element.dataset.calculator;
  if (!calcName || !calculators[calcName]) return;

  const btn = element.querySelector<HTMLButtonElement>("[data-calc-btn]");
  const resultsContainer = element.querySelector<HTMLElement>("#results-container");

  if (!btn || !resultsContainer) return;

  function calculate() {
    const inputs: CalcInputs = {};
    element.querySelectorAll<HTMLInputElement>("input[type='number']").forEach((input) => {
      if (input.id !== "wastage-custom" && input.value) {
        inputs[input.id] = parseFloat(input.value) || 0;
      }
    });
    inputs.wastage = getWastage(element);

    const displayValues = calculators[calcName](inputs);

    Object.entries(displayValues).forEach(([key, value]) => {
      const el = element.querySelector<HTMLElement>(`#${key}`);
      if (el) {
        el.innerHTML = value;
      }
    });

    resultsContainer.classList.remove("hidden");
  }

  btn.addEventListener("click", calculate);

  element.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") calculate();
    });
  });
}

function toMM(value: number, unit: string): number {
  switch (unit) {
    case "mm": return value;
    case "cm": return value * 10;
    case "m": return value * 1000;
    case "in": return value * 25.4;
    case "ft": return value * 304.8;
    case "yd": return value * 914.4;
    default: return value;
  }
}

function fromMM(mm: number, unit: string): number {
  switch (unit) {
    case "mm": return mm;
    case "cm": return mm / 10;
    case "m": return mm / 1000;
    case "in": return mm / 25.4;
    case "ft": return mm / 304.8;
    case "yd": return mm / 914.4;
    default: return mm;
  }
}

function fmt(n: number, d: number = 2): string {
  return Number(n.toFixed(d)).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: d,
  });
}

register("concrete", (inputs) => {
  const l = inputs.length || 0;
  const w = inputs.width || 0;
  const d = inputs.depth || 0;
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  const lMm = toMM(l, u);
  const wMm = toMM(w, u);
  const dMm = toMM(d, u);
  let volumeM3 = (lMm * wMm * dMm) / 1e9;
  volumeM3 *= (1 + wastage / 100);
  const volumeFt3 = volumeM3 / 0.0283168;
  const volumeYd3 = volumeM3 / 0.764555;
  const weightKg = volumeM3 * 2400;
  const weightLbs = weightKg * 2.20462;
  const bags = Math.ceil(weightKg / 50);
  return { volumeM3: `${fmt(volumeM3)} m³`, volumeFt3: `${fmt(volumeFt3)} ft³`, volumeYd3: `${fmt(volumeYd3, 3)} yd³`, weightKg: `${fmt(weightKg)} kg`, weightLbs: `${fmt(weightLbs)} lbs`, bagsRequired: `${bags} bags (50 kg)` };
});

register("slab", (inputs) => {
  const l = inputs.length || 0;
  const w = inputs.width || 0;
  const t = inputs.thickness || 0;
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  const lMm = toMM(l, u);
  const wMm = toMM(w, u);
  const tMm = toMM(t, u);
  let volumeM3 = (lMm * wMm * tMm) / 1e9;
  volumeM3 *= (1 + wastage / 100);
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  const waterL = cementKg * 0.5;
  const cementBags = Math.ceil(cementKg / 50);
  return { volumeM3: `${fmt(volumeM3)} m³`, volumeFt3: `${fmt(volumeM3 / 0.0283168)} ft³`, volumeYd3: `${fmt(volumeM3 / 0.764555, 3)} yd³`, cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, waterLiters: `${fmt(waterL)} L`, cementBags: `${cementBags} bags (50 kg)` };
});

register("footing", (inputs) => {
  const typeEl = document.querySelector('input[name="footing-type"]:checked') as HTMLInputElement;
  const type = typeEl?.value || "continuous";
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  const count = inputs.count || 1;
  let volumeM3 = 0;
  if (type === "continuous") {
    const l = inputs.length || 0;
    const w = inputs.width || 0;
    const d = inputs.depth || 0;
    volumeM3 = (toMM(l, u) * toMM(w, u) * toMM(d, u)) / 1e9;
  } else if (type === "square") {
    const s = inputs.side || 0;
    const d = inputs.depth || 0;
    volumeM3 = (toMM(s, u) * toMM(s, u) * toMM(d, u)) / 1e9 * count;
  } else if (type === "circular") {
    const d = inputs.diameter || 0;
    const dep = inputs.depth || 0;
    const r = toMM(d, u) / 2;
    volumeM3 = (Math.PI * r * r * toMM(dep, u)) / 1e9 * count;
  }
  volumeM3 *= (1 + wastage / 100);
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  const cementBags = Math.ceil(cementKg / 50);
  return { volumeM3: `${fmt(volumeM3)} m³`, cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, cementBags: `${cementBags} bags` };
});

register("column", (inputs) => {
  const typeEl = document.querySelector('input[name="column-type"]:checked') as HTMLInputElement;
  const type = typeEl?.value || "square";
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  const count = inputs.count || 1;
  let volumeM3 = 0;
  const h = inputs.height || 0;
  const hMm = toMM(h, u);
  if (type === "square") {
    const s = inputs.side || 0;
    volumeM3 = (toMM(s, u) * toMM(s, u) * hMm) / 1e9;
  } else {
    const d = inputs.diameter || 0;
    const r = toMM(d, u) / 2;
    volumeM3 = (Math.PI * r * r * hMm) / 1e9;
  }
  volumeM3 *= count * (1 + wastage / 100);
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  const cementBags = Math.ceil(cementKg / 50);
  return { volumeM3: `${fmt(volumeM3)} m³`, cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, cementBags: `${cementBags} bags` };
});

register("wall", (inputs) => {
  const l = inputs.length || 0;
  const h = inputs.height || 0;
  const t = inputs.thickness || 0;
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  let volumeM3 = (toMM(l, u) * toMM(h, u) * toMM(t, u)) / 1e9;
  volumeM3 *= (1 + wastage / 100);
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  const cementBags = Math.ceil(cementKg / 50);
  return { volumeM3: `${fmt(volumeM3)} m³`, cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, cementBags: `${cementBags} bags` };
});

register("stairs", (inputs) => {
  const totalRise = inputs.totalRise || 0;
  const treadDepth = inputs.treadDepth || 0;
  const riserHeight = inputs.riserHeight || 0;
  const stairWidth = inputs.stairWidth || 0;
  const u = inputs.unit || "ft";
  const wastage = inputs.wastage || 0;
  const totalRiseMm = toMM(totalRise, u);
  const treadMm = toMM(treadDepth, u);
  const riserMm = toMM(riserHeight, u);
  const widthMm = toMM(stairWidth, u);
  const steps = Math.round(totalRiseMm / riserMm);
  const actualRiser = totalRiseMm / steps;
  const waistMm = Math.max(100, riserMm * 0.4);
  const stepVol = (treadMm * actualRiser / 2 + treadMm * waistMm) * widthMm;
  const totalVol = stepVol * steps + (treadMm * 1.5) * widthMm * waistMm;
  let volumeM3 = totalVol / 1e9;
  volumeM3 *= (1 + wastage / 100);
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  const cementBags = Math.ceil(cementKg / 50);
  return { numberOfSteps: `${steps} steps`, volumeM3: `${fmt(volumeM3)} m³`, cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, cementBags: `${cementBags} bags` };
});

register("cement", (inputs) => {
  const volumeM3 = inputs.volumeM3 || 0;
  const dryVol = volumeM3 * 1.54;
  const cementKg = (1 / 5.5) * dryVol * 1440;
  const cementBags = Math.ceil(cementKg / 50);
  const sandKg = (1.5 / 5.5) * dryVol * 1600;
  const aggregateKg = (3 / 5.5) * dryVol * 1500;
  return { cementKg: `${fmt(cementKg)} kg`, cementBags: `${cementBags} bags (50 kg)`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg` };
});

register("mix-design", (inputs) => {
  const volumeM3 = inputs.volumeM3 || 0;
  const gradeEl = document.querySelector('input[name="mix-grade"]:checked') as HTMLInputElement;
  const grade = gradeEl?.value || "M20";
  const ratios: Record<string, { c: number; s: number; a: number }> = { M10: { c: 1, s: 3, a: 6 }, M15: { c: 1, s: 2, a: 4 }, M20: { c: 1, s: 1.5, a: 3 }, M25: { c: 1, s: 1, a: 2 }, M30: { c: 1, s: 0.75, a: 1.5 } };
  let r: { c: number; s: number; a: number };
  let wcRatio = 0.5;
  if (grade === "custom") {
    r = { c: inputs.customCement || 1, s: inputs.customSand || 1, a: inputs.customAggregate || 1 };
    wcRatio = inputs.waterCementRatio || 0.5;
  } else {
    r = ratios[grade] || ratios.M20;
    const wcMap: Record<string, number> = { M10: 0.6, M15: 0.55, M20: 0.5, M25: 0.45, M30: 0.4 };
    wcRatio = wcMap[grade] || 0.5;
  }
  const total = r.c + r.s + r.a;
  const dryVol = volumeM3 * 1.54;
  const cementKg = (r.c / total) * dryVol * 1440;
  const sandKg = (r.s / total) * dryVol * 1600;
  const aggregateKg = (r.a / total) * dryVol * 1500;
  const waterL = cementKg * wcRatio;
  const cementBags = Math.ceil(cementKg / 50);
  return { cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, waterLiters: `${fmt(waterL)} L`, cementBags: `${cementBags} bags (50 kg)`, mixRatio: `${r.c}:${r.s}:${r.a}` };
});

register("material", (inputs) => {
  const volumeM3 = inputs.volumeM3 || 0;
  const ratioEl = document.querySelector('input[name="material-ratio"]:checked') as HTMLInputElement;
  const ratio = ratioEl?.value || "1:1.5:3";
  const ratioMap: Record<string, { c: number; s: number; a: number }> = { "1:1.5:3": { c: 1, s: 1.5, a: 3 }, "1:2:4": { c: 1, s: 2, a: 4 }, "1:3:6": { c: 1, s: 3, a: 6 }, "1:1:2": { c: 1, s: 1, a: 2 }, "1:0.75:1.5": { c: 1, s: 0.75, a: 1.5 } };
  const r = ratioMap[ratio] || ratioMap["1:1.5:3"];
  const total = r.c + r.s + r.a;
  const dryVol = volumeM3 * 1.54;
  const cementKg = (r.c / total) * dryVol * 1440;
  const sandKg = (r.s / total) * dryVol * 1600;
  const aggregateKg = (r.a / total) * dryVol * 1500;
  const cementBags = Math.ceil(cementKg / 50);
  return { cementKg: `${fmt(cementKg)} kg`, sandKg: `${fmt(sandKg)} kg`, aggregateKg: `${fmt(aggregateKg)} kg`, cementBags: `${cementBags} bags` };
});

register("converter", (inputs) => {
  const value = inputs.convertValue || 0;
  const fromUnit = (document.querySelector<HTMLSelectElement>("#from-unit"))?.value || "m";
  const toUnit = (document.querySelector<HTMLSelectElement>("#to-unit"))?.value || "ft";
  const mm = toMM(value, fromUnit);
  const result = fromMM(mm, toUnit);
  return { convertedResult: `${fmt(result, 4)} ${toUnit}` };
});

function init() {
  document.querySelectorAll("[data-calculator]").forEach((el) => {
    setupCalculator(el as HTMLElement);
  });
  document.querySelectorAll('input[type="radio"]').forEach((el) => {
    el.addEventListener("change", () => {
      const container = el.closest("[data-calculator]") as HTMLElement;
      if (!container) return;
    });
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
