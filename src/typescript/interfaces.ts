export interface User {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  status?: string;
}

export interface Meta {
  success: boolean;
  code: number;
  message: string;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
  rateLimit?: { limit: number; remaining: number; reset: number };
}

export interface UserState {
  users: User[];
  selectedUser: User | {};
  lastMeta: Meta | null;
  isFetching: boolean;
  error: Error | null;
}
