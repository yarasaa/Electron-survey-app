export interface IResponse {
  status: number;
  success: boolean;
  message: { [key: string]: string } | null;
  errorCode?: string;
  data: { result?: any | null; token?: string; totalCount?: number } | null;
  errors?: { [key: string]: any } | null;
}

export interface IEnpoint {
  url: string;
  method: string;
}
export interface IRequestData {
  data?: any;
  query?: object;
  token?: string;
}
