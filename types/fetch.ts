export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
export interface IFetch<I> {
  endpoint: string;
  method: string;
  body?: I;
  tags?: string[];
  param?: string;
}
