import {useState} from "react";
import axios, {AxiosError} from "axios";
import {apiRoutes, customAxios, googleStuff} from "@/constants.js";
import {googleLogout} from "@react-oauth/google";

export const NotInUseDecorator = (func) => {
    return (...args) => {
        console.warn('This function is not In use Anyway running it');
        return func(...args);
    }
}


// custom hook to use local storage
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });
    // console.log('Google Jwt : ', storedValue);
    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}


export const getDate = () => {
    return new Date().toISOString().split('T')[0];
}



export const useLogout = () => {
    window.open(`${apiRoutes.backendUrl}/grievance/auth/logout`, "_self");
}
