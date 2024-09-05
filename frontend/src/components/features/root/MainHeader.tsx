import styles from './MainHeader.module.scss';
import TopNavigation from './TopNavigation';

function MainHeader() {
  return (
      <div className={styles.mainHeader}>
          <TopNavigation />
          <div className={styles.headMast}>Serve</div>
      </div>
  );
}

export default MainHeader