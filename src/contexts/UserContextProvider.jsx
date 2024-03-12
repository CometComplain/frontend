import {createContext, useContext, useEffect, useState} from "react";
import {getDataFromGoogle, useLocalStorage} from "@/utils";
import {pages} from "@/constants.js";
import {authenticate} from "@api/authenticate.js";
import {useNavigate} from "react-router-dom";
import {googleLogout} from "@react-oauth/google";
import axios from "axios";

export const userContext = createContext({
    user: null,
    setUser: () => {
    }
});

export const UserContextProvider = ({children}) => {
    const [userG, setUserG] = useState(
        // {
        //     [Headers.UserUName]: '',
        //     [Headers.UserType]: UserTypes.Complainant,
        // }
        null
    );
    const [jwt, setJwt] = useLocalStorage('jwt', '');
    useEffect(() => {
        if (jwt) {
            getDataFromGoogle(jwt).then(async (userData) => {
                setUserG(userData);
                await authenticate(jwt);
            }, (error) => {
                if (axios.isAxiosError(error) && error.response.status === 401) {
                    setJwt('');
                }
            });
        }
    }, [jwt]);
    return (
        <userContext.Provider value={{userG, setUserG, jwt, setJwt}}>
            {children}
        </userContext.Provider>
    )
};

export const useUser = () => useContext(userContext);

