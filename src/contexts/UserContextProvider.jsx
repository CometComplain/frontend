import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {googleLogout} from "@react-oauth/google";
import axios from "axios";
import {apiRoutes, customAxios} from "@/constants.js";


export const userContext = createContext({
    user: null,
    setUser: () => {},
});

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(
        null
    );
    // const [jwt, setJwt] = useLocalStorage('jwt', '');
    useEffect(() => {
        const getUser = async () => {
            const response = await customAxios.get(`/backend/api/v1/auth/login/success`);
            setUser(response.data);
        }
        try {
            getUser();
        }
        catch (error) {
            console.error(error);
            setUser(null);
        }
    }, []);
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
};

export const useUser = () => useContext(userContext);

