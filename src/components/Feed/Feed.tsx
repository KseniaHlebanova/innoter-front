import type { Post } from '../../types/post';
import { PostCard } from '../PostCard/PostCard';
import './Feed.css';

interface FeedProps {
  posts: Post[];
}

export function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <section className="feed feed--empty" aria-label="Feed">
        <p className="feed__empty-message">No posts yet.</p>
      </section>
    );
  }

  return (
    <section className="feed" aria-label="Feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
