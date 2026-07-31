import { useEffect, useState } from 'react';
import { Feed } from '../../components/Feed/Feed';
import { getGlobalFeed } from '../../services/feedService';
import type { Post } from '../../types/post';

export function GlobalFeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    void getGlobalFeed().then(setPosts);
  }, []);

  return <Feed posts={posts} />;
}
