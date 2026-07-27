import { Link } from 'react-router-dom';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { TextField } from '../../components/TextField/TextField';
import './LoginPage.css';

export function LoginPage() {
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
      <form className="login-page__form">
        <TextField id="email" label="Email address" type="email" autoComplete="email" />
        <TextField id="password" label="Password" type="password" autoComplete="current-password" />
        <label className="login-page__remember">
          <input type="checkbox" defaultChecked /> Remember me
        </label>
        <PrimaryButton type="submit">Register Account</PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
