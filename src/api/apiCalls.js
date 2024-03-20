import {apiRoutes, customAxios} from "@/constants.js";
import axios from "axios";
import {useLogout} from "@/utils/index.js";

const coverRequests = async (func, params) => {
    try {
        return await func(...params);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                useLogout();
            }
        }
        console.log('got an error: ', error);
    }
    throw new Error('Error fetching complaints');
}

export const getComplaints = async (params = [], subUrl = '') => await coverRequests(async (params, subUrl) => {

    const stringifiedParams = params.map((param) => `${param.name}=${param.value}`).join('&');
    const apiUrl = `${apiRoutes.getComplaints}/${subUrl}?${stringifiedParams}`;
    const response = await customAxios.get(apiUrl);

    if (response.status === 404) throw new Error('no data');
    return response.data;
}, [params, subUrl]);

export const deleteComplaint = async (id) => await coverRequests(async () => {
    const response = await customAxios.delete(apiRoutes.getComplaintWithId, {data: {id}});
    return response.data;
}, [id]);


export const verifyComplaint = async (id) => await coverRequests(async () => {
    const response = await customAxios.post(apiRoutes.verifyComplaint, {id});
    return response.data;
}, [id]);


export const acceptComplaint = async (id) => await coverRequests(async () => {
    const response = await customAxios.post(apiRoutes.acceptComplaint, {id});
    return response.data;
}, [id]);