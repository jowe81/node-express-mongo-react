import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainNavigation from "./MainNavigation";
import FlashMessageDisplay from './FlashMessageDisplay.tsx';

import styles from './Root.module.scss'

function Root() {
    return (
        <div id="rootContainer" className={styles.rootContainer}>
            <div id="rootHeader" className={styles.rootHeader}>
                <MainHeader />
                <MainNavigation />
            </div>
            <div id="rootOutlet" className={styles.rootOutlet}>
                <FlashMessageDisplay />
                <Outlet />
            </div>
        </div>
    );
}

export default Root;


