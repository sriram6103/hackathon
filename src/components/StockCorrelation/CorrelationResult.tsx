import React from 'react';
import { CorrelationResult as CorrelationResultType } from '../../types/stock';

interface CorrelationResultProps {
  result: CorrelationResultType;
}

export function CorrelationResult({ result }: CorrelationResultProps) {
  const correlationPercentage = (result.correlation * 100).toFixed(2);
  const correlationStrength = getCorrelationStrength(result.correlation);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Correlation Analysis Results</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Stock Pair</p>
          <p className="text-lg font-medium">{result.ticker1} / {result.ticker2}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date Range</p>
          <p className="text-lg font-medium">{result.startDate} to {result.endDate}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Correlation Coefficient</p>
          <p className="text-2xl font-bold text-indigo-600">{correlationPercentage}%</p>
          <p className="text-sm text-gray-600 mt-1">
            These stocks show a <span className="font-medium">{correlationStrength}</span> correlation
          </p>
        </div>
      </div>
    </div>
  );
}

function getCorrelationStrength(correlation: number): string {
  const abs = Math.abs(correlation);
  if (abs >= 0.7) return 'strong';
  if (abs >= 0.3) return 'moderate';
  return 'weak';
}