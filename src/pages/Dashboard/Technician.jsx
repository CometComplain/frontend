import TechnicianComplaint from '@components/Complaints/TechnicianComplaint.jsx'
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {acceptComplaint, getComplaints, solveComplaint} from "@/api/apiCalls.js";
import {handleScroll, RenderComplaints} from "@pages/Dashboard/utils.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
import {timeGap} from "@/constants.js";

const subUrl = "technician";
const pendingKey = ["complaints", subUrl, "pending"];
const acceptedKey = ["complaints", subUrl, "accepted"];


const sucess = (thing, queryClient) => {
    toast.success(`Complaint ${thing} successfully`);
    queryClient.invalidateQueries(pendingKey);
    queryClient.invalidateQueries(acceptedKey);
}

const divStyle= "flex items-center gap-3 p-2 mx-1 my-2 border border-gray-300 rounded shadow w-fit";

const Technician = () => {
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const client = useQueryClient();
    let timer;
    const handleSearch = (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setSearch(event.target.value);
        }, timeGap);
    }

    const queryClient = useQueryClient();
    const complaintsDiv = (renderableComplaints) => {
        renderableComplaints = renderableComplaints.filter(complaint => complaint.complaintId.includes(search));
        return (
            <>
                <div className='flex'>
                    <div className={divStyle}>
                        <label htmlFor="filter" className="text-base capitalize">filter :</label>
                        <select id="filter"
                                onChange={(event) => {
                                    setFilter(event.target.value)
                                }}
                                className="p-1 text-base border-2 border-black rounded" name="filter">
                            <option value="">All</option>
                            <option value="accepted">Accepted</option>
                            <option value="verified">Verified</option>
                        </select>
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="search" className="text-base capitalize">Search :</label>
                        <input type='text' placeholder='Enter Complaint Id' onChange={handleSearch} />
                    </div>
                </div>

                <div
                    className={styles.solved_complaints}
                    onScroll={(event) => handleScroll(event, [technicianPendingComplaintQuery, technitianAcceptedComplaintQuery])}
                >
                    <RenderComplaints renderableComplaints={renderableComplaints} Component={TechnicianComplaint} props={{
                        acceptMutation,
                        solvedMutation,
                    }}/>
                </div>
            </>
        );
    }

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
        onSuccess: () => {
            sucess("accepted", queryClient)
            client.invalidateQueries(acceptedKey)
            client.invalidateQueries(pendingKey)
        },
        onError,
    });

    const solvedMutation = useMutation({
        mutationFn: solveComplaint,
        onSuccess: () => {
            sucess("solved", queryClient)
            client.invalidateQueries(acceptedKey)
            client.invalidateQueries(pendingKey)
        },
        onError,
    })

    const pendingComplaints = technicianPendingComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    const acceptedComplaints = technitianAcceptedComplaintQuery.data?.pages.flatMap(page => page.complaints) || [];
    const complaintsMap = {
        "": pendingComplaints.concat(acceptedComplaints).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        "accepted": acceptedComplaints,
        "verified": pendingComplaints
    };
    return (
        <div className={styles.solved_complaints_wrapper}>
            <div className={`p-5 text-2xl font-semibold bg-gray-300 ${styles.complaints}`}>Complaints</div>
            {technicianPendingComplaintQuery.isLoading && "fetching complaints..."}
            {technicianPendingComplaintQuery.isError &&
                technicianPendingComplaintQuery.error.message}
            {technicianPendingComplaintQuery.isSuccess && complaintsDiv(complaintsMap[filter])}
        </div>
    );
};

export default Technician;