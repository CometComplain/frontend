import {apiRoutes, customAxios} from "@/constants.js";
import axios from "axios";
import {useLogout} from "@/utils/index.js";

export const getComplaints = async (type, page) => {
    const apiUrl = `${apiRoutes.getComplaints}/?type=${type}&page=${page}`;
    try {
        const response = await customAxios.get(apiUrl);
        // console.log('got complaints', response);
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

export const deleteComplaint = async (id) => {
    try {
        const response = await customAxios.delete(apiRoutes.getComplaintWithId, {data: {id}});
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)) {
            if(error.response?.status === 401) {
                useLogout();
            }
        }
    }
    throw new Error('Error deleting complaint');
}

