import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainNavigation from "./MainNavigation";
import FlashMessageDisplay from './FlashMessageDisplay.tsx';
import NavigationListener from "../../navigationListener/NavigationListener.tsx";

import styles from './Root.module.scss'

function Root() {
    // Navigation listener is a wrapper that will run code to verify the session when the location changes.

    return (
        <NavigationListener>
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
        </NavigationListener>
    );
}

export default Root;


