import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes, customAxios, UserTypes } from "@/constants.js";
import {toast} from "sonner";
import {useQuery} from "@tanstack/react-query";

export const userContext = createContext({
    user: null,
    setUser: () => {},
});

// useEffect(() => {
//     const getUser = async () => {
//         try {
//             const response = await customAxios.get(apiRoutes.getUser);
//             console.log(response.data);
//             setUser(prev => ({...response.data}));
//         } catch (error) {
//             if(axios.isAxiosError(error) && error.response.status === 401) {
//                 setUser(null);
//             }
//             // toast.error(error.response.data.message);
//         } finally {
//             setRequested(true);
//         }
//     };
//
//     getUser();
// }, []);


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requested, setRequested] = useState(false);

    const userQuery = useQuery({
        queryFn: async () => {
            const response = await customAxios.get(apiRoutes.getUser);
            return response.data
        },
        queryKey: ['user'],
    });

    const {data, isError} = userQuery;
    useEffect(() => {
        if (isError) {
            setRequested(true);
        }
        if (data) {
            setUser(prevData => data);
            setRequested(true);
        }
    }, [isError, data]);
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
