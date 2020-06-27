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
  _links?: { avatar: { href: string }; edit: { href: string }; self: { href: string } };
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

export interface CommonData {
  lastMeta: Meta | null;
  isFetching: boolean;
  error: Error | null | string;
}

export interface UserState extends CommonData {
  users: User[];
  selectedUser: User | null;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  _links: {
    self: { href: string };
    edit: { href: string };
  };
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
  _links: {
    self: { href: string };
    edit: { href: string };
  };
}

export interface PostState extends CommonData {
  posts: Post[];
  firstFetch: boolean;
}

export interface CommentState {
  posts: {
    [postId: number]: {
      comments?: Comment[];
      isFetching?: boolean;
      lastMeta?: Meta | null;
      error: Error | null | string;
      initialized: boolean;
    };
  };
}
