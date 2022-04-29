import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // ******* States ********
    const [userLoggedIn, setUserLoggedIn] = useState(false); 

    // ********* Functions *********
    const login = () => { 
        setUserLoggedIn(true);
    };

    const logout = () => { 
        setUserLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ userLoggedIn, login, logout }}>{ children }</AuthContext.Provider>
    );
};

export const useAuth = () => { 
    return useContext(AuthContext);
}