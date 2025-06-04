import styles from './GetInTouchComponent.module.css';


const GetInTouchComponent = () => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <h2 className={styles.contactTitle}>Get in Touch</h2>
        <p className={styles.contactDescription}>Have a question or want to work
          together? We'd love to hear from you.</p>
        
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
            <span className={styles.contactText}>hello@uxflow.com</span>
          </div>
        </div>
        
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          
          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>
        
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/mebliok/" aria-label="Instagram">
            <img src="/footer/inst.svg" alt="Instagram"
                 className={styles.socialIcon} />
          </a>
          <a href="https://www.facebook.com/mebliok/" aria-label="Facebook">
            <img src="/footer/facebook.svg" alt="Facebook"
                 className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchComponent;