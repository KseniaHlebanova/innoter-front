import { useEffect, useState } from 'react';
import { Feed } from '../../components/Feed/Feed';
import { getSubscriptionsFeed } from '../../services/feedService';
import type { Post } from '../../types/post';

export function SubscriptionsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    void getSubscriptionsFeed().then(setPosts);
  }, []);

  return <Feed posts={posts} />;
}
