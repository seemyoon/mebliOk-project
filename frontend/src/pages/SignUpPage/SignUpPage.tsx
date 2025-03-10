import React from 'react';
import SignUpFormComponent
  from '../../components/FormComponent/SignUpComponent/SignUpFormComponent';
import styles from './SignUp.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.pageContainer}>
      <SignUpFormComponent/>
      </div>
  );
};

export default SignUpPage;