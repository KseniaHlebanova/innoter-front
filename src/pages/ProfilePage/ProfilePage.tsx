import { Avatar } from '../../components/Avatar/Avatar';
import { mockCurrentUser } from '../../features/feed/data/mockCurrentUser';
import './ProfilePage.css';

export function ProfilePage() {
  return (
    <section className="profile-page">
      <header className="profile-page__header">
        <Avatar
          src={mockCurrentUser.avatarUrl}
          alt={`${mockCurrentUser.displayName} avatar`}
          size="lg"
        />
        <div>
          <h1 className="profile-page__name">{mockCurrentUser.displayName}</h1>
          <p className="profile-page__username">@{mockCurrentUser.username}</p>
        </div>
      </header>
      <p className="profile-page__placeholder">Profile details will appear here.</p>
    </section>
  );
}
