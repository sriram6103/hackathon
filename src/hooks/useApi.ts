import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiResponse } from '../types/api';

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T[]>(url);
        setData(response.data);
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}