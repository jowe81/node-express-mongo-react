import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext.tsx";
import styles from "./FlashMessageDisplay.module.scss";

const FlashMessageDisplay: React.FC = () => {
    const { message, messageType, clearFlash } = useFlashMessage();
    const location = useLocation();

    useEffect(() => {
        // Clear the message when the route changes (on navigation).
        if (message) {
            clearFlash();
        }
    }, [location.pathname]);

    if (!message) return null;

    return (
        <>
            <div className={`${styles.flashMessageContainer} ${styles[messageType]}`} >
                <div className={styles.flashMessageHeaderContainer}>
                    <div className={styles.errorHeader}>An Error occurred:</div>
                    <div className={styles.errorCloseButton}>
                        <a href="#" onClick={clearFlash}>[X]</a>
                    </div>                        
                </div>
                <div className={styles.errorText}>{message}</div>
            </div>
        </>
    );
};

export default FlashMessageDisplay;
