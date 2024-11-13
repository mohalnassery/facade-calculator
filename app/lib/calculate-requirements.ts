import { SizeRule, AccessoryRequirement } from '../types';
import { sizeRules } from './size-rules';

export function calculateRequirements(width: number, height: number): AccessoryRequirement[] {
  const maxDimension = Math.max(width, height);
  const requirements: AccessoryRequirement[] = [];
  
  // Find applicable size rule
  const rule = sizeRules.find(
    rule => maxDimension >= rule.minDimension && maxDimension <= rule.maxDimension
  );
  
  if (!rule) {
    throw new Error('Window size exceeds maximum supported dimensions');
  }
  
  // Base requirements (always needed)
  requirements.push(
    {
      accessoryId: 'hinge',
      quantity: 2,
      description: 'Standard hinges',
    },
    {
      accessoryId: 'handle',
      quantity: 1,
      description: 'Standard handle',
    },
    {
      accessoryId: 'lock',
      quantity: 1,
      description: 'Standard lock mechanism',
    }
  );
  
  // Add size-specific requirements
  requirements.push(...rule.additionalSupports);
  
  return requirements;
}