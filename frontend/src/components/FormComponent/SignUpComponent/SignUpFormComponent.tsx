import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISignUpUserData } from '../../../interfaces/ISignUpUserData';
import { authService } from '../../../services/auth.service';
import styles from './SignUpFormComponent.module.css';
import { AxiosError } from 'axios';

const SignUpFormComponent = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignUpUserData>({
    defaultValues: {
      email: 'testuser@gmail.com',
      phoneNumber: '+380631353945',
      password: '123qweQWE',
      name: 'John Doe',
    },
  });
  
  const onSubmit = async (data: ISignUpUserData) => {
    setStatusMessage(null);
    try {
      await authService.signUp(data);
      setStatusMessage('User created successfully');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 400) {
        setStatusMessage('Error: User with this email or phone number already exists');
      } else {
        setStatusMessage('An error occurred, please try again later');
      }
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Sign Up</h2>
        <input
          type="text"
          {...register('email')}
          placeholder="Email"
        />
        <input
          type="text"
          {...register('name')}
          placeholder="Full Name"
        />
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
        />
        <input
          type="text"
          {...register('phoneNumber')}
          placeholder="Phone Number"
        />
        <button type="submit">Sign Up</button>
      </form>
      
      {statusMessage && (
        <div
          className={statusMessage.includes('Error') ? styles.errorMessage : styles.successMessage}>
          {statusMessage}
        </div>
      )}
      
      {errors.email && (
        <p className={styles.errorText}>{errors.email.message}</p>
      )}
    </div>
  );
};

export default SignUpFormComponent;
