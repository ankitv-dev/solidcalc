export type Region = "india" | "usa" | "uk" | "canada" | "australia";

export interface Translation {
  region: Region;
  label: string;
  units: {
    length: string;
    volume: string;
    weight: string;
  };
  calculator: {
    inputs: Record<string, string>;
    outputs: Record<string, string>;
    buttons: Record<string, string>;
    labels: Record<string, string>;
  };
  misc: Record<string, string>;
}

export const translations: Record<Region, Translation> = {
  india: {
    region: "india",
    label: "India",
    units: { length: "meters", volume: "m³", weight: "kg" },
    calculator: {
      inputs: {
        length: "Length (m)",
        width: "Width (m)",
        depth: "Depth (mm)",
        thickness: "Thickness (mm)",
        height: "Height (m)",
        diameter: "Diameter (mm)",
        side: "Side (m)",
        wastage: "Wastage",
        count: "Number",
        totalRise: "Total Rise (m)",
        treadDepth: "Tread Depth (mm)",
        riserHeight: "Riser Height (mm)",
        stairWidth: "Stair Width (m)",
        volume: "Volume (m³)",
      },
      outputs: {
        volumeM3: "Volume (m³)",
        volumeFt3: "Volume (ft³)",
        volumeYd3: "Volume (yd³)",
        weightKg: "Weight (kg)",
        weightLbs: "Weight (lbs)",
        bagsRequired: "Bags Required",
        cementKg: "Cement (kg)",
        sandKg: "Sand (kg)",
        aggregateKg: "Aggregate (kg)",
        waterLiters: "Water (L)",
        cementBags: "Cement Bags",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        share: "Share",
        copy: "Copy Results",
      },
      labels: {
        results: "Results",
        materials: "Material Quantities",
        wastageLabel: "Wastage Allowance",
      },
    },
    misc: {
      bagUnit: "50 kg bags",
      concreteDensity: "2400 kg/m³",
    },
  },
  usa: {
    region: "usa",
    label: "USA",
    units: { length: "feet", volume: "ft³", weight: "lbs" },
    calculator: {
      inputs: {
        length: "Length (ft)",
        width: "Width (ft)",
        depth: "Depth (in)",
        thickness: "Thickness (in)",
        height: "Height (ft)",
        diameter: "Diameter (in)",
        side: "Side (ft)",
        wastage: "Wastage",
        count: "Count",
        totalRise: "Total Rise (ft)",
        treadDepth: "Tread Depth (in)",
        riserHeight: "Riser Height (in)",
        stairWidth: "Stair Width (ft)",
        volume: "Volume (ft³)",
      },
      outputs: {
        volumeM3: "Volume (m³)",
        volumeFt3: "Volume (ft³)",
        volumeYd3: "Volume (yd³)",
        weightKg: "Weight (kg)",
        weightLbs: "Weight (lbs)",
        bagsRequired: "Bags Required",
        cementKg: "Cement (kg)",
        sandKg: "Sand (kg)",
        aggregateKg: "Aggregate (kg)",
        waterLiters: "Water (L)",
        cementBags: "Cement Bags",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        share: "Share",
        copy: "Copy Results",
      },
      labels: {
        results: "Results",
        materials: "Material Quantities",
        wastageLabel: "Wastage Allowance",
      },
    },
    misc: {
      bagUnit: "60 lb bags",
      concreteDensity: "150 lb/ft³",
    },
  },
  uk: {
    region: "uk",
    label: "UK",
    units: { length: "meters", volume: "m³", weight: "kg" },
    calculator: {
      inputs: {
        length: "Length (m)",
        width: "Width (m)",
        depth: "Depth (mm)",
        thickness: "Thickness (mm)",
        height: "Height (m)",
        diameter: "Diameter (mm)",
        side: "Side (m)",
        wastage: "Wastage",
        count: "Number",
        totalRise: "Total Rise (m)",
        treadDepth: "Tread Depth (mm)",
        riserHeight: "Riser Height (mm)",
        stairWidth: "Stair Width (m)",
        volume: "Volume (m³)",
      },
      outputs: {
        volumeM3: "Volume (m³)",
        volumeFt3: "Volume (ft³)",
        volumeYd3: "Volume (yd³)",
        weightKg: "Weight (kg)",
        weightLbs: "Weight (lbs)",
        bagsRequired: "Bags Required",
        cementKg: "Cement (kg)",
        sandKg: "Sand (kg)",
        aggregateKg: "Aggregate (kg)",
        waterLiters: "Water (L)",
        cementBags: "Cement Bags",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        share: "Share",
        copy: "Copy Results",
      },
      labels: {
        results: "Results",
        materials: "Material Quantities",
        wastageLabel: "Wastage Allowance",
      },
    },
    misc: {
      bagUnit: "25 kg bags",
      concreteDensity: "2400 kg/m³",
    },
  },
  canada: {
    region: "canada",
    label: "Canada",
    units: { length: "feet", volume: "ft³", weight: "kg" },
    calculator: {
      inputs: {
        length: "Length (ft)",
        width: "Width (ft)",
        depth: "Depth (in)",
        thickness: "Thickness (in)",
        height: "Height (ft)",
        diameter: "Diameter (in)",
        side: "Side (ft)",
        wastage: "Wastage",
        count: "Count",
        totalRise: "Total Rise (ft)",
        treadDepth: "Tread Depth (in)",
        riserHeight: "Riser Height (in)",
        stairWidth: "Stair Width (ft)",
        volume: "Volume (ft³)",
      },
      outputs: {
        volumeM3: "Volume (m³)",
        volumeFt3: "Volume (ft³)",
        volumeYd3: "Volume (yd³)",
        weightKg: "Weight (kg)",
        weightLbs: "Weight (lbs)",
        bagsRequired: "Bags Required",
        cementKg: "Cement (kg)",
        sandKg: "Sand (kg)",
        aggregateKg: "Aggregate (kg)",
        waterLiters: "Water (L)",
        cementBags: "Cement Bags",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        share: "Share",
        copy: "Copy Results",
      },
      labels: {
        results: "Results",
        materials: "Material Quantities",
        wastageLabel: "Wastage Allowance",
      },
    },
    misc: {
      bagUnit: "30 kg bags",
      concreteDensity: "2400 kg/m³",
    },
  },
  australia: {
    region: "australia",
    label: "Australia",
    units: { length: "meters", volume: "m³", weight: "kg" },
    calculator: {
      inputs: {
        length: "Length (m)",
        width: "Width (m)",
        depth: "Depth (mm)",
        thickness: "Thickness (mm)",
        height: "Height (m)",
        diameter: "Diameter (mm)",
        side: "Side (m)",
        wastage: "Wastage",
        count: "Number",
        totalRise: "Total Rise (m)",
        treadDepth: "Tread Depth (mm)",
        riserHeight: "Riser Height (mm)",
        stairWidth: "Stair Width (m)",
        volume: "Volume (m³)",
      },
      outputs: {
        volumeM3: "Volume (m³)",
        volumeFt3: "Volume (ft³)",
        volumeYd3: "Volume (yd³)",
        weightKg: "Weight (kg)",
        weightLbs: "Weight (lbs)",
        bagsRequired: "Bags Required",
        cementKg: "Cement (kg)",
        sandKg: "Sand (kg)",
        aggregateKg: "Aggregate (kg)",
        waterLiters: "Water (L)",
        cementBags: "Cement Bags",
      },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        share: "Share",
        copy: "Copy Results",
      },
      labels: {
        results: "Results",
        materials: "Material Quantities",
        wastageLabel: "Wastage Allowance",
      },
    },
    misc: {
      bagUnit: "20 kg bags",
      concreteDensity: "2400 kg/m³",
    },
  },
};
