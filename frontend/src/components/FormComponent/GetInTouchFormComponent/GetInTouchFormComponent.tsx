import { useForm } from 'react-hook-form';
import styles
  from '../GetInTouchFormComponent/GetInTouchFormComponent.module.css';
import { IGetInTouchForm } from '../../../interfaces/IGetInTouchForm';
import { FC } from 'react';

const GetInTouchFormComponent: FC = () => {
  const { register, handleSubmit } = useForm<IGetInTouchForm>();
  
  const onSubmit = async (data: IGetInTouchForm) => {
    console.log('form submitted:', data);
  };
  return (
    <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Ім'я</label>
        <input type="text" id="name" {...register('name')} placeholder="name"
               required />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Електронна пошта</label>
        <input type="email" id="email" {...register('email')}
               placeholder="email" required />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="message">Повідомлення</label>
        <textarea id="message" {...register('message')} placeholder="message"
                  required></textarea>
      </div>
      
      <button type="submit" className={styles.submitBtn}>Send Message</button>
    </form>
  );
};

export default GetInTouchFormComponent;