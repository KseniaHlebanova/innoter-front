import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { PhoneField } from '../../components/PhoneField/PhoneField';
import { TextField } from '../../components/TextField/TextField';
import { signupUser, loginUser } from '../../api/auth';
import { ApiError } from '../../api/httpClient';
import { saveTokens } from '../../api/tokenStorage';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/authSlice';
import type { SignupPayload } from '../../types/auth';
import './SignupPage.css';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]+$/;
const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;
const REMEMBER_ME_CHECKBOX_DEFAULT_VALUE = true;

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  phoneNumber: Yup.string()
    .trim()
    .min(7, 'Phone number must be at least 7 characters')
    .max(15, 'Phone number must be at most 15 characters')
    .matches(PHONE_REGEX, 'Enter a valid phone number')
    .notRequired(),
  username: Yup.string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .matches(
      USERNAME_REGEX,
      'Username must start with a letter and contain only letters, numbers, or underscores',
    )
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
});

export function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const signupPayload: SignupPayload = {
          name: values.firstName,
          surname: values.lastName,
          username: values.username,
          password: values.password,
          email: values.email,
          ...(values.phoneNumber ? { phone_number: values.phoneNumber } : {}),
        };

        await signupUser(signupPayload);

        try {
          const tokens = await loginUser({
            email: values.email,
            password: values.password,
          });
          saveTokens(tokens, REMEMBER_ME_CHECKBOX_DEFAULT_VALUE);
          dispatch(setAuthenticated(true));
          navigate('/');
        } catch (loginErr) {
          //TODO Sentry log add
          console.error('Auto-login after signup failed', loginErr);
          navigate('/login', { state: { message: 'Account created, please log in.' } });
        }
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 409) {
            setStatus('An account with this email already exists.');
          } else {
            setStatus(err.message);
          }
        } else {
          //TODO Sentry log add
          console.error('Unexpected error during signup', err);
          setStatus('Something went wrong, please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthFormCard
      title="Account Signup"
      description="Become a member and enjoy exclusive promotions."
      footer={
        <p className="signup-page__login">
          Already have an account ? <Link to="/login">Login here</Link>
        </p>
      }
    >
      <form className="signup-page__form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          id="first-name"
          name="firstName"
          label="First Name"
          type="text"
          autoComplete="given-name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName ? formik.errors.firstName : undefined}
        />
        <TextField
          id="last-name"
          name="lastName"
          label="Last Name"
          type="text"
          autoComplete="family-name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName ? formik.errors.lastName : undefined}
        />
        <TextField
          id="email"
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <PhoneField
          id="phone"
          label="Phone number"
          value={formik.values.phoneNumber}
          onAccept={(value) => formik.setFieldValue('phoneNumber', value)}
          onBlur={() => formik.setFieldTouched('phoneNumber', true)}
          error={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
        />
        <TextField
          id="username"
          name="username"
          label="Username"
          type="text"
          autoComplete="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username ? formik.errors.username : undefined}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Continue'}
        </PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
