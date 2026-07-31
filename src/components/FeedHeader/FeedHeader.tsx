import './FeedHeader.css';

interface FeedHeaderProps {
  title: string;
}

export function FeedHeader({ title }: FeedHeaderProps) {
  return (
    <header className="feed-header">
      <h1 className="feed-header__title">{title}</h1>
    </header>
  );
}
