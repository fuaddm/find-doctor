import { createContext } from 'react-router';

export type AuthUser = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const authContext = createContext<AuthUser | null>(null);
