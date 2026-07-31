import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import type { Post } from '../../types/post';
import './PostCard.css';

interface PostCardProps {
  post: Post;
}

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  }
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

export function PostCard({ post }: PostCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <article className="post-card">
      <Avatar src={post.author.avatarUrl} alt={`${post.author.displayName} avatar`} size="md" />
      <div className="post-card__body">
        <div className="post-card__header">
          <div className="post-card__meta">
            <span className="post-card__name">{post.author.displayName}</span>
            <span className="post-card__username">@{post.author.username}</span>
            <span className="post-card__dot" aria-hidden="true">
              ·
            </span>
            <time className="post-card__time" dateTime={post.createdAt}>
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>
          <button
            type="button"
            className={`post-card__menu${isCollapsed ? ' post-card__menu--collapsed' : ''}`}
            aria-label={isCollapsed ? 'Show full post' : 'Hide post'}
            aria-expanded={!isCollapsed}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            ⌄
          </button>
        </div>

        <p className={`post-card__text${isCollapsed ? ' post-card__text--collapsed' : ''}`}>
          {post.content}
        </p>

        {post.imageUrl && !isCollapsed && (
          <img className="post-card__image" src={post.imageUrl} alt="" loading="lazy" />
        )}

        {!isCollapsed && (
          <div className="post-card__actions">
            <button
              type="button"
              className="post-card__action-btn post-card__action-btn--like"
              aria-label="Like post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="post-card__like-icon"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="post-card__like-count">{post.likes > 0 ? post.likes : ''}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
