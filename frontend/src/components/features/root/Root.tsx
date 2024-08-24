import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainNavigation from "./MainNavigation";
import ErrorDisplay from './ErrorDisplay.tsx';

import styles from './Root.module.scss'

function Root() {
    return (
        <div id="rootContainer" className={styles.rootContainer}>
            <div id="rootHeader" className={styles.rootHeader}>
                <MainHeader />
                <MainNavigation />
            </div>
            <div id="rootOutlet" className={styles.rootOutlet}>
                <ErrorDisplay />
                <Outlet />
            </div>
        </div>
    );
}

export default Root;


