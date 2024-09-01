import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { permissionsMapState } from "../../globalState/atoms";
import { useFlashMessage } from "../../contexts/FlashMessageContext";

import api from '../../helpers/generalHelper';
import { isProtectedLocation } from "../../helpers/routeHelper";

interface NavigationListenerProps {
    children: ReactNode;
}

function NavigationListener({ children }: NavigationListenerProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { flashError } = useFlashMessage();
    const [lastChecked, setLastChecked] = useState(0);
    const [permissionsMap, setPermissionsMap] = useRecoilState(permissionsMapState);
    const checkAfterMsOnLocationChange = 10000;
    const checkAtIntervalMs = 90000;

    function checkSession() {
        if (Object.keys(permissionsMap).length > 0) {
            // User has logged in, check if the login is still valid.
        
            console.log("Checking session...");

            api.post("auth/checkSession", {})
                .then((res) => {
                    const { success, loggedIn, expired } = res;
                    if (!success) {
                        // This is bad.
                        console.error("A server error occurred");
                    }

                    setLastChecked(new Date().getTime());

                    if (expired) {
                        flashError(`Your session has expired. Please login again.`, 0, 1);
                    }

                    // If the login has become invalid, invalidate the local permissionsMap
                    // to let the front end app know it's no longer logged in.
                    if (!loggedIn) {
                        setPermissionsMap({});

                        // If we're on a protected route navigate to login.
                        if (isProtectedLocation(location)) {
                            console.log("Were on protected route, navigate to login");
                            navigate("/login");
                        } else {
                            console.log("Not a protected route, do not navigate");
                        }
                    }
                })
                .catch((err) => console.error("Unable to check session.", err));
        }
    }

    // Call checkSession when the location changes.
    useEffect(() => { 
        if (lastChecked < new Date().getTime() - checkAfterMsOnLocationChange) {
            checkSession()
        }
    }, [location]);

    // Call checkSession at an interval (required to keep the session alive in the backend)
    useEffect(() => {
        const handler = setInterval(checkSession, checkAtIntervalMs);
        return () => clearInterval(handler);
    }, [permissionsMap]);

    return <>{children}</>;
}

export default NavigationListener;