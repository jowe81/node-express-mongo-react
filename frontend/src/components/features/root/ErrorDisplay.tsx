import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useError } from "../../../contexts/ErrorContext";
import styles from "./ErrorDisplay.module.scss";

const ErrorDisplay: React.FC = () => {
    const { error, clearError } = useError();
    const location = useLocation();

    useEffect(() => {
        // Clear the error when the route changes (on navigation).
        if (error) {
            clearError();
        }
    }, [location.pathname]);

    if (!error) return null;

    return (
        <>
            <div className={styles.errorContainer}>
                <div className={styles.errorHeaderContainer}>
                    <div className={styles.errorHeader}>An Error occurred:</div>
                    <div className={styles.errorCloseButton}>
                        <a href="#" onClick={clearError}>[X]</a>
                    </div>                        
                </div>
                <div className={styles.errorText}>{error}</div>
            </div>
        </>
    );
};

export default ErrorDisplay;
