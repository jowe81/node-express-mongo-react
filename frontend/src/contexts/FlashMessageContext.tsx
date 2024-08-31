import React, { createContext, useState, useContext, ReactNode } from "react";

interface FlashMessageContextType {
    message: string | null;
    messageType: string;
    flashError: (message: string, timeout?: number, keepAfterRouteChanges?: number) => void;
    flashMessage: (message: string, timeout?: number, keepAfterRouteChanges?: number) => void;
    clearFlash: () => void;
    keepAfterRouteChanges: number;
    decreaseKeepAfterRouteChanges: () => void;
    timeout: number;
}

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const useFlashMessage = (): FlashMessageContextType => {
    const context = useContext(FlashMessageContext);
    if (!context) {
        throw new Error("useFlashMessage must be used within an FlashMessageProvider");
    }
    return context;
};

interface FlashMessageProviderProps {
    children: ReactNode;
}

export const FlashMessageProvider: React.FC<FlashMessageProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<string>('message');
    const [keepAfterRouteChanges, setKeepAfterRouteChanges] = useState(0);
    const [timeout, setTimeout] = useState(0);

    function flashError(message: string, timeout: number=0, keepAfterRouteChanges: number = 0) {
        flash("error", message, timeout, keepAfterRouteChanges);
    };

    function flashMessage(message: string, timeout: number = 0, keepAfterRouteChanges: number = 0) {
        flash("message", message, timeout, keepAfterRouteChanges);
    }

    function flash(messageType: string, message: string, timeout: number, keepAfterRouteChanges: number) {
        console.log('Flashing', messageType, message);
        setMessage(message);
        setMessageType(messageType);
        setKeepAfterRouteChanges(keepAfterRouteChanges);
        setTimeout(timeout);
    }

    function clearFlash() {
        setMessage(null);
    }

    function decreaseKeepAfterRouteChanges() {
        setKeepAfterRouteChanges(keepAfterRouteChanges - 1);
    }

    return (
        <FlashMessageContext.Provider
            value={{
                message,
                messageType,
                flashMessage,
                flashError,
                clearFlash,
                keepAfterRouteChanges,
                decreaseKeepAfterRouteChanges,
                timeout,
            }}
        >
            {children}
        </FlashMessageContext.Provider>
    );
};
