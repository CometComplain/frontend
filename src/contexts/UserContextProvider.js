import { createContext, useContext } from "react";

export const userContext = createContext({
    user:null,
    setUser: () => {}
});

export const UserContextProvider = userContext.Provider;

export const useUser = () => useContext(userContext);

