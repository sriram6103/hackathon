import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StockData } from '../../types/stock';

interface CorrelationChartProps {
  data1: StockData[];
  data2: StockData[];
  ticker1: string;
  ticker2: string;
}

export function CorrelationChart({ data1, data2, ticker1, ticker2 }: CorrelationChartProps) {
  const chartData = data1.map((d1, index) => ({
    [ticker1]: d1.close,
    [ticker2]: data2[index]?.close
  })).filter(d => d[ticker1] && d[ticker2]);

  return (
    <div className="h-64 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey={ticker1} name={ticker1} />
          <YAxis type="number" dataKey={ticker2} name={ticker2} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={chartData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}