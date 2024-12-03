import React from 'react';
import { StockCorrelationAnalysis } from './components/StockCorrelation/StockCorrelationAnalysis';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Correlation Analysis</h1>
          <p className="mt-2 text-gray-600">Calculate correlation coefficients between any two stocks</p>
        </div>
        <StockCorrelationAnalysis />
      </div>
    </div>
  );
}

export default App;