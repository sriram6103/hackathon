export interface StockData {
  date: string;
  close: number;
}

export interface CorrelationResult {
  ticker1: string;
  ticker2: string;
  correlation: number;
  startDate: string;
  endDate: string;
}

export interface StockFormData {
  ticker1: string;
  ticker2: string;
  startDate: Date;
  endDate: Date;
}