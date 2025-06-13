import styles from '../ProfilePage/ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Персональний кабінет</h2>
      
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.profileCard}>
            <img
              src="/avatar/avatar.png"
              alt="John Anderson"
              className={styles.avatar}
            />
            <h3 className={styles.name}>John Anderson</h3>
            <span className={styles.role}>Manager</span>
            
            <div className={styles.contactInfo}>
              <div>📧 john.anderson@example.com</div>
              <div>📞 +1 (555) 123-4567</div>
            </div>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.section}>
            <h2>Редагувати профіль</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Ім'я</label>
                <input type="text" />
              </div>
              <div className={styles.inputGroup}>
                <label>Прізвище</label>
                <input type="text" />
              </div>
              <div className={styles.inputGroup}>
                <label>Ел. пошта</label>
                <input type="email" />
              </div>
              <div className={styles.inputGroup}>
                <label>Телефон</label>
                <input type="tel" />
              </div>
            </div>
            <button className={styles.saveButton}>Зберігти зміни</button>
          </div>
          
          <div className={styles.section}>
            <h2>Управління сайтом</h2>
            <div className={styles.managementGrid}>
              <div className={styles.managementItem}>👥 Керування користувачами</div>
              <div className={styles.managementItem}>⚙️ Налаштування сайту</div>
              <div className={styles.managementItem}>✏️ Редагувати вміст</div>
              <div className={styles.managementItem}>📊 Аналітика</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
