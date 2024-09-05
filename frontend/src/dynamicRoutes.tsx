import { useRecoilValue } from "recoil";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { permissionsMapState } from "./globalState/atoms.js"; // Adjust path as necessary
import Root from "./components/features/root/Root";
import ErrorPage from "./components/errorPage/ErrorPage";
import PublicLandingPage from "./components/features/PublicLandingPage/PublicLandingPage.tsx";
import Login from "./components/features/login/Login";
import Register from "./components/features/login/Register";
import { getRoutePathFromRouteId, getElementFromRouteId } from "./helpers/routeHelper.tsx";

function DynamicRoutes() {
    const permissionsMap = useRecoilValue(permissionsMapState);
    
    let rootRoute: any = {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            // These default routes are always present.
            {
                // Redirect to /home when visiting the root.
                path: "/",
                element: <Navigate to="home" replace />,
            },
            {
                path: "/home",
                element: <PublicLandingPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    };

    /**
     * Returns the frontend routes based on permissionsMap,  starting with the children of the root route.
     */
    function getRoutesFromPermissionsMapSlice(permissionsMapSlice: any, depth: number = 0) {
        if (!permissionsMapSlice) {
            return [];
        }

        const itemsKeys = Object.keys(permissionsMapSlice).filter(key => key.substring(0, 1) !== "_");
        
        const routes = itemsKeys.map((itemKey) => {
            const route: any = {};
            const permissionsMapItem = permissionsMapSlice[itemKey];
            const routeId = permissionsMapItem._routeId;

            if (routeId) {
                route.path = getRoutePathFromRouteId(routeId);
                route.element = getElementFromRouteId(routeId);
            }

            const hasChildItems = Object.keys(permissionsMapItem).filter((key) => key.substring(0, 1) !== "_");
            if (hasChildItems.length > 0) {
                route.children = getRoutesFromPermissionsMapSlice(permissionsMapItem, depth + 1);
            }

            return route;
        });

        return routes;
    }

    /**
     * Returns the frontend routes.
     * If the session is logged in, build them dynamically from the permissions map.
     * If the session is not logged in, return static routes.
     */    
    function getRoutes(permissionsMap: any) {
        let routes = { ...rootRoute };

        if (Object.keys(permissionsMap).length) {
            routes.children.push(...getRoutesFromPermissionsMapSlice(permissionsMap));
        }

        return routes;
    }

    const routes = getRoutes(permissionsMap);
    const router = createBrowserRouter([routes]);
    return <RouterProvider router={router} />;
}

export default DynamicRoutes
