import Profile from "../components/features/profile/Profile";
import Login from "../components/features/login/Login";
import Register from "../components/features/login/Register";
import Home from "../components/features/home/Home";

/**
 * All frontend routes are defined here in a flat list, keyed by route id.
 * The path can be defined here, it's not prescribed by the backend.
 */
const routes: any = {
    home: {
        path: "/",
        element: <Home />,
    },
    login: {
        path: "/login",
        element: <Login />,
    },
    logout: {
        path: "/logout",
        element: <div>Logout</div>,
    },
    tenantEntities: {
        path: "/tenants",
        element: <div>Tenant Entities</div>,
    },
    history: {
        path: "/history",
        element: <div>History</div>,
    },
    profile: {
        path: "/profile",
        element: <Profile />,
    },
    "adminTasks.people": {
        path: "/admin/people",
        element: <div>Admin Tasks: People</div>,
    },
    "adminTasks.eventTypes": {
        path: "/admin/event-types",
        element: <div>Event Types</div>,
    },
    "adminTasks.locations": {
        path: "/admin/locations",
        element: <div>Locations</div>,
    },
    "adminTasks.roles": {
        path: "/admin/roles",
        element: <div>Roles</div>,
    },
    register: {
        path: "/register",
        element: <Register />,
    },
};

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
    getElementFromRouteId
}