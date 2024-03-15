import Complaint from "@components/ui/Complaint.jsx";
import styles from './styles.module.css';
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {getComplaints} from "@/api/apiCalls.js";
import {useUser} from "@/contexts/UserContextProvider.jsx";
import {handleScroll} from "@pages/Dashboard/utils.js";
import {all} from "axios";
import {useState} from "react";


const Complaints = () => {
    const [filter, setFilter] = useState('')
    const options = {
        queryFn: ({queryKey, pageParam = 1}) => getComplaints(queryKey[1], pageParam),
        getNextPageParam: prevData => prevData.nextPage,
    }
    const complaintsDiv = (solvedComplaints) => (
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
                        <Complaint complaint={complaint} key={complaint.id}/>
                    );
                })}
            </div>

        </>)
    const solvedComplaintsQuery = useInfiniteQuery({
        queryKey: ['complaints', 'solved'],
        ...options,
    });
    const pendingComplaintsQuery = useInfiniteQuery({
        queryKey: ['complaints', "pending"],
        ...options,
    });

    const queriesMap = {
        'solved': [solvedComplaintsQuery],
        'pending': [pendingComplaintsQuery],
        '': [solvedComplaintsQuery, pendingComplaintsQuery],
    }

    const solvedComplaints = solvedComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    const pendingComplaints = pendingComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    const allComplaints = [...solvedComplaints, ...pendingComplaints];
    // allComplaints.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
            {solvedComplaintsQuery.isSuccess && complaintsDiv(solvedComplaints)}
            {solvedComplaintsQuery.isFetching && 'Fetching more complaints...'}
        </div>
    );
}

export default Complaints;