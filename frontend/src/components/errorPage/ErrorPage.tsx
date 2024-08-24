import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";


export default function ErrorPage() {
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
