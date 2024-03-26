import VerifierComplaint from "@components/Complaints/VerifierComplaint.jsx";
import styles from "./styles.module.css";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getComplaints, rejectComplaint, verifyComplaint} from "@/api/apiCalls.js";
import {handleScroll} from "@pages/Dashboard/utils.js";
import {toast} from "sonner";

const subUrl = "verifier";

const key = ["complaints", subUrl];
const Verifier = () => {
    const queryClient = useQueryClient();
    const complaintsDiv = () => (
        <>
            <div
                className={styles.solved_complaints}
                onScroll={(event) => handleScroll(event, [technitianComplaintQuery])}
            >
                {complaints.map((complaint) => {
                    return (
                        <VerifierComplaint
                            complaint={complaint}
                            verifyMutation={verifyMutation}
                            rejectMutation={rejectMutation}
                            key={complaint.id}
                        />
                    );
                })}
            </div>
        </>
    );

    const technitianComplaintQuery = useInfiniteQuery({
        queryKey: key,
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

    const verifyMutation = useMutation({
        mutationFn: verifyComplaint,
        onSuccess: () => {
            toast.success('Verified complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });
    const rejectMutation = useMutation({
        mutationFn: rejectComplaint,
        onSuccess: () => {
            toast.success('Rejected complaint successfully')
            queryClient.invalidateQueries(key);
        },
        onError,
    });

    const {data, isLoading, isError, isFetching, hasNextPage, error, isSuccess} = technitianComplaintQuery;

    const complaints = data?.pages.flatMap(page => page.complaints) || [];

    return (
        <div className={styles.solved_complaints_wrapper}>
            <h1>Technitian Complaints</h1>
            {isLoading && "fetching complaints..."}
            {isError &&
                error.message}
            {isSuccess && complaintsDiv()}
        </div>
    );
};

export default Verifier;