export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
