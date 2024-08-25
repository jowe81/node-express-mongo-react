import React, { createContext, useState, useContext, ReactNode } from "react";

interface FlashMessageContextType {
    message: string | null;
    messageType: string;
    flashError: (message: string, keepAfterRouteChanges?: number) => void;
    flashMessage: (message: string, keepAfterRouteChanges?: number) => void;
    clearFlash: () => void;
    keepAfterRouteChanges: number;
    decreaseKeepAfterRouteChanges: () => void;
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

    function flashError(message: string, keepAfterRouteChanges: number = 0) {
        setMessage(message);
        setMessageType('error');
        setKeepAfterRouteChanges(keepAfterRouteChanges);
    };

    function flashMessage(message: string, keepAfterRouteChanges: number = 0) {
        setMessage(message);
        setMessageType('message');
        setKeepAfterRouteChanges(keepAfterRouteChanges);
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
            }}
        >
            {children}
        </FlashMessageContext.Provider>
    );
};
