import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { apiRoutes, customAxios, UserTypes } from "@/constants.js";

export const userContext = createContext({
    user: null,
    setUser: () => {},
});

const useChangeUser = (user, setRequested) => {
    useEffect(() => {
        if(user) {
            setRequested(true);
        }
    }, [user, setRequested]);
}

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requested, setRequested] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const response = await customAxios.get(apiRoutes.getUser);
            console.log(response.data);
            setUser(prev => ({...response.data, role: UserTypes.Technician}));
        };
        try {
            getUser();
        } catch (error) {
            if(axios.isAxiosError(error) && error.response.status === 401) {
                setRequested(true);
                setUser(null);
            }
            console.error(error);
            // setUser({
            //     role:UserTypes.Technician,
            //     displayName: "sodi"
            // })
        }
    }, []);

    useChangeUser(user, setRequested);

    return (
        <userContext.Provider value={{ user, setUser, requested }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);
