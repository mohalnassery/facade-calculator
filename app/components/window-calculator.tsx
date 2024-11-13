'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { calculateRequirements } from '../lib/calculate-requirements';
import { AccessoryRequirement } from '../types';
import { AlertCircle } from 'lucide-react';

export default function WindowCalculator() {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [requirements, setRequirements] = useState<AccessoryRequirement[]>([]);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');
      const reqs = calculateRequirements(width, height);
      setRequirements(reqs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRequirements([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Window Requirements Calculator</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Width (mm)</label>
            <Input
              type="number"
              min="0"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Height (mm)</label>
            <Input
              type="number"
              min="0"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <Button 
          onClick={handleCalculate}
          className="w-full mb-6"
          disabled={!width || !height}
        >
          Calculate Requirements
        </Button>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {requirements.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Required Components</h3>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{req.description}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Qty: {req.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Component ID: {req.accessoryId}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}