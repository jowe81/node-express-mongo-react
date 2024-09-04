import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { permissionsMapState } from "../../../globalState/atoms";
import { getRoutePathFromRouteId } from "../../../helpers/routeHelper";

import styles from './MainNavigation.module.scss';

function MainNavigation() {
    const [permissionsMap, setPermissionsMap] = useRecoilState(permissionsMapState); 

    function getLiElements(permissionsMap: any, depth: number = 0 ) {
        /**
         * - each item that doesn't start with _ becomes a <li>
         * - if the item has subitems that don't start with _, <ul> and recursive call
         */

        const itemsKeys =
            permissionsMap && Object.keys(permissionsMap).length
                ? Object.keys(permissionsMap).filter((key) => key.substring(0, 1) !== "_")
                : null;

        if (!itemsKeys) {
            // Session is not logged in.
            return [
                <li key={0}><Link to={`/`}>Home</Link></li>,
                <li key={1}><Link to={`login`}>Login</Link></li>,
                <li key={2}><Link to={`register`}>Register</Link></li>,
            ];
        }

        // Session is logged in.
        return [
            ...itemsKeys.map((itemKey: string, index: number) => {
                const permissionsMapItem = permissionsMap[itemKey];
                const hasChildItems = Object.keys(permissionsMapItem).filter((key) => key.substring(0, 1) !== "_").length > 0;
                const label = permissionsMapItem._navLabel ?? itemKey;
                return hasChildItems ? (
                    <li key={index}>
                        <Link to="#" className={depth > 0 ? styles.expandingLink : ''}>{label}</Link>
                        <ul>{...getLiElements(permissionsMapItem, depth + 1)}</ul>
                    </li>
                ) : (
                    <li key={index}>
                        <Link to={getRoutePathFromRouteId(permissionsMap[itemKey]._routeId)}>{label}</Link>
                    </li>
                );

            })
        ];
    }

    const liElements = getLiElements(permissionsMap);

    return (
        <nav className={styles.mainNavigation}>
            <ul>
                {liElements}
            </ul>
        </nav>
    );
}

export default MainNavigation;
