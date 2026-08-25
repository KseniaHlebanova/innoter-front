import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { TextField } from '../../components/TextField/TextField';
import './ForgotPasswordPage.css';

interface ForgotPasswordFormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
});

export function ForgotPasswordPage() {
  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        // TODO: replace with real API call to UMS:
        console.info('submitting', values);
      } catch (err) {
        setFieldError('email', 'Something went wrong, please try again');
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthFormCard title="Input your email to change password" description="">
      <form className="forgot-pass-page__form" onSubmit={formik.handleSubmit} noValidate>
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
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
