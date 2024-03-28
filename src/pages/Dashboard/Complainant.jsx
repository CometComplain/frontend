import styles from './styles.module.css';
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteComplaint, getComplaints} from "@/api/apiCalls.js";
import {handleScroll, RenderComplaints} from "@pages/Dashboard/utils.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {onError} from "@/utils/index.js";
<<<<<<< HEAD
import CompliantCard from "@components/CompliantCard/CompliantCard";
import CompliantDetail from "@pages/CompliantDetail/CompliantDetail";
=======
import {timeGap} from "@/constants.js";
import userComplaint from "@components/Complaints/UserComplaint.jsx";
>>>>>>> 37a365ac6393c51847a651e452da9861d01723ec


const subUrl = "complainant";

const solvedKey = ['complaints', subUrl, 'solved'];
const pendingKey = ['complaints', subUrl, "pending"];
const divStyle= "flex items-center gap-3 p-2 mx-1 my-2 border border-gray-300 rounded shadow w-fit";


const Complainant = () => {
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    let timer;
    const handleSearch = (event) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setSearch(event.target.value);
        }, timeGap);
    }
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
                        <input type='text' placeholder='Enter Complaint Id' onChange={handleSearch}/>
                    </div>
                </div>
                <div className={styles.solved_complaints} onScroll={(event) => handleScroll(event, queriesMap[filter])}>
                    <RenderComplaints renderableComplaints={renderableComplaints} Component={userComplaint} props={{
                        deleteMutation,
                    }}/>
                </div>

            </>
        )
    }
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
    // allComplaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const complaintsMap = {
        'solved': solvedComplaints,
        'pending': pendingComplaints,
        '': allComplaints,
    }
    return (
<<<<<<< HEAD

        <div className="m-5 border border-gray-300 rounded-lg shadow-xl ">
            <div className="p-5 text-2xl font-semibold bg-gray-300">Compliants</div>
            <div className="flex items-center gap-3 p-2 m-2 border border-gray-300 rounded shadow w-fit">
            <label for="filter" className="text-base capitalize">filter</label>
                <select id="filter" className="p-2 text-base border-2 border-black rounded" name="filter">
                <option value="unsolved">unsolved complinats</option>
                <option value="solved">solved complinats</option>
                <option value="pending">pending complinats</option>
                <option value="accepted">accepted complinats</option>
                </select>
            </div>
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            <CompliantCard />
            {/* {solvedComplaintsQuery.isLoading && 'fetching complaints...'}
            {solvedComplaintsQuery.isError && solvedComplaintsQuery.error.message}
            {solvedComplaintsQuery.isSuccess && complaintsDiv()}
            {solvedComplaintsQuery.isFetching && 'Fetching more complaints...'} */}
            <div></div>
            <CompliantDetail />
=======
        <div className={styles.solved_complaints_wrapper}>
            <div className="p-5 text-2xl font-semibold bg-gray-300">Complaints</div>
            {solvedComplaintsQuery.isLoading && 'fetching complaints...'}
            {solvedComplaintsQuery.isError && solvedComplaintsQuery.error.message}
            {solvedComplaintsQuery.isSuccess && complaintsDiv(complaintsMap[filter])}
>>>>>>> 37a365ac6393c51847a651e452da9861d01723ec
        </div>
    );
}

export default Complainant;