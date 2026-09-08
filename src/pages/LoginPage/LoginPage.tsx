import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { TextField } from '../../components/TextField/TextField';
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
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        // TODO: replace with real API call to UMS:
        console.log('submitting', values);
      } catch (err) {
        setFieldError('password', 'Invalid email or password');
        console.log(err);
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
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
