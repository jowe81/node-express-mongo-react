import { Link } from "react-router-dom";
import styles from './MainNavigation.module.scss';

function MainNavigation() {
    return (
        <nav className={styles.mainNavigation}>
            <ul>
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={`/error-invalid-route`}>Error</Link>
                </li>
                <li>
                    <Link to={`/profile`}>Profile</Link>
                </li>
                <li>
                    <Link to={`login`}>Login</Link>
                </li>
                <li>
                    <Link to={`register`}>Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default MainNavigation;
