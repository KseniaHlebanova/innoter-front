import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { TextField } from '../../components/TextField/TextField';
import './ForgotPasswordPage.css';

export function ForgotPasswordPage() {
  return (
    <AuthFormCard title="Input your email to change password" description="">
      <form className="forgot-pass-page__form">
        <TextField id="email" label="Email address" type="email" autoComplete="email" />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
