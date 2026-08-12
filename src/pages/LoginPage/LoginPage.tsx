import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { TextField } from '../../components/TextField/TextField';
import { loginUser } from '../../api/auth';
import { getCurrentUser } from '../../api/user';
import { mapUserApiProfileToUser } from '../../api/mappers/userMapper';
import { saveTokens } from '../../api/tokenStorage';
import { ApiError, NetworkError } from '../../api/httpClient';
import { logClientError } from '../../lib/sentry';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated, setUser } from '../../store/authSlice';
import './LoginPage.css';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number'),
  rememberMe: Yup.boolean(),
});

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        const tokens = await loginUser({
          email: values.email,
          password: values.password,
        });
        saveTokens(tokens, values.rememberMe);
        dispatch(setAuthenticated(true));

        const profile = await getCurrentUser();
        dispatch(setUser(mapUserApiProfileToUser(profile)));

        navigate('/');
      } catch (err) {
        if (err instanceof ApiError) {
          if (err.status === 401 || err.status === 403) {
            setStatus('Incorrect email or password.');
          } else if (err.status === 429) {
            setStatus('Too many attempts. Please wait a moment and try again.');
          } else {
            setStatus(err.message);
          }
        } else if (err instanceof NetworkError) {
          setStatus('Unable to reach the server. Check your connection and try again.');
        } else {
          logClientError('Unexpected error during login', err, { component: 'LoginPage' });
          setStatus('Something went wrong, please try again.');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthFormCard
      title="Account Login"
      description="If you are already a member you can login with your email address and password."
      footer={
        <>
          <p className="login-page__signup">
            Don&apos;t have an account ? <Link to="/signup">Sign up here</Link>
          </p>
          <Link className="login-page__forgot-password" to="/forgot-password">
            Forgot password?
          </Link>
        </>
      }
    >
      <form className="login-page__form" onSubmit={formik.handleSubmit} noValidate>
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
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <label className="login-page__remember">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          Remember me
        </label>
        {formik.status && <p className="login-page__general-error">{formik.status}</p>}
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
