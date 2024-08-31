import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext.tsx";
import styles from "./FlashMessageDisplay.module.scss";

const FlashMessageDisplay: React.FC = () => {
    const [isFading, setIsFading] = useState(false);
    const { message, messageType, clearFlash, keepAfterRouteChanges, decreaseKeepAfterRouteChanges, timeout } = useFlashMessage();
    const location = useLocation();

    // Milliseconds - make sure to match the transition:opacity directive in the CSS (.flashMessageContainer)
    const fadeLength = 1000;

    // Handle the timeout for clearing the message, if present, as well as the fade at the end.
    useEffect(() => {
        if (!timeout || !message) {
            return;
        }

        let fadeStartHandle: number;
        let clearFlashHandle: number | undefined;
        
        fadeStartHandle = setTimeout(() => {
            // Fade started.
            setIsFading(true);

            clearFlashHandle = setTimeout(() => {
                // Fade finished.
                clearFlash();
                setIsFading(false);
            }, fadeLength);
        }, timeout);

        return () => { 
            clearTimeout(fadeStartHandle)
            clearTimeout(clearFlashHandle);
        };
    }, [timeout]);

    // Handle clearing after a route change (and keeping track of route changes if the message should stay around).
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
            <div className={`${styles.flashMessageContainer} ${styles[messageType]} ${isFading ? styles.fadeOut : ''}`}>
                <div className={styles.messageText}>
                    <div className={styles.messageCloseButton}>
                        <a href="#" onClick={clearFlash}>
                            [X]
                        </a>
                    </div>
                    {messageType === "error" && <div className={styles.messageHeader}>An Error occurred:</div>}
                    {message}
                </div>
            </div>
        </>
    );
};

export default FlashMessageDisplay;
