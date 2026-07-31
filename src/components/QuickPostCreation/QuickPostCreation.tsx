import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import { mockCurrentUser } from '../../features/feed/data/mockCurrentUser';
import './QuickPostCreation.css';
import mediaIcon from '../../assets/icons/icons8-image-96.png';

export function QuickPostCreation() {
  return (
    <section className="quick-post-creation" aria-label="Create a quick post">
      <Avatar
        src={mockCurrentUser.avatarUrl}
        alt={`${mockCurrentUser.displayName} avatar`}
        size="lg"
      />
      <div className="quick-post-creation__content">
        <Link className="quick-post-creation__input" to="/posts/new">
          What&apos;s happening
        </Link>
        <div className="quick-post-creation__actions">
          <button
            type="button"
            className="quick-post-creation__media-button"
            aria-label="Add media"
          >
            <img src={mediaIcon} alt="" aria-hidden="true" />
          </button>
          <div className="quick-post-creation__submit-group">
            <div className="quick-post-creation__progress" aria-hidden="true">
              <svg viewBox="0 0 36 36">
                <circle className="quick-post-creation__progress-track" cx="18" cy="18" r="16" />
                <circle className="quick-post-creation__progress-value" cx="18" cy="18" r="16" />
              </svg>
            </div>
            <button
              type="button"
              className="quick-post-creation__add-button"
              aria-label="Add poll or emoji"
            >
              +
            </button>
            <Link className="quick-post-creation__post-button" to="/posts/new">
              Post
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
