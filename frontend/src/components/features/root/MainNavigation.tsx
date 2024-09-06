import { getNavUl, TypeNavOptions } from "../../../helpers/navigationHelper";
import styles from './MainNavigation.module.scss';

function MainNavigation() {

    const options: TypeNavOptions = {
        styles,
    };

    return (
        <div className={styles.mainNavigationWrapper}>
            <nav className={styles.mainNavigation}>
                <ul>{getNavUl(options)}</ul>
            </nav>
        </div>
    );
}

export default MainNavigation;
