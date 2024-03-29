import {apiRoutes, customAxios} from "@/constants.js";
import axios from "axios";
import {useLogout} from "@/utils/index.js";

const coverRequests = async (func, params) => {
    try {
        return await func(...params);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                // useLogout();
            }
        }
        console.log('got an error: ', error);
    }
    throw new Error('Error fetching complaints');
}

export const getComplaints = async (params = [], subUrl = '') => await coverRequests(async (params, subUrl) => {

    const stringifiedParams = params.map((param) => param ? `${param.name}=${param.value}` : '').join('&').replace(/&$/, '');
    const apiUrl = `${apiRoutes.getComplaints}/${subUrl}?${stringifiedParams}`;
    const response = await customAxios.get(apiUrl);
    if (response.status === 404) throw new Error('no data');
    console.log(`::response for param ${stringifiedParams} `, response.data)
    return response.data;
}, [params, subUrl]);

export const getComplaintWithId = async (id) => {
    const response = await customAxios.get(`${apiRoutes.getComplaintWithId}/${id}`);
    return response.data
}

export const deleteComplaint = async (id) => await coverRequests(async (id) => {
    const response = await customAxios.delete(apiRoutes.deleteComplaint, {data: {complaintId: id}});
    return response.data;
}, [id]);

export const verifyComplaint = async (id) => await coverRequests(async () => {
    const response = await customAxios.post(apiRoutes.verifyComplaint, {complaintId: id});
    return response.data;
}, [id]);

export const rejectComplaint = async (id) => await coverRequests(
    async () => {
        const response = await customAxios.post(apiRoutes.rejectComplaint);
        return response.data;
    }
)

export const acceptComplaint = async (id) => await coverRequests(async () => {
    const response = await customAxios.post(apiRoutes.acceptComplaint, {
        complaintId: id,
    });
    return response.data;
}, [id]);

export const solveComplaint = async (id) => await coverRequests(async (id) => {
    const response = await customAxios.post(apiRoutes.solveComplaint, {
        complaintId: id,
    });
    return response.data;
},[id]);