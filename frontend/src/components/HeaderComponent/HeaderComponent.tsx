import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">Головна</Link>
        <Link className={styles.link} to="/catalog">Каталоги</Link>
        <Link className={styles.link} to="/shipping-info">Доставка</Link>
        <Link className={styles.link} to="/auth/sign-up">Зареєструватися</Link>
        <Link className={styles.link} to="/auth/sign-in">Війти</Link>
        <Link className={styles.link} to="/about-us">Про нас</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;