import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Provide the context to the application
export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("");

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
