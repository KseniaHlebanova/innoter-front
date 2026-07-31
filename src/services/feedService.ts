import { globalFeedPosts, subscriptionFeedPosts } from '../features/feed/data/mockPosts';
import type { Post } from '../types/post';

export async function getGlobalFeed(): Promise<Post[]> {
  return globalFeedPosts;
}

export async function getSubscriptionsFeed(): Promise<Post[]> {
  return subscriptionFeedPosts;
}
