import React from 'react';
import styles from './styles.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {apiRoutes, customAxios, pages} from "@/constants.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteComplaint} from "@/api/apiCalls.js";

const getComplaint = async (id) => {
    const data = {
        id,
    };
    const response = await customAxios.post(apiRoutes.getComplaintWithId, data);
    console.log(response.data);
    return response.data
}

const Complaint = () => {
    const {complaintId} = useParams();
    const navigate = useNavigate();
    const complaintQuery = useQuery({
        queryFn: () => getComplaint(complaintId),
        queryKey: ['complaint', complaintId],
    });

    const complaintMutation = useMutation({
        mutationFn: deleteComplaint,
        onSuccess: () => {
            navigate(pages.dashboard);
        },
        onError: () => {
            console.log('unable to delete complaint');
        }
    });


    const {data, isError, isLoading} = complaintQuery;
    const complaint = data?.complaint;
    return (
        <div>
            {isLoading && 'loading...'}
            {isError && 'error'}
            {data && (
                <>
                    <button onClick={() => complaintMutation.mutate(complaintId)}>delete complaint</button>
                    <h2>{complaint.title}</h2>
                    <p>{complaint.description}</p>
                </>
            )}
        </div>
    );
};

export default Complaint;
