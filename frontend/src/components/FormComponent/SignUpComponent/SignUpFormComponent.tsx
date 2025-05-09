import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISignUpUserData } from '../../../interfaces/ISignUpUserData';
import { authService } from '../../../services/auth.service';
import styles from '../FormComponent.module.css';
import { AxiosError } from 'axios';
import { generateDeviceId } from '../../../helpers/generateDeviceId';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';

const SignUpFormComponent: FC = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<ISignUpUserData>({
    defaultValues: {
      email: 'testuser@gmail.com',
      phoneNumber: '380631353945',
      password: '123qweQWE',
      name: 'John Doe',
    },
  });
  
  const onSubmit = async (data: ISignUpUserData) => {
    setStatusMessage(null);
    const deviceId = generateDeviceId();
    const fullData = { ...data, deviceId };
    try {
      await authService.signUp(fullData);
      
      setStatusMessage('User created successfully');
      
      setTimeout(() => {
        navigate('/');
      }, 700);
      
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
        <PhoneInput
          country={'ua'}
          value={watch('phoneNumber')}
          onChange={(phone) => setValue('phoneNumber', phone)}
          placeholder="phoneNumber"
          specialLabel=""
          inputProps={{
            name: 'phoneNumber',
            required: true,
          }}
        />
        <button type="submit">Sign Up</button>
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

export default SignUpFormComponent;
