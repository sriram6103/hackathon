import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StockFormData } from '../../types/stock';

interface StockFormProps {
  onSubmit: (data: StockFormData) => void;
  loading: boolean;
}

export function StockForm({ onSubmit, loading }: StockFormProps) {
  const [formData, setFormData] = React.useState<StockFormData>({
    ticker1: '',
    ticker2: '',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Stock Ticker</label>
          <input
            type="text"
            value={formData.ticker1}
            onChange={e => setFormData(prev => ({ ...prev, ticker1: e.target.value.toUpperCase() }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., AAPL"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Second Stock Ticker</label>
          <input
            type="text"
            value={formData.ticker2}
            onChange={e => setFormData(prev => ({ ...prev, ticker2: e.target.value.toUpperCase() }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., MSFT"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={formData.startDate}
            onChange={date => setFormData(prev => ({ ...prev, startDate: date || new Date() }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxDate={formData.endDate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={formData.endDate}
            onChange={date => setFormData(prev => ({ ...prev, endDate: date || new Date() }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            minDate={formData.startDate}
            maxDate={new Date()}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Correlation'}
        </button>
      </div>
    </form>
  );
}