import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { permissionsMapState } from "../../globalState/atoms";
import { useEffect } from "react";

export default function ErrorPage() {
    const permissionsMap = useRecoilValue(permissionsMapState);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!Object.keys(permissionsMap).length) {
            navigate("/login");
        }        
    }, [navigate]);


    const error = useRouteError();
    if (error) {
        console.error(error);
    }
    
    return (
        <div className={styles.errorPageContainer}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
            <Link to="/">Home</Link>
        </div>
    );
}
