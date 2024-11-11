export interface FacadeConfig {
  facadeType: string;
  profileSeries: string;
  width: number;
  height: number;
  quantity: number;
  glassThickness: string;
  profitMargin: number;
}

export interface CostBreakdown {
  materials: number;
  labor: number;
  overhead: number;
  profit: number;
  total: number;
}

export interface ProfileData {
  id: string;
  series: string;
  name: string;
  pricePerMeter: number;
  compatibleGlass: string[];
}

export interface GlassData {
  thickness: string;
  pricePerSquareMeter: number;
}