import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext.tsx";
import styles from "./FlashMessageDisplay.module.scss";

const FlashMessageDisplay: React.FC = () => {
    const { message, messageType, clearFlash, keepAfterRouteChanges, decreaseKeepAfterRouteChanges } = useFlashMessage();
    const location = useLocation();
        
    useEffect(() => {
        if (message) {
            if (keepAfterRouteChanges === 0) {
                clearFlash();
            } else {
                decreaseKeepAfterRouteChanges();
            }
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
