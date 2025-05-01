import styles from './SearchComponent.module.css';

const SearchComponent = () => {
  return (
    <div>
      <form className={styles.searchForm}>
        <input
          type="text"
          placeholder="Пошук товарів..."
          className={styles.input}
        ></input>
        <button type='submit' className={styles.button}>
          Пошук
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;