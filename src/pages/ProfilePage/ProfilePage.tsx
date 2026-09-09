import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar } from '../../components/Avatar/Avatar';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { useLoadCurrentUser } from '../../app/AuthBootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser } from '../../store/authSlice';
import { updateCurrentUser } from '../../api/user';
import { getAvatarUploadUrl, uploadAvatarToS3 } from '../../api/avatar';
import { mapUserApiProfileToUser } from '../../api/mappers/userMapper';
import { parseApiValidationError } from '../../validation/parseApiValidationError';
import {
  emailSchema,
  phoneSchema,
  requiredTextSchema,
  usernameSchema,
} from '../../validation/fieldSchemas';
import { IMaskInput } from 'react-imask';
import type { ComponentType, InputHTMLAttributes } from 'react';
import type { ReactMaskProps } from 'react-imask';
import type { MaskedPatternOptions } from 'imask';
import { phoneMaskOptions } from '../../components/PhoneField/phoneMask';
import './ProfilePage.css';
import type { UserUpdatePayload } from '../../types/user';
import { ApiError } from '../../api/httpClient';
import { logClientError } from '../../lib/sentry';

type PatternMaskInputProps = MaskedPatternOptions &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Pick<ReactMaskProps<HTMLInputElement>, 'onAccept' | 'unmask'>;

const PatternMaskInput = IMaskInput as ComponentType<PatternMaskInputProps>;

const ALLOWED_AVATAR_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
}

interface AvatarSelection {
  file: File;
  previewUrl: string;
}

const validationSchema = Yup.object({
  firstName: requiredTextSchema('First name'),
  lastName: requiredTextSchema('Last name'),
  email: emailSchema,
  phoneNumber: phoneSchema,
  username: usernameSchema,
});

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
  const dispatch = useAppDispatch();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const [avatarSelection, setAvatarSelection] = useState<AvatarSelection | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const avatarPreviewUrlRef = useRef<string | null>(null);
  useEffect(() => {
    avatarPreviewUrlRef.current = avatarSelection?.previewUrl ?? null;
  }, [avatarSelection]);
  useEffect(() => {
    return () => {
      if (avatarPreviewUrlRef.current) {
        URL.revokeObjectURL(avatarPreviewUrlRef.current);
      }
    };
  }, []);

  const hasAvatarChange = avatarSelection !== null || uploadedImagePath !== null;
  const avatarUrl = useAppSelector((state) => state.auth.avatarUrl);
  function handleAvatarFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_AVATAR_EXTENSIONS.includes(extension)) {
      setAvatarError(`Unsupported file type. Allowed: ${ALLOWED_AVATAR_EXTENSIONS.join(', ')}`);
      return;
    }

    setAvatarError(null);
    setUploadedImagePath(null);
    setAvatarSelection((prev) => {
      if (prev) URL.revokeObjectURL(prev.previewUrl);
      return { file, previewUrl: URL.createObjectURL(file) };
    });
  }

  function handleCancelAvatar() {
    if (avatarSelection) URL.revokeObjectURL(avatarSelection.previewUrl);
    setAvatarSelection(null);
    setUploadedImagePath(null);
    setAvatarError(null);
  }

  const formik = useFormik<ProfileFormValues>({
    enableReinitialize: true,
    initialStatus: undefined as string | undefined,
    initialValues: {
      firstName: user?.name ?? '',
      lastName: user?.surname ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      username: user?.username ?? '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, setFieldError }) => {
      setStatus(undefined);
      setSavedMessage(null);
      setAvatarError(null);

      let imagePath: string | undefined = uploadedImagePath ?? undefined;

      if (avatarSelection && !uploadedImagePath) {
        setIsUploadingAvatar(true);
        try {
          const extension = avatarSelection.file.name.split('.').pop() ?? '';
          const { url, fields, generated_filename } = await getAvatarUploadUrl(extension);
          await uploadAvatarToS3(url, fields, avatarSelection.file);
          setUploadedImagePath(generated_filename);
          imagePath = generated_filename;
        } catch (err) {
          logClientError('Avatar upload failed', err, {
            source: 'ProfilePage',
            action: 'imageUpload',
          });
          setAvatarError('Failed to upload avatar. Please try again.');
          setIsUploadingAvatar(false);
          setSubmitting(false);
          return;
        }
        setIsUploadingAvatar(false);
      }

      try {
        const payload: UserUpdatePayload = {
          name: values.firstName,
          surname: values.lastName,
          username: values.username,
          email: values.email,
          ...(values.phoneNumber ? { phone_number: values.phoneNumber } : {}),
          ...(imagePath ? { image_s3_path: imagePath } : {}),
        };

        const updatedProfile = await updateCurrentUser(payload);
        dispatch(setUser(mapUserApiProfileToUser(updatedProfile)));
        setSavedMessage('Saved!');

        if (avatarSelection) URL.revokeObjectURL(avatarSelection.previewUrl);
        setAvatarSelection(null);
        setUploadedImagePath(null);
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 409) {
            setStatus('Email, phone number or username already exists! Please, try again.');
          } else {
            const { fieldErrors, generalMessage } = parseApiValidationError(err);

            for (const [field, message] of Object.entries(fieldErrors)) {
              setFieldError(field, message);
            }

            if (generalMessage) {
              setStatus(generalMessage);
            }
          }
        } else {
          logClientError('Unexpected error updating profile', err, {
            source: 'ProfilePage',
            action: 'updateProfile',
          });
          setStatus('Something went wrong, please try again.');
        }
      } finally {
        setSubmitting(false);
      }
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

  const isDirty = formik.dirty || hasAvatarChange;

  return (
    <section className="profile-page">
      <header className="profile-page__header">
        <div className="profile-page__avatar-wrap">
          <Avatar
            src={avatarSelection?.previewUrl ?? avatarUrl}
            alt={`${user.displayName} avatar`}
            size="lg"
          />
          <label className="profile-page__avatar-edit" aria-label="Change avatar">
            <EditIcon />
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="profile-page__avatar-input"
              onChange={handleAvatarFileChange}
              disabled={formik.isSubmitting || isUploadingAvatar}
            />
          </label>
          {hasAvatarChange && (
            <button
              type="button"
              className="profile-page__avatar-cancel"
              onClick={handleCancelAvatar}
              disabled={formik.isSubmitting || isUploadingAvatar}
            >
              Cancel
            </button>
          )}
        </div>
        <div>
          <h1 className="profile-page__name">{user.displayName || 'Your name'}</h1>
          <p className="profile-page__email">{user.email}</p>
        </div>
      </header>
      {avatarError && <p className="profile-page__error">{avatarError}</p>}
      <form className="profile-page__form" onSubmit={formik.handleSubmit} noValidate>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="firstName">
            First name
          </label>
          <div className="profile-page__field">
            <input
              id="firstName"
              name="firstName"
              className="profile-page__input"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="your first name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <span className="profile-page__error">{formik.errors.firstName}</span>
            )}
          </div>
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="lastName">
            Last name
          </label>
          <div className="profile-page__field">
            <input
              id="lastName"
              name="lastName"
              className="profile-page__input"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="your last name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <span className="profile-page__error">{formik.errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="email">
            Email account
          </label>
          <div className="profile-page__field">
            <input
              id="email"
              name="email"
              type="email"
              className="profile-page__input"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="yourname@gmail.com"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="profile-page__error">{formik.errors.email}</span>
            )}
          </div>
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="phoneNumber">
            Mobile number
          </label>
          <div className="profile-page__field">
            <PatternMaskInput
              id="phoneNumber"
              type="tel"
              className="profile-page__input"
              {...phoneMaskOptions}
              unmask={true}
              value={formik.values.phoneNumber.replace(/\D/g, '')}
              onAccept={(value) => formik.setFieldValue('phoneNumber', value ? `+${value}` : '')}
              onBlur={() => formik.setFieldTouched('phoneNumber', true)}
              placeholder="Add number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="profile-page__error">{formik.errors.phoneNumber}</span>
            )}
          </div>
        </div>
        <div className="profile-page__row">
          <label className="profile-page__label" htmlFor="username">
            Username
          </label>
          <div className="profile-page__field">
            <input
              id="username"
              name="username"
              className="profile-page__input"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="your_username67"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="profile-page__error">{formik.errors.username}</span>
            )}
          </div>
        </div>

        {formik.status && <p className="profile-page__general-error">{formik.status}</p>}
        {savedMessage && <p className="profile-page__saved-message">{savedMessage}</p>}

        <PrimaryButton
          type="submit"
          disabled={formik.isSubmitting || isUploadingAvatar || !isDirty}
        >
          {formik.isSubmitting || isUploadingAvatar ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
      </form>
    </section>
  );
}
