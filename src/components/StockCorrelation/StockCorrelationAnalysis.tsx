import React from 'react';
import { StockForm } from './StockForm';
import { CorrelationResult } from './CorrelationResult';
import { useStockData } from '../../hooks/useStockData';
import { StockFormData } from '../../types/stock';

export function StockCorrelationAnalysis() {
  const { fetchCorrelation, loading, error, result } = useStockData();

  const handleSubmit = (formData: StockFormData) => {
    fetchCorrelation(
      formData.ticker1,
      formData.ticker2,
      formData.startDate,
      formData.endDate
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Stock Correlation Calculator</h2>
        <StockForm onSubmit={handleSubmit} loading={loading} />
        
        {error && (
          <div className="mt-4 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {result && <CorrelationResult result={result} />}
      </div>
    </div>
  );
}