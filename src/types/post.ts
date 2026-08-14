import type { User } from './user';

export interface Post {
  id: string;
  author: User;
  likes: number;
  content: string;
  createdAt: string;
  imageUrl?: string;
}
