import styles from './GetInTouchComponent.module.css';
import GetInTouchFormComponent
  from '../FormComponent/GetInTouchFormComponent/GetInTouchFormComponent';


const GetInTouchComponent = () => {
  
  return (
    <div className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <h2 className={styles.contactTitle}>Зв'яжіться з нами</h2>
        <p className={styles.contactDescription}>Маєте запитання? Ми будемо раді
          вас почути.</p>
        
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <img src="/getInTouch/place.svg" alt="Address"
                 className={styles.contactIcon} />
            <span className={styles.contactText}>123 Innovation Street, Tech City, TC 12345</span>
          </div>
          
          <div className={styles.contactItem}>
            <img src="/getInTouch/phone.svg" alt="Phone"
                 className={styles.contactIcon} />
            <span className={styles.contactText}>+1 (555) 123-4567</span>
          </div>
          
          <div className={styles.contactItem}>
            <img src="/getInTouch/envelope.svg" alt="Email"
                 className={styles.contactIcon} />
            <span className={styles.contactText}>mebliok@gmail.com</span>
          </div>
        </div>
        
        
        <GetInTouchFormComponent />
      
      </div>
    </div>
  );
};

export default GetInTouchComponent;