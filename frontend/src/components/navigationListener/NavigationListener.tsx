import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { permissionsMapState } from "../../globalState/atoms";
import api from '../../helpers/generalHelper';

interface NavigationListenerProps {
    children: ReactNode;
}

function NavigationListener({ children }: NavigationListenerProps) {
    const location = useLocation();
    const [lastChecked, setLastChecked] = useState(0);
    const [permissionsMap, setPermissionsMap] = useRecoilState(permissionsMapState);    
    const checkAfterMs = 10000;
    
    //console.log('NavListener', location.pathname, permissionsMap)
    useEffect(() => {
        const checkSessionOnNavigate = () => {
            if (lastChecked < new Date().getTime() - checkAfterMs) {
                checkSession()
                    .then((res) => {
                        const { success, loggedIn, expired } = res;
                        if (!success) {
                            // This is bad.
                            console.error('A server error occurred');
                        }
                        
                        setLastChecked(new Date().getTime());

                        // If not logged in, and we're on a protected route, navigate to login.
                        if (!loggedIn) {
                            //console.log(location.pathname)
                        }

                    })
                    .catch(err => console.error('Unable to check session.', err));
            } 
        };

        checkSessionOnNavigate();
    }, [location]);

    return <>{children}</>;
}

async function checkSession() {
    // Your API call to check session
    console.log("Checking session...");    
    return api.post("auth/checkSession", {});
}

export default NavigationListener;