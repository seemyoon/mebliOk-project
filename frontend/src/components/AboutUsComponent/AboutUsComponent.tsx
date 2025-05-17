import styles from './AboutUsComponent.module.css';

const AboutUsComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
      <div className={styles.text}>
        <h2>Про нас</h2>
        <p>
          «Мебліок» — це сучасна платформа з продажу меблів, яка з'явилась у 2024 році
          з метою зробити якісні, стильні та доступні меблі ближчими до кожного.
        </p>
        <p>
          Наш підхід — це інновації, увага до деталей та турбота про кожного клієнта.
        </p>
        <div className={styles.stats}>
          <div>
            <strong>500+</strong>
            <span>замовлень</span>
          </div>
          <div>
            <strong>250+</strong>
            <span>клієнтів</span>
          </div>
        </div>
      </div>
      <div className={styles.image}>
        <img src="/aboutUs/yellow_sofa.jpg" alt="Меблі в інтер'єрі" />
      </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
