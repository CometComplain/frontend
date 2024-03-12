import {useState} from "react";
import axios, {AxiosError} from "axios";
import {apiRoutes, googleStuff} from "@/constants.js";
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

export const useLogout = () => {
    googleLogout();
    localStorage.removeItem('jwt');
}

export const getDataFromGoogle = async (jwt) => {
    try {
        // console.log('getting data from google')
        const response = await axios.get(`${googleStuff.detailsUrl}${jwt}`, {
            headers: {
                Authorization: `Bearer ${jwt}`, Accept: 'application/json'
            }
        })
        // console.log('got details', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        }
    }
}

export const getDate = () => {
    return new Date().toISOString().split('T')[0];
}

export const getComplaints = async (jwt, type) => {
    const apiUrl = `${apiRoutes.getComplaints}/?type=${type}`;

    const config = {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    };

    try {
        const response = await axios.get(apiUrl, config);
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            if(error.response?.status === 401) {
                useLogout();
            }
        }
    }
    throw new Error('Error fetching complaints');
}