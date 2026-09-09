import type { MockUser } from './user';

export interface Post {
  id: string;
  author: MockUser;
  likes: number;
  content: string;
  createdAt: string;
  imageUrl?: string;
}
