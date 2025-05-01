import styles from './FooterComponent.module.css';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.section}>
          <Link to="/">
            <img src="/mebliok-icon.jpg" alt="MebliOK Logo"
                 className={styles.icon} /></Link>
          <p className={styles.description}>
            Якісні меблі для дому вашої мрії.
          </p>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Меню</h3>
          <nav className={styles.links}>
            <Link className={styles.link} to="/catalog">Каталоги</Link>
            <Link className={styles.link} to="/promotions">Акції</Link>
            <Link className={styles.link} to="/shipping-info">Доставка</Link>
            <Link className={styles.link} to="/faq">FAQ</Link>
          </nav>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Контакти</h3>
          <div className={styles.contacts}>
            <a href="tel:+1234667890" className={styles.link}>+1 234 667 890</a>
            <a href="tel:+0987654321" className={styles.link}>+0 987 654 321</a>
            <a href="mailto:mebliok@gmail.com"
               className={styles.link}>mebliok@gmail.com</a>
          </div>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Слідкуйте за нами</h3>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/mebliok/"
               className={styles.socialLink}>
              <img className={styles.controlIcon} src="/footer/inst.svg"
                   alt="lang logo" />
            </a>
            
            <a href="https://www.facebook.com/mebliok/"
               className={styles.socialLink}>
              <img className={styles.controlIcon} src="/footer/facebook.svg"
                   alt="lang logo" />
            </a>
          </div>
        </div>
      
      </div>
    </footer>
  );
};

export default FooterComponent;