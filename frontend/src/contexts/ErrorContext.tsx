import React, { createContext, useState, useContext, ReactNode } from "react";

interface ErrorContextType {
    error: string | null;
    showError: (message: string) => void;
    clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};

interface ErrorProviderProps {
    children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    function showError(message: string) {
        setError(message);
    };

    function clearError() {
        setError(null);
    }

    return <ErrorContext.Provider value={{ error, showError, clearError }}>{children}</ErrorContext.Provider>;
};
