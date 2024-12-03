import { useState } from 'react';
import axios from 'axios';
import { StockData, CorrelationResult } from '../types/stock';
import { calculateCorrelation } from '../utils/stockCalculations';
import { format } from 'date-fns';

const API_KEY = 'demo'; // Replace with your Alpha Vantage API key

export function useStockData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CorrelationResult | null>(null);

  const fetchCorrelation = async (
    ticker1: string,
    ticker2: string,
    startDate: Date,
    endDate: Date
  ) => {
    setLoading(true);
    setError(null);

    try {
      const [data1, data2] = await Promise.all([
        fetchStockData(ticker1),
        fetchStockData(ticker2)
      ]);

      const filteredData1 = filterDataByDateRange(data1, startDate, endDate);
      const filteredData2 = filterDataByDateRange(data2, startDate, endDate);

      const correlation = calculateCorrelation(filteredData1, filteredData2);

      setResult({
        ticker1,
        ticker2,
        correlation,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd')
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  return { fetchCorrelation, loading, error, result };
}

async function fetchStockData(ticker: string): Promise<StockData[]> {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`
  );

  const timeSeries = response.data['Time Series (Daily)'];
  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    close: parseFloat(values['4. close'])
  }));
}

function filterDataByDateRange(
  data: StockData[],
  startDate: Date,
  endDate: Date
): StockData[] {
  return data.filter(item => {
    const date = new Date(item.date);
    return date >= startDate && date <= endDate;
  });
}