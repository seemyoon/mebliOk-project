import React, { FC, useState } from 'react';
import { ISignInUserData } from '../../../interfaces/ISignInUserData';
import { useForm } from 'react-hook-form';
import { authService } from '../../../services/auth.service';
import { AxiosError } from 'axios';
import { generateDeviceId } from '../../../helpers/generateDeviceId';
import { useNavigate } from 'react-router-dom';
import styles from '../FormComponent.module.css';

const SignInFormComponent: FC = () => {
  const navigate = useNavigate();
  
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignInUserData>({
    defaultValues: {
      email: 'testuser@gmail.com',
      password: '123qweQWE',
    },
  });
  
  const onSubmit = async (data: ISignInUserData) => {
    setStatusMessage(null);
    const deviceId = generateDeviceId();
    const fullData = { ...data, deviceId };
    try {
      await authService.signIn(fullData);
      setStatusMessage('User sign-in successfully');
      
      setTimeout(() => {
        navigate('/');
      }, 700);
      
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError?.response?.status === 401) {
        setStatusMessage('email or phone is faulty');
      } else {
        setStatusMessage('An error occurred, please try again later');
      }
    }
  };
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Sign In</h2>
        <input
          type="text"
          {...register('email', { required: 'email is required' })}
          placeholder="Email"
        />
        <input
          type="text"
          {...register('password')}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
      
      {statusMessage && (
        <div
          className={statusMessage ? styles.errorMessage : styles.successMessage}>
          {statusMessage}
        </div>
      )}
      
      {errors.email && (
        <p className={styles.errorText}>{errors.email.message}</p>
      )}
    </div>
  );
};

export default SignInFormComponent;