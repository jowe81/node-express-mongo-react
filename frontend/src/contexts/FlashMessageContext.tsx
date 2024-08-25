import React, { createContext, useState, useContext, ReactNode } from "react";

interface FlashMessageContextType {
    message: string | null;
    messageType: string;
    flashError: (message: string) => void;
    flashMessage: (message: string) => void;
    clearFlash: () => void;
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

    function flashError(message: string) {
        setMessage(message);
        setMessageType('error');
    };

    function flashMessage(message: string) {
        setMessage(message);
        setMessageType('message');
    }

    function clearFlash() {
        setMessage(null);
    }

    return (
        <FlashMessageContext.Provider value={{ message, messageType, flashMessage, flashError, clearFlash }}>
            {children}
        </FlashMessageContext.Provider>
    );
};
