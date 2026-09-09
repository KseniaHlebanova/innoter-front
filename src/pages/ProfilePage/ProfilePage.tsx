import { Avatar } from '../../components/Avatar/Avatar';
import { useAppSelector } from '../../store/hooks';
import { useLoadCurrentUser } from '../../app/AuthBootstrap';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import './ProfilePage.css';

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const profileStatus = useAppSelector((state) => state.auth.profileStatus);
  const profileError = useAppSelector((state) => state.auth.profileError);

  const loadCurrentUser = useLoadCurrentUser();

  if (!user) {
    if (profileStatus === 'failed') {
      return (
        <section className="profile-page">
          <p>{profileError ?? 'Could not load your profile.'}</p>
          <PrimaryButton style={{ width: '200px' }} onClick={loadCurrentUser}>
            Try again
          </PrimaryButton>
        </section>
      );
    }

    return (
      <section className="profile-page">
        <p className="profile-page__placeholder">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <header className="profile-page__header">
        <Avatar src={user.avatarUrl} alt={`${user.displayName} avatar`} size="lg" />
        <div>
          <h1 className="profile-page__name">{user.displayName}</h1>
          <p className="profile-page__username">@{user.username}</p>
        </div>
      </header>
      <p className="profile-page__placeholder">Profile details will appear here.</p>
    </section>
  );
}
