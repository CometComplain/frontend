import TechnicianComplaint from '@components/Complaints/TechnicianComplaint.jsx'
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {acceptComplaint, getComplaints, solveComplaint} from "@/api/apiCalls.js";
import {handleScroll} from "@pages/Dashboard/utils.js";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";

const subUrl = "technician";
const pendingKey = ["complaints", subUrl, "pending"];
const acceptedKey = ["complaints", subUrl, "accepted"];


const sucess = (thing, queryClient) => {
    toast.success(`Complaint ${thing} successfully`);
    queryClient.invalidateQueries(pendingKey);
    queryClient.invalidateQueries(acceptedKey);
}



const Technician = () => {
    const [filter, setFilter] = useState("");

    const queryClient = useQueryClient();
    const complaintsDiv = () => (
        <>
            <select onChange={(event) => {
                setFilter(event.target.value)
            }}>
                <option value="">All</option>
                <option value="accepted">Accepted</option>
                <option value="verified">Verified</option>
            </select>
            <div
                className={styles.solved_complaints}
                onScroll={(event) => handleScroll(event, [technitianComplaintQuery])}
            >
                {complaintsMap[filter].map((complaint) => {
                    return (
                        <TechnicianComplaint
                            complaint={complaint}
                            acceptMutation={acceptMutation}
                            solvedMutation={solvedMutation}
                            key={complaint.complaintId}
                        />
                    );
                })}
            </div>
        </>
    );

    const technicianPendingComplaintQuery = useInfiniteQuery({
        queryKey: pendingKey,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const technitianAcceptedComplaintQuery = useInfiniteQuery({
        queryKey: acceptedKey,
        queryFn: ({queryKey, pageParam = 1}) =>
            getComplaints(
                [
                    {
                        value: pageParam,
                        name: "page",
                    },
                    {
                        value: "accepted",
                        name: "type",
                    }
                ],
                subUrl
            ),
        getNextPageParam: (prevPage) => prevPage.nextPage,
    });

    const acceptMutation = useMutation({
        mutationFn: acceptComplaint,
        onSuccess: () => sucess("accepted", queryClient),
        onError,
    });

    const solvedMutation = useMutation({
        mutationFn: solveComplaint,
        onSuccess: () => sucess("solved", queryClient),
        onError,
    })

    const pendingComplaints = technicianPendingComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    const acceptedComplaints = technitianAcceptedComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    const complaintsMap = {
        "": pendingComplaints.concat(acceptedComplaints),
        "accepted": acceptedComplaints,
        "verified": pendingComplaints
    };
    return (
        <div className={styles.solved_complaints_wrapper}>
            <h1>Technician Complaints</h1>
            {technicianPendingComplaintQuery.isLoading && "fetching complaints..."}
            {technicianPendingComplaintQuery.isError &&
                technicianPendingComplaintQuery.error.message}
            {technicianPendingComplaintQuery.isSuccess && complaintsDiv()}
            {technicianPendingComplaintQuery.isFetching && "Fetching more complaints..."}
        </div>
    );
};

export default Technician;