export interface Project {
  id: string;
  name: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface WindowSize {
  id: string;
  name: string;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  requiredSupports: AccessoryRequirement[];
}

export interface AccessoryRequirement {
  accessoryId: string;
  quantity: number;
  description: string;
}

export interface Accessory {
  id: string;
  name: string;
  type: 'HINGE' | 'SUPPORT' | 'LOCK' | 'HANDLE' | 'GASKET';
  unitPrice: number;
  description: string;
}

export interface SizeRule {
  id: string;
  minDimension: number;
  maxDimension: number;
  additionalSupports: AccessoryRequirement[];
}