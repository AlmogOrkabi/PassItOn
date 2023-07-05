import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {













    const value = {};


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}