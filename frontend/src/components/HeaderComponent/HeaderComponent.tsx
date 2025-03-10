import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/catalog">Catalog</Link>
        <Link className={styles.link} to="/shipping-info">Shipping Info</Link>
        <Link className={styles.link} to="/auth/sign-up">Sign Up</Link>
        <Link className={styles.link} to="/auth/sign-in">Sign In</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;