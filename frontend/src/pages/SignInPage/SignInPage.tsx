import SignInFormComponent
  from '../../components/FormComponent/SignInFormComponent/SignInFormComponent';
import styles from './SignIn.module.css';

const SignInPage = () => {
  return (
    <div className={styles.pageContainer}>
      <SignInFormComponent />
    </div>
  );
};

export default SignInPage;