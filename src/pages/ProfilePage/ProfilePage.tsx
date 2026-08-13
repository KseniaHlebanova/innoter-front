import { useFormik } from 'formik';
import { Avatar } from '../../components/Avatar/Avatar';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { useAppSelector } from '../../store/hooks';
import { useLoadCurrentUser } from '../../app/AuthBootstrap';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import './ProfilePage.css';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path
        d="M16.474 5.408a2.5 2.5 0 0 1 3.535 3.536L7.5 21.453 3 22.5l1.047-4.5L16.474 5.408Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const profileStatus = useAppSelector((state) => state.auth.profileStatus);
  const profileError = useAppSelector((state) => state.auth.profileError);

  const loadCurrentUser = useLoadCurrentUser();

  const formik = useFormik<ProfileFormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.name ?? '',
      lastName: user?.surname ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      username: user?.username ?? '',
    },
    onSubmit: (values) => {
      // TODO: подключить реальный запрос на обновление профиля
      console.log('submitting profile update', values);
    },
  });

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
        <div className="profile-page__avatar-wrap">
          <Avatar src={user.avatarUrl} alt={`${user.displayName} avatar`} size="lg" />
          <button type="button" className="profile-page__avatar-edit" aria-label="Change avatar">
            <EditIcon />
          </button>
        </div>
        <div>
          <h1 className="profile-page__name">{user.displayName || 'Your name'}</h1>
          <p className="profile-page__email">{user.email}</p>
        </div>
      </header>
      <form className="profile-page__form" onSubmit={formik.handleSubmit}>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            className="profile-page__input"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder="your first name"
          />
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            className="profile-page__input"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder="your last name"
          />
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="email">
            Email account
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="profile-page__input"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="yourname@gmail.com"
          />
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="phoneNumber">
            Mobile number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            className="profile-page__input"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            placeholder="Add number"
          />
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="profile-page__input"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="yourname@gmail.com"
          />
        </div>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </section>
  );
}
