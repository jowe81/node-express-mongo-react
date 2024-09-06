import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { permissionsMapState } from "../../../globalState/atoms";
import { getNavUl, TypeNavOptions } from "../../../helpers/navigationHelper";
import styles from "./TopNavigation.module.scss";

function TopNavigation() {
    const permissionsMap = useRecoilValue(permissionsMapState);

    return (
        <div className={styles.topNavigationWrapper}>
            <nav className={styles.topNavigation}>
                <ul>{getNavUl({styles})}</ul>
            </nav>
        </div>
    );

    const publicNav = (
         <nav className={styles.topNavigation}>
            <ul>
                <li>
                    <Link to={`register`}>Register</Link>
                </li>
                <li>
                    <Link to={`login`}>Login</Link>
                </li>
            </ul>
        </nav>
    );

    return Object.keys(permissionsMap).length > 0 ? <></> : publicNav;
    
}

export default TopNavigation