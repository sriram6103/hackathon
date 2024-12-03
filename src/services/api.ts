import axios from 'axios';
import { StockData } from '../types/stock';

const API_KEY = 'demo'; // Replace with your Alpha Vantage API key

export async function fetchStockData(ticker: string): Promise<StockData[]> {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`
  );

  const timeSeries = response.data['Time Series (Daily)'];
  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    close: parseFloat(values['4. close'])
  }));
}