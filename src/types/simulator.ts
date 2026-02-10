export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface SimulatorData {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export interface AdditionalCoverage {
  id: string;
  name: string;
  value: number;
}

export interface SimulatorState {
  vehicleValue: number;
  clientAge: number;
  selectedAdditionalCoverages: string[];
  selectedPlanName: string | null;
}
