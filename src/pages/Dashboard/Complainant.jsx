import styles from './styles.module.css';
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteComplaint, getComplaints} from "@/api/apiCalls.js";
import {handleScroll, RenderComplaints} from "@pages/Dashboard/utils.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
import {statusMap, timeGap} from "@/constants.js";
import userComplaint from "@components/Complaints/UserComplaint.jsx";


const subUrl = "complainant";

// const solvedKey = ['complaints', subUrl, 'solved'];
const complaintsKey = ['complaints', subUrl, 'all'];
const divStyle= "flex items-center gap-3 p-2 mx-1 my-2 border border-gray-300 rounded shadow w-fit";


const Complainant = () => {
    const [filter, setFilter] = useState(-1);
    const [search, setSearch] = useState('');

    let timer;
    const handleSearch = (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setSearch(event.target.value.toLowerCase());
            console.log('searching');
        }, timeGap);
    }
    const queryClient = useQueryClient();

    const options = {
        queryFn: ({queryKey, pageParam = 1}) => getComplaints([
            {
                value: pageParam ,
                name: 'page',
            },
        ], subUrl),
        getNextPageParam: prevData => prevData.nextPage,
    }



    const complaintsDiv = (renderableComplaints = []) => {
        console.log(`re-rendering for filter  ${filter} : `, renderableComplaints);
        return (
            <>
                <div className='flex'>
                    <div className={divStyle}>
                        <label htmlFor="filter" className="text-base capitalize">filter :</label>
                        <select id="filter"
                                onChange={(event) => {
                                    setFilter(Number(event.target.value))
                                }}
                                className="p-1 text-base border-2 border-black rounded" name="filter">
                            <option value={`-1`}>All</option>
                            <option value={`${statusMap.Pending}`}>Pending</option>
                            <option value={`${statusMap.Verified}`}>Verified</option>
                            <option value={`${statusMap.Accepted}`}>Accepted</option>
                            <option value={`${statusMap.Solved}`}>Solved</option>
                            <option value={`${statusMap.Rejected}`}>Rejected</option>
                        </select>
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="search" className="text-base capitalize">Search :</label>
                        <input type='text' placeholder='Enter Complaint Id' onChange={handleSearch}/>
                    </div>
                </div>
                <div className={styles.solved_complaints} onScroll={(event) => handleScroll(event, [allComplaintsQuery])}>
                    <RenderComplaints renderableComplaints={renderableComplaints} Component={userComplaint} props={{
                        deleteMutation,
                    }}/>
                </div>

            </>
        )
    }

    const allComplaintsQuery = useInfiniteQuery({
        queryKey: complaintsKey,
        ...options,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteComplaint,
        onSuccess: () => {
            toast.success('Complaint deleted sucessfully');
            queryClient.invalidateQueries(complaintsKey);
        },
        onError,
    });
    const allComplaints = allComplaintsQuery.data?.pages.flatMap(page => page.complaints) || []
    // allComplaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className={styles.solved_complaints_wrapper}>
            <div className="p-5 text-2xl font-semibold bg-gray-300">Complaints</div>
            {allComplaintsQuery.isLoading && 'fetching complaints...'}
            {allComplaintsQuery.isError && allComplaintsQuery.error.message}
            {allComplaintsQuery.isSuccess && complaintsDiv(allComplaints.filter(complaint => {
                if(filter !== -1 && filter !== complaint.status) return false;
                if(search === '') return true;
                if (complaint.complaintId.includes(search)) return true;
                return complaint.title.toLowerCase().includes(search);
            }))}
        </div>
    );
}

export default Complainant;