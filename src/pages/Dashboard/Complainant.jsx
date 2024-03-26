import UserComplaint from "@components/Complaints/UserComplaint";
import styles from './styles.module.css';
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteComplaint, getComplaints} from "@/api/apiCalls.js";
import {handleScroll} from "@pages/Dashboard/utils.js";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";


const subUrl = "complainant";

const solvedKey = ['complaints', subUrl, 'solved'];
const pendingKey = ['complaints', subUrl, "pending"];

const Complainant = () => {
    const [filter, setFilter] = useState('')

    const queryClient = useQueryClient();

    const options = {
        queryFn: ({queryKey, pageParam = 1}) => getComplaints([
            {
                value: pageParam ,
                name: 'page',
            },
            {
                value: queryKey[2],
                name: 'type'
            }
        ], subUrl),
        getNextPageParam: prevData => prevData.nextPage,
    }



    const complaintsDiv = () => (
        <>
            <select onChange={(event) => {
                setFilter(event.target.value)
            }}>
                <option value="">All</option>
                <option value="solved">Solved</option>
                <option value="pending">Pending</option>
            </select>
            <div className={styles.solved_complaints} onScroll={(event) => handleScroll(event, queriesMap[filter])}>
                {complaintsMap[filter].map(complaint => {
                    return (
                        <UserComplaint deleteMutation={deleteMutation} complaint={complaint} key={complaint.id}/>
                    );
                })}
            </div>

        </>
        )
    const solvedComplaintsQuery = useInfiniteQuery({
        queryKey: solvedKey,
        ...options,
    });
    const pendingComplaintsQuery = useInfiniteQuery({
        queryKey: pendingKey,
        ...options,
    });

    const queriesMap = {
        'solved': [solvedComplaintsQuery],
        'pending': [pendingComplaintsQuery],
        '': [solvedComplaintsQuery, pendingComplaintsQuery],
    }
    const deleteMutation = useMutation({
        mutationFn: deleteComplaint,
        onSuccess: () => {
            toast.success('Complaint deleted sucessfully');
            queryClient.invalidateQueries(pendingKey);
        },
        onError,
    });
    const solvedComplaints = solvedComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    const pendingComplaints = pendingComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    const allComplaints = [...solvedComplaints, ...pendingComplaints];
    allComplaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const complaintsMap = {
        'solved': solvedComplaints,
        'pending': pendingComplaints,
        '': allComplaints,
    }
    return (

        <div className={styles.solved_complaints_wrapper}>
            <h1>Complaints</h1>
            {solvedComplaintsQuery.isLoading && 'fetching complaints...'}
            {solvedComplaintsQuery.isError && solvedComplaintsQuery.error.message}
            {solvedComplaintsQuery.isSuccess && complaintsDiv()}
        </div>
    );
}

export default Complainant;