import { Link } from 'react-router-dom';
import { AuthFormCard } from '../../components/AuthFormCard/AuthFormCard';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { PhoneField } from '../../components/PhoneField/PhoneField';
import { TextField } from '../../components/TextField/TextField';
import './SignupPage.css';

export function SignupPage() {
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
      <form className="signup-page__form">
        <TextField id="full-name" label="Full Name" type="text" autoComplete="name" />
        <TextField id="email" label="Email address" type="email" autoComplete="email" />
        <PhoneField id="phone" label="Phone number" />
        <TextField id="username" label="Username" type="text" autoComplete="username" />
        <PrimaryButton type="submit">Continue</PrimaryButton>
      </form>
    </AuthFormCard>
  );
}
