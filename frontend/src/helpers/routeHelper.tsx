import Profile from "../components/features/profile/Profile";
import Login from "../components/features/login/Login";
import Register from "../components/features/login/Register";
import PublicLandingPage from "../components/features/PublicLandingPage/PublicLandingPage.tsx";
import Logout from "../components/features/logout/Logout";
import TenantEntities from "../components/features/backend/tenantEntities/TenantEntities.tsx";
/**
 * All frontend routes are defined here in a flat list, keyed by route id.
 */
const routeDefinitions: any = [
    // Public routes.
    {
        id: "home",
        path: "/",
        element: <PublicLandingPage />,
        public: true,
    },
    {
        id: "login",
        path: "/login",
        element: <Login />,
        public: true,
    },
    {
        id: "register",
        path: "/register",
        element: <Register />,
        public: true,
    },
    {
        id: "logout",
        path: "/logout",
        element: <Logout />,
        public: true,
    },

    // Protected routes.
    {
        id: "tenantEntities",
        path: "/tenant-entities",
        element: <TenantEntities />,
    },
    {
        id: "history",
        path: "/history",
        element: <div>History</div>,
    },
    {
        id: "profile",
        path: "/profile",
        element: <Profile />,
    },
    {
        id: "adminTasks.people",
        path: "/admin/people",
        element: <div>Admin Tasks: People</div>,
    },
    {
        id: "adminTasks.eventTypes",
        path: "/admin/event-types",
        element: <div>Event Types</div>,
    },
    {
        id: "adminTasks.locations",
        path: "/admin/locations",
        element: <div>Locations</div>,
    },
    {
        id: "adminTasks.roles",
        path: "/admin/roles",
        element: <div>Roles</div>,
    },
];

// Convert the definitions to an object with react routes keyed by id.
const routes: any = (() => {
    const routes: any = {};
    routeDefinitions.forEach((routeDefinition: any) => {
        const { id, path, element } = routeDefinition;
        if (!(id && path && element)) {
            return;
        }
        
        routes[id] = { path, element };        
    })
    return routes;
})();

// Put the react routes in an array as well (for convenience).
const routesArray = Object.keys(routes).map((key) => routes[key]);

function isProtectedLocation(location: any) {
    if (!location) {
        return null;
    }
    const routesFound = routesArray.filter((routeInfo: any) => routeInfo.path === location.pathname);
    return routesFound.length > 0;
}

function getRoutePathFromRouteId(routeId: string) {
    if (!routes[routeId]) {
        return;
    }
    return routes[routeId].path;
}

function getElementFromRouteId(routeId: string) {
    if (!routes[routeId]) {
        return;
    }
    return routes[routeId].element;
}

export {
    getRoutePathFromRouteId,
    getElementFromRouteId,
    isProtectedLocation,
}