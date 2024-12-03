export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

export interface ApiResponse<T> {
  data: T[];
  error?: string;
  loading: boolean;
}