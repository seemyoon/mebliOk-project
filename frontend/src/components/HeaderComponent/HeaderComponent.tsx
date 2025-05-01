import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';
import SearchComponent from '../SearchComponent/SearchComponent';

const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src="/mebliok-icon.jpg" alt="MebliOK Logo"
               className={styles.icon} /></Link>
        
        <div className={styles.navGroup}>
          <Link className={styles.link} to="/catalog">Каталоги</Link>
          <Link className={styles.link} to="/promotions">Акції</Link>
          <Link className={styles.link} to="/shipping-info">Доставка</Link>
          <Link className={styles.link} to="/faq">FAQ</Link>
        </div>
        
        <div className={styles.searchWrapper}>
          <SearchComponent />
        </div>
        
        <div className={styles.controlsGroup}>
          <button className={styles.controlButton}>
            <img className={styles.controlIcon} src="/header/theme.svg"
                 alt="theme logo" />
          </button>
          
          <button className={styles.controlButton}>
            <img className={styles.controlIcon} src="/header/lang.svg"
                 alt="lang logo" />
          </button>
          
          <Link to="/wishlist" className={styles.controlButton}>
            <img className={styles.controlIcon} src="/header/favourite.svg"
                 alt="favourite logo" />
          </Link>
          
          <Link to="/cart" className={styles.controlButton}>
            <img className={styles.controlIcon} src="/header/bucket.svg"
                 alt="bucket logo" />
          </Link>
          
          <Link to="/profile" className={styles.controlButton}>
            <img className={styles.avatar} src="/header/account.svg"
                 alt="profile logo" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;