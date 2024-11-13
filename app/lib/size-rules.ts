import { SizeRule, AccessoryRequirement } from '../types';

// Define support requirements based on window dimensions
export const sizeRules: SizeRule[] = [
  {
    id: 'small',
    minDimension: 0,
    maxDimension: 1000, // mm
    additionalSupports: [],
  },
  {
    id: 'medium',
    minDimension: 1001,
    maxDimension: 1500,
    additionalSupports: [
      {
        accessoryId: 'support-bracket',
        quantity: 2,
        description: 'Additional support brackets required for medium-sized windows',
      },
    ],
  },
  {
    id: 'large',
    minDimension: 1501,
    maxDimension: 2000,
    additionalSupports: [
      {
        accessoryId: 'support-bracket',
        quantity: 4,
        description: 'Heavy-duty support brackets required for large windows',
      },
      {
        accessoryId: 'reinforcement-bar',
        quantity: 2,
        description: 'Horizontal reinforcement bars for structural integrity',
      },
    ],
  },
  {
    id: 'extra-large',
    minDimension: 2001,
    maxDimension: 3000,
    additionalSupports: [
      {
        accessoryId: 'support-bracket',
        quantity: 6,
        description: 'Maximum support configuration for extra-large windows',
      },
      {
        accessoryId: 'reinforcement-bar',
        quantity: 4,
        description: 'Full reinforcement configuration required',
      },
      {
        accessoryId: 'corner-brace',
        quantity: 4,
        description: 'Corner braces for additional stability',
      },
    ],
  },
];