import { StockData } from '../types/stock';

export function calculateCorrelation(data1: StockData[], data2: StockData[]): number {
  const returns1 = calculateReturns(data1);
  const returns2 = calculateReturns(data2);
  
  const n = Math.min(returns1.length, returns2.length);
  if (n < 2) return 0;

  const mean1 = returns1.reduce((a, b) => a + b, 0) / n;
  const mean2 = returns2.reduce((a, b) => a + b, 0) / n;

  let sum = 0;
  let sum1Sq = 0;
  let sum2Sq = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = returns1[i] - mean1;
    const diff2 = returns2[i] - mean2;
    sum += diff1 * diff2;
    sum1Sq += diff1 * diff1;
    sum2Sq += diff2 * diff2;
  }

  if (sum1Sq === 0 || sum2Sq === 0) return 0;
  return sum / Math.sqrt(sum1Sq * sum2Sq);
}

function calculateReturns(data: StockData[]): number[] {
  const returns: number[] = [];
  for (let i = 1; i < data.length; i++) {
    const returnValue = (data[i].close - data[i - 1].close) / data[i - 1].close;
    returns.push(returnValue);
  }
  return returns;
}