import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import api from "../../../helpers/generalHelper";
import { permissionsMapState } from "../../../globalState/atoms";

function Logout() {
    const [permissionsMap, setPermissionsMap] = useRecoilState(permissionsMapState)
    const { flashError } = useFlashMessage();
    const navigate = useNavigate();

    useEffect(() => {
        api
            .post("auth/logout", {trigger: 'user'})
            .then((res) => {
                if (!res.success) {
                    return flashError(res.message);
                }
                // Backend Logout successful, clear permissionsMap to let the frontend app know, and go to the landing page.
                setPermissionsMap({});
                navigate("/");
            })
            .catch((err) => {
                console.log("error", err);
                flashError(err.message);
            });
    }, []);

    return <div>Loging you out...</div>;
}

export default Logout;
