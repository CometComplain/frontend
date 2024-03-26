import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes, customAxios, UserTypes } from "@/constants.js";

export const userContext = createContext({
    user: null,
    setUser: () => {},
});


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requested, setRequested] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await customAxios.get(apiRoutes.getUser);
                setUser(prev => ({...response.data}));
            } catch (error) {
                if(axios.isAxiosError(error) && error.response.status === 401) {
                    setUser(null);
                }
                console.error(error);
            } finally {
                setRequested(true);
            }
        };

        getUser();
    }, []);


    // useEffect(() => {
    //     setRequested(true)
    //
    // }, [user])
    return (
        <userContext.Provider value={{ user, setUser, requested }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);
