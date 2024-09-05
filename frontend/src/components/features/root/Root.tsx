import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainSidebar from "./MainSidebar.tsx";
import FlashMessageDisplay from './FlashMessageDisplay.tsx';
import NavigationListener from "../../navigationListener/NavigationListener.tsx";
import { useRecoilValue } from "recoil";
import { permissionsMapState } from "../../../globalState/atoms";

import styles from './Root.module.scss'

function Root() {
    const permissionMap = useRecoilValue(permissionsMapState);

    // Navigation listener is a wrapper that will run code to verify the session when the location changes.

    return (
        <NavigationListener>
            <div id="rootContainer" className={styles.rootContainer}>
                <div className={styles.rootHeader}>
                    <MainHeader />
                </div>

                <div className={styles.rootMain}>
                    {Object.keys(permissionMap).length > 0 && (
                        <div className={styles.rootMainSidebar}>
                            <MainSidebar />
                        </div>
                    )}

                    <div className={styles.rootMainOutlet}>
                        <FlashMessageDisplay />
                        <Outlet />
                    </div>
                </div>
            </div>
        </NavigationListener>
    );
}

export default Root;


