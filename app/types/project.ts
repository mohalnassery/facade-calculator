export type ProjectStatus = 'DESIGN' | 'FABRICATION' | 'INSTALLATION' | 'COMPLETED';

export interface Project {
  id: string;
  name: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface FacadeSection {
  id: string;
  projectId: string;
  name: string;
  type: 'CURTAIN_WALL' | 'WINDOW_WALL' | 'STOREFRONT';
  area: number;
  status: ProjectStatus;
  progress: number;
}

export interface MaterialRequirement {
  id: string;
  sectionId: string;
  materialId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}